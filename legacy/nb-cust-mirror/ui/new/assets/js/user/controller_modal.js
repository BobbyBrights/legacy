'use strict';
angular.module('nb.controllers')
    .controller('UserControllerModal', ['$scope', '$rootScope', '$state', 'Auth', '$config', '$modal', 'VerifyPhone', 'User', '$log', 'UserService', '$modalInstance', '$controller', '$timeout', 'loginModalParams',
        function ($scope, $rootScope, $state, Auth, $config, $modal, VerifyPhone, User, $log, UserService, $modalInstance, $controller, $timeout, loginModalParams) {

            //this controll extends the UserController
            //the only difference between theses two controllers are this one controller a form and also opened in a Modal
            $.extend(this, $controller('UserController', {$scope: $scope}));

            $scope.mainTitle        = "WELCOME TO NOVABALL";
            $scope.modalHeading     = 'Login';
            $scope.submitBtnText    = 'LOGIN';

            $scope.user.formSubmitted = false;

            $scope.displayErrMsg    = false;
            $scope.loginResult      = false;
            $scope.loginResultMsg   = '';


            console.log('The passed in loginModalParams is:');
            console.log(loginModalParams);

            //pre-set the "username"
            if( !_.isUndefined(loginModalParams) && 
                !_.isUndefined(loginModalParams.userLoginInfo)){
                $scope.user.username = !_.isUndefined(loginModalParams.userLoginInfo.username) ? loginModalParams.userLoginInfo.username : '';
                $scope.user.password = !_.isUndefined(loginModalParams.userLoginInfo.password) ? loginModalParams.userLoginInfo.password : '';

                //pre-set the "login error message"
                $scope.loginResult      = !_.isUndefined(loginModalParams.userLoginInfo.loginResult) ? loginModalParams.userLoginInfo.loginResult : false;
                $scope.loginResultMsg   = !_.isUndefined(loginModalParams.userLoginInfo.loginResultMsg) ? loginModalParams.userLoginInfo.loginResultMsg : '';

                $scope.displayErrMsg   = true;
            }

            $scope.user = {
                //username: 'customer',
                //password: 'customer'
                //username: 'test20@test.com',
                //password: '123123'
            };

            /*$scope.logout = function () {
                Auth.forceExpire();
                Auth.isAuthenticated = false;
                $rootScope.authenticated = false;
                $rootScope.firstName = null;
                $state.go("root");
            };*/


            $scope.login = function (mainForm) {
                resetLoginMsg();
                $scope.user.formSubmitted = true;
                
                if( false === mainForm){
                    return;
                }

                var loginOptions = {
                    //autoRedirect: 'close',
                    funcAfterSuccess: (!_.isUndefined(loginModalParams.funcAfterSuccess) && loginModalParams.funcAfterSuccess ) ? loginModalParams.funcAfterSuccess : (function(){
                        console.log('executed after user login...');
                        $scope.checkUserSubs();
                    }),
                    autoRedirect : (!_.isUndefined(loginModalParams.autoRedirect) && loginModalParams.autoRedirect ) ? loginModalParams.autoRedirect : '',
                };
               
                UserService.userLogin($scope.user,loginOptions)
                    .then(function(data){
                    //successful handeler
                    //display the successful message
                    $scope.loginResult = 'success';
                    $scope.loginResultMsg = data.msg;
                    
                    //close the model
                    
                    $timeout(function(){
                        //$state.go('root.home');
                        $modalInstance.close();
                        resetLoginMsg();
                    },800);
                },function(err){
                    //error  handler
                    console.log('The error received in the UserControllerModal controller when calling UserService.userLogin()');
                    console.log(err);

                    if('user_auth_failed' !== err.errReason){
                        //login failed but not the reson of authentication failed
                        $timeout(function(){
                            //$scope.loginResult = 'success';
                            //$scope.loginResultMsg = data.msg;
                            $modalInstance.close();
                            resetLoginMsg();
                        },800);
                    }
                });
            };

            $scope.forgotPasswordPage = function(){
                $modalInstance.close(function(){
                    $state.go('root.forgot-password');
                });
                
            };

            $scope.loginAfterResetPW = function(){
                $scope.modalHeading     = 'Your password has been reset, please login below';
            };

            $scope.close = function(){
                $modalInstance.close();
            };

            /*
             * Event Registration
            */
            $scope.$on('authenticatingChanged', function(event, newVal){
                $scope.authenticating = newVal;
            });

            $scope.$on('removeLoginErr', function(event, val){
                console.log('Event removeLoginErr is triggered');
                delete $scope['loginError'];
            });

            $scope.$on('userLoginErrMsgChg', function(event, newMsg){
                $scope.loginResult  = "failed";
                $scope.loginResultMsg = newMsg;
            });

            /*
            $log.info("Controller fired..");

            if ($state.current.data && $state.current.data.showModal) {
                $scope.register();
            }*/

            var resetLoginMsg = function(){
                $scope.loginResult      = false;
                $scope.loginResultMsg   = '';
            }
        }]);
