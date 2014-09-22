'use strict';

angular.module('nb.services')
    .factory('CryptoService', ['$resource', function ($resource) {
        return $resource('/crypt', {}, {
            encrypt: {
                method: 'POST', params: {type: 'encryption'}
            },
            'decrypt': {
                method: 'POST', params: {type: 'decryption'}
            }
        });
    }]).factory('LocalStorage', ['$q', 'CryptoService',
        function ($q, CryptoService) {

            var localStorage = window.localStorage || {};

            var encrypt = function (key, value) {
                // Returns a promise
                var deferred = $q.defer();

                //with encryption
                /*CryptoService.encrypt(value, function (data) {
                    localStorage.setItem(key, data._r);
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });*/

                //not with encryption
                value = JSON.stringify(value);
                localStorage.setItem(key, value);
                deferred.resolve(value);

                return deferred.promise;
            };

            var decrypt = function (key) {
                // Returns promise
                var deferred = $q.defer();
                var value = localStorage.getItem(key);

                //with decryption
                /*CryptoService.decrypt({_o: value}, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });*/
                
                //not using decryption
                value = JSON.parse(value);
                deferred.resolve(value);

                return deferred.promise;
            };


            var put = function (key, value, encrypt) {
                // Check if localStorage is available
                if (!_.isUndefined(encrypt) && encrypt) {
                    return this.encrypt(key, value);
                } else {
                    if (typeof value === 'object') {
                        // TODO - check to see what angular.toJSON gives us here (Patryk issue with $ in property names)
                        value = JSON.stringify(value);
                    }
                    localStorage.setItem(key, value);
                }
            };

            var get = function (key, decrypt) {
                if (!_.isUndefined(decrypt) && decrypt) {
                    return this.decrypt(key);
                } else {
                    return localStorage.getItem(key);
                }
            };

            return {
                encrypt: encrypt,
                decrypt: decrypt,
                get: get,
                put: put
            };
        }]);