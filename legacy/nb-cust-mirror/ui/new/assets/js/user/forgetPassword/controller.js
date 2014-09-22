'use strict';
angular.module('nb.controllers')
	.controller('ForgotPWController',[ '$scope', '$modalInstance','UserService',function($scope, $modalInstance, UserService){

	//initialization
	$scope.forms 				= {};
	$scope.mainTitle	        = 'WELCOME TO NOVABALL';
	$scope.modalHeading         = 'Forget your password?';
	$scope.showEmailInputForm   = true;
	$scope.showEmailSent		= false;
	$scope.userInfo 			= {
		email:''
	};

	$scope.openEmailInputPage		= function(){
		$scope.showEmailInputForm	= true;
		$scope.modalHeading     = 'Forget your password?';   	
	}

	$scope.closeEmailInputPage	= function(){
		$scope.showEmailInputForm	= false;        	
	}

	$scope.openEmailSentPage 	= function(){
		$scope.showEmailSent	= true;        	
		$scope.modalHeading     = 'Email sent';
	}

	$scope.closeEmailSentPage 	= function(){
		$scope.showEmailSent	= false;        	
	}

	$scope.sendForgotPWEmail	= function(){
		var userObj = {
			email: _.clone($scope.userInfo.email)
		};
		//sending the request to the server
		UserService.requestResetPW(userObj).then(function(){

			$scope.closeEmailInputPage();
        	$scope.openEmailSentPage();

			},function(){

		});


	}

	$scope.closeWindow	= function(){
		$modalInstance.close();
	}
}]);