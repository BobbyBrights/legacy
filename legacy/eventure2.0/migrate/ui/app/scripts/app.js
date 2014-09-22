'use strict';
var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    return window._; // assumes underscore has already been loaded on the page
});

angular.module('eventureApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'ngAnimate'
    ])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            }).when('/event/add', {
                templateUrl: 'views/event-form.html',
                controller: 'EventsController'
            }).when('/event/:id', {
                templateUrl: 'views/event-detail.html',
                controller: 'EventsController'
            }).when('/event/:id/edit', {
                templateUrl: 'views/event-form.html',
                controller: 'EventsController'
            }).when('/events', {
                templateUrl: 'views/events.html',
                controller: 'EventsController'
            }).when('/promoters', {
                templateUrl: 'views/promoters.html',
                controller: 'PromotersCtrl'
            }).when('/users', {
                templateUrl: 'views/users.html',
                controller: 'UsersCtrl'
            }).otherwise({
                redirectTo: '/'
            });

        // Add interceptor
        $httpProvider.interceptors.push('addHeaderInterceptor');

    }]).run(['$rootScope', function ($rootScope) {
        $rootScope.isAdmin = true;
    }]).factory('addHeaderInterceptor', ['$q', function ($q) {
        return {
            request: function (config) {
                //console.log('Request started'); // LOG AT REQUEST START
                config.headers['Authorization'] = 'Bearer cLlk0oHGueJrseDRbWhUvgYzwuISPD1fq8SffilPB4o=';
                //console.log(config.headers);
                return config || $q.when(config);
            }
        };
    }]).directive('myCustomer', function () {
        return {
            templateUrl: 'my-customer.html'
        };
    });
