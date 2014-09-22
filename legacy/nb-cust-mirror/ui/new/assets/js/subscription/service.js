'use strict';

angular.module('nb.services')
    .factory('SubscriptionService', ['UserSubscription', 'Lines', '$q', function(UserSubscription, Lines, $q){

        /*
         * lotteryId
         * numDraws
         * lines
         * type
         * 
         * active
         * created
         * profile_id
        */
        var createSubscriptions = function(subObj){

            console.log('The subscription object going to be created is: ');
            console.log(subObj);
            
            var deferred = $q.defer();

            var newSubs = new UserSubscription();
            if(subObj.lotteryId)    { newSubs.lotteryId     = subObj.lotteryId;}
            //if(subObj.numDraws)     { newSubs.numDraws      = subObj.numDraws;}
            if(subObj.cardId)       { newSubs.cardId       = subObj.cardId;}
            if(subObj.cvv)          { newSubs.cvv           = subObj.cvv;}

            //remove the unnessary property
            _.each(subObj.lines,function(lineObj){
                if(!_.isUndefined(lineObj.msgType)){
                    delete lineObj.msgType;
                }
            })

            if(subObj.lines)        { newSubs.lines         = _.clone(subObj.lines);}
            newSubs.type    = ( true == subObj.recurring) ? 'recurring' : '';

            //POST the saving request and return the promise object
            newSubs.$save().then(function(data){
                //success handler
                console.log('subscription has been created --> inside the subscription service:');
                console.log(data);
                deferred.resolve( {hasError:false, msg:'Subscriptions Created!', data:data} );
            },function(err){
                //error handler
                console.log('subscription has NOT been created --> inside the subscription service:');
                console.log(err);
                deferred.reject( {hasError:true, msg:err.data, errObj: err});
            });

            return deferred.promise;

        };

        var updateSubscriptions = function(subObj){

            var newSubs = new UserSubscription();
            if(subObj.lotteryId){ newSubs.lotteryId   = subObj.lotteryId;}
            if(subObj.numDraws){ newSubs.numDraws    = subObj.numDraws;}
            if(subObj.lines){ newSubs.lines       = _.clone(subObj.lines);}

            return newSubs.$update().then(function(data){
                //success handler
                return {hasError:false, msg:'Subscriptions Updated!'};
            },function(err){
                //error handler
                return {hasError:true, msg:err.data.message};
            });
        };

        //delete all subscription
        var deleteAllSubscriptions = function(){
            var newSubs = new UserSubscription();

            return newSubs.$delete().then(function(data){

                return data;

            },function(err){

                return err;
            });
        }


        var checkLines = function(_linesObj){
            var linesObj = new Lines();

            linesObj.lines = !_.isUndefined(_linesObj.lines) ? _linesObj.lines : [];

            return linesObj.$post({
                action:'check'
            },function(){

            },function(errObj){
                return errObj;
            });
        };

        return {
            createSubscriptions : createSubscriptions,
            updateSubscriptions : updateSubscriptions,
            deleteAllSubscriptions  : deleteAllSubscriptions,
            checkLines          : checkLines
        };
    }])
    .factory('subscriptionFuncs',[ '$compile', '_','$log', function($compile, _ ,$log){
    	return {

	    	matchLottery : function( _subArray, _targetLottery ){
	    		var resultArray	= [];

	    		//check passed value
	    		if( !_subArray || 
	    			!_targetLottery){
	    			//return error message or throw exception
	    		}

	    		//convert to array
	    		if( !_.isArray(_subArray))
	    		{
	    			_subArray	= [_subArray];
	    		}
	    		
	    		if( !_.isArray(_targetLottery))
	    		{
	    			_targetLottery	= [_targetLottery];
	    		}


	    		//get the intersection of the two arrays
    			var interArray	= _.intersection(_subArray, _targetLottery);
                var matchedNum  = (!_.isEmpty(interArray) && !_.isUndefined(interArray.length)) ? interArray.length : 0;

    			//use the cloned array as the base of unMatched lotteries array
    			var unMatchedArray	= _.clone(_subArray);

    			//remove the intersection part from the unMatchedArray
    			_.each(interArray, function(_matchedNum){
    				var _index = _.indexOf(unMatchedArray, _matchedNum);

    				if( -1 !== _index){
    					unMatchedArray.splice(_index,1);	
    				}
 	    		});

    			//wrap the integer inside the unMatchedArray and interArray to be an object
    			_.each(interArray, function(_el){
    				resultArray.push({number:_el, match:'matched'});
    			});

    			_.each(unMatchedArray, function(_el){
    				resultArray.push({number:_el, match:'unmatched'});
    			});

    			//sort the result array
    			resultArray = _.sortBy(resultArray, function(_el){
    				return _el.number;
    			});

	    		return {resultArray:resultArray, matchedNum:matchedNum};
	    	}
    	}
    }])
    .factory('subscriptionManager',['$compile', '_', "$log", 'Auth', '$q', 'UserSubscription', function($compile, _ , $log, Auth, $q, UserSubscription){
        //the initail value of the userSubscription is false which means unserialized
        var newUserSubscriptions= {};
        var userSubscriptions   = false;
        var invalidBallInfo     = {};
        var keepNewAddedSub     = false;

        return {
            getSubscriptions : function(){
                var deferred = $q.defer();
                
                if(false === userSubscriptions){
                    return this.updateSubscriptions();
                }
                else{
                    deferred.resolve(userSubscriptions);
                    return deferred.promise;
                }
            },

            updateSubscriptions : function(){
                var deferred = $q.defer();

                //TODO: check if the user has been authenticated
                //if yes then call the service
                if( true === Auth.isAuthenticated){
                    //call the service to get the subscriptions
                    UserSubscription.get({}, function (data) {

                    userSubscriptions = data;

                    //------------------
                    //TEST PART:
                    //TODO: remove the line before when in product mode;
                    //userSubscriptions = {};
                    //-----------------

                     //resolve
                    deferred.resolve(userSubscriptions);

                    }, function(errorMsg){
                        //error handler
                        if(404 === errorMsg.status){
                            userSubscriptions = (false !== userSubscriptions) ? userSubscriptions : {};
                            userSubscriptions.lines = [];
                        }

                        deferred.resolve(userSubscriptions);
                    });
                }
                else{
                    deferred.resolve(userSubscriptions);
                }

                return deferred.promise;
            },

            setNewSubscriptions: function(_sub){
                newUserSubscriptions = _sub;
            },

            getNewSubscriptions: function(){
                return newUserSubscriptions;
            },

            setInvalidBall: function(_ballInfo){
                invalidBallInfo = _ballInfo;
            },

            getInvalidBall: function(){
                return invalidBallInfo;
            },

            getKeepNewAddedSub: function(){
                return keepNewAddedSub;
            },

            setKeepNewAddedSub: function(_keepNewAddedSub){
                keepNewAddedSub = _keepNewAddedSub;
            },

            reset: function(){
                newUserSubscriptions= {};
                userSubscriptions   = false;
                invalidBallInfo     = {};
                keepNewAddedSub     = false;
            }
        };
    }]);
