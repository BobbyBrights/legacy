'use strict';

angular.module('nb.services')
	.factory('UserService', [ '$rootScope', 'User', 'Auth', '$log', '$config', 'UserSharedProperties', '$state', '$q', 'userInfoManager', 'AccountService','$stateParams', '$modal', 'notiManager',
        function( $rootScope, User, Auth, $log, $config, UserSharedProperties, $state, $q, userInfoManager, AccountService, $stateParams, $modal, notiManager) {

		var createUser = function(userObj){
			console.log('The userObj is: ');
			console.log(userObj);

			var newUser = new User();
	        newUser.name 		= userObj.email;
			newUser.password 	= userObj.password;
			newUser.email 		= userObj.email;
			newUser.affiliateId = $config.affiliate.affiliate_id;
			newUser.role 		= "user";
            newUser.token       = userObj.token;
			newUser.profile 	= {
				title		: userObj.title,
				firstName 	: userObj.firstName,
				lastName 	: userObj.lastName,
				birthDate 	: userObj.birthDate,
				email		: userObj.email,
				countryOfResidence: userObj.countryOfResidence,
				mobileNo 	: userObj.mobileNo,
				marketingOptIn: userObj.marketingOptIn,
				userType 	: "user"
			};

	        return newUser.$save({},
	    		function(value, responseHeaders){
	    			//success handler
	    			console.log('Successfully created the new user:');
	    			console.log(value);
	    			console.log(responseHeaders);
	    			return {hasError: false,
	    					msg 	: 'Registration Successful'};

	    		},function(httpResponse){
	    			//error handler
	    			console.log('Creating user failed');
	    			console.log(httpResponse);
	    			return {hasError: true,
	    					msg 	: httpResponse.data.message}
	    	});
    	};

    	/*
		 * userObj : {username: value, password: value}
         * options could have: 
         * autoRedirect:
         * funcAfterSuccess:
         * funcAfterFailed:
    	*/
    	var userLogin = function(userObjt,options) {
    		$log.info("Logging in from userLogin SERVICE...");
            options = !_.isUndefined(options) ? options : {};

    		var deferred = $q.defer();

    		// Remove all existing tokens.
            localStorage.clear();

    		//update the "authenticating"
    		//$scope.authenticating = true;
    		UserSharedProperties.setAuthenticating(true);

		    setTimeout(function () {

                //call service to authenticate this user
                Auth.authenticate(userObjt)
                .then(function (data) {
                    //update the "authenticating"
                    //$scope.authenticating = false;
                    funcListAfterLogin();

                    //call service to get user's info
                    User.get({}, function(data){
                        $log.info(data);
                        $rootScope.firstName = data.profile.firstName;

                        //create or set the UserInfo object
                        userInfoManager.setUserInfo(data);
                        
                        /*userInfoManager.getUserInfo().then(function(data){
                            console.log('After set the data into userInfoManager');
                            console.log(data);
                        },function(){

                        });*/

                        funcListAfterGetUser();

                        console.log('The redirectState before login is :');
                        console.log(Auth.redirectState);

                        //resolve the promise
                        deferred.resolve({hasError: false, msg: 'Login Successful!'});

                        if( !_.isUndefined(options.funcAfterSuccess) && 
                            'function' === typeof options.funcAfterSuccess){
                            options.funcAfterSuccess();
                        }

                        // Activate a post-login redirect.
                        if (!_.isUndefined(Auth.redirectState) && 
                            !_.isUndefined(options.autoRedirect) && 
                            'open' === options.autoRedirect) {

                            if (Auth.redirectState.name == 'root.login') {
                                $state.go('root.home');
                                
                            } else {
                                //redirect the user to the state where you want to go between authentication step
                                $state.go(Auth.redirectState.name);
                                console.log('Go to the desired redirectState:');
                                console.log(Auth.redirectState.name);
                            }
                        }

                        //If none of the options have been set then use the default way
                        if(_.isEmpty(options))
                        {
                            console.log('loginOption is not set, redireting to the home page after login...');
                            $state.go('root.home');
                        }

                    }, function(err){
                    	$log.error('Getting /user data failed');
                        $log.error(err);
                        deferred.reject({errReason: 'get_user_failed', msg:err.data});
                    });

                }, function (err) {
                	//update the "authenticating"
                    //$scope.authenticating = false;
                    UserSharedProperties.setAuthenticating(false);

                    $rootScope.authenticated = false;

                    //update the "loginErrMsg"
                    UserSharedProperties.setUserLoginErrMsg(err.data);
                    //$scope.loginError = err.data.error_description;
                    $log.error(err);
                    $log.error(err.data);

                    deferred.reject({errReason: 'user_auth_failed', msg: err.data});
                });
            }, $config.latency);

			return deferred.promise;
    	};

        var funcListAfterLogin = function(){
            //set 'authenticating' as done
            UserSharedProperties.setAuthenticating(false);

            //set user as authenticated
            Auth.isAuthenticated = true;
            $rootScope.authenticated = true;

            //broadcast authenticatedChanged event
            $rootScope.$broadcast('authenticatedChanged',Auth.isAuthenticated);

            //get the user wallet info
            AccountService.getWalletInfo().then(function(walletData){
                //success handler
                //set the walletData object
                userInfoManager.setUserWallet(walletData);

            },function(){
                //error handler
            });

            //get the user notifications
            notiManager.updateNotifications();
        };

        var funcListAfterGetUser = function(){
            //broadcast the event that the user info has been updated
            $rootScope.$broadcast('userInfoUpdated');
        };

        var requestResetPW = function(_userObj){
            var deferred = $q.defer();

            var userObj = new User();

            userObj.email       = !_.isUndefined(_userObj.email) ? _userObj.email : '';
            userObj.resume_url  = $config.http.servers.requestResetPW;

            userObj.$save({
                    action:'password', 
                    action2:'reset'
                },function(){

                },function(){

            });

            return deferred.promise;
        };

        var resumePW = function(_userObj){
            var deferred = $q.defer();

            var userObj = new User();
            userObj.reset_key       = !_.isUndefined(_userObj.reset_key) ? _userObj.reset_key : '';
            userObj.new_password    = !_.isUndefined(_userObj.new_password) ? _userObj.new_password : '';

            userObj.$save({
                action:'password',
                action2:'resume'
            },function(){

            },function(){

            });

            return deferred.promise;

        };

        var updateUserProfile = function(_userInfoObj){
            var deferred = $q.defer();

            var userInfoObj = new User();
            userInfoObj.profile = {};

            for(var prop in _userInfoObj){
                userInfoObj.profile[prop] = _userInfoObj[prop];
            }

            userInfoObj.$update({},function(data){
                deferred.resolve();

            },function(errObj){
                deferred.reject(errObj);
            });

            return deferred.promise;
        };

        var updateUserPassword = function(_userObj){
            var deferred = $q.defer();

            var userObj = new User();
            userObj.currentPassword = _userObj.oldPassword;
            userObj.newPassword     = _userObj.newPassword;

            userObj.$update({
                action:'password',
                action2: 'update'
            },function(data){

                deferred.resolve(data);
            },function(err){

                console.log('failed to update the user password');
                console.log(err);

                deferred.reject(err);
            });

            return deferred.promise;
        };

        var withDraw = function( detailObj ){
            var deferred  = $q.defer();

            //check the detail
            if( _.isUndefined(detailObj.cardId) || 
                detailObj.cardId === ''){
                deferred.reject({
                    hasError:true,
                    msg:'card is not selected'
                });
                return;
            }

            var userObj = new User();

            userObj.amount  = !_.isUndefined(detailObj.amount) ? detailObj.amount : '';
            userObj.cardId  = !_.isUndefined(detailObj.cardId) ? detailObj.cardId : '';

            userObj.$save({action:'withdraw'},function(data){
                deferred.resolve(data);

            },function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var openLoginForm = function(userLoginInfo, loginOption){
            var modalInstance;

            modalInstance = $modal.open({
                templateUrl:'/partials/modals/login.html',
                controller:'UserControllerModal',
                windowClass:'login-modal-window',
                resolve: {
                    loginModalParams: function(){
                        return {
                            userLoginInfo: userLoginInfo,
                            autoRedirect:           !_.isUndefined(loginOption.autoRedirect)            ? loginOption.autoRedirect          : null,
                            funcAfterSuccess:       !_.isUndefined(loginOption.funcAfterSuccess)        ? loginOption.funcAfterSuccess      : null,
                            funcAfterFailed:        !_.isUndefined(loginOption.funcAfterFailed)         ? loginOption.funcAfterFailed       : null,
                            funcAfterModalClose:    !_.isUndefined(loginOption.funcAfterModalClose)     ? loginOption.funcAfterModalClose   : null,
                            funcAfterModalDismiss:  !_.isUndefined(loginOption.funcAfterModalDismiss)   ? loginOption.funcAfterModalDismiss : null
                        }
                    }
                }
            });

            modalInstance.result.then(function(data){
                //console.log('***login form has been closed with close()***');
                //the dynamicly set function has higher priority than predefined function
                if(!_.isUndefined(data) && 'function' == typeof data){
                    data();
                }
                else if(!_.isUndefined(loginOption.funcAfterModalClose) && 'function' == typeof loginOption.funcAfterModalClose){
                    loginOption.funcAfterModalClose();
                }
                
            }, function(){
                //console.log('***login form has been dismissed with dismiss()***');
                if(!_.isUndefined(loginOption.funcAfterModalDismiss) && 'function' == typeof loginOption.funcAfterModalDismiss){
                    loginOption.funcAfterModalDismiss();
                }
                else{
                    $state.go('root');
                }
            });

            return modalInstance;
        };

        var openForgotPWForm = function(){
            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/partials/modals/forget-password.html',
                controller: 'ForgotPWController',
                windowClass: 'forgotpw-modal-window',
                
            });

            modalInstance.result.then(function(){
                $state.go('root');
            },function(){
                $state.go('root');
            });
            
            return modalInstance;
        };

        var openResetPWForm = function(){
            var modalInstance;

            modalInstance = $modal.open({
                templateUrl:'/partials/modals/reset-password.html',
                controller:'ResetPWController',
                windowClass: 'resetpw-modal-window'
            });
        };

        var openAccountPage = function(){
            var accountWindow = null;
            var iniWidth = 1250,
                iniHeight = 700;
            
            console.log('the account page is openning...');
            if(accountWindow == null || accountWindow.closed){
                accountWindow = window.open('/account/detail','accountWin',"height="+iniHeight+",width="+iniWidth+",left=200,top=100,resizable=yes,scollbars=yes,status=yes");    
            }
            else{
                accountWindow.focus();
            }
        };

        var checkUserEmail = function(email){
            var userObj = new User();
            userObj.email = email;

            return userObj.$save({action:'checkemail'},function(data){
                console.log('succed ! the email check result is:');
                console.log(data);

                return {hasError:false};
            },function(errObj){
                console.log('the email check result is:');
                console.log(errObj);
                return errObj;
            });
        }

    	return {
    		createUser 	: createUser,
    		userLogin 	: userLogin,
            openLoginForm       : openLoginForm,
            openForgotPWForm    : openForgotPWForm,
            openResetPWForm     : openResetPWForm, 
            checkUserEmail      : checkUserEmail,
            openAccountPage     : openAccountPage,
            requestResetPW      : requestResetPW,
            resumePW            : resumePW,
            updateUserProfile   : updateUserProfile,
            updateUserPassword  : updateUserPassword,
            withDraw            : withDraw,
            funcListAfterLogin  : funcListAfterLogin,
            funcListAfterGetUser : funcListAfterGetUser
    	};
	}]).factory('UserSharedProperties',["$log", '$rootScope', function($log, $rootScope){
        var userStates   = {};

        return {
            getAuthenticating : function(){
                return userStates.authenticating;
            },

            setAuthenticating: function(_authVal){
                userStates.authenticating = _authVal;
                $rootScope.$broadcast('authenticatingChanged', userStates.authenticating);
            },

            removeLoginError: function(){
            	$rootScope.$broadcast('removeLoginErr');
            },

            setUserLoginErrMsg:function (_newMsg){
            	userStates.loginErrMsg = _newMsg;
            	$rootScope.$broadcast('userLoginErrMsgChg', userStates.loginErrMsg);
            },

            setOldUserRegInfo: function(_userInfoObj){
                userStates.oldUserRegInfo = _userInfoObj;
            },

            getOldUserRegInfo: function(){
                if(!_.isUndefined(userStates.oldUserRegInfo)){
                    return userStates.oldUserRegInfo;
                }
                else{
                    return {};
                }
            }
        };
    }])
    /*
     * User data model
    */
    .factory('UserInfo', ['$q', function($q){
        function UserInfo(userData){
            if( userData && 
                !_.isEmpty(userData)){
                this.setData(userData);
            }
        };

        UserInfo.prototype = {
            setData: function(userData){
                angular.extend(this, userData);
            }
        };
        return UserInfo;
    }])
    /*
     * User Wallet model
    */
    .factory('UserWallet',['$q', function($q){
        function UserWallet(walletData){
            if( walletData && 
                !_.isEmpty(walletData)){
                this.setData(walletData);
            }
        };

        UserWallet.prototype = {
            setData: function(walletData){
                angular.extend(this, walletData);
            }
        };
        return UserWallet;
    }])
    .factory('userInfoManager',['$q', 'UserInfo', 'UserWallet', 'AccountService', 'User',function($q, UserInfo, UserWallet, AccountService, User){
        var userInfoManager = {
            _userInfo: {},
            _userWallet: {},
            _userCards: {},

            getUserInfo: function (){
                var deferred = $q.defer();

                if(_.isEmpty(this._userInfo)){
                    console.log('user info is empty, try to update first');
                    
                    this.updateUserInfo().then(function(data){
                        deferred.resolve(this._userInfo);
                    },function(err){
                        deferred.reject(err);
                    });
                }
                else{
                    deferred.resolve(this._userInfo);
                }

                return deferred.promise;
            },

            setUserInfo: function (userInfo){
                this._userInfo = new UserInfo(userInfo);
                console.log('userInfo instance has been initialized');
                console.log(this._userInfo);
            },

            updateUserInfo: function (){
                var deferred = $q.defer();
                var manager = this;

                User.get({},function(data){
                    //the user's data has been refreshed
                    manager.setUserInfo(data);
                    deferred.resolve({hasError:false,msg:'',data:data});
                },function(err){
                    //get user data failed
                    deferred.reject({hasError:false,msg:'',data:err});
                });

                return deferred.promise;
            },

            //wallet operations:
            getUserWallet : function(){
                return this._userWallet;
            },

            setUserWallet : function(walletData){
                this._userWallet = new UserWallet(walletData);
            },

            updateUserWallet : function(){
                var manager = this;

                var deferred = $q.defer();
                AccountService.getWalletInfo().then(function(walletData){
                    //success handler
                    //set the walletData object
                    manager.setUserWallet(walletData);

                    console.log('After update the wallet info:');
                    console.log(manager._userWallet);

                    deferred.resolve(walletData);
                },function(errMsgObj){
                    //error handler
                    //TODO: set whatever flag to indicate that the wallet update is failed
                    //deferred.resolve(manager._userWallet);
                    console.log('error msg in updateuserwallet:');
                    console.log(errMsgObj);
                    deferred.reject(errMsgObj);
                });

                return deferred.promise;
            },

            getUserCards : function(){
                return this._userCards;
            },

            setUserCards : function(cardsData){
                this._userCards = cardsData;
            },

            updateUserCards : function(){
                var manager = this;

                var deferred = $q.defer();
                AccountService.getWalletAllCards().then(function(cardsData){
                    console.log('the updated cards are:');
                    console.log(cardsData);
                    manager.setUserCards(cardsData);

                    deferred.resolve(cardsData);

                },function(errMsgObj){
                    deferred.reject(errMsgObj);
                });

                return deferred.promise;
            },

            reset : function(){
                this._userInfo = {};
                this._userWallet = {};
                this._userCards = {};
            }
        };
        return userInfoManager;
    }])
    /*Phone Number Service*/
    .factory('phoneService',[ 'VerifyPhone', 'VerifyPin', '$q', 'ResendPin',
        function(VerifyPhone, VerifyPin, $q, ResendPin){

            var verifyPhone = function(phoneNum){
                var deferred = $q.defer();

                var phoneVerification = new VerifyPhone();

                phoneVerification.mobileNo = phoneNum;

                phoneVerification.$verify({},function(data){
                    deferred.resolve({hasError:false});
                }, function(err){
                    deferred.reject({hasError:true,status:err.status});
                });

                return deferred.promise;
            };

            var verifyPin = function(phoneNum, pin){
                var deferred = $q.defer();

                var pinVerification = new VerifyPhone();
                pinVerification.pin = pin;

                pinVerification.$verify({phoneNum:phoneNum, pin:'pin'},function(data){

                    deferred.resolve(data.lead_token);
                },function(){

                });

                return deferred.promise;
            };

            var resendPin = function(phoneNum){
                var deferred = $q.defer();


                (new ResendPin()).$post({phoneNum:phoneNum}, function(data){
                    deferred.resolve({hasError:false,msg:'Successfully resend the pin!',data:data});
                },function(err){
                    deferred.reject({hasError:true,msg:'Resend the pin failed!',data:err});
                });

                return deferred.promise;
            }


            return{
                verifyPhone: verifyPhone,
                verifyPin: verifyPin,
                resendPin: resendPin
            }
    }]);