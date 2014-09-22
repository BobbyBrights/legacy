'use strict';
// Module constructor
angular.module('nb.resources')
    .factory('UserSubscription', ['$resource', function ($resource) {
        return $resource('/user/subscriptions', {}, {
        	update:{
        		method:'PATCH', 
        		isArray:true,
        		headers: {
                    'Content-Type': 'application/json'

                }
        	},
        	save:{
        		method:'POST', 
        		headers: {
                    'Content-Type': 'application/json'

                }
        	},
            get:{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
                interceptor:{
                    responseError: function(data){
                        console.log('inside the interceptor function:');
                        console.log(data);
                        return {};
                    }
                }
            }
        });
	}])
    .factory('Lines', ['$resource', function($resource){
        return $resource('/lines/:action',{
            action:'@action'
        }, {
            post:{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        })
    }]);
