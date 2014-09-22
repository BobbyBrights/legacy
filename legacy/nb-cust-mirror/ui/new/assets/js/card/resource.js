'use strict';

angular.module('nb.resources')
	.factory('Card',['$resource', function($resource){
		return $resource('/add_card/:amid',
							{
								amid:"@amid"
							},
							{});
	}])
	.factory('UpdateCard',['$resource', function($resource){
		return $resource('/user/card/:cardid',
						{
							cardid:'@cardid'
						},
						{
							update:{
								method:'PATCH',
								headers: {
				                    'Content-Type': 'application/json'
				                }
							}
						})
	}]);