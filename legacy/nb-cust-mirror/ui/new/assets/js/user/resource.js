'use strict';
// Module constructor
angular.module('nb.resources', [])
    .factory('Token', ['$resource', '$log',
        function ($resource, $log) {
            return function (base64details) {
                var _headers = {
                    'Content-Type': "application/json",
                    'Authorization': "Basic " + base64details
                }
                return $resource('/user/login', {}, {
                    'retrieve': {
                        method: 'POST',
                        headers: _headers,
                        interceptor: {
                            responseError: function (data) {
                                $log.info(data);
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
    .factory('User', ['$resource', function ($resource) {
        return $resource('/user/:action/:action2', {action:"@action",action2:"@action2"},{
            'save' : {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                }
            },
            'update': {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        });
    }])
    .factory('VerifyPhone', ['$resource', function ($resource) {
        return $resource('/lead/:phoneNum/:pin', {
            phoneNum:'@phoneNum',
            pin:'@pin'    
        }, {
            'verify' : {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        });
    }])
    .factory('ResendPin', ['$resource', function ($resource){
        return $resource('/lead/:phoneNum/resend',
                        {
                            phoneNum:'@phoneNum'
                        },
                        {
                            'post':{
                                method: 'POST',
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            }
                        });
    }])
    .factory('VerifyPin',['$resource', function ($resource){
        return $resource(   '/:phoneNum/pin',{
                                phoneNum:'@phoneNum'
                            },{
                                'verify':{
                                    method: 'POST',
                                    headers:{
                                        'Content-Type': 'application/json'
                                    }
                                }
                            });
    }]);
