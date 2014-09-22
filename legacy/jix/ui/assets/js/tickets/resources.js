'use strict';
// Module constructor
angular.module('jix.resources', [])
    .factory('Ticket', ['$resource', function ($resource) {
        return $resource('/ticket/:id', {}, {});
    }]);