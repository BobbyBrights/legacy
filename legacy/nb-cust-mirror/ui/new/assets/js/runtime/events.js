angular.module('nb.events', [])
    .run(['$rootScope', '$state', 'Auth', '$log', 'subscriptionManager', '$modal','userInfoManager', 'UserService', '$timeout', '$urlRouter',
        function ($rootScope, $state, Auth, $log, subscriptionManager, $modal, userInfoManager, UserService, $timeout, $urlRouter) {
            console.log('running application...');

            console.log('the authenticated status before page rendering:');
            console.log(Auth.isAuthenticated);

            // Login required
            $rootScope.$on("$stateChangeStart", function (event,toState, toParams, fromState, fromParams) {

                console.log('the to state object is');
                console.log(toState);
                console.log('checking the state when it has changed');

                

                console.log('checking the user info on the server side');

                //this check will only be done on first time page loading
                if(false === $rootScope.pageIniSessionCheck){

                    event.preventDefault();
                    $rootScope.pageIniSessionCheck = true;

                    // User isn’t authenticated on the fron-end
                    // then check if the user has logged-in the server
                    userInfoManager.updateUserInfo().then(function(data){
                        console.log('has got user profile,user is logged-in');

                        UserService.funcListAfterLogin();                       
                        UserService.funcListAfterGetUser();
                        $rootScope.iniLoading = true;

                        if("root" === toState.name){

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
                                    //$state.go('root.home.result-latest');
                                    $state.go('root.home');

                                    //if doesnt then redirect to "ball edit page"
                                    //$state.go('root.home');

                                }else{
                                    //if not then keep them to stay at the landing page
                                    $urlRouter.sync();
                                }

                            }, function(){

                            });

                        }else{
                            $urlRouter.sync();
                        }



                    },function(err){
                        console.log('cant get user profile, user is not logged-in');
                        Auth.setPostLoginRedirect(toState);
                        $rootScope.iniLoading = true;

                        $urlRouter.sync();
                    });

                }
                else{

                    if (toState.authenticate && !Auth.isAuthenticated) {

                        //stop the event propagating
                        //event.preventDefault();

                        Auth.setPostLoginRedirect(toState);
                        $state.transitionTo("root.login");
                        event.preventDefault();                    
                    }
                }
                
                //$urlRouter.sync();

                /*if (toState.authenticate ) {

                    if(!Auth.isAuthenticated){
                        //stop the event propagating
                        //event.preventDefault();
                        evt.preventDefault();

                        console.log('checking the user info on the server side');
                        // User isn’t authenticated on the fron-end
                        // then check if the user has logged-in the server
                        userInfoManager.updateUserInfo().then(function(data){
                            console.log('has got user profile,user is logged-in');                        

                        },function(err){
                            console.log('cant get user profile, user is not logged-in');
                            Auth.setPostLoginRedirect(toState);

                            $timeout(function(){

                                $state.transitionTo("root.login");
                                $urlRouter.sync();
                            }, 5000);
                            
                            
                        });

                        //Auth.setPostLoginRedirect(toState);
                        //$state.transitionTo("root.login");
                        //event.preventDefault();
                    }
                    
                }*/

                

            });


            // Fix for Bootstrap drop down menu in responsive breakpoints.
            $rootScope.$on('$stateChangeSuccess', function () {
                angular.element('.collapse.in').removeClass('in');
            });

            $rootScope.$on('nb:subscription:invalidnumber', function (e, data) {
                $log.info('nb:subscription:invalidnumber has been triggered');
                $log.info(data);
                $log.info('log event is:');
                $log.info(e);

                //only show one alert at a time
                if(!_.isEmpty(subscriptionManager.getInvalidBall())) {
                    return;
                }

                var el = angular.element("form.bet-form fieldset:eq(" + parseInt(data.line) + ") input:eq(" + data.index + ")");
                el.attr("data-placement", "top");
                el.attr("data-trigger", "manual");
                el.attr("title", data.type == 'duplicate' ? "Duplicate number found" : "Invalid number found (1-45)");
                el.tooltip('show');

                //set the shared property
                subscriptionManager.setInvalidBall({lineIndex:data.line, ballIndex:data.index});
            });

            $rootScope.$on('nb:subscription:cleanup_tooltips', function () {
                var el = angular.element("form.bet-form fieldset input");
                el.tooltip('destroy');

                //clear the shared property
                subscriptionManager.setInvalidBall({});
            });

            $rootScope.$on('nb:displayErrMsg',function(e,data){

                var errMsgModalIns = $modal.open({
                    templateUrl: '/partials/modals/errMsg.html',
                    windowClass: !_.isUndefined(data.windowClass) ? data.windowClass : 'err-msg-model-1',
                    controller:function($modalInstance, $scope){
                        $scope.mainTitle = !_.isUndefined(data.mainTitle) ? data.mainTitle : "WELCOME TO NOVABALL";
                        $scope.modalHeading = !_.isUndefined(data.modalHeading) ? data.modalHeading : "";
                        $scope.errorMsgArray = data.errorMsgArray;
                        $scope.submitBtnText = !_.isUndefined(data.submitBtnText) ? data.submitBtnText : "CONTINUE";
                        $scope.contentTitle  = !_.isUndefined(data.contentTitle) ? data.contentTitle : '';

                        $scope.submitFunc = function(){
                            $modalInstance.close();
                            if( data.actionAfterSubmit && 
                                typeof data.actionAfterSubmit == 'function'){
                                data.actionAfterSubmit();
                            }
                        }

                        $scope.close = function(){
                            $modalInstance.close();
                            if( data.actionAfterClose && 
                                typeof data.actionAfterClose == 'function'){
                                data.actionAfterClose();
                            }
                        }
                    }
                });
            })

            // Some default variables
            $rootScope.firstName = null;
        }]);
