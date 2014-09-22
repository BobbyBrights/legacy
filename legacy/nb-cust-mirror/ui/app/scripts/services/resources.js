'use strict';
// Create a HTTP interceptor

angular.module('nb.resources', ['ngResource'])
    .factory('Bet', ['$resource', function ($resource) {
        return $resource('/bet/:id', {id: "@id"});
    }]).factory('User', ['$resource', function ($resource) {
        return $resource('/user/:id', {id: "@id"});
    }]).factory('PCIServiceToken', ['$resource', function ($resource) {
        return $resource('/pci/service/:id', {id: "@id"});
    }]).factory('CryptoService', ['$resource', function ($resource) {
        return $resource('/crypt', {}, {
            encrypt: {
                method: 'POST', params: {type: 'encryption'}
            },
            'decrypt': {
                method: 'POST', params: {type: 'decryption'}
            }
        });
    }]).factory('Subscription', ['$resource', function ($resource) {
        return $resource('/user/subscription', {});
    }]).factory('History', ['$resource', function ($resource) {
        return $resource('/lotteries/:lotteryId/history/:id', {lotteryId: "@lotteryId", id: "@id"});
    }]).factory('Affiliate', ['$resource', function ($resource) {
        return $resource('/affiliate/:id', {id: "@id"});
    }]).factory('Customer', ['$resource', function ($resource) {
        return $resource('/customer/:id', {id: "@id"});
    }]).factory('Lottery', ['$resource', function ($resource) {
        return $resource('/lotteries/:id', {id: "@id"});
    }]).factory('Token', ['$resource', function ($resource) {
        //console.log($resource);
        return function (customHeaders) {
            return $resource('/user/login', {grant_type: 'client_credentials'}, {
                'retrieve': {
                    method: 'POST',
                    headers: customHeaders || {},
                    interceptor: {
                        responseError: function (data) {
                            if (data.status === 401) {
                                alert("Invalid login credentials");
                            }
                        }
                    }
                },
                'validate': {
                    method: 'GET',
                    headers: customHeaders || {}
                }
            });
        }
    }]).factory('Auth', ['$resource', function ($resource) {
        //console.log($resource);
        return function (customHeaders) {
            return $resource('/me', {id: "@id"}, {
                'validate': {
                    method: 'GET',
                    headers: customHeaders || {}
                }
            });
        }
    }]);

// Test for buildbot
