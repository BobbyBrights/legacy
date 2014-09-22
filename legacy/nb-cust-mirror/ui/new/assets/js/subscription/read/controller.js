'use strict';
/*
 * This controller is just to be used as a controller reading/fetching the user's subscription result from the server
 * It might just be a sub-set functionality of other controller but it could reduce redundent request or execution when only used on the sider bar to show the 
 * result without any available operations on it
*/
angular.module('nb.controllers')
	.controller('SubscriptionReadController',[ '$scope', '$rootScope', '$config', 'UserSubscription', '$q', 'userInfoManager', 'LocalStorage', 'Auth', '$log', 'Functions',
        function( $scope, $rootScope, $config, UserSubscription, $q, userInfoManager, $localStorage, Auth, $log, $functions ){

		/****************
         * Initial part *
         ****************/

        // Some default values;
        $scope.subscription             = {};
        //$scope.subscription.lines       = [];
        $scope.subscription.recurring   = false; //whether the use has selected the auto-renew. set default as false
        $scope.subsFinishLoad           = false;
        $scope.subscription.numDraws    = $config.subscription.default_num_draws;
        $scope.subscription.pricePerLine = $config.subscription.price_per_line;

        $scope.subscription.effectiveLineNum = 0;

        /*********************
         * Exposed Functions *
         *********************/ 

        $scope.numbers = function () {
            return new Array(6);
        };

        $scope.switchTimeFormat = function(originalDate){
            if(originalDate){
                return $functions.switchTimeFormat(originalDate);
            }
        };

        /*******************************
         * Private function definition *
         *******************************/

        var getUserSubscription = function(){

            var deferred = $q.defer();

            UserSubscription.get({}, function (data) {
	            
	            $log.log('fetched subscription data inside the subscription read controller:');
	            $log.log(data);

                $scope.subsFinishLoad = true;
                $log.log('update the subsFinishLoad value to: '+ $scope.subsFinishLoad);

                //combine the new retrived data with the pre-set one
                //combine the data with the existing one
                for(var prop in $scope.subscription){
                    if(!data.hasOwnProperty(prop)){
                        data[prop] = $scope.subscription[prop];
                    }
                }

                $scope.subscription = data;

	            //add additional parameter 'recurring'
	            $scope.subscription.recurring = 'recurring' == data.type ? true : false;

                $scope.subscription.effectiveLineNum = $scope.subscription.lines.length;

	            //resolve
	            deferred.resolve(data);

            }, function(errorMsg){
                //error handler
                console.log('The errorMsg is:');
                console.log(errorMsg);
                console.log('cant get subscription');

                //the use doesnt have any subscription if the response is 404
                if(404 == errorMsg.status){
                    deferred.resolve({});
                    $scope.subsFinishLoad = true;    
                }
                
            });

            return deferred.promise;
        };

        /*******************
         * Main Logic Part *
         *******************/

        console.log('SubscriptionReadController is fired');
        //get the user's info object
        userInfoManager.getUserInfo().then(function(data){
            var userInfo = data;

            console.log('The retrived userInfo:');
            console.log(userInfo);
        },function(){

        });
        

        // If the user is logged in
        if (Auth.isAuthenticated) {
            $log.info("Authenticated");

            getUserSubscription().then(function(){
                console.log('Finish loading the required two parts');
                //compare the subscription with the future bets
                //find out which are deleted ones and which are newly added ones

                console.log('The current subscription lines are:');
                console.log($scope.subscription);
                console.log($scope.subscription.lines);

              
            },function(error){
                //error handler
                console.log('cant get solved for both dependencies');
            });
            
        }
        else{
            //If the user is not logged in

        }

	}]);