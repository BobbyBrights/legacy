'use strict';

angular.module('novaballApp')
    .controller('LotteryCtrl', ['$scope', 'Lottery', '$routeParams', 'History', function ($scope, Lottery, $routeParams, History) {
        $scope.lotteries = [],
            $scope.history = [],
            $scope.lottery = {};

        Lottery.query(function (data) {
            $scope.lotteries = data;

            // We'll just use the first lottery in the list for now, but this should be determined
            // programmatically, ie. we should find the lottery associated with this affiliate

            History.query({lotteryId: data[0].id}, function (history) {
                $scope.history = history;
            });

        });

        if ($routeParams.lotteryId) {
            Lottery.get({id: $routeParams.lotteryId}, function (data) {
                $scope.lottery = data;
            });
        }

    }]);
