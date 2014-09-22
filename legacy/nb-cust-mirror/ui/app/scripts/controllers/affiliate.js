'use strict';

angular.module('novaballApp')
    .controller('AffiliateCtrl', ['$scope', 'Affiliate', '$routeParams',
        function ($scope, Affiliate, $routeParams) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.affiliates = [];
            $scope.affiliate = {};
            $scope.support_tickets = [];

            Affiliate.query(function (data) {
                $scope.affiliates = data;

                _.each(data, function (affiliate) {
                    $scope.support_tickets = $scope.support_tickets.concat(affiliate.support_tickets);
                })
            });

            if ($routeParams.id) {
                Affiliate.get({id: $routeParams.id}, function (data) {
                    $scope.affiliate = data;
                    console.log(data);
                });
            }

        }]);
