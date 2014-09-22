'use strict';

angular.module('eventureApp')
    .controller('UIController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.productName = 'Eventure';
    }]);
