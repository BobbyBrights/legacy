angular.module('starter.resources', []).factory('Show', ['$resource', 'environments', function ($resource, env) {
    return $resource(env.test + '/show/:id', {id: "@id"});
}]);