'use strict';

angular.module('eventureApp')
    .factory('Event', ['$resource', function ($resource) {
        return $resource('/api/events/:id', {id: "@id"}, {
            'update' : {
                method: 'PUT'
            }
        });
    }]).factory('Promoter', ['$resource', function ($resource) {
        return $resource('/api/promoters/:id', {id: "@id"});
    }]);