'use strict';

// Add underscore as an angular module.
angular.module('underscore', []).factory('_', function () {
    return window._;
});

angular.module('sttApp', [
    'ngSanitize',
    'ngRoute',
    'ngTouch',
    'ngResource',
    'underscore',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
]);

angular.module('sttApp')
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


angular.module('sttApp')
    .run(['$rootScope', '$route', '$location',
        function ($rootScope, $route, $location) {
            console.log("STT App");
        }]);