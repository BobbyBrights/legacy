'use strict';

angular.module('nb.controllers')
	.controller('AccountDetailController',
		[ '$scope', '$state', 'userInfoManager', 'Functions', 'UserService', '$timeout', function($scope, $state, userInfoManager, Functions, UserService, $timeout){
			
			$scope.userInfo = {
				formSubmitted: false,
			};

			$scope.passwordSet = {
				oldPassword: '',
				newPassword: '',
				newPasswordConfirm: ''
			}

			$scope.forms		= {};
			$scope.oldUserInfo 	= {};
			$scope.titleList    = ['Mr.','Mrs.','Ms.'];
	        $scope.countryList  = ['United Kingdom'];

	        $scope.updateProfileResult 	= false;
	        $scope.updateProfileMsg 	= '';
	        $scope.updatePWResult 	= false;
	        $scope.updatePWMsg 		= '';

			var avaliablePropList = ['title','firstName','lastName','marketingOptIn','winOptIn'];


			$scope.findChangedProperties = function(){

				var changedList = [];
				_.each(avaliablePropList,function(prop){
					//console.log('the old '+prop + ' is:'+$scope.oldUserInfo.profile[prop] + "<");
					//console.log('the new '+prop + ' is:'+$scope.userInfo.profile[prop] + "<");

					if( !_.isUndefined($scope.oldUserInfo.profile[prop]) &&
						$scope.oldUserInfo.profile[prop] != $scope.userInfo.profile[prop]){
						changedList.push(prop);
					}
				});

				return changedList;
			};

			$scope.updateProfile = function(isFormInvalid){
				$scope.userInfo.formSubmitted = true;

				if(isFormInvalid){
					return;
				}

				console.log('the updated prop list is:');

				//try to find the changed properties on basic profile information
				var changedList = $scope.findChangedProperties();
				var needUpdateObj = {};

				console.log(changedList);

				_.each(changedList, function(prop){
					console.log('the old '+prop + ' is:'+$scope.oldUserInfo.profile[prop] + "<");
					console.log('the new '+prop + ' is:'+$scope.userInfo.profile[prop] + "<");

					needUpdateObj[prop] = $scope.userInfo.profile[prop];
				});

				//update the profile
				if(!_.isEmpty(changedList)){
					UserService.updateUserProfile(needUpdateObj).then(function(data){
						$scope.updateProfileResult 	= 'success';
	        			$scope.updateProfileMsg 	= 'Profile is successfully updated';

					},function(err){

						$scope.updateProfileResult 	= 'failed';
	        			$scope.updateProfileMsg 	= 'An error occured when update password. Please try again later.';
					});

					$timeout(function(){
						$scope.updateProfileResult = false;
					},5000);
				}

				//try to find if the password has been changed
				if('' !== $scope.passwordSet.newPassword.trim()){
					console.log('ready to update the new password');

					UserService.updateUserPassword(_.clone($scope.passwordSet)).then(function(data){
						$scope.updatePWResult 	= 'success';
						$scope.updatePWMsg 		= 'Password is successfully updated.';

					},function(err){
						var errMsg = '';
						$scope.updatePWResult = 'failed';

		                switch(err.status){
		                    case 403:
		                        errMsg = "The current password is not correct";
		                        break;
		                    case 409:
		                    	errMsg = "No need to update the password. The new password is the same as the current one";
		                    	break;
		                    case 500:
		                    default:
		                    	errMsg = 'An error occured when update password. Please try again later.';
		                }

		                $scope.updatePWMsg = errMsg;
					});
					
					$timeout(function(){
						$scope.updatePWResult = false;

					},5000);
				}

				$scope.userInfo.formSubmitted = false;
			}

			

			//get user's info
			userInfoManager.getUserInfo().then(function(data){
				console.log('get the user object from userInfoManager');
				console.log(data);

				//sign to the oldUserInfo object
				$scope.oldUserInfo = Functions.deepClone(data);

				console.log('the oldUserInfo is:');
				console.log($scope.oldUserInfo);

				//combine the data with the existing one
                for(var prop in $scope.userInfo){
                    if(!data.hasOwnProperty(prop)){
                        data[prop] = $scope.userInfo[prop];
                    }
                }

				$scope.userInfo = data;

			},function(){

			});
	}]);
