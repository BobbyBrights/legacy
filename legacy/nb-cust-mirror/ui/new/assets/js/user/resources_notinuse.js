'use strict';
// Create a HTTP interceptor
angular.module('nb.resources', ['ngResource'])
    .factory('Token', ['$resource', function ($resource) {
        return function (base64details) {
            var _headers = {
                'Content-Type': "application/json",
                'Authorization': "Basic " + base64details
            }
            return $resource('/user/login', {grant_type: 'client_credentials'}, {
                'retrieve': {
                    method: 'POST',
                    headers: _headers,
                    interceptor: {
                        responseError: function (data) {
                            console.log('Login error');
                            console.log(data);

                            if (data.status === 401) {
                                //return data;
                            }
                            if (data.status === 400) {
                                //return data;
                            }

                        }
                    }
                }
            });
        }
    }])
    .factory('VerifyPhone', ['$resource', function ($resource) {
        return $resource('/pin',{},{});
    }]);
