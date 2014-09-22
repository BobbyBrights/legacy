'use strict';
angular.module('nb.controllers')
    .controller('SubscriptionResultController', ['$scope', '$rootScope', '$config', 'Functions', 'LocalStorage', 'subscriptionFuncs', '$state', 'Auth', 'UserSubscription', 'LotteryService', 'BetService','$compile', '$q', '$log', '_',
        function ($scope, $rootScope, $config, Functions, $localStorage, subscriptionFuncs, $state, Auth, UserSubscription, LotteryService, BetService, $compile, $q, $log, _) {

            /****************
             * Initial part *
             ****************/
            $log.log("begin subscriptiion result page");
            // Some default values;
            $scope.subscription = {};
            $scope.subscription.lines = [];
            $scope.subscription.recurring  = false;
            $scope.subscription.numDraws = 1;
            $scope.subscription.finishLoad = false;

            $scope.drawPeriods = [1, 2, 4, 8, 16];

            $scope.lotteries                = [];
            $scope.finishLoadingLottery     = false;
            $scope.betsResult               = {last: [], pre: [], all: [], finishLoad: false};
            $scope.betsCollection           = {all: []};

            
            /*******************************
             * Private function definition *
             *******************************/

            var getUserSubscription = function(){
                var deferred = $q.defer();

                UserSubscription.get({}, function (data) {
                    $scope.subscription = data;
                    //$log.log(data.lines);

                    //add additional parameter 'recurring'
                    $scope.subscription.recurring = 'recurring' == data.type ? true : false;

                    //resovle the promise object
                    deferred.resolve();
                });

                //return the promise object
                return deferred.promise;
            };

            /*********************
             * Exposed Functions *
             *********************/

            $scope.viewAllResult    = function(){
                //$state.go('root.subscription.result');
                $state.go('root.home.result');
            }

            $scope.editNum  = function(){
                $state.go('root.home');
            }


            /*******************
             * Main Logic Part *
             *******************/
            // Check in localstorage if there is a
            if ($localStorage.get("nb:subscription")) {
                $localStorage.get("nb:subscription", true).then(function (data) {
                    $scope.subscription = data;
                });
                //$scope.subscription = JSON.parse($localStorage.get("nb:subscription"));
            }

            // If the user is logged in
            if (Auth.isAuthenticated) {
                $log.log("Authenticated");

                /*
                 * Call the private function LotteryService.getIrishLotteryInfo() to get the IrishLottery info
                 * and initialize the $scope.lotteries variable with the returned result
                */
                //$q.all([getLotteryInfos(),
                //        getUserSubscription()])
                LotteryService.getIrishLotteryInfo()
                    .then(function(_irishLottery){
                            //success callback function

                            //set the $scope.lotteries value here
                            //$scope.lotteries.push(_lotteryInfos[0].history.results[0]);
                            //$scope.lotteries = _lotteryInfos[0].history.results;
                            $scope.lotteries.push(_irishLottery);
                            $scope.finishLoadingLottery = true;

                            $log.log("getting lottery info");
                            $log.log($scope.lotteries);

                            var _lotteryIds  = [];

                            //get the lottery's id from each lottery info
                            _.each($scope.lotteries, function( lotteryInfo){
                                //check the "id" value
                                _lotteryIds.push(lotteryInfo.id);
                            });

                            $log.log(_lotteryIds);
                            //get the _lotteryIds from the _lotteryInfos array
                            
                            return BetService.getAllBetsCollectionForOneLottery(_lotteryIds[0]);
                        },function(){

                    }).then(function(_betsCollections){
                        $log.log('final bets collection for one lottery');
                        $log.log(_betsCollections);

                        /*HACK PART------------------------------------------------*/
                        //Because the /bets is not working , the returned data is empty 
                        //use the current subscription to replace the bets collection for the prototype
                        //TODO: change this part after the backend fix the problem


                        /*_betsCollections = [];
                        _.each($scope.lotteries[0].history.results, function(oneDraw){

                            var bets       = [];
                            
                            for(var num=0;num<$scope.subscription.lines.length;num++){
                                var clonedLine = _.clone($scope.subscription.lines[num]);
                                clonedLine.id = num+1;
                                var bet = {};
                                bet.line = clonedLine;
                                bet.numbers_matched = 2;
                                bets.push(bet);
                            }
                            _betsCollections[oneDraw.drawId] = bets;
                        });*/


                        //---------------------------

                        $scope.betsCollection.all = _betsCollections;

                        //_.each($scope.lotteries[0].history.results, function(oneDraw){
                        for(var num=$scope.lotteries[0].history.results.length-1;num>=0;num--){
                            var oneDraw = $scope.lotteries[0].history.results[num];

                            $log.log("The draw object is:");
                            $log.log(oneDraw);

                            //get the corresponding betsCollections from the _betsCollections by the drawId
                            //the drawId in oneDraw is oneDraw.drawId
                            //the drawId in the betsCollections is the index
                            //check if the drawId exist in the _betsCollections as an index
                            if(_betsCollections[oneDraw.drawId])
                            {
                                var betsCollection = _betsCollections[oneDraw.drawId];
                                //get the lottery's draw date
                                var groupDrawResults    = [];

                                var lineIds             = [];

                                _.each(betsCollection, function(oneBet){

                                    if(-1 === _.indexOf(lineIds, oneBet.line.id)){
                                        lineIds.push(oneBet.line.id);
                                    }else{
                                        //return;
                                    }

                                    //compare the subscription's standard group with the lottery result's standard group
                                    //the result is an array of "numberObject"
                                    var stdMatchedResult = subscriptionFuncs.matchLottery(oneBet.line.standard, oneDraw.line.standard);
                                    var stdMatchedResultArray   = stdMatchedResult.resultArray;
                                    var stdMatchedNumber        = stdMatchedResult.matchedNum;

                                    //compare the subscription's bonus group with the lottery result's bonus group
                                    //the result is an array of "numberObject"
                                    var bonusMatchedResult = subscriptionFuncs.matchLottery(oneBet.line.bonus, oneDraw.line.bonus);
                                    var bonusMatchedResultArray     = bonusMatchedResult.resultArray;
                                    var bonusMatchedNumber          = bonusMatchedResult.matchedNum;

                                    //check the result array
                                    //the number of integers in the result array should match specified requirement:
                                    //the length must bigger than 0
                                    //the length might be equal to specified number
                                    if( 0 < stdMatchedResultArray.length &&
                                        0 < bonusMatchedResultArray.length){
                                        
                                        groupDrawResults.push({
                                            standard: stdMatchedResultArray,
                                            bonus: bonusMatchedResultArray,
                                            numersMatched: oneBet.numbers_matched,
                                            stdMatchedNumber: stdMatchedNumber,
                                            bonusMatchedNumber: bonusMatchedNumber,
                                            betEffDate: oneBet.bet_effective_date,
                                            betEffReadableDate: (oneBet.bet_effective_date) ? Functions.getReadableDateStr(oneBet.bet_effective_date) : ''
                                        });
                                    }
                                });

                                 //add the result as an object to the $scope variable
                                $scope.betsResult.all.push(groupDrawResults);
                            }
                        };
                        //});

                        $log.log("The newly generated lottery result groups is: ");
                        $log.log($scope.betsResult);

                        //fill the data set
                        $scope.betsResult.last = $scope.betsResult.all.slice(0,1);
                        $scope.betsResult.pre = $scope.betsResult.all.slice(1);
                        
                        $scope.betsResult.finishLoad = true;

                    }, function(_errorMsg){
                        $log.log("=ERROR= :"+ _errorMsg);
                });
                
                getUserSubscription()
                    .then(function(){
                        return;
                        //success handle function
                        //the next operation depends on both of the result above
                        
                        //iterate the lotteries array
                        //the lotteries array should be sorted by date DESC
                        /*_.each($scope.lotteries,function(lottery){

                            $log.log("Current Lottery is:");
                            $log.log(lottery);

                            _.each(lottery.history.results, function(oneLotteryNumberGroup){

                                //$log.log("Lottery group is:");
                                //$log.log(oneLotteryNumberGroup);

                                //get the lottery's draw date
                                var groupDrawResults    = [];

                                //iterate the user's subscriptions
                                _.each($scope.subscription.lines, function(oneSubscription){

                                    //compare the subscription's standard group with the lottery result's standard group
                                    //the result is an array of "numberObject"
                                    var stdMatchedResultArray = subscriptionFuncs.matchLottery(oneSubscription.standard, oneLotteryNumberGroup.line.standard);

                                    //compare the subscription's bonus group with the lottery result's bonus group
                                    //the result is an array of "numberObject"
                                    var bonusMatchedResultArray = subscriptionFuncs.matchLottery(oneSubscription.bonus, oneLotteryNumberGroup.line.bonus);

                                    //check the result array
                                    //the number of integers in the result array should match specified requirement:
                                    //the length must bigger than 0
                                    //the length might be equal to specified number
                                    if( 0 < stdMatchedResultArray.length &&
                                        0 < bonusMatchedResultArray.length){
                                        
                                        groupDrawResults.push({
                                            standard: stdMatchedResultArray,
                                            bonus: bonusMatchedResultArray
                                        });
                                    }
                                    
                                });
                                
                                //add the result as an object to the $scope variable
                                $scope.betsResult.all.push(groupDrawResults);
                            });
                        });*/

                    }, function(){
                        //error handle function
                    }
                //end of $q service
                );
            };
        }]);
