'use strict';

angular.module('nb.services')
	.factory('BetService',['$q', 'Bet', '$log', 'LotteryService', '_', 'Functions',
		function ($q, Bet, $log, LotteryService, _, Functions){

		/*
		 * This function get the information for a single bet object
		 * according to the _betId which is the unique identity for this bet
		*/
		var getSingleBet = function(_betId){

			$log.log("==> Calling the getSingleBet() with the _betId "+_betId+"...");
			var deferred = $q.defer();


			//*************************************
			//Hack part:
			//Because the apiary will not return the information for the specified _betId
			//So the test api '/bet/all' is in used to return all bets result with different _betId
			//Generate a faked result array only contian the bet result with the same id value as passed in _betId
			/*Bet.query({id: 'all'},
					function(_allBetsResult){

						$log.log('All of the bets info');
						$log.log(_allBetsResult);

						var hackedSingleBetsResult;
						_.each(_allBetsResult, function(betResult){
							if(_betId == betResult.id)
								hackedSingleBetsResult 	= betResult;
						});

						$log.log('The hacked bets result is:');
						$log.log(hackedSingleBetsResult);

						deferred.resolve(hackedSingleBetsResult);
			});*/

			//*************************************

			//uncomment this part in production model
			Bet.get(
				{id: _betId},
				function(_bet){
					//success handling function
					$log.log("Successfully getting the single bet object: ");
					$log.log(_bet);

					//resolve the promise object
					deferred.resolve(_bet);
				},function(_errorMsg){
					//error handling function
					$log.log("=ERROR= happened when calling Bet.get("+_betId+"):"+ _errorMsg);

					//return empty array
					deferred.resolve({});
			});

			return deferred.promise;
		};

		/*
		 * This function is used to fetch all bets collection by the dates: start_date and [end_date]
		 * if only start_date is specified then the results will include all the collection start from that date 
		*/
		var getBetsCollctionByDate = function (param_date){
			end_date = arguments[0] || '';

			var deferred = $q.defer();

			//TODO: fill with real logic to this function after the /bets?datefrom=<date> is available
			//for the test purpose use the hacked result
			Bet.query(
				{dateRange: param_date},
				function(_bets){
					//success handling function
					$log.log("Successfully getting the bets collection: ");
					$log.log(_bets);

					//resolve the promise object
					deferred.resolve(_bets);
				},function(_errorMsg){
					//error handling function
					$log.log("=ERROR= happened when calling Bet.get("+param_date+"):");
					$log.log(_errorMsg);

					//resolve the empty array to the 404 or 403 status
					if( 404 == _errorMsg.status || 
						403 == _errorMsg.status){
						//return empty array
						deferred.resolve([]);
					}
			});


			//*************************************
			//Hack part:
			//Generate a faked result array contains all result from /user/bets/all
			/*Bet.query({id: 'all'},
					function(_allBetsResult){

						$log.log('All of the bets info in the function getBetsCollctionByDate()');
						$log.log(_allBetsResult);

						deferred.resolve(_allBetsResult);
			});*/

			//*************************************

			//return deferred.promise;

			return deferred.promise.then(function(_bets){
				//success handler
				console.log('inside the promise then function:');
				console.log(_bets);

				//return the raw bets result
				//the higher layer may know how to deal with this collection
				//the future bets doesn't have the drawId, which will be generated after the draw result come out
				return _bets;
			},function(){
				//error handler
				//TODO: finish handler functions
				console.log('Cant get bets collection');
				return [];
			},function(){
				//notify handler
			});
		};

		/*
		 * This function will fetch the user's bets collection info for one specified drawId,
		 * The _drawId is the value of a specified lottery draw
		 * Return value: an array of bet info object
		 * In order to satifisy the change of the business logic, each bet info object
		 * doesn't include the betLine
		 * The betLine object (include the bonuse and standard info) need to retrived from another API with the bet_id contained in the bet info object
		*/
		var getBetsInfo = function (_drawId){

			var deferred = $q.defer();
			$log.log("==> Calling the getBetsInfo() with _drawId "+_drawId+"...");
			Bet.query(
				{drawId: _drawId},
				function(_betsInfo){
					//success handling function

					$log.log("The retrived betsInfo is:");
					$log.log(_betsInfo);

					//*************************************
					//Hack part:
					//Because the apiary can't return information according to different drawId,
					//the call to '/bet?draw_id=draw_id_value' will return all of the bets info for all different draw_id_value
					//so manully break the retured array and find the information that
					//contains the target _drawId
					/*var hackedBetsInfo	= [];
					_.each(_betsInfo, function(_betInfo){
						if(_drawId == _betInfo.draw_id)	
							hackedBetsInfo.push(_betInfo);
					});

					$log.log('The hacked _betsInfo is:');
					$log.log(hackedBetsInfo);

					deferred.resolve(hackedBetsInfo);*/
					//*************************************

					//uncomment when in production 
					deferred.resolve(_betsInfo);

				},function(){
					//error handling function
					deferred.resolve([]);

			});

			return deferred.promise;
		};

		/*
		 * This function will fetch the bets collection for one specified drawId
		 * The result is an array of bet-line object
		 * Each bet-line object contains the "bonus" and "standard" balls info
		*/
		var getBetsCollectionForOneDraw = function (_drawId){

			var deferred = $q.defer();
			//var promiseGroup	= [];

			$log.log("==> Calling the getBetsCollectionForOneDraw() with _drawId "+_drawId+"...");

			//first to get the betsInfo
			//the function getBetsInfo returns a promise object


			getBetsInfo(_drawId)
				.then(function(_betsInfo){
					//success handling function
					//_betsInfo is an array which contains multiple bet
					//iterate this _betsInfo array

					//the returned is an array and only contain one object
					if( !_betsInfo || 
						0 == _betsInfo.length ){
						deferred.resolve([]);
					}
					else if( _betsInfo[0].bets ){
						deferred.resolve(_betsInfo[0].bets);
					}
					else{
						deferred.resolve([]);	
					}

					//===================Deprecated==================
					/*_.each(_betsInfo, function(_betInfo){
						//getSingleBet() function returns a promise object
						//call getSingleBet function and add the returned
						//promise object to the promise group
						//$log.log("The single betInfo is:");
						//$log.log(_betInfo);
						//promiseGroup.push(getSingleBet(_betInfo.id));

						promiseGroup.push(getSingleBet(_betInfo.id)
							.then(function(_bet){
								return _bet;
						}));

						//get the single bet infomation
						//function getSingleBet returns a promise object
						//getSingleBet(_betInfo.id).then(function(_betObj){
							//success handling function	
						//},function(){
							//error handling function
						//});
					});

					return $q.all(promiseGroup)
					.then(function(resultGroup){
						//success callback function
						//$log.log("The BetsCollection object passed in success callback function");
						//$log.log(resultGroup);
						return resultGroup;
					},function(){
						//error callback function
					});*/

					//======================================================

			},function(){
				//error handling function
				deferred.resolve([]);
			});

			return deferred.promise;
		};

		var getAllBetsCollectionForOneLottery = function(_lotteryId){

			var promiseGroup = [];
			var allBetsCollection 	= [];

			$log.log("==> Calling the getAllBetsCollectionForOneLottery() with _lotteryId "+_lotteryId+"...");

			//get the information for single lottery by the _lotteryId
			return LotteryService.getSingleLottery(_lotteryId)
				.then(function(_lottery){
					//success callback function
					//get the "results" array from the _lottery
					//the "results" array contains all of the draw objects which come out
					//during the period from "dateFrom" to "dateTo"

					$log.log("inside the function getAllBetsCollectionForOneLottery and the lottery info is:");
					$log.log(_lottery);

					//iterate the _lottery.history.results first
					//add the sub-promise object to the promise group in each loop step
					//then return the single promise object based on the group of the promise objects
					_.each(_lottery.history.results,function(_drawInfo){
						promiseGroup.push(getBetsCollectionForOneDraw(_drawInfo.drawId)
							.then(function(_betsCollection){
								//success callback function
								allBetsCollection[_drawInfo.drawId]	= _betsCollection;

								return _betsCollection;

							},function(){
								//error callback function
							})
						);
					});

					return $q.all(promiseGroup)
						.then(function(_betsCollection){
							//success callback function
							$log.log('before sort:');
							$log.log(allBetsCollection);
							$log.log("Ready to return the indexed allBetsCollection");

							//sort the array according to the draw_id which is the index of this array
							var tempArr = Functions.deepCloneArray(allBetsCollection);
							var sortedArr = [];

							tempArr.sort(function(a, b){
								var aIndex = _.indexOf(tempArr, a);
								var bIndex = _.indexOf(tempArr, b);

								if(aIndex > bIndex) return 1;
								if(aIndex < bIndex) return -1;
								return 0;
							});

							$log.log('sorted arr:');
							$log.log(tempArr);

							/*for(var key in tempArr){
								$log.log('key is: '+key);
								$log.log('value is: ');
								$log.log(tempArr[key]);
								$log.log('index is:');
								$log.log(_.indexOf(allBetsCollection, tempArr[key]));
								sortedArr[_.indexOf(allBetsCollection, tempArr.hasOwnProperty(key))] = tempArr.hasOwnProperty(key);
							}*/

							var keys = [];
							for(var key in allBetsCollection){
								if(allBetsCollection.hasOwnProperty(key)){
									keys.push(key);
								}
							}

							keys.sort(function(a, b){
								return b-a;
							});

							$log.log('sorted keys');
							$log.log(keys);

							for(var i=0;i<keys.length;i++){
								sortedArr[keys[i]] = allBetsCollection[keys[i]];
							}

							$log.log('reassociated array is:');
							$log.log(sortedArr);

							allBetsCollection = sortedArr;
							$log.log(allBetsCollection);
							return allBetsCollection;
						},function(_errorMsg){
							//error callback function
							$log.log("=ERROR= :"+ _errorMsg);
					});

				},function(_errorMsg){
					//error callback function
					$log.log("=ERROR= :"+ _errorMsg);
			});
		};

		/*
		 * The result of this function is as the following format:
		 * [draw_id:[line_id:[bet_object,..,bet_object],..,line_id:[bet_object,..,bet_object]],
		 *	...,
		 *	draw_id:[line_id:[bet_object,..,bet_object],..,line_id:[bet_object,..,bet_object]]]
		*/
		var groupBets	= function (_originBets){
			//first group the bet collection by 'draw_id' if it exists
			//or group it by 'bet_effective_date'

			/*
			 * Error Handling Guide:
			 * check 'drawId' property of each draw object
			*/

			var groups = [];

			_.each(_originBets, function(drawObj){
				//groups[drawObj.]

				var draw_id = drawObj.drawId;

				//resolve the drawId if it is the future draw
				if( !_.isNumber(drawObj.drawId) && 
					!drawObj){
					//if the drawId is not set then this is the future draw
					draw_id = 'fd';
				}

				_.each(drawObj.bets, function(bet){
					//first check the first level array index value 'draw_id'
					groups[draw_id] = groups[draw_id] || [];
					//second check the second level array index value 'line.id'

					//if the draw has multiple bets for the same bet.id but has different bet_type:numbers of matched balls
					//do the following steps
					//groups[draw_id][bet.id] = groups[draw_id][bet.id] || [];
					//groups[draw_id][bet.id].push(bet);

					//if each bet_id has only one corresponding bet then do the following step
					groups[draw_id].push(bet);
				});

				//sort each groups[draw_id]	by bet.id
				_.sortBy(groups[draw_id], function(bet){
					return bet.id;
				});

				//TODO: sort the group by the draw_id


			});

			return groups;
		};

		return {
			getSingleBet	: 	getSingleBet,
			getBetsInfo 	: 	getBetsInfo,
			getBetsCollectionForOneDraw			: getBetsCollectionForOneDraw,
			getAllBetsCollectionForOneLottery	: getAllBetsCollectionForOneLottery,
			getBetsCollctionByDate				: getBetsCollctionByDate,
			groupBets							: groupBets
		};

	}]);