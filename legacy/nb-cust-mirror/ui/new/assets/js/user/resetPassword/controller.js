'use strict';

angular.module('nb.controllers')
	.controller('ResetPWController',['$scope', '$modalInstance',function($scope, $modalInstance){
		$scope.forms 				= {};
        $scope.mainTitle			= 'WELCOME TO NOVABALL';
        $scope.modalHeading         = 'Reset your password';

        $scope.userInfo 			= {
        	formSubmitted: false,
        	password: '',
        	password2:'',
        };

        $scope.resetPW = function(){

        };


	}]);