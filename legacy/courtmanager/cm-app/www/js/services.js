angular.module('starter.services', ['ngResource', 'cm.config'])
    .factory('Court', ['$resource', 'cmConfig', function ($resource, cmConfig) {
        return $resource(cmConfig.host + '/court/:id', {id: '@id'});
    }])
    .factory('Token', ['$resource', 'cmConfig', function ($resource, cmConfig) {
        return function (customHeaders) {
            return $resource(cmConfig.host + '/token', {}, {
                'retrieve': {
                    method: 'POST',
                    headers: customHeaders || {}
                }
            });
        }
    }]);

