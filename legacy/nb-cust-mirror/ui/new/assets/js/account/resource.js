'use strict';

angular.module('nb.resources')
    .factory('UserPayments', ['$resource', function ($resource) {
        return $resource('/user/payments', {});
    }])
    .factory('UserWalletResource', ['$resource', function ($resource) {
        return $resource('/user/wallet/:param', {
        	param:"@param"
        }, {});
    }])
    .factory('Notification', function ($resource){
    	return $resource('/notification/:param1/:param2', 
    					{
    						param1:'@param1',
    						param2:'@param2'
    					},
    					{
    						'update':{
    							method: 'PATCH',
    							headers: {
    								'Content-type':'application/json'
    							}
    						}
    					})
    });
