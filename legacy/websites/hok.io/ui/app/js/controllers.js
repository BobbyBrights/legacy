'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', 'Search', function ($scope, Search) {
        $scope.searchForm = {};

        $scope.search = function () {
            $scope.results = [];
            Search.query($scope.searchForm, function (data) {
                console.log(data);
                $scope.results = data;
            });
        }
    }]).controller('UserCtrl', ['$scope', function ($scope) {

    }]);
