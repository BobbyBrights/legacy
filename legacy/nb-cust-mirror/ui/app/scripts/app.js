'use strict';
// Add underscore as an angular module.
angular.module('underscore', []).factory('_', function () {
    return window._;
});

angular.module('novaballApp', [
// Thirdparty
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ngTouch',
    'underscore',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'nb.resources',
    'nb.config',
    'nb.userSession'
]);

angular.module('novaballApp')
    .config(function ($routeProvider, $locationProvider) {
        // Routes is defined elsewhere, but included before this file is loaded. As it is also included in the node service
        angular.forEach(routes, function (r) {
            $routeProvider.when(r.path, r.route);
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);

    });


angular.module('novaballApp')
    .run(['nbConfig', '$rootScope', 'Auth', 'userSession', '$route', '$location',
        function (config, $rootScope, Auth, userSession, $route, $location) {
            $rootScope.debug = false;
            $rootScope.$on('$routeChangeSuccess', function (e) {
                console.log("Route change success: ", e);
                // Check for a querystring parameter creditCardId
                var params = function () {
                    var str = window.location.search;
                    var objURL = {};

                    str.replace(
                        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                        function ($0, $1, $2, $3) {
                            objURL[ $1 ] = $3;
                        }
                    );
                    return objURL;
                }();

                if (params['creditCardId']) {

                }
                $rootScope.isHome = false;
            });

            // Sometimes the view needs to be manually refreshed.
            $rootScope.$on('nb:updateview', function (event) {
                // Need to refresh the entire view somehow
                $route.reload();
            });

            // Handle flash messages.
            $rootScope.$on('nb:flashMessage', function (event, i) {
                // Need to refresh the entire view somehow
                var t = toastr[i.type || 'success'](i.message, i.title);
                //toastr.success('Welcome back ' + data.customerName, 'Login');
            });

            // Handle flash messages.
            $rootScope.$on('nb:redirectModal', function (event, i) {
                toastr['error']("You need to verify your card, redirecting you in approx. 5 seconds", "Card Verification Required");
                setTimeout(function () {
                    location.href = i.url;
                }, 2000);
            });

            // Clear localStorage.
            $rootScope.$on('nb:clearLocalStorage', function (event, i) {
                if (!_.isEmpty(i)) {
                    for (var j in i) {
                        localStorage.remove(i[j]);
                    }
                } else {
                    localStorage.clear();
                }
            });

            // TODO - Determine the conditions under which auto-login happens

            if (localStorage.getItem(config.localStorage.key)) {
                // We have an authToken, lets validate it.
                Auth({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(config.localStorage.key)
                }).validate({}, function (data) {
                        $rootScope.username = data.customerName;
                        $rootScope.customerType = data.customerType;
                        $rootScope.loggedIn = true;

                        var params = function () {
                            var str = window.location.search;
                            var objURL = {};

                            str.replace(
                                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                                function ($0, $1, $2, $3) {
                                    objURL[ $1 ] = $3;
                                }
                            );
                            return objURL;
                        }();

                        if (!params['creditCardId']) {
                            $rootScope.$emit('nb:flashMessage', {title: 'Login', message: 'Logged in successfully as ' + data.customerName});
                        }
                        // No need to reload the view, as it hasnt loaded yet.
                    }
                );
            }

            angular.element(".bet").on("click", function(){

            });

            $('.bet').on('click', function(){

            })

        }]);
