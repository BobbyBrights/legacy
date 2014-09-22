'use strict';
angular.module('nb.controllers', ['nb.functions'])
    .controller('UserController', ['$scope', '$rootScope', '$state', 'Auth', '$config', '$modal', 'VerifyPhone', 'User', '$log', 'UserService', 'subscriptionManager', 'userInfoManager',
        function ($scope, $rootScope, $state, Auth, $config, $modal, VerifyPhone, User, $log, UserService, subscriptionManager, userInfoManager) {

            // TODO remove this in production.
            $scope.user = {
                //username: 'customer',
                //password: 'customer'
                //username: 'test20@test.com',
                //password: '123123'
            };

            $scope.userInfo = {};
            $scope.userNameDisplay = "";

            $scope.user.formSubmitted = false;

            $scope.checkUserSubs = function(){
                //get and check the user's subscription
                console.log('getting the subscription');
                subscriptionManager.getSubscriptions().then(function(data){
                    console.log('the resolved subs are:');
                    console.log(data);

                    if( false !== data && 
                        !_.isEmpty(data.lines) && 
                        data.lines.length > 0){
                        //user has subscription, redirect them to the logged-in home page
                        
                        //TODO:check if any draw result come out after user registered
                        //if has then redirect to "subscription latest result page"
                        console.log('going to root.home.result.latest page');
                        $state.go('root.home.result-latest');

                        //if doesnt then redirect to "ball edit page"
                        //$state.go('root.home');

                    }else{
                        //if not then keep them to stay at the landing page
                    }

                }, function(){

                });
            };

            $scope.logout = function () {
                //clear the shared data
                userInfoManager.reset();
                subscriptionManager.reset();

                Auth.forceExpire();
                Auth.isAuthenticated = false;
                $rootScope.authenticated = false;
                $rootScope.firstName = null;

                $state.go("root");
            };


            $scope.login = function (mainForm) {

                $scope.user.formSubmitted = true;

                var loginOptions = {
                    autoRedirect: 'close',
                    funcAfterSuccess: function(){
                        console.log('executed after user login...');
                    }
                };

                UserService.userLogin($scope.user, loginOptions).then(function(){
                    $scope.checkUserSubs();
                    $scope.updateUserName();

                    console.log('the userInfo after login is:');
                    console.log($scope.userInfo);
                    
                    //return;
                    //$state.go('root.home');
                },function(err){
                    //if login failed
                    //open the login model to show the error message and also allow user to login again
                    /*$loginModal = $modal.open({
                        templateUrl: '/partials/modals/login.html',
                        controller: 'UserControllerModal',
                        windowClass: 'modal-window-style'
                    });*/

                    if('user_auth_failed' === err.errReason){

                        UserService.openLoginForm({
                            username:$scope.user.username,
                            password:'',
                            loginResult:"failed",
                            loginResultMsg: $scope.loginError,
                        },{
                            funcAfterSuccess: function(){
                                console.log('This function will be executed after user successfully loged-in');
                            },
                            funcAfterFailed: null,
                            funcAfterModalClose: function(){
                                $state.go('root.home');
                            },
                            funcAfterModalDismiss: null
                        });
                    }
                    else{
                        //if anthentication succeed
                        $state.go('root.home');
                    }
                    
                });
            };

            $scope.modalLogin = function(){

                var loginOptions = {
                    autoRedirect: 'close',
                    funcAfterSuccess: function(){
                        console.log('executed after user login...');
                        $scope.checkUserSubs();
                    }
                };

                UserService.openLoginForm({},loginOptions);
            };

            $scope.forgotPasswordPage = function(){

                $state.go('root.forgot-password');
            };

            $scope.openAllNoti = function(){
                console.log('openning all of the notifications in the User controller...');
            };

            $scope.updateUserName = function(){
                console.log('ready to update the username');
                userInfoManager.getUserInfo().then(function(data){
                    $scope.userInfo = data;
                    console.log('the refreshed userinfo is:');
                    console.log($scope.userInfo);
                        
                    if( !_.isUndefined($scope.userInfo) && 
                        !_.isUndefined($scope.userInfo.profile)){
                        console.log('updating the username');
                        $scope.userNameDisplay = $scope.userInfo.profile.firstName + ' '+ $scope.userInfo.profile.lastName;
                    }

                },function(){

                });
                
            }

            /*
             * Event Registration
            */
            $scope.$on('authenticatingChanged', function(event, newVal){
                $scope.authenticating = newVal;
            });

            $scope.$on('authenticatedChanged',function(event, newVal){
                
            });

            $scope.$on('userInfoUpdated',function(event, newVal){
                //update the userName
                if( true === Auth.isAuthenticated){
                    $scope.updateUserName();
                }
            });

            $scope.$on('removeLoginErr', function(event, val){
                console.log('Event removeLoginErr is triggered');
                delete $scope['loginError'];
            });

            $scope.$on('userLoginErrMsgChg', function(event, newMsg){
                $scope.loginError = newMsg;
            });


            $log.info("UserController fired..");

            if ($state.current.data && $state.current.data.showModal) {
                $scope.register();
            }

            //update the userName
            if( true === Auth.isAuthenticated){
                $scope.updateUserName();
            }
        }]);
