'use strict';

angular.module('novaballApp')
    .controller('UserCtrl', ['nbConfig', '$scope', '$rootScope', 'User', '$route', '$location',
        function (config, $scope, $rootScope, User, $route, $location) {
            // Logout
            $scope.$location = $location,
                $scope.text = "Hello World!",
                $scope.loginForm = {},
                $scope.user = {};

            if ($scope.$location.path() === '/logout') {
                // TODO clear cookies and authToken (except remember me)
                localStorage.removeItem(config.localStorage.key);
                $rootScope.activeUser = null;
                $rootScope.loggedIn = false;
                $location.path("/");
            }
        }]);