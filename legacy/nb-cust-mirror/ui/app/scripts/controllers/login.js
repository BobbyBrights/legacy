'use strict';

angular.module('novaballApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', 'Token', 'nbConfig', 'userSession',
        function ($scope, $rootScope, Auth, Token, config, userSession) {
            // Simulate a login
            $scope.loginForm = { username: 'customer', password: 'customer'};
            $scope.logout = function () {
                delete $rootScope['loggedIn'];
                delete $rootScope['username'];
                delete $rootScope['customerType'];
                localStorage.clear();
            };

            $scope.loggedIn = $rootScope.loggedIn;
            $scope.notifyLoggedInStatusChange = function () {
                $rootScope.loggedIn = $scope.loggedIn;
            }

            $scope.$watch('loggedIn', $scope.notifyLoggedInStatusChange);

            $scope.login = function () {
                // Get a token
                // TODO get base64 encoding working!
                if (!_.isUndefined($scope.loginForm.username) && !_.isUndefined($scope.loginForm.password)) {
                    var basicAuth = CryptoJS.enc.Latin1.parse($scope.loginForm.username + ":" + $scope.loginForm.password).toString(CryptoJS.enc.Base64)
                    Token(
                        {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + basicAuth// Fluffed for now
                        }
                    ).retrieve(
                        {clientId: $scope.loginForm.username, clientSecret: $scope.loginForm.password, grant_type: 'client_credentials'},
                        function (data) {
                            var token = data.access_token;
                            Auth({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
                                .validate({}, function (data) {
                                    localStorage.setItem(config.localStorage.key, token);
                                    $rootScope.username = data.customerName;
                                    $rootScope.customerType = data.customerType;
                                    $rootScope.loggedIn = true;
                                    $rootScope.$emit('nb:updateview');
                                    $rootScope.$emit('nb:flashMessage', {title: 'Login', message: 'Logged in successfully'});
                                }
                            );
                        }
                    );
                } else {
                    console.log("Error with validation");
                }
            }
        }]);
