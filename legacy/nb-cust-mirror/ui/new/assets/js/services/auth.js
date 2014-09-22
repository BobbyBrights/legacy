'use strict';
angular.module('nb.services', ['nb.resources', 'underscore'])
    .factory('Auth', ['$http', '$rootScope', 'Token', '$q', '$config', function ($http, $rootScope, Token, $q, $config) {
        var isAuthenticated = false;
        var hasLocalStorageAuthToken = !_.isUndefined(localStorage.getItem("nb:auth_token"));
        var user = {};

        var redirectState = {};

        var setPostLoginRedirect = function(state){
            this.redirectState = state;
        };

        var forceExpire = function(token){
            // TODO - Logic here to expire the token on the server.
        };
        var authenticate = function (_user) {
            var deferred = $q.defer();

            if (!_.isUndefined(_user.username) && !_.isUndefined(_user.password)) {
                var basicAuth = CryptoJS.enc.Latin1.parse(_user.username + ":" + _user.password).toString(CryptoJS.enc.Base64);
                Token(basicAuth).retrieve({
                        affiliateId: $config.affiliate.affiliate_id,
                        //clientId: _user.username,
                        //clientSecret: _user.password,
                        //grant_type: 'client_credentials'
                    },
                    function (data) {
                        var token = data.access_token;
                        localStorage.setItem('nb:auth_token', token);
                        deferred.resolve(data);
                    }, function (err) {
                        deferred.reject(err);
                    }
                );
            } else {
                var err = {};
                err.data = {
                    error: "validation_error",
                    error_description: "Username and password are required."
                };

                deferred.reject(err);
            }
            return deferred.promise;
        };

        return {
            forceExpire: forceExpire,
            hasLocalStorageAuthToken: hasLocalStorageAuthToken,
            isAuthenticated: isAuthenticated,
            authenticate: authenticate,
            user: user,
            setPostLoginRedirect: setPostLoginRedirect
        };

    }]);