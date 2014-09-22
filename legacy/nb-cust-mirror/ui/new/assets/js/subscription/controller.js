'use strict';
angular.module('nb.controllers')
    .controller('SubscriptionController', ['$scope', '$rootScope', '$config', 'Functions', 'LocalStorage', '$state', 'Auth', 'UserSubscription', '$compile', '$log', '$q', 'BetService', 'subscriptionManager', 'userInfoManager', '$timeout', '$modal', 'SubscriptionService',
        function ($scope, $rootScope, $config, $functions, $localStorage, $state, Auth, UserSubscription, $compile, $log, $q, BetService, subscriptionManager, userInfoManager, $timeout, $modal, SubscriptionService ) {

            /****************
             * Initial part *
             ****************/

            // Some default values;
            $scope.subscription = {};
            $scope.subscription.lines = [];
            $scope.subscription.recurring = true; //the default value is true
            $scope.subscription.numDraws = $config.subscription.default_num_draws;
            $scope.subscription.pricePerLine = $config.subscription.price_per_line;
            $scope.subscription.effectiveLineNum = 0;//this variable means the number of effective lines => "effective" means the line must be a valid line, fully filled and non-duplicated
            $scope.subscription.lotteryId = $config.affiliate.irish_lottery_id;

            $scope.drawPeriods = [1, 2, 4, 8, 16];

            $scope.betsFromToday    = [];
            $scope.betsGroupForFutureDraw = [];
            $scope.linesForFutureDraw = [];
            $scope.editedSubscription = {};
            $scope.editedSubscription.lines = [];
            $scope.editedSubscription.finishLoad = false;

            $scope.originalBalls    = [];//the balls in the number picker panel
            $scope.selectedLineNum  = false;//the line number that the user is editing on
            $scope.selectedBalls    = [];//the group balls that the user is editing, once the selectedLineNum changed this balls group is changed
            $scope.selectedInputNumObj = {
                lineNum:'',
                colNum: '',
                ballType: ''
            };

            $scope.forms = {};

            //initialize the originalBalls array
            for(var i=0; i<45;i++){
                $scope.originalBalls.push({
                    style: 'normal',
                    number: i + 1
                });
            }

            $scope.style = true;

            /*******************************
             * Private function definition *
             *******************************/

            var getUserSubscription = function(){

                var deferred = $q.defer();

                UserSubscription.get({}, function (data) {

                /*$scope.$apply(function(){
                    $scope.subscription = data;
                
                    $log.log('fetched subscription data:');
                    $log.log(data);
                });*/
                
                $log.log('fetched subscription data:');
                $log.log(data);

                $scope.subscription = data;

                //add additional parameter 'recurring'
                $scope.subscription.recurring = 'recurring' == data.type ? true : false;

                //resolve
                deferred.resolve(data);

                // Update our subscription lines. These needed to be added programmatically.
                // Not ideal given that we are manipulating the DOM, but there seems to be some sort
                // of refresh issue when the Controller inits.

                /*var d = document.createElement('lotto-numbers');
                d.setAttribute("line", "a");
                d.setAttribute("ng-repeat", "a in subscription.lines");
                var lotteryNumbers = angular.element(d);
                var el = $compile(lotteryNumbers)($scope);

                //where do you want to place the new element?
                angular.element('#lotteries').append(lotteryNumbers);
                $scope.insertEl = el;*/

                }, function(errorMsg){
                    //error handler
                    console.log('cant get subscription');
                    deferred.resolve({});
                });

                return deferred.promise;
            };

            var getUserBetsCollection = function(){

                var deferred = $q.defer();

                BetService.getBetsCollctionByDate('+30').then(function(_betsCol){
                    console.log('getting the faked bets collection from today');
                    console.log(_betsCol);

                    //group the _betsCol
                    //var betsGroup = BetService.groupBets(_betsCol);
                    var betsGroup = _betsCol;
                    $scope.betsFromToday    = betsGroup || [];

                    console.log('After group the result:');
                    console.log(betsGroup);

                    /*
                     * The betsGroup use the following format:
                     * if the draw has multiple bets for the same bet.id but has different bet_type:numbers of matched balls

                     *  [draw_id:[line_id:[bet_object,..,bet_object],..,line_id:[bet_object,..,bet_object]],
                     *  ...,
                     *  draw_id:[line_id:[bet_object,..,bet_object],..,line_id:[bet_object,..,bet_object]]]
                     * 
                     * The user has mutiple 'line' against each 'draw'
                     * Each 'line' array has 4 bet_objects, each of the 4 obejcts has the same 'line' property but has different 'draw_type' value
                     *
                     *-----------------------------------------------------------------------------
                     *
                     * if each bet_id has only one corresponding bet then use the following format
                     *
                     *[draw_id:[bet_object,..,bet_object],
                     *  ...,
                     *  draw_id:[bet_object,..,bet_object]]
                    */

                    //just work around the faked data
                    //assume the fourth draw array is the future draw
                    //$scope.betsGroupForFutureDraw = betsGroup[Object.keys(betsGroup)[3]];
                    //for the reason that the the request failed, the returned value is empty array
                    $scope.betsGroupForFutureDraw = betsGroup.length > 0 ? betsGroup[0].bets : [];
                    /*
                     * The $scope.betsGroupForFutureDraw use the following format:
                     * [line_id:[bet_object,..,bet_object],..,line_id:[bet_object,..,bet_object]]
                    */

                    //iterate the betsGroup and fetch the 'line' proper from each 'line' array
                    //the result will be in the same format as the $scope.subscription.lines
                    //easier for comparision
                    if($scope.betsGroupForFutureDraw){
                        //the format of each
                        _.each($scope.betsGroupForFutureDraw, function(oneBet){
                            $scope.linesForFutureDraw.push(oneBet.line);
                        });
                    }

                    console.log('Sign the first element to the future draw');
                    console.log($scope.betsGroupForFutureDraw);
                    console.log($scope.linesForFutureDraw);
                    
                    //resolve
                    deferred.resolve();

                }, function(errorMsg){
                    console.log('error occured: '+errorMsg);
                    //reject
                    deferred.reject(errorMsg);

                })

                return deferred.promise;
            };

            //check the field selectedInputNumObj
            var checkIfAnyInputSelected = function(){
                if( '' === $scope.selectedInputNumObj.lineNum && 
                    '' === $scope.selectedInputNumObj.ballType ){
                    return false;
                }
                else{
                    return true;
                }
            }

            /*********************
             * Exposed Functions *
             *********************/         

            // TODO This will probably be set on a per-lottery basis.
            $scope.numbers = function () {
                return new Array(6);
            };

            $scope.addLine = function (i) {
               
                $scope.subscription.lines.push({
                    standard: [],
                    bonus: '',
                    msgType:''
                });
                
            };

            $scope.removeLine = function (lineObj) {
                console.log('The target line to be removed is :');
                console.log(lineObj);

                console.log('get the index of the element in the array');
                console.log(_.indexOf($scope.subscription.lines, lineObj));

                var i = _.indexOf($scope.subscription.lines, lineObj);

                console.log('The lines before remove the target line:');
                console.log($scope.subscription.lines);
                if( _.isNumber(i) && 
                    !_.isNaN(i) && 
                    i < $scope.subscription.lines.length){
                    //remove the specific line
                    $scope.subscription.lines.splice(i, 1);
                }

                console.log('The lines after remove the target line:');
                console.log($scope.subscription.lines);


                //check the current selectedLineNum
                console.log('The current selectedLineNum is: '+$scope.selectedLineNum);
                //update the current selectedLineNum
                if($scope.selectedLineNum > i){
                    //the total number of lines redueced by one, if the current selectedLineNum is bigger than the deleted line number
                    //then reduce the selectedLineNum by one
                    $scope.selectedLineNum--;
                    console.log('After update the current selectedLineNum is: '+$scope.selectedLineNum);
                }
                else if(i == $scope.selectedLineNum){
                    $scope.selectedLineNum = false;
                }

                $scope.updateEffectiveNum();
            };

            $scope.highlightLine = function (i) {
                if (!_.isUndefined($scope.subscription.lines[i])) {
                    angular.element('div.numbers-grid').attr('highlighted', JSON.stringify($scope.subscription.lines[i]));
                }
            };


            $scope.randomNumbers = function (i) {
                //update the selectedLineNum
                $scope.selectedLineNum = i;

                // .. then populate this line
                var t = $functions.array_rand(1, 45, 7);
                $scope.subscription.lines[i].bonus = t[t.length - 1];
                t.pop();
                t.sort($functions.numeric_sort);
                $scope.subscription.lines[i].standard = t;
                // And update the numbers
                $scope.highlightLine(i);
                $scope.updateEffectiveNum();
                
            };

            $scope.chooseNumber = function (num) {
                
                //check and set selectedLineNum==============================
                //check if the selectedLineNum has been set
                if(!_.isNumber($scope.selectedLineNum)){
                    $scope.selectedLineNum = 0;
                }
                //if some input field is selected
                else if(_.isNumber($scope.selectedInputNumObj.lineNum)){
                    $scope.selectedLineNum = $scope.selectedInputNumObj.lineNum;
                }

                //check if any input field is selected
                if(true === checkIfAnyInputSelected()){
                    //set or replace the input field with the selected ball
                    if('bonus' == $scope.selectedInputNumObj.ballType){
                        $scope.subscription.lines[$scope.selectedInputNumObj.lineNum].bonus = num; 
                    }
                    else if('std' == $scope.selectedInputNumObj.ballType){

                        $scope.subscription.lines[$scope.selectedInputNumObj.lineNum].standard[$scope.selectedInputNumObj.colNum] = num;    
                    }
                    
                    console.log('After setting the selectedInputNumObj');
                    console.log($scope.subscription.lines);
                    
                    //after then reset the selectedInputNumObj
                    $scope.resetFocusNumInput();
                    return;
                }

                // Iterate through subscriptions
                //var line = 0;
                //var filled = false;

                var line = 0;
                var selectedLineNum = _.isNumber($scope.selectedLineNum) ? $scope.selectedLineNum : 0;
                var filled = false;

                //for (var i in $scope.subscription.lines) {
                //for(var i = selectedLineNum; i<$scope.subscription.lines.length;i++){
                line = selectedLineNum;

                if (!filled) {
                    var _t = $scope.subscription.lines[selectedLineNum];

                    //check the real amount of elements in the standard array but not the 'length' property
                    var arrayCountResult = $functions.countElements(_t.standard);

                    console.log('The count result is :');
                    console.log(arrayCountResult);

                    // If the standard numbers is less than 6, push this number to the array
                    //if (_t.standard.length < 6) {
                    if( _.isNumber(arrayCountResult.count) && 
                        arrayCountResult.count < 6) {

                        //check duplicate
                        if(-1 != _.indexOf(_t.standard, num)){
                            //if there's duplicate then return
                            console.log('found duplicate');
                            console.log(_t.standard);
                            console.log(num);
                            return;
                        }

                        if(_.isNumber(arrayCountResult.nextElemIndex)){
                            //asign the selected ball number
                            console.log('assigning the selected ball value to the input field:'+num);
                            _t.standard[arrayCountResult.nextElemIndex] = num;
                            
                            //set as true
                            filled = true;
                            $scope.highlightLine(line);
                        }
                                           
                    } else {
                        // Check for empty strings in the standard numbers
                        /*for (var k in _t.standard) {
                            if ( !filled && 
                                 !_.isNumber(_t.standard[k])) {
                                _t.standard[k] = num;

                                console.log('ready to set the ball style');
                                //update the status of the picked balls
                                //$scope.setBallStyle( num-1, 'selected');
                                //$scope.addWatchedBall(num-1);

                                filled = true;
                                $scope.highlightLine(line);
                            }
                        }*/
                    }

                    //if none of 'standard' fields is filled and the bonus ball is empty
                    if (!filled && 
                        (!_.isNumber(_t.bonus) || _.isNaN(_t.bonus) )) {
                        
                        //check duplicate
                        if(-1 != _.indexOf(_t.standard, num)){
                            return;
                        }

                        _t.bonus = num;

                        //update the status of the picked balls
                        //$scope.setBallStyle( num-1, 'bonus');
                        //$scope.addWatchedBall(num-1);

                        filled = true;
                        $scope.highlightLine(line);
                    }
                }
                

                if (!filled) {

                    //update the selected line num
                    if($scope.selectedLineNum + 1 < $scope.subscription.lines.length){
                        $scope.selectedLineNum = $scope.selectedLineNum + 1;

                        $scope.chooseNumber(num);

                    }else if($scope.selectedLineNum + 1 === $scope.subscription.lines.length){
                        $scope.addLine();
                        $scope.selectedLineNum = $scope.selectedLineNum + 1;

                        $timeout( function(){
                            $scope.chooseNumber(num);
                        }, 0, true);
                    }    
                }
            };

            $scope.updateEffectiveNum = function(){
                $scope.subscription.effectiveLineNum = $functions.checkValidLines($scope.subscription.lines);
            };

            $scope.checkSubscription = function (needCleanEmptyLine) {
                // Function to check the validity of a subscription (number range, non-duplicates etc).
                var is_valid    = false;
                //first check effective number of lines 

                is_valid = $functions.findError($scope.subscription.lines);
                //is_valid = !$functions.hasEmptyValues($scope.subscription.lines);
                if(false === is_valid){
                    $rootScope.$emit('nb:displayErrMsg',{
                        mainTitle: "WELCOME TO NOVABALL",
                        modalHeading: "Invalid Lines",
                        errorMsgArray: ['Please select valid lines'],
                        submitBtnText: 'CONTINUE'
                    });
                    return;
                }

                if(true == needCleanEmptyLine){
                    //$functions.clearEmptyLines($scope.subscription.lines);
                }

                if($config.subscription.min_num_lines > $scope.subscription.effectiveLineNum){
                    //TODO:
                    //trigger some event to emit the event
                    $rootScope.$emit('nb:displayErrMsg',{
                        mainTitle: "WELCOME TO NOVABALL",
                        modalHeading: "Invalid Lines",
                        errorMsgArray: ['Please select at least 2 valid lines'],
                        submitBtnText: 'CONTINUE'
                    });
                    is_valid = false;
                }

                return is_valid;
            };

            $scope.saveSubscriptionAndRegister = function () {
                //remove the mark of duplicated lines
                $scope.cleanLineStyle();

                console.log($scope.subscription.lines);
                console.log('the next element is:');

                var checkResult = $scope.checkSubscription(true);
                if (checkResult === true) {
                    //update the shared subscription object
                    //clone and clear the EmptyLines:
                    var clonedSubs = {};
                        //clonedSubs.lines = _.clone($scope.subscription.lines);
                    //TODO:clone whole object in one time
                    for(var prop in $scope.subscription){
                        clonedSubs[prop]    = _.clone($scope.subscription[prop]);
                    }

                    $functions.clearEmptyLines(clonedSubs.lines);
                    console.log('The clonedSubs are:');
                    console.log(clonedSubs);

                    subscriptionManager.setNewSubscriptions(clonedSubs);

                    //TODO:
                    //check if the lines are duplicate
                    SubscriptionService.checkLines({lines:clonedSubs.lines}).then(function(){
                        //if all the lines are available
                        //check if user has logged in
                        if(true === Auth.isAuthenticated){
                            //redirect the user to choose payment page
                            console.log('going to register?step=checkPaymentType page');
                            $state.go("root.register", {step:'checkSub'});
                            return;
                        }


                        $localStorage.put("nb:subscription", $scope.subscription, true).then(function (data) {
                            //redirect
                            console.log('go to the registration page');
                            //$state.go("root.register");
                            $state.go("root.register");
                        });

                    },function(errObj){
                        console.log('checking lines failed!');
                        console.log(errObj);
                        //if some of the lines are duplicated
                        if(400 == errObj.status){
                            //find the duplicate line from the response
                            var duplicateLines = errObj.data.unavailable;

                            var duplicateLinesIndexArray = $functions.findLines($scope.subscription.lines, duplicateLines);

                            console.log('the result of finding duplicate lines are:');
                            console.log(duplicateLinesIndexArray);

                            _.each(duplicateLinesIndexArray, function(duplicateLinesIndex){
                                $scope.subscription.lines[duplicateLinesIndex].msgType = 'duplicate';
                            });

                            //show the popup message
                            $rootScope.$emit('nb:displayErrMsg',{
                                mainTitle: "DUPLICATE LINES",
                                //modalHeading: "Invalid Lines",
                                contentTitle: "Apologies!",
                                errorMsgArray: ["Some of the lines you've chosen are already in use by another player.", "Please change the highlighted lines and try again."],
                                submitBtnText: 'OK',
                                windowClass: 'err-msg-model-2'
                            });
            
                        }
                    });

                    

                } else {
                    // TODO Notify that there is something wrong with the subscription.
                    $log.error("Invalid subscription");
                }
            };

            /*$scope.editLines    = function(){
                $state.go('root.subscription.editDraw');
            };*/

            $scope.testBall = function(){
               

                $scope.cleanWatchedBalls();

                console.log($scope.originalBalls);
            };

            //subscribe the ball to the "watched" array
            /*$scope.addWatchedBall = function (ball){
                return;
                if(true == _.isNumber(ball)){
                    $scope.selectedBalls.push($scope.originalBalls[ball]);    
                }
                else{
                    $scope.selectedBalls.push(ball);
                }
            };*/

            /*$scope.removeWatchedBall = function(ballNum){
                if(true == _.isNumber(ballNum)){
                    //$scope.selectedBalls.push($scope.originalBalls[ballNum]);    
                    for(var i=0;i<$scope.selectedBalls.length;i++){
                        if(ballNum == $scope.selectedBalls[i].number){

                            $scope.setBallStyle(ballNum-1, 'normal');
                            $scope.selectedBalls.splice(i,1);

                            console.log('after remove the target ballNum:');
                            console.log($scope.selectedBalls);
                            return;
                        }
                    }
                }
                
            };*/

            //remove all balls in the watched array
            /*$scope.cleanWatchedBalls = function (){
                //reset the balls' style
                _.each($scope.selectedBalls, function(ball){
                    ball.style = 'normal';
                });

                //clean the array
                $scope.selectedBalls.splice(0,$scope.selectedBalls.length);
            };*/
            $scope.cleanLineStyle = function(){
                _.each($scope.subscription.lines, function(lineObj){
                    lineObj.msgType = '';
                });
            };

            $scope.setBallStyle = function (ballIndex, style){

                //console.log('total length of originalBalls is :'+$scope.originalBalls.length)
                console.log('setting ball style with the ballIndex:'+ballIndex);
                //check the index
                if( !_.isNumber(ballIndex) ||
                    ballIndex + 1 > $scope.originalBalls.length || 
                    0 > ballIndex || 
                    !$scope.originalBalls[ballIndex]){
                    return;
                }

                console.log('setting ball '+ballIndex+' style: '+style+' finished...');
                //update the style
                $scope.originalBalls[ballIndex].style = style;

                //if('remove' !== action){
                    //push to "watched" array
                    //$scope.addWatchedBall(ballIndex);
                //}
            };

            $scope.focusNumInput = function (lineNum, ballType, ballColNum){
                console.log('on focus event:');
                console.log(lineNum +' '+ ballType +' '+ ballColNum);

                //check the lineNum
                if( _.isNumber(lineNum) && 
                    lineNum >=0 &&
                    lineNum < $scope.subscription.lines.length ){
                    //update the selectedLineNum
                    $scope.selectedLineNum = lineNum;
                    console.log('the selectedLineNum is changed to '+lineNum+' after clicking on a input field');

                    //update the selectedInputNumObj
                    $scope.selectedInputNumObj = {
                        lineNum: lineNum,
                        colNum: ballColNum,
                        ballType: ballType
                    };

                    console.log('The current selected input object is:');
                    console.log($scope.selectedInputNumObj);
                }
            };

            $scope.resetFocusNumInput = function(){
                $scope.selectedInputNumObj = {
                        lineNum: '',
                        colNum: '',
                        ballType: ''
                    };
            };

            $scope.increaseLines = function(){
                console.log('Output the subscription lines before adding empty lines:');
                //console.log($scope.subscription.lines);
                var numOfLines = $scope.subscription.lines.length;
                // Populate with default number of lines.
                //if ($scope.subscription.lines.length == 0) {
                    for (var i = 0; i < $config.subscription.initial_num_lines - numOfLines; i++) {
                        console.log('pushing a new empty line...');
                        $scope.addLine();
                    }
                //}
            };


            /***************
             * Watch Event *
             ***************/

            /*$scope.$watch('subscription.numDraws', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('The numDraws has been changed to :'+newValue);
                    subscriptionManager.setNewSubscriptions($scope.subscription);
                }
            });*/

            $scope.$watch('selectedLineNum', function(newValue, oldValue){
                console.log('SelectedLineNum changed:'+newValue+" "+oldValue);
                if(newValue !== oldValue){
                    //if the selectedLineNum changed then clean and update the watched balls
                    //do clean first
                    //$scope.cleanWatchedBalls();

                    //check the newValue
                    if( _.isNumber(newValue) && 
                        newValue >=0 && 
                        newValue < $scope.subscription.lines.length){
                        var currentLine = $scope.subscription.lines[newValue];
                        console.log('Current selected line is: ');
                        console.log(currentLine);
                        
                        //allocate the currentLine reference to the selectedBalls
                        $scope.selectedBalls = currentLine;
                    }else if( false === newValue){
                        //newValue will equal to 'false' only under this scenario that the line with 'selectedLineNum' is deleted
                        $scope.selectedBalls = [];
                    }
                }
            });

            $scope.$watch('selectedBalls', function(newValue, oldValue){
                console.log('selectedBalls has changed');

                if(newValue != oldValue){
                    console.log('the old selectedBalls is:');
                    console.log(oldValue);
                    console.log('the new selectedBalls is:');
                    console.log(newValue);

                    //find the difference between the old value and the new value
                    //find the values that are not present in the newValue for 'standard'
                    var removedStdNums = _.difference(oldValue.standard,newValue.standard);

                    console.log('the removedStdNums are :');
                    console.log(removedStdNums);

                    var newStdNums = _.difference(newValue.standard, oldValue.standard);

                    console.log('the newStdNums are :');
                    console.log(newStdNums);

                    //update the number picker panel
                    //reset the removed ball
                    _.each(removedStdNums, function(numValue){
                        if(_.isNumber(numValue)){
                            $scope.setBallStyle(numValue-1, 'normal');
                        }
                    });

                    //set 'selected' for new ball
                    _.each(newStdNums,function(numValue){
                        if(_.isNumber(numValue)){
                            $scope.setBallStyle(numValue-1, 'selected');   
                        }
                    });

                    //update the bonus ball
                    if(newValue.bonus !== oldValue.bonus){
                        //check if it is duplicate to the standard balls
                        if(-1 == _.indexOf(newValue.standard, oldValue.bonus)){
                            //remove the old bonus ball
                            $scope.setBallStyle(oldValue.bonus-1, 'normal');    
                        }

                        if( -1 == _.indexOf(newValue.standard, newValue.bonus)){
                            //update the new bonus ball
                            $scope.setBallStyle(newValue.bonus-1, 'bonus');    
                        }
                    }

                    $scope.updateEffectiveNum();

                }
            }, true);


            /*******************
             * Main Logic Part *
             *******************/

            console.log('subscriptionController is fired...');

            // Check in localstorage if there is a
            if ($localStorage.get("nb:subscription")) {
                $localStorage.get("nb:subscription", true).then(function (data) {
                    $scope.subscription = data;
                    //share the subscription data
                    subscriptionManager.setNewSubscriptions($scope.subscription);
                    //increase the number of lines to satisfy the minimum number of lines
                    $scope.increaseLines();
                });
                //$scope.subscription = JSON.parse($localStorage.get("nb:subscription"));
            }

            // If the user is logged in
            if (Auth.isAuthenticated) {
                $log.info("Authenticated");

                //get the user's info object
                userInfoManager.getUserInfo().then(function(data){
                    var userInfo = data;

                    console.log('The retrived userInfo:');
                    console.log(userInfo);
                },function(){

                });
                

                $q.all([getUserSubscription(),getUserBetsCollection()]).then(function(){
                        console.log('Finish loading the required two parts');
                        //compare the subscription with the future bets
                        //find out which are deleted ones and which are newly added ones

                        console.log('The current subscription lines are:');
                        console.log($scope.subscription);
                        console.log($scope.subscription.lines);

                        //if the future bets are not empty
                        //then do the comparesion
                        if( 0 < $scope.linesForFutureDraw.length){
                            //find which lines in the current subscription exists in the future lines or not
                            _.each($scope.subscription.lines, function(lineInSub){
                                var line = _.find($scope.linesForFutureDraw, function(lineInFuture){
                                    return lineInSub.bonus == lineInFuture.bonus && _.isEqual(lineInSub.standard, lineInFuture.standard);
                                });

                                if(line){
                                    $scope.editedSubscription.lines.push({bonus:lineInSub.bonus, standard:lineInSub.standard, status: 'old', editable: false});
                                }
                                else{
                                    $scope.editedSubscription.lines.push({bonus:lineInSub.bonus, standard:lineInSub.standard, status: 'new', editable: false});
                                }
                            });

                            //find the lines doesn't exist in the current subscriptions
                            _.each($scope.linesForFutureDraw, function(lineInFuture){
                                var line = _.find($scope.subscription.lines, function(lineInSub){
                                    return lineInFuture.bonus == lineInSub.bonus && _.isEqual(lineInFuture.standard, lineInSub.standard);
                                });

                                if(undefined === line){
                                    $scope.editedSubscription.lines.push({bonus:lineInFuture.bonus, standard:lineInFuture.standard, status: 'old', deleted: true, editable: false});   
                                }
                            });
                        }
                        else{
                            //add the future lines to the editedSubscritpion directly
                            _.each($scope.subscription.lines, function(lineInSub){
                                $scope.editedSubscription.lines.push({bonus:lineInSub.bonus, standard:lineInSub.standard, status: 'old', editable: false});
                            });
                        }

                        $scope.editedSubscription.finishLoad = true;
                        console.log('Result of combining the current subscriptions and future lines');
                        console.log($scope.editedSubscription.lines);
                },function(error){
                    //error handler
                    console.log('cant get solved for both dependencies');
                });
                
                //loading the balls that the user hasn't paied for
                var newSubs = subscriptionManager.getNewSubscriptions();
                console.log('the new subscription are:');
                console.log(newSubs);
                if( !_.isUndefined(newSubs.lines) && 
                    !_.isUndefined(newSubs.lines.length) && 
                    0<newSubs.lines.length){
                    $scope.subscription.lines = _.union($scope.subscription.lines, newSubs.lines);
                }
            }
            else{

            }

            $scope.increaseLines();
            $scope.updateEffectiveNum();
        }]);
