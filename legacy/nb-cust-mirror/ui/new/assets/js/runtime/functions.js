angular.module('nb.functions', [])
    .factory('Functions', ['$rootScope', '$config', function ($rootScope, $config) {

        var numeric_sort = function (a, b) {
            return a - b;
        }

        var in_array = function (needle, haystack) {
            var length = haystack.length;
            for (var i = 0; i < length; i++) {
                if (haystack[i] == needle) return true;
            }
            return false;
        }

        var array_rand = function (min, max, qty) {
            var arr = new Array();
            while (arr.length < qty) {
                var n = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!in_array(n, arr)) {
                    arr.push(n);
                }
            }
            return arr;
        }

        var getDuplicateIndices = function (arr) {
            var duplicates = {};
            for (var i = 0; i < arr.length; i++) {
                if (duplicates.hasOwnProperty(arr[i])) {
                    duplicates[arr[i]].push(i);
                } else if ( _.isNumber(arr[i]) && !_.isNaN(arr[i]) && arr.lastIndexOf(arr[i]) !== i) {
                    duplicates[arr[i]] = [i];
                }
            }
            return duplicates;
        };

        var is_valid = function (num) {
            //if(_.isNaN(num)){
                //return false;
            //}
            
            return parseInt(num) > 0 && parseInt(num) <= 45;
        };

        var is_valid_balls_index = function(num){
            return parseInt(num) >=0 && parseInt(num) <=6;
        };

        var normalize = function (arr) {
            return;
            var error = false, data = {};
            for (var i in arr) 
            {
                var _line = arr[i];

                if (!_.isUndefined(_line.bonus) && 
                    _line.bonus !== null ) {

                    //check if the bonus is duplicate with any ball in the standard array
                    if (in_array(_line.bonus, _line.standard)) {
                        data = {
                            line: i,
                            number: _line.bonus,
                            index: 6,
                            type: 'duplicate'
                        };
                        error = true;
                    }

                    //check if the bonus ball is invalid
                    if (_.isUndefined(_line.bonus) ||
                        _line.bonus === "" ||
                        (_line.bonus !== "" && !is_valid(_line.bonus)) ||
                        _.isNaN(_line.bonus) ) {
                        data = {
                            line: i,
                            number: _line.bonus,
                            index: 6,
                            type: 'invalid bonus'
                        };
                        error = true;
                    }

                }


                for (var prop in getDuplicateIndices(_line.standard)) {
                    if (getDuplicateIndices(_line.standard).hasOwnProperty(prop)) {
                        // handle prop as required
                        error = true;
                        data = {
                            line: i,
                            number: prop,
                            index: getDuplicateIndices(_line.standard)[prop][getDuplicateIndices(_line.standard)[prop].length - 1],
                            type: 'duplicate'
                        };
                    }
                }

                for (var n in _line.standard) {
                    var _t = _line.standard[n];
                    if (_t !== null) { // Nulls are allowed
                        if (!is_valid(_t)) {
                            error = true;
                            data = {
                                line: i,
                                number: prop,
                                index: n,
                                type: 'invalid'
                            };
                        }
                    }
                }


            }

            // Clean up all existing tooltips
            $rootScope.$emit('nb:subscription:cleanup_tooltips');
            if (error) {
                $rootScope.$emit('nb:subscription:invalidnumber', data);
            }
            return !error;
        };

        var findError = function (arr) {
            var error = false, data = {};
            
            linesLoop:
            for (var i in arr) 
            {
                var _line = arr[i];

                //check duplicate ball
                for (var prop in getDuplicateIndices(_line.standard)) {
                    if (getDuplicateIndices(_line.standard).hasOwnProperty(prop)) {
                        // handle prop as required
                        error = true;
                        data = {
                            line: i,
                            number: prop,
                            index: getDuplicateIndices(_line.standard)[prop][getDuplicateIndices(_line.standard)[prop].length - 1],
                            type: 'duplicate'
                        };
                        break linesLoop;
                    }
                }

                //check the standard balls
                //check any invalid ball
                var numEmptyStdBalls = 0;
                var numValidStdBalls = 0;
                var firstInvalidStdBallIndex    = false;
                var firstEmptyStdBallIndex      = false;
                
                var isBonusEmpty        = true;
                var isBonusBallValid    = false;

                //for (var n in _line.standard) {
                for(var n=0;n<6;n++){
                    var _t = _line.standard[n];

                    //invalid ball could be "undefined", "null", "NaN" or ""
                    if( _.isUndefined(_t) || 
                        _.isNull(_t) || 
                        _.isNaN(_t) ||
                        _t === "" ){

                        numEmptyStdBalls++;

                        if(false === firstEmptyStdBallIndex){
                            firstEmptyStdBallIndex  = n;
                        }
                    }
                    else{
                        //check if the bonus ball is in the proper integer range
                        if(is_valid(_t)){
                            numValidStdBalls++;
                        }
                        else{
                            //the ball is invalid
                            if(false === firstInvalidStdBallIndex){
                                firstInvalidStdBallIndex    = n;
                            }
                        }
                    }    

                }

                //check the bonus ball        
                if (!_.isUndefined(_line.bonus) && 
                    _line.bonus !== null ) {

                    //check if the bonus is duplicate with any ball in the standard array
                    if (in_array(_line.bonus, _line.standard)) {
                        data = {
                            line: i,
                            number: _line.bonus,
                            index: 6,
                            type: 'duplicate'
                        };
                        error = true;
                        break linesLoop;
                    }

                    //check if the bonus ball is invalid
                    //bonus ball could be "null", "", "NaN"
                    if (_.isUndefined(_line.bonus) ||
                        _line.bonus === "" ||
                        _.isNull(_line.bonus) ||
                        _.isNaN(_line.bonus) ) {

                    }
                    else{
                        //the bonus ball is filled
                        isBonusEmpty    = false;

                        //check if the bonus ball is in the proper range
                        if(is_valid(_line.bonus)){
                            isBonusBallValid = true;
                        }
                        
                    }
                }
                console.log('The numEmptyStdBalls is:'+numEmptyStdBalls);
                console.log('The numValidStdBalls is:'+ numValidStdBalls);

                //Summary
                //the error could be invalid standard ball or invalid bonus ball 
                if( true === isBonusEmpty && 
                    (6 === numEmptyStdBalls || _line.standard.length == 0)){
                    continue linesLoop;
                }

                var invalidBallIndex = false;
                //the standard balls are not all empty
                if(6 > numEmptyStdBalls && 
                    0 < numEmptyStdBalls){
                    //has empty standard ball
                    invalidBallIndex    = firstEmptyStdBallIndex;
                }
                //if all of the standard balls are filled
                else if( 0 === numEmptyStdBalls){
                    //get the index of the first invalid standard
                    if( false !== firstInvalidStdBallIndex){
                        invalidBallIndex = firstInvalidStdBallIndex;
                    }
                }

                if(false !== invalidBallIndex){
                    error = true;
                    data = {
                        line: i,
                        number: _.isUndefined(_line[invalidBallIndex]) ? undefined : _line[invalidBallIndex],
                        index: invalidBallIndex,
                        type: 'invalid'
                    };
                    
                }
                //only on condition that not all standard balls are empty then the empty bonus should be alerted
                else if( false !== isBonusEmpty && 
                    false === isBonusBallValid){
                    data = {
                        line: i,
                        number: _line.bonus,
                        index: 6,
                        type: 'invalid bonus'
                    };
                    error = true;
                }

                //no matter how many standard balls are empty, if bonus ball are not empty and is invalid then show the alert
                if( false === isBonusEmpty && 
                    false === isBonusBallValid ){
                    data = {
                        line: i,
                        number: _line.bonus,
                        index: 6,
                        type: 'invalid bonus'
                    };
                    error = true;
                }

                if(true === error ){
                    break linesLoop;
                }

            }

            // Clean up all existing tooltips
            $rootScope.$emit('nb:subscription:cleanup_tooltips');
            if (error) {
                $rootScope.$emit('nb:subscription:invalidnumber', data);
            }
            return !error;
        };

        var checkSingleInput = function( ballVal, needEmptyCheck, needValidCheck){
            var error = false;

            if( true === needValidCheck){
                error = !is_valid(ballVal);
            }

            return !error;
        };

        var checkValidLines = function(lines){

            if( !lines || 
                _.isUndefined(lines.length) ||
                0 === lines.length){
                return 0;
            }

            var validLineNum = 0;

            for(var lineNum = 0; lineNum < lines.length;lineNum++){
                var lineObj = lines[lineNum];

                //check the standard balls
                //console.log('Current line object is:');
                //console.log(lineObj);

                if( !lineObj ||
                    _.isUndefined(lineObj.standard) || 
                    !lineObj.standard ||
                    _.isUndefined(lineObj.bonus) || 
                    !lineObj.bonus){
                    continue;
                }

                var standardBalls   = lineObj.standard;
                var bonusBall       = lineObj.bonus;

                var stdBallRlt  = true,
                    bonusRlt    = true;
                //console.log('The statndardBalls is:');
                //console.log(standardBalls);
                //console.log(bonusBall);

                //check the standard ball array
                for(var ballIndex=0;ballIndex<$config.subscription.std_ball_amount;ballIndex++){


                    if( _.isUndefined(standardBalls[ballIndex]) || 
                        !_.isNumber(standardBalls[ballIndex]) || 
                        _.isNaN(standardBalls[ballIndex]) //||
                        //-1 !== _.clone(standardBalls).splice(ballIndex,1).indexOf(standardBalls[ballIndex])
                        ){
                        //console.log('The standard lines are not valid:'+ballIndex);
                        stdBallRlt = false;
                        break;
                    }

                    var restArray = _.clone(standardBalls);
                        restArray.splice(ballIndex,1);

                    if( -1 !== restArray.indexOf(standardBalls[ballIndex])){
                        //console.log('The standard lines are not valid:'+ballIndex);
                        stdBallRlt = false;
                        break;
                    }

                    //console.log('check the duplicate ball:');
                    //console.log(_.clone(standardBalls).splice(ballIndex,1).indexOf(standardBalls[ballIndex]));
                    //console.log(_.clone(standardBalls).splice(ballIndex,1));
                }

                //check the bonus ball
                if(-1 !== standardBalls.indexOf(bonusBall)){
                    bonusRlt = false;
                    continue;
                }

                if( stdBallRlt === true && 
                    bonusRlt === true ){
                    validLineNum ++;
                }
            }
            console.log('The result validLineNum is:'+validLineNum);
            return validLineNum;
        };

        var clearEmptyLines = function (lines) {

            var i = lines.length;
            while (i--) {
                var _line = lines[i];
                if (_line.standard.length == 0 && _line.bonus == "") {
                    lines.splice(i, 1);
                }
            }

        };

        var hasEmptyValues = function (lines) {
            //clearEmptyLines(lines);
            var _v = false;
            if (lines.length === 0) {
                _v = true;
            } else {
                for (var i in lines) {
                    var _line = lines[i];
                    if (_.isUndefined(_line.bonus) || _line.bonus == "" || _line.bonus == null && _line.standard.length == 0) {
                        // This is an empty line - not necessarily a bad thing.
                    } else {
                        if (_.isUndefined(_line.bonus) || _line.bonus == "" || _line.bonus == null) _v = true;
                    }

                }
            }
            return _v;
        };

        var hasEmptyIndex = function(line){
            console.log('checking the empty index');
            console.log(line);
            var _v = false;
            if(line.length === 0){
                _v = true;
            }else{
                //check standard
                if(!_.isUndefined(line.standard)){
                    if(0 === line.standard.length){
                        _v = 0;
                        return _v;
                    }

                    for(var i=0; i<line.standard.length;i++){
                        console.log('checking the line.standard');
                        var _value = line.standard[i];
                        if(_value == "" || _value == null ){
                            _v = i;
                            return _v;
                        }
                    }
                }

                if(!_.isUndefined(line.bonus)){
                    var _value = line.bonus
                    if(_value == "" || _value == null){
                        _v = line.standard.length ? line.standard.length : 6;
                        return _v;
                    }
                }
                
            }
            return _v;
        }

        var getReadableDateStr = function (dateStr) {
           
            var monthNames = [ "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December" ];
            var dateObj = new Date(dateStr);
            //TODO: validate the dateObj
            var resultStr = dateObj.getDate()+' '+monthNames[dateObj.getMonth()]+' '+dateObj.getFullYear();

            return resultStr;    
        };

        var getWeekDayShortName = function (index){
            var weekDayShortNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

            return (_.isNumber(index) && 0 <= index && 6>=index) ? weekDayShortNames[index] : '';
        }

        var getMonthShortName = function(index){
            var monthShortNames = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

            return (_.isNumber(index) && 0 <= index && 11>=index) ? monthShortNames[index] : '';
        };

        var getDateTimeStdStr   = function(dateObj){

            /*String format: yyyy-mm-ddThh:mm:ss*/
            if( dateObj && 
                dateObj instanceof Date){

                var yyyy = dateObj.getFullYear().toString();
                var mm = (dateObj.getMonth()+1).toString(); // getMonth() is zero-based
                var dd  = dateObj.getDate().toString();
                var hh  = (dateObj.getHours()).toString();
                var mins  = (dateObj.getMinutes()).toString();
                var ss  = (dateObj.getSeconds()).toString();

                return '' + yyyy+'-'+(mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) +'T' + (hh[1]?hh:"0"+hh[0]) + ':' + (mins[1]?mins:"0"+mins[0]) + ':' + (ss[1]?ss:"0"+ss[0]);
            }

            return '';
        }


        var countElements = function (numArray){

            var result = {
                count: false,
                nextElemIndex : false
            };

            if( !numArray || 
                !_.isNumber(numArray.length)){
                return result;
            }

            var count = 0;
            var nextElemIndex = false;
            var foundFirstUnd = false;

            for(var num=0;num<numArray.length;num++){
                console.log('the '+num+' number is: '+numArray[num]);
                //the selected ball must be a valid integer
                if( true === _.isNumber(numArray[num]) ||
                    true !== _.isNaN(numArray[num]) ){
                    count ++;
                }
                else{
                    console.log('the '+num+ ' number is NOT INTEGER------------');
                    if(foundFirstUnd === false){
                        //the first undefined position is found
                        foundFirstUnd = true;
                        nextElemIndex = num;
                    }
                }

            }

            //if not found and the length is smaller than 6, then asign it as the value of numArray.length
            if( false === foundFirstUnd && 
                6 > numArray.length ){
                nextElemIndex = numArray.length;
            }

            result.count = count;
            result.nextElemIndex = nextElemIndex;
            return result;
        }

        var isLeapYear = function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        };

        var getNumOfDays = function(year,month){
            return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        };

        var checkPrize = function(stdMatchedNum, bonusMatchedNum){
            var matchResult = false;
            var prizeString = '';

            if( stdMatchedNum === 3 ){
                matchResult = true;
                prizeString = "&#163;20";

            }else if( stdMatchedNum === 2 &&
                bonusMatchedNum === 1){
                matchResult = true;
                prizeString = "&#163;100";
            }
            else if( stdMatchedNum === 3 &&
                bonusMatchedNum === 1){
                matchResult = true;
                prizeString = "&#163;250";
            }
            else if( stdMatchedNum === 4 &&
                bonusMatchedNum === 1){
                matchResult = true;
                prizeString = "&#163;100,000";
            }
            else if( stdMatchedNum === 5 &&
                bonusMatchedNum === 1){
                matchResult = true;
                prizeString = "&#163;250,000";
            }
            else if( stdMatchedNum === 6 &&
                bonusMatchedNum === 1){
                matchResult = true;
                prizeString = "&#163;7,000,000";
            }

            return prizeString;
        };

        var getNextDrawDate = function(futureDate){
            var currentDate = new Date();
            //var currentWeekDay = currentDate.getDay();
            //var futureDate = '';
            //var drawDayHour = 20;
            //var drawDayMin  = 10;

            //var weekDayDiff = 0;

           /* if(currentWeekDay<3){
                weekDayDiff = 3 - currentWeekDay;
            }
            else if(currentWeekDay==3){
                if( currentDate.getHours()+1 < drawDayHour || 
                    (currentDate.getHours()+1 == drawDayHour &&
                     curentDate.getMinutes()<drawDayMin) ){
                    weekDayDiff     = 0;
                }
                else {
                    weekDayDiff     = 3;
                }
            }
            else if(currentWeekDay>3 && 
                currentWeekDay<6){
                weekDayDiff     = 6 - currentWeekDay;
            }
            else if(currentWeekDay==6){
                if( currentDate.getHours()+1 < drawDayHour || 
                    (currentDate.getHours()+1 == drawDayHour &&
                     curentDate.getMinutes()<drawDayMin) ){
                    weekDayDiff     = 0;
                }
                else {
                    weekDayDiff     = 4;
                }
            }*/

            //futureDate  = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate()+weekDayDiff, drawDayHour, drawDayMin, 0);

            var nextDrawYear    = futureDate.getFullYear();
            var nextDrawMonth   = futureDate.getMonth()+1;
            var nextDrawDay     = futureDate.getDate();
            //var nextDrawHour    = futureDate.getHours();
            var nextDrawHour    = futureDate.getHours();
            var nextDrawMinutes = futureDate.getMinutes();
            var nextDrawSeconds = futureDate.getSeconds();

            var dateDiff    = futureDate - currentDate;
            var diff        = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

            var daysLeft    = parseInt(dateDiff/(24*3600*1000));
            var hoursLeft   = parseInt((dateDiff - 24*3600*1000*daysLeft)/(3600*1000));
            var minsLeft    = parseInt( (dateDiff - 24*3600*1000*daysLeft - 3600*1000*hoursLeft)/(1000*60) );

            var shortStr    = getReadableDateStr(futureDate);
            var timeString  = ""+nextDrawYear+ '/' + (nextDrawMonth<10 ? '0'+nextDrawMonth : nextDrawMonth)  + '/' + (nextDrawDay<10 ? '0'+nextDrawDay : nextDrawDay) + ' ' + (nextDrawHour<10 ? '0'+nextDrawHour : nextDrawHour) +':'+(nextDrawMinutes<10 ? '0'+nextDrawMinutes : nextDrawMinutes)+':'+ (nextDrawSeconds<10 ? '0'+nextDrawSeconds : nextDrawSeconds );
            var longStr     = getWeekDayShortName(futureDate.getDay()).toUpperCase() + ' ' + (futureDate.getDate()<10 ? '0'+futureDate.getDate() : futureDate.getDate()) + ' ' + getMonthShortName(futureDate.getMonth()).toUpperCase() +' '+ futureDate.getHours()+':'+futureDate.getMinutes();

            var timeLeftStr = "" + daysLeft + " DAYS, "+ hoursLeft +" HOURS, "+ minsLeft + " MINUTES";

            return {
                shortStr:shortStr,
                counterStr:timeString,
                longStr: longStr,
                timeLeftStr: timeLeftStr
            };
        };

        var getServerStdUTCTimeStr = function(dataObj){

            var year    = dataObj.getUTCFullYear();
            var month   = dataObj.getUTCMonth();
            var date    = dataObj.getUTCDate();
            var hour    = dataObj.getUTCHours();
            var minute  = dataObj.getUTCMinutes();
            var second  = dataObj.getUTCSeconds();

            var dateStr = ''+year + '-'+ (month<9 ? '0'+(month+1) : (month+1) )+'-'+(date<10 ? '0'+date : date)+'T'+(hour<10 ? '0'+hour : hour)+':'+( minute<10 ? '0'+minute : minute )+':'+( second<10 ? '0'+second : second );

            return dateStr;
        };

        var switchTimeFormat = function(originalDate){
            var dateObj = new Date(originalDate);
            return dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+(''+dateObj.getFullYear()).substring(2);
        }

        var findLines = function(haystack, needle){
            var result = [];

            _.each(haystack, function(haystackLineObj){
                _.each(needle,function(needleLineObj){
                    var standardResult = true;

                    _.each(needleLineObj.standard,function(needleLineStdBall){
                        if(-1 === haystackLineObj.standard.indexOf( parseInt(needleLineStdBall))){
                            standardResult = false;
                            //break;
                            return;
                        }
                    })

                    if( true === standardResult &&
                        parseInt(needleLineObj.bonus) == parseInt(haystackLineObj.bonus) ){
                        //all balls are matched
                        result.push(haystack.indexOf(haystackLineObj));
                    }
                })
            })

            return result;
        }

        var deepClone = function(targetObj){
            var clonedObj = new Object();

            for(var prop in targetObj){
                if( typeof targetObj[prop] === "object"){
                    //console.log('the '+prop+' is type of object');

                    clonedObj[prop] = deepClone(targetObj[prop]);
                }
                else{
                    clonedObj[prop] = _.clone(targetObj[prop]);
                }
            }
            return clonedObj;
        }

        var deepCloneArray = function(targetArray){
            var clonedArray = $.extend(true, [], targetArray);

            console.log('the cloned array is:');
            console.log(clonedArray);
            //clonedArray.shift().shift();

            //console.log(clonedArray);
            return clonedArray;
        }

        //define functions for IE browser
        if(typeof String.prototype.trim !== 'function') {
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, ''); 
            }
        }

        return {
            array_rand:     array_rand,
            in_array:       in_array,
            numeric_sort:   numeric_sort,
            normalize:      normalize,
            hasEmptyValues: hasEmptyValues,
            getReadableDateStr:     getReadableDateStr,
            hasEmptyIndex:          hasEmptyIndex,
            is_valid_balls_index:   is_valid_balls_index,
            countElements: countElements,
            clearEmptyLines:        clearEmptyLines,
            getDateTimeStdStr :     getDateTimeStdStr,
            isLeapYear :            isLeapYear,
            getNumOfDays:           getNumOfDays,
            checkValidLines:        checkValidLines,
            findError:              findError,
            checkSingleInput:       checkSingleInput,
            checkPrize :            checkPrize,
            getNextDrawDate:        getNextDrawDate,
            switchTimeFormat:       switchTimeFormat,
            findLines :             findLines,
            deepClone :             deepClone,
            deepCloneArray:         deepCloneArray,
            getMonthShortName  :    getMonthShortName,
            getServerStdUTCTimeStr: getServerStdUTCTimeStr
        };

    }]);
