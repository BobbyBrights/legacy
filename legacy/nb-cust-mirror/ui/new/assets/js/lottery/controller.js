'use strict';
angular.module('nb.controllers')
    .controller('LotteryController', ['$scope', '$rootScope', '$config', 'Functions', 'LocalStorage', '$state', 'Auth', 'Lottery', '$compile',
        function ($scope, $rootScope, $config, $functions, $localStorage, $state, Auth , Lottery, $compile) {

            // Some default values;
            $scope.lotteries    = [];

            // Check in localstorage if there is a
            /*if ($localStorage.get("nb:subscription")) {
                $localStorage.get("nb:subscription", true).then(function (data) {
                    $scope.subscription = data;
                });
                //$scope.subscription = JSON.parse($localStorage.get("nb:subscription"));
            }*/

                        

            // If the user is logged in
            if (Auth.isAuthenticated) {
                console.log("Authenticated");

                Lottery.getAllLotteryInfos().then(function(){

                },function(){

                });

            };

        }]);
