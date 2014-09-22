'use strict';

angular.module('nb.services')
	.factory('breadCrumbs',['$rootScope', '$state', '$location',
		function($rootScope, $state, $location){
			
			var generate = function(){
				console.log('generating the breadCrumbs');
				console.log($state);
				console.log('current location is:');
				console.log($location.path());
			}

			$rootScope.$on('$stateChangeSuccess',function(){
				generate();
			})

			return{
				generate: generate,
			}
	}]);