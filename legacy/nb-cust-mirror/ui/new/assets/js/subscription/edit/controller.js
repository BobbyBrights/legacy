'use strict';
angular.module('nb.controllers')
    .controller('SubscriptionEditController', ['$scope', '$rootScope', '$config', 'Functions', 'LocalStorage', '$state', 'Auth', 'UserSubscription', '$compile', '$log', '$timeout', '$modal', 'subscriptionManager', 'SubscriptionService',
        function ($scope, $rootScope, $config, $functions, $localStorage, $state, Auth, UserSubscription, $compile, $log, $timeout, $modal,subscriptionManager, SubscriptionService) {

            /****************
             * Initial part *
             ****************/

            // Some default values;
            $scope.subscription = {};
            $scope.subscription.lines = [];
            $scope.subscription.recurring   = false;
            $scope.subscription.numDraws    = $config.subscription.default_num_draws;
            $scope.subscription.pricePerLine = $config.subscription.price_per_line;
            $scope.subscription.effectiveLineNum = 0;//this variable means the number of effective lines => "effective" means the line must be a valid line, fully filled and non-duplicated
            $scope.subscription.finishLoad  = false;

            $scope.subscriptionObj  = {};

            $scope.drawPeriods = [1, 2, 4, 8, 16];
            $scope.showNumGrid = false;

            $scope.firstelem = {};
            $scope.editingBall = {row: false,col: false };


            $scope.originalBalls    = [];//the balls in the number picker panel
            $scope.selectedLineNum  = false;//the line number that the user is editing on
            $scope.selectedBalls    = [];//the group balls that the user is editing, once the selectedLineNum changed this balls group is changed
            $scope.selectedInputNumObj = {
                lineNum:'',
                colNum: '',
                ballType: ''
            };

            //This variable is used to indicate that any changes has made to the subscription lines
            //If it is then display this button. After change saved this button should be hidden
            $scope.linesChanged = false;
            $scope.style = true;

            //initialize the originalBalls array
            for(var i=0; i<45;i++){
                $scope.originalBalls.push({
                    style: 'normal',
                    number: i + 1
                });
            }

            //check the field selectedInputNumObj
            var checkIfAnyInputSelected = function(){
                if( '' === $scope.selectedInputNumObj.lineNum && 
                    '' === $scope.selectedInputNumObj.ballType ){
                    return false;
                }
                else{
                    return true;
                }
            };

            /*********************
             * Exposed Functions *
             *********************/         

            // TODO This will probably be set on a per-lottery basis.
            $scope.numbers = function () {
                return new Array(6);
            };

            $scope.addLine = function () {
                $scope.showNumGrid = true;
                console.log('New line has been added');
                console.log($scope.showNumGrid);

                $scope.subscription.lines.push({
                    status:'new',
                    editStatus: 'in',
                    editable: true,
                    deleted: false,
                    standard: [],
                    bonus: ''
                });
                /*$scope.subscription.lines.push({
                    standard: [],
                    bonus: ''
                });*/
                
                //udpate the status of the 'linesChanged'
                $scope.linesChanged = true;

                console.log('after adding new line');
                console.log($scope.subscription.lines);
            };

            $scope.testSomeFunc = function(){

                console.log('***The test function has been fired***');
            };

            $scope.testFunc = function(){
                console.log('***The test function has been fired***');
            };

            $scope.removeElem = function(){
                console.log('removing the element from the subscription lines array');
                console.log($scope.subscription.lines);
                $scope.subscription.lines.splice(0,1);
                console.log('after remove');
                console.log($scope.subscription.lines);
            }

            var count = 0;
            $scope.updateIndex = function(){
                console.log('update the index value');
                $scope.editingBall.row = count;
                count++;
                console.log($scope.editingBall);
            }

            $scope.updateElem  = function(){

                if('after' != $scope.subscription.lines[2].editStatus){
                    $scope.subscription.lines[2].editStatus = 'after';
                }else{
                    $scope.subscription.lines[2].editStatus = 'in';
                }

                if('after' != $scope.subscription.lines[3].editStatus){
                    $scope.subscription.lines[3].editStatus = 'after';
                }else{
                    $scope.subscription.lines[3].editStatus = 'in';
                }
            }

            $scope.removeLine = function (lineObj) {
                console.log('The target line to be removed is :');
                console.log(lineObj);

                console.log('get the index of the element in the array');
                console.log(_.indexOf($scope.subscription.lines, lineObj));

                var i = _.indexOf($scope.subscription.lines, lineObj);


                if( _.isNumber(i) && 
                    !_.isNaN(i) && 
                    i < $scope.subscription.lines.length){

                    //check if it is the 'old' subscription lines
                    if('old' === $scope.subscription.lines[i].status && 
                        false === $scope.subscription.lines[i].deleted){
                        var delResult = confirmDeleLine(i).then(function(data){
                            //resolved handler
                            console.log('The resolved result is:');
                            console.log(data);

                            if('del' === data){
                                $scope.subscription.lines[i].deleted = true;

                                //update the 'linesChanged' status
                                $scope.linesChanged = true;
                            }


                        }, function(){

                        });
                    }
                    else{
                        //only the new added lines could be removed from the 'subscription.lines' array
                        $scope.subscription.lines.splice(i, 1);

                        //check the subscription.lines array after remove the new added lines
                        //if no line with status 'new' then reset the variable 'linesChanged'
                        var hasNewLine = false;
                        _.each($scope.subscription.lines, function(lineObj){
                            if('new' === lineObj.status || 
                                true === lineObj.deleted){
                                hasNewLine = true;
                                //break;
                            }
                        });

                        if(false === hasNewLine){
                            $scope.linesChanged = false;
                        }
                    }
                }
                else{
                    return;
                }


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

            $scope.editLine = function(i){
                if (!_.isUndefined($scope.subscription.lines[i])) {
                    
                    $scope.subscription.lines[i].editStatus = 'in';
                }
            }

            $scope.editBall = function(lineIndex,ballIndex,ballType){
                console.log('editing the balls with:'+lineIndex+' '+ballIndex+' | '+ballType);
                if('standard' == ballType){
                    if (!_.isUndefined($scope.subscription.lines[lineIndex].standard[ballIndex])){
                        $scope.editLine(lineIndex);
                        //$scope.subscription.lines[lineIndex].standard[ballIndex] = '';

                    }
                }
                else if('bonus' == ballType){
                    if (!_.isUndefined($scope.subscription.lines[lineIndex].bonus)){
                        $scope.editLine(lineIndex);
                        //$scope.subscription.lines[lineIndex].bonus = '';
                    }
                }
                
                console.log('after editing balls:');
                console.log($scope.subscription.lines);
            }

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
                //return;
                // Function to check the validity of a subscription (number range, non-duplicates etc).
                var is_valid = false;

                if($config.subscription.min_num_lines > $scope.subscription.effectiveLineNum){
                    //TODO:
                    //trigger some event to emit the event
                    return false;
                }

                is_valid = $functions.normalize($scope.subscription.lines);
                is_valid = !$functions.hasEmptyValues($scope.subscription.lines);

                if(true == needCleanEmptyLine){
                    $functions.clearEmptyLines($scope.subscription.lines);
                }

                return is_valid;
            };

            $scope.saveSubscriptionAndRegister = function () {
                if ($scope.checkSubscription(true)) {
                    $localStorage.put("nb:subscription", $scope.subscription, true).then(function (data) {
                        $state.go("root.register");
                    });

                } else {
                    // TODO Notify that there is something wrong with the subscription.
                    $log.error("Invalid subscription");
                }
            };

            $scope.deleteSubs = function(){
                SubscriptionService.deleteAllSubscriptions().then(function(data){
                    console.log('all of the subscriptions have been deleted');
                },function(err){

                });
            }

            //subscribe the ball to the "watched" array
            $scope.addWatchedBall = function (ball){
                return;
                if(true == _.isNumber(ball)){
                    $scope.selectedBalls.push($scope.originalBalls[ball]);    
                }
                else{
                    $scope.selectedBalls.push(ball);
                }
            };

            $scope.removeWatchedBall = function(ballNum){
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
                
            };

            //remove all balls in the watched array
            $scope.cleanWatchedBalls = function (){
                //reset the balls' style
                _.each($scope.selectedBalls, function(ball){
                    ball.style = 'normal';
                });

                //clean the array
                $scope.selectedBalls.splice(0,$scope.selectedBalls.length);
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

            $scope.checkEmptyIndex = function(lineIndex){
                var emptyIndex = $functions.hasEmptyIndex($scope.subscription.lines[lineIndex]);
                
                console.log('The returned empty index is:'+emptyIndex);
                //validate this index
                if(_.isNumber(emptyIndex)){
                    var emptyIndex = $functions.is_valid_balls_index(emptyIndex) ? emptyIndex : 0;
                }
                return emptyIndex;
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

            $scope.switchTimeFormat = function(originalDate){
                if(originalDate){
                    return $functions.switchTimeFormat(originalDate);
                }
            };

            /***************
             * Watch Event *
             ***************/

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


            var confirmDeleLine = function(lineIndex){
                var modalInstance = $modal.open({
                    templateUrl:'/partials/modals/deleteLine.html',
                    windowClass: 'edit-delLine-modal',
                    controller: function($scope, $modalInstance, deletedLineNum,nextPaymentDate){
                        console.log('the deletedLineNum is :'+ deletedLineNum);
                        $scope.mainTitle = "DELETE LINE";
                        $scope.deletedLineNum   = deletedLineNum+1;
                        $scope.nextPaymentDate  = nextPaymentDate;

                        $scope.keep = function(){
                            $modalInstance.close('keep');
                        };

                        $scope.delete = function(){
                            $modalInstance.close('del');
                        };
                    },
                    resolve: {
                        deletedLineNum: function(){
                            return lineIndex;
                        },
                        nextPaymentDate: function(){
                            return $scope.switchTimeFormat($scope.subscription.nextPaymentDate);
                        }
                    }

                    

                });

                //return the promise object
                return modalInstance.result;
            };


            //listening the event that update the subscriptions
            $rootScope.$on('nb:subscription:refreshSubs', function () {
                console.log('refreshing the subscriptions');
                //refresh the subscriptions
                subscriptionManager.updateSubscriptions().then(function(refreshedSubs){
                    //set the retrived lines as 'old'
                    _.each(refreshedSubs.lines, function(line){
                        line.status = 'old';
                        line.editStatus = false;
                        line.editable = true;
                        line.deleted = false;
                    });

                    $scope.subscription.lines = refreshedSubs.lines;

                    //update the effectiveLinesNum
                    $scope.updateEffectiveNum();
                });
            });

            /*******************
             * Main Logic Part *
             *******************/

             console.log('loading the subscription editing page...');

            // Check in localstorage if there is a
            /*if ($localStorage.get("nb:subscription")) {
                $localStorage.get("nb:subscription", true).then(function (data) {
                    $scope.subscription = data;
                    $scope.subscription.finishLoad = true;
                });
                //$scope.subscription = JSON.parse($localStorage.get("nb:subscription"));
            }*/

            // If the user is logged in
            if (Auth.isAuthenticated) {
                $log.info("Authenticated");
                UserSubscription.get({}, function (data) {

                    /*$scope.$apply(function(){
                        $scope.subscription = data;
                    
                        $log.log('fetched subscription data:');
                        $log.log(data);
                    });*/
                    
                    $log.log('fetched subscription data:');
                    $log.log(data);

                    _.each(data.lines, function(line){
                        line.status = 'old';
                        line.editStatus = false;
                        line.editable = true;
                        line.deleted = false;
                    });

                    $log.log('after editing the subscription');
                    $log.log(data.lines);

                    //combine the data with the existing one
                    for(var prop in $scope.subscription){
                        if(!data.hasOwnProperty(prop)){
                            data[prop] = $scope.subscription[prop];
                        }
                    }
                    console.log('the combination is:');
                    console.log(data);

                    $scope.subscription = data;
                    $scope.subscription.finishLoad = true;
                    console.log('update the finishLoad value:');
                    console.log($scope.subscription.finishLoad);

                    console.log('the value of subscriptionManager.getKeepNewAddedSub() is:');
                    console.log(subscriptionManager.getKeepNewAddedSub());
                    //check if the user want to keep the new lines added at the landing page
                    if(true === subscriptionManager.getKeepNewAddedSub()){
                        //get the new added lines
                        var newSubObj = subscriptionManager.getNewSubscriptions();

                        if( newSubObj && 
                            !_.isEmpty(newSubObj) && 
                            !_.isUndefined(newSubObj.lines)){
                            console.log('the new added lines are:');
                            console.log(newSubObj.lines);

                            for(var num=0;num<newSubObj.lines.length;num++){
                                var newLineObj = newSubObj.lines[num];
                                $scope.subscription.lines.push({
                                    status:'new',
                                    editStatus: 'in',
                                    editable: true,
                                    deleted: false,
                                    standard: newLineObj.standard,
                                    bonus: newLineObj.bonus
                                });
                            }

                            //update the status of the linesChanged
                            $scope.linesChanged = true;
                        }
                    }

                    //add additional parameter 'recurring'
                    $scope.subscription.recurring = 'recurring' == data.type ? true : false;

                    //update the effectiveLinesNum
                    $scope.updateEffectiveNum();

                    //$scope.firstelem = $scope.subscription.lines[0];
                    console.log('Finish loading the users data');
                }, function(error){
                    //error handler
                    console.log('error after getting subscription:');
                    console.log(error);

                    //user doesn't have any subscriptions
                    if(404 == error.status){
                        $scope.subscription.lines = [];
                    }
                    //$scope.subscription = [];
                    $scope.subscription.finishLoad = true;

                    //add additional parameter 'recurring'
                    $scope.subscription.recurring = false;
                })
            }
        }]);
