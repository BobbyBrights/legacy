'use strict';
angular.module('nb.services')
	.factory('LotteryService', ['$http', '$rootScope', '$q', 'Lottery', 'Functions','$log',
		function($http, $rootScope, $q, Lottery, Functions,$log){
		/*
		 * This function is used to fetch information about
		 * single lottery
		 * Return value: promise object
		*/
		var getSingleLottery = function(_lotteryId){

			var deferred = $q.defer();

            Lottery.get(
            	{lotteryId: _lotteryId }, 
            	function (_lottery){
            		//success handling function
                	//$log.log('getting the single lottery with id '+_lotteryId);
                	//$log.log(_lottery);

                	deferred.resolve(_lottery);
            	},
            	function(){
            		//error handling function
            	}
            ); 
                   
            return deferred.promise;
		};

		/*
		 * This function is used to fetch information about multiple lotteries 
		 * according to the passed lotteryIds array
		 * In order to satisfy the request of dependency on the result of this function,
		 * the return object is a promise object on a set of promise objects which is compsed by
		 * each result of fetching single lottery information
		 *
		 * parameters:
		 * _lotteryIds : an array contains only lotteryId => [lotteryId_1,lotteryId_2,...]
		 * Return value: a promise object
		*/
		var getMultiLotteries = function(_lotteryIds){

			var promiseGroup	= [];
			var lotteries 		= [];

			_.each(_lotteryIds, function(_lotteryId){
				var midPromise = getSingleLottery(_lotteryId);

				midPromise.then(function(_data){
					lotteries.push(_data);
				});

				promiseGroup.push(midPromise);
			});

			//the function "then" returns a new promise object
			return $q.all(promiseGroup)
					.then(function(middata){
						//success handle function
						//$log.log("returned data after all promise finished");
						//$log.log(middata);

						return middata;
					},function(){
						//error handle function
			});
		};

		/*
		 * This function is used to fetch the summary or general information of lottery
		*/
		var getLotteryInfo = function(){

			var deferred	= $q.defer();

			//query the lotteries info
            Lottery.query(
            	{}, 
            	function (data){
            		//success handling function
            		//console.log('lottery info');
            		//console.log(data);
                	/*$log.log(data);

	                var lotteryIds  = [];

	                //get the lottery's id from each lottery info
	                _.each(data, function(lotteryInfo){
	                    //check the "id" value
	                    lotteryIds.push(lotteryInfo.id);
	                });*/

	                deferred.resolve(data);
            	},
            	function (){
            		//error handling function
            	}
            ); 

			return deferred.promise;
		}

		/*
		 * This function is used to fetch all of the detail information of lotteries
		 * It combine these steps: 
		 * 1. fetch the summary lottery info
		 * 2. fetch information of each lottery base on the result from the first step
		 * 3. return promise object
		*/
		var getAllLotteryInfos = function(){

            return getLotteryInfo().then(function(_data){
	            		//success call back func

	            		var _lotteryIds  = [];

		                //get the lottery's id from each lottery info
		                _.each(_data, function(lotteryInfo){
		                    //check the "id" value
		                    _lotteryIds.push(lotteryInfo.id);
		                });
						return _lotteryIds;
		            },function(errorReason){
		            	//error call back func
		            },function(value){
		            	//notify call back func
		            }).then(function(_lotteryIds){
		            	//success call back func
		            	//$log.log("Multiple lottories are fetched");
		            	//$log.log(_lotteryIds);

		              	return getMultiLotteries(_lotteryIds);
		            },function(){
		            	//error call back func

		            },function(){
		            	//notify call back func

		            });
        };

        var getIrishLotteryInfo = function(){
            var deferred = $q.defer();

            getAllLotteryInfos()
            	.then(function(_lotteryInfos){
                    //success handle function
                    $log.log("get final lottery array info");
                    $log.log(_lotteryInfos);

                    //TODO: sort the lotteries by date DESC

                    $log.log('lotteries[0].history.results is:');
                    $log.log(_lotteryInfos[0].history.results);

                    //initialize the drawDate in readable format
                    _.each(_lotteryInfos[0].history.results, function(drawResult){
                        //console.log("DrawResult drawDate"+drawResult.drawDate);
                        var _tmpResult = Functions.getReadableDateStr(drawResult.drawDate);
                        //console.log(_tmpResult);
                        drawResult.betEffReadableDate = (drawResult.drawDate) ? Functions.getReadableDateStr(drawResult.drawDate) : '';
                    });

                    deferred.resolve(_lotteryInfos[0]);
                   	
                },function(){
                //error handle function
            });

            return deferred.promise;
        };


       	var getLotteryResultByDate = function(_lotteryId, dateFrom, dateTo){
       		var deferred = $q.defer();

       		Lottery.get({lotteryId: _lotteryId,dateFrom: dateFrom, dateTo:dateTo},
       			function(data){
       				//success handler
       				deferred.resolve(data);

       			},function(err){
       				deferred.reject(err);
       		});

       		return deferred.promise;

       	};

        //expose the function as API
        return {
        	getLotteryInfo: 	getLotteryInfo,
        	getSingleLottery: 	getSingleLottery,
        	getAllLotteryInfos: getAllLotteryInfos,
        	getMultiLotteries: 	getMultiLotteries,
        	getIrishLotteryInfo:getIrishLotteryInfo,
        	getLotteryResultByDate: getLotteryResultByDate
        };
	}])
	.factory('LotteryInfoManager',['$q', '$config','LotteryService', 'Functions', function($q, $config, LotteryService, Functions){
		var lotteryInfoManager = {
			_nextDrawInfo : {},

			getNextDrawInfo :function(){
				return this._nextDrawInfo;
			},

			setNextDrawInfo : function(nextDrawInfo){
				this._nextDrawInfo = nextDrawInfo;
			},

			updateNextDrawInfo : function(){
				var deferred = $q.defer();

				//get the utc time
				var currentDateObj = new Date();
				var year 	= currentDateObj.getFullYear();
				var month 	= currentDateObj.getMonth();
				var date 	= currentDateObj.getDate();
				var hour 	= currentDateObj.getHours();
				var minute	= currentDateObj.getMinutes();
				var second 	= currentDateObj.getSeconds();

				var futureDate  = new Date(year , month, date+7, hour, minute, second);

				var fromDateStr = Functions.getServerStdUTCTimeStr(currentDateObj);
				var toDateStr 	= Functions.getServerStdUTCTimeStr(futureDate);

				var that = this;
				LotteryService.getLotteryResultByDate($config.affiliate.affiliate_id, fromDateStr, toDateStr).then(function(data){

					that.setNextDrawInfo(data);

					deferred.resolve();
				},function(err){
					deferred.reject();
				});

				return deferred.promise;
			}
		};

		return lotteryInfoManager;
	}]);