'use strict';

angular.module('novaballApp')
    .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.isHome = true;
    }]);
