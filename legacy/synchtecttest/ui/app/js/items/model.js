'use strict';

angular.module('sttApp')
    .factory('Item', ['$resource', function ($resource) {
        // Item is both Collection and Model. Manipulated in the node service.
        return $resource('/item/:id', {id: "@id"});
    }]);
