'use strict';

angular.module('novaballApp')
    .controller('CustomerCtrl', ['$scope', 'Customer', '$routeParams', function ($scope, Customer, $routeParams) {


        $scope.customers = [],
            $scope.customer = {};

        // Pagination settings
        // TODO Fix pagination
        $scope.totalItems = 64,
            $scope.maxSize = 5,
            $scope.bigTotalItems = 175,
            $scope.bigCurrentPage = 1;

        Customer.query(function (data) {
            $scope.customers = data;
            $scope.totalItems = $scope.customers.length;
        });

        if ($routeParams.id) {
            Customer.get({id: $routeParams.id}, function (data) {
                $scope.customer = data;
            });
        }
    }]);
