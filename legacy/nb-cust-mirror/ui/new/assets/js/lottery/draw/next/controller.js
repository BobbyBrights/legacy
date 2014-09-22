'use strict';
angular.module('nb.controllers')
	.controller('LotteryNextDrawController',['$scope', 'LotteryInfoManager', 'Functions',
		function($scope, LotteryInfoManager, Functions){
		$scope.finishLoadingNextDraw = false;
		$scope.nextDrawDate 	= '';

		//get the time of the next draw
		LotteryInfoManager.updateNextDrawInfo().then(function(){
			
			var nextDrawInfo = LotteryInfoManager.getNextDrawInfo();
			console.log('the fetched draw info is:');
			console.log(nextDrawInfo);

			$scope.finishLoadingNextDraw = true;


			//------------------------
            //HACK PART
            // Set some date in the future. In this case, it's always Jan 1
            var currentDate = new Date();

            //current day in the week
            var currentWeekDay = currentDate.getDay();
            var weekDayDiff = 4 - currentWeekDay;

            if(0 > weekDayDiff){
                weekDayDiff = 5 - weekDayDiff;
            }
            else if(0 == weekDayDiff){
                weekDayDiff = weekDayDiff + 7;
            }

            var futureDate      = ( !_.isUndefined(nextDrawInfo.history.results) && 0<nextDrawInfo.history.results.length ) ? nextDrawInfo.history.results[0] : {};


            futureDate  = ( !_.isEmpty(futureDate) ) ? futureDate : new Date(currentDate.getFullYear() , currentDate.getMonth(), currentDate.getDate()+weekDayDiff, 20, 10, 0);
            console.log('the future date temp is :');
            console.log(futureDate);
            
			//var futureDateStr  = "2014-08-22T19:20:00";
            //-------------------------
            
            //var futureDateStr  = nextDrawInfo.history.results[0].drawDate;

            //var dateParts    = (futureDateStr.split('T'))[0].split('-');
            //var timeParts    = (futureDateStr.split('T'))[1].split(':');

            //futureDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1])-1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]) );

            $scope.nextDrawDate = (Functions.getNextDrawDate(futureDate)).shortStr;



		},function(){

		});
		
	}]);