'use strict';

angular.module('novaballApp')
    .controller('SubscriptionCtrl', ['$scope', 'Subscription', '$routeParams', 'User', '$modal', '$location',
        function ($scope, Subscription, $routeParams, User, $modal, $location) {


            // Set loader
            $scope.loading = true,
                $scope.user = {};

            User.get(function (data) {
                $scope.user = data;
            });

            $scope.subscription = new Subscription({});

            // TODO Definitely make this configurable
            $scope.totalDraws = [1, 2, 4, 8, 16];
            $scope.stake = {currency: "EUR", amt: 0.50};


            $scope.totalLines = !_.isUndefined($scope.subscription.lines) && !_.isUndefined($scope.subscription.lines.length) ? $scope.subscription.lines.length : 1;
            $scope.subscription.totalStake = $scope.subscription.numDraws * $scope.stake.amt * $scope.totalLines;


            $scope.$watch('subscription', function () {

                $scope.totalLines = !_.isUndefined($scope.subscription.lines) && !_.isUndefined($scope.subscription.lines.length) ? $scope.subscription.lines.length : 1;
                $scope.subscription.totalStake = $scope.subscription.numDraws * $scope.stake.amt * $scope.totalLines;

            }, true);
            //

            Subscription.get(function (data) {
                $scope.subscription = data;
                $scope.loading = false;
                // Clear some fields for the post
                _.each(['type', 'drawsRemaining', 'created'], function (key) {
                    delete $scope.subscription[key];
                });
            });


            // TODO This will probably be set on a per-lottery basis.
            $scope.numbers = function () {
                return new Array(6);
            };

            // TODO move this to a configuration file
            $scope.maxLines = 999;

            $scope.addLine = function () {
                // TODO ensure the same constraints are placed on the API
                if ($scope.subscription.lines.length < $scope.maxLines) {
                    var i = $scope.subscription.lines.length;
                    $scope.subscription.lines[i] = {};
                    $scope.subscription.lines[i].standard = new Array();
                }

            }

            $scope.lineOfRandomNumbers = function () {
                // First, clean up empty rows.
                _.each($scope.subscription.lines, function (i, k) {
                    if (i.standard.length == 0) {
                        $scope.subscription.lines.splice(k, 1);
                    }
                });
                // Add a line ..
                $scope.addLine();
                // .. access that line
                var i = $scope.subscription.lines.length - 1;
                // .. then populate it
                var t = array_rand(1, 46, 7);
                $scope.subscription.lines[i].bonus = t[t.length - 1];
                t.pop();
                t.sort(numeric_sort);
                $scope.subscription.lines[i].standard = t;
            }


            $scope.duplicatesFound = function (index) {
                var arr = $scope.subscription.lines[index].standard;
                // Check duplicates
                var i = arr.length, j, val;
                while (i--) {
                    val = arr[i];
                    j = i;
                    while (j--) {
                        if (arr[j] === val) {
                            return true;
                        }
                    }
                }
                // Check bonus is not in standard
                if (!_.isUndefined($scope.subscription.lines[index].bonus) && _.contains($scope.subscription.lines[index].standard, $scope.subscription.lines[index].bonus)) {
                    return true;
                }

                return false;
            }

            $scope.invalidNumberFound = function (index) {
                var arr = $scope.subscription.lines[index].standard;
                var i = arr.length;
                while (i--) {
                    if ($scope.assertInvalid(arr[i])) {
                        return true;
                    }
                }
                if (!_.isUndefined($scope.subscription.lines[index].bonus) && $scope.assertInvalid($scope.subscription.lines[index].bonus)) {
                    return true;
                }
                return false;
            }

            $scope.assertInvalid = function (input) {
                // TODO - min/max numbers might be different per draw, consider moving to the API
                return (input / input !== 1) && (input < 0 || input > 46);
            }

            $scope.deleteLine = function (line) {
                $scope.subscription.lines.splice(line, 1);
            }

            // Valid if at least 1 line is full.
            $scope.subscription.hasErrors = false;
            $scope.confirm_bet = false;

            $scope.betNow = function () {
                //$scope.confirm_bet = !$scope.confirm_bet;
                var _subscription = new Subscription($scope.subscription);
                _subscription.$save(function (u) {
                    if (u) {
                        // Resource saved
                        var ModalInstanceCtrl = function ($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.dismiss('cancel');
                                $location.path("/lines");
                            };
                        };
                        $modal.open({
                            templateUrl: 'betPlaced.html',
                            controller: ModalInstanceCtrl
                        });
                    }
                });
            };

        }]);
