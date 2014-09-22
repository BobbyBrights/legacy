'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ui.router',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/home");

        angular.forEach(routes, function (r) {
            $stateProvider.state(r.state, r);
        });

        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', function ($rootScope) {
    $rootScope.navItems = routes;
    $rootScope.$on('$viewContentLoaded', function(){
        $('div.collapse.in').removeClass('in');
    });

}]);