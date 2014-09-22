'use strict';

/* Services */
angular.module('myApp.services', []).
    value('version', '0.1');

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
    factory('Search', ['$resource', function ($resource) {
        return $resource('/search', {}, {});
    }]);