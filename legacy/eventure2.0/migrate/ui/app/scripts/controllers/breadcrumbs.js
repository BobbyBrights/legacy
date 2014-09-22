'use strict';

angular.module('eventureApp')
    .controller('BreadcrumbsController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.bc = $rootScope.bc;
    }]);
