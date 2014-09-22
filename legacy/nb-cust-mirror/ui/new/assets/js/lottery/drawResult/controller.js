'use strict';
angular.module('nb.controllers')
    .controller('LotteryDrawResultController', ['$scope', 'LotteryService', '$log',
        function ($scope, LotteryService, $log) {

            /****************
             * Initial part *
             ****************/
            $scope.lotteries                = [];
            $scope.finishLoadingLottery     = false;

            /*********************
             * Exposed Functions *
             *********************/


            /*******************
             * Main Logic Part *
             *******************/

            //call the lottery service to fetch the lottery result
            LotteryService.getIrishLotteryInfo()
                .then(function(_irishLottery){
                    //set the $scope.lotteries value here
                    //$scope.lotteries.push(_lotteryInfos[0].history.results[0]);
                    //$scope.lotteries = _lotteryInfos[0].history.results;
                    $scope.lotteries.push (_irishLottery);
                    $scope.finishLoadingLottery = true;
            });

        }]);
