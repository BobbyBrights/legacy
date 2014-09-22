'use strict';
angular.module('nb.controllers')
    .controller('LotteryDrawResultController', ['$scope', 'LotteryService', '$log', 'Functions',
        function ($scope, LotteryService, $log, Functions) {

            //Private Part
            var currentDate     = new Date();
            var numOfYearsListed = 5;

            /****************
             * Initial part *
             ****************/
            $scope.lotteries                = [];
            $scope.finishLoadingLottery     = false;

            $scope.drawResult   = {};
            $scope.history      = [];
            $scope.drawResult.amount    = 5;
            $scope.resultAmountList     = [
                {   id:5,
                    value:'Last 5 Draws'
                },
                {
                    id:10,
                    value:'Last 10 Draws' 
                }, 
                {   id:20,
                    value:'Last 20 Draws'
                }/*, 
                {
                    id:3,
                    value:'all'
                }*/
            ];

            $scope.initDate     = '';
            $scope.formats      = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format       = $scope.formats[0];

            
            $scope.viewDate     = currentDate;

            $scope.daysArray    = [];

            $scope.monthArray   = [ {id:0, value:'January'},{id:1, value:'February'},{id:2, value:'March'},{id:3, value:'April'},{id:4, value:'May'},{id:5, value:'June'},
                                    {id:6, value:'July'},{id:7, value:'August'},{id:8, value:'September'},{id:9, value:'October'},{id:10, value:'November'},{id:11, value:'December'}];
            $scope.yearArray    = [];                                

            $scope.viewDay      = false;
            $scope.viewMonth    = false;
            $scope.viewYear     = false;                            

            //test dummy data
            /*$scope.history = {
                                "dateTo":"2014-06-20T18:22:33",
                                "dateFrom":"2014-03-30T00:22:33",
                                "results":[
                                {
                                "created":"2014-04-24T15:04:49",
                                "drawId":1,
                                "numbersMatched":0,
                                "drawDate":"2014-04-23T00:00:00",
                                "line":{
                                "bonus":32,
                                "standard":[
                                5,
                                6,
                                12,
                                13,
                                25,
                                30
                                ]
                                }
                                },
                                {
                                "created":"2014-05-01T11:05:29",
                                "drawId":2,
                                "numbersMatched":0,
                                "drawDate":"2014-04-30T00:00:00",
                                "line":{
                                "bonus":24,
                                "standard":[
                                4,
                                5,
                                23,
                                26,
                                27,
                                41
                                ]
                                }
                                },
                                {
                                "created":"2014-05-08T07:25:19",
                                "drawId":3,
                                "numbersMatched":0,
                                "drawDate":"2014-05-07T00:00:00",
                                "line":{
                                "bonus":42,
                                "standard":[
                                9,
                                13,
                                20,
                                35,
                                38,
                                39
                                ]
                                }
                                },
                                {
                                "created":"2014-05-14T20:10:00",
                                "drawId":4,
                                "numbersMatched":0,
                                "drawDate":"2014-05-14T00:00:00",
                                "line":{
                                "bonus":38,
                                "standard":[
                                3,
                                5,
                                18,
                                22,
                                31,
                                37
                                ]
                                }
                                },
                                {
                                "created":"2014-05-21T11:50:20",
                                "drawId":5,
                                "numbersMatched":0,
                                "drawDate":"2014-05-17T00:00:00",
                                "line":{
                                "bonus":18,
                                "standard":[
                                5,
                                7,
                                14,
                                30,
                                36,
                                44
                                ]
                                }
                                },
                                {
                                "created":"2014-05-21T20:10:00",
                                "drawId":6,
                                "numbersMatched":0,
                                "drawDate":"2014-05-21T00:00:00",
                                "line":{
                                "bonus":16,
                                "standard":[
                                5,
                                9,
                                24,
                                29,
                                31,
                                42
                                ]
                                }
                                },
                                {
                                "created":"2014-05-27T14:45:52",
                                "drawId":7,
                                "numbersMatched":0,
                                "drawDate":"2014-05-24T00:00:00",
                                "line":{
                                "bonus":4,
                                "standard":[
                                2,
                                11,
                                21,
                                27,
                                30,
                                41
                                ]
                                }
                                },
                                {
                                "created":"2014-05-28T20:10:00",
                                "drawId":8,
                                "numbersMatched":0,
                                "drawDate":"2014-05-28T00:00:00",
                                "line":{
                                "bonus":44,
                                "standard":[
                                3,
                                14,
                                17,
                                19,
                                36,
                                38
                                ]
                                }
                                },
                                {
                                "created":"2014-06-03T14:30:00",
                                "drawId":9,
                                "numbersMatched":0,
                                "drawDate":"2014-05-31T00:00:00",
                                "line":{
                                "bonus":33,
                                "standard":[
                                2,
                                3,
                                6,
                                20,
                                27,
                                32
                                ]
                                }
                                },
                                {
                                "created":"2014-06-04T20:10:01",
                                "drawId":10,
                                "numbersMatched":0,
                                "drawDate":"2014-06-04T00:00:00",
                                "line":{
                                "bonus":21,
                                "standard":[
                                13,
                                14,
                                24,
                                31,
                                35,
                                43
                                ]
                                }
                                },
                                {
                                "created":"2014-06-11T20:10:00",
                                "drawId":11,
                                "numbersMatched":0,
                                "drawDate":"2014-06-11T00:00:00",
                                "line":{
                                "bonus":16,
                                "standard":[
                                9,
                                19,
                                22,
                                27,
                                30,
                                38
                                ]
                                }
                                },
                                {
                                "created":"2014-06-18T20:10:00",
                                "drawId":12,
                                "numbersMatched":0,
                                "drawDate":"2014-06-18T00:00:00",
                                "line":{
                                "bonus":18,
                                "standard":[
                                21,
                                22,
                                24,
                                29,
                                38,
                                45
                                ]
                                }
                                }
                                ]
                                };*/


            /*********************
             * Exposed Functions *
             *********************/

            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                datepickerAppendToBody: true
            };


            $scope.getReadableDateStr = function(dateObjStr){

                var readableStr = Functions.getReadableDateStr(dateObjStr);

                return readableStr ? readableStr : '';
            }
            
            $scope.genDaysArray = function(maxNumberDays){

                //clear the array
                $scope.daysArray     = [];

                for(var num=0;num<maxNumberDays;num++){
                    if(num<9){
                        var dayStrVal = '0'+ (num+1);
                    }else{
                        var dayStrVal = ''+(num+1);
                    }

                    //$scope.daysArray.push({id:num,value:dayStrVal});
                    //$scope.daysArray.push(dayStrVal);
                    $scope.daysArray.push(num+1);
                }
            }

            $scope.genYearArray = function(maxNumberYears){
                if(!maxNumberYears){
                    maxNumberYears = 5;
                }

                var currentYear = (new Date()).getFullYear();
                console.log('currentYear is:'+currentYear);

                for(var num=0;num<maxNumberYears;num++){
                    //$scope.yearArray.push({id:num, value: '' + (currentYear-num)});
                    $scope.yearArray.push((currentYear-num));
                }
            }

            $scope.getResultByAmount = function(numOfDraws){
                //get the last 7*10 days result
                numOfDraws = !numOfDraws ? 20 : numOfDraws;

                var daysDiff = 7 * numOfDraws / 2;
                var currentDate = new Date();

                var pastDate = (new Date()).setDate(currentDate.getDate() - daysDiff);

                console.log('The past date is :');
                console.log(Functions.getDateTimeStdStr((new Date(pastDate))));

                console.log('The lottery id is :');
                console.log($scope.lotteries[0]);

                getResultByDateToFrom($scope.lotteries[0].id, Functions.getDateTimeStdStr((new Date(pastDate))), Functions.getDateTimeStdStr(currentDate));
            };

            $scope.getResultByDate = function(){
                //split the viewDateStr
                var dateArray = $scope.viewDateStr.split('-');
                if(3 !== dateArray.length){
                    return;
                }

                var fromDateObj = new Date(dateArray[0], dateArray[1]-1, dateArray[2], 0, 0, 0, 0);
                var toDateObj   = new Date(dateArray[0], dateArray[1]-1, parseInt(dateArray[2])+1, 0, 0, 0, 0);

                getResultByDateToFrom($scope.lotteries[0].id, Functions.getDateTimeStdStr(fromDateObj), Functions.getDateTimeStdStr(toDateObj));
            };

            $scope.updateViewDateStr = function(){
                $scope.viewDateStr = ''+$scope.viewYear + '-' + (parseInt($scope.viewMonth)+1 ) + '-' + $scope.viewDay;
            };

            var getResultByDateToFrom = function(lotteryId,fromDate, toDate){

                LotteryService.getLotteryResultByDate(lotteryId,fromDate, toDate).then(function(data){
                    console.log('The retrived draw result by dates is:');
                    console.log(data);

                    $scope.history  = data.history;
                });
            }


            /***************
             * Watch Event *
             ***************/

            $scope.$watch('viewDateStr', function(newValue, oldValue){
                if(newValue !== oldValue){
                    //console.log('The viewDateStr has been changed to :'+newValue);
                    //update the day/month/year drop down list
                    //split the date string
                    var dateArray = newValue.split('-');
                    //console.log('The new dateArray is :');
                    //console.log(dateArray);
                    if(3 !== dateArray.length){
                        return;
                    }
                    $scope.viewYear = parseInt(dateArray[0]);
                    $scope.viewMonth = parseInt(dateArray[1])-1;
                    $scope.viewDay  = parseInt(dateArray[2]);

                    $scope.updateViewDateStr();
                }
            });

            $scope.$watch('viewMonth', function(newValue, oldValue){
                if(newValue !== oldValue){
                    //update the days dropdow array according to the new selected month
                    //check if the new selected month is in a leap year
                    $scope.genDaysArray(Functions.getNumOfDays($scope.viewYear, $scope.viewMonth));
                    $scope.updateViewDateStr();
                }
            });

            $scope.$watch('viewYear', function(newValue, oldValue){
                if(newValue !== oldValue){
                    //update the days dropdow array according to the new selected month
                    //check if the new selected month is in a leap year
                    $scope.genDaysArray(Functions.getNumOfDays($scope.viewYear, $scope.viewMonth));
                    $scope.updateViewDateStr();
                }
            });

            $scope.$watch('viewDay', function(newValue, oldValue){
                if(newValue !== oldValue){
                    //update the viewDateStr
                    $scope.updateViewDateStr();
                }
            });


            /*******************
             * Main Logic Part *
             *******************/
            //initial the daysArray
            $scope.genDaysArray(Functions.getNumOfDays(currentDate.getFullYear(), currentDate.getMonth()));
            $scope.genYearArray(numOfYearsListed);

            
            $scope.iniDateStr   = '' + currentDate.getFullYear() +'-'+ (currentDate.getMonth()+1) +'-'+currentDate.getDate();
            $scope.initDate     = new Date($scope.iniDateStr);

            //initialize the value of the date dropdown list
            $scope.viewDateStr  = $scope.iniDateStr;

            //initialize the value of the year/month/date drop down list
            console.log('the year array is :');
            console.log($scope.yearArray);
            console.log(currentDate.getFullYear());
            $scope.viewYear     = currentDate.getFullYear();
            $scope.viewMonth    = currentDate.getMonth();
            $scope.viewDay      = currentDate.getDate(); 

            //call the lottery service to fetch the lottery result
            LotteryService.getIrishLotteryInfo()
                .then(function(_irishLottery){
                    //set the $scope.lotteries value here
                    //$scope.lotteries.push(_lotteryInfos[0].history.results[0]);
                    //$scope.lotteries = _lotteryInfos[0].history.results;

                    $scope.lotteries.push (_irishLottery);

                    $scope.finishLoadingLottery = true;

                    //$scope.drawResult.amount = 20;
                    //$scope.getResultByAmount($scope.drawResult.amount);

            },function(){

            });

        }]);
