angular.module('nb.directives', [])
    .directive('lottoNumbers', ['$compile',function ($compile) {
        return {
            restrict: 'AE',
            replace: true,
            terminal: true,
            scope: { line: '=' },
            link: function (scope, element, attrs) {
                
                scope.$watch('line',function(newValue, oldValue){
                    console.log('line has changed to:');
                    console.log(newValue);
                });

                var showLineNum = attrs.showlinenum ? true : false;

                var template = 
                    '<div class="lotto-line" ng-show="{{ line.standard && line.standard.length > 0}}">' +
                        '<div class="lottery-line-number" ng-show="'+showLineNum+'">L'+(scope.$parent.$index+1)+'</div>'+
                        '<div class="lotto-number number-{{number}}" ng-repeat="number in line.standard">{{number}}</div>' +
                        '<div class="lotto-number bonus-ball">{{line.bonus}}</div>' +
                    '</div>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }])
    /*
     * This directive is used to display one row/line of lottery numbers from each lineObject
     * The format of the "lineObject" is :
     * {someProperty1:value, someProperty2:value,...,
     *  line:{"id":id_value,"bonus":bonus_value,
     *  "standard":[value1,value2,...]}
     * }
    */
    .directive('lotteryNumbers', ['$compile', '$config', function ($compile, $config) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            scope: { lineObj: '=line' },
            compile: function(comElem, comAttrs){

                //console.log('inside the compile function:');
                //console.log(comElem);
                //console.log(comAttrs);

                return function (scope, element, attrs) {

                    var showTime = attrs.showtime == 'true';
                    var showLineNum = attrs.showLineNum ? true : false;
                    console.log('the lineObj is:');
                    console.log(scope.lineObj);

                    var template = 
                        '<div class="lotto-line line-grid-'+( (scope.$parent.$index) % 2 +1)+'">' +
                            '<div class="lottery-line-number" ng-show="'+showLineNum+'">L'+(scope.$parent.$index+1)+'</div>'+    
                            '<div class="inner-panel-title" ng-show="'+showTime+'">{{lineObj.betEffReadableDate}}</div>'+
                            '<div class="balls-line">'+
                                '<div class="lotto-number" ng-repeat="number in lineObj.line.standard track by $index" ng-class="{\'ball-normal\':$index<'+$config.subscription.std_ball_amount+'}">{{number}}</div>' +
                                '<div class="lotto-number bonus-ball">{{lineObj.line.bonus}}</div>' +
                            '</div>'+
                        '</div>';

                    var newElement = angular.element(template);
                    $compile(newElement)(scope);
                    element.replaceWith(newElement);
                }
            }
            
        }
    }])
    /*
     * This directive is used to display one row/line of subscription
     * The format of the "lineObject" is :
     * lines:[{"id":id_value,"bonus":bonus_value,"standard":[value1,value2,...]},
     *        {"id":id_value,"bonus":bonus_value,"standard":[value1,value2,...]},...,
     *        ]
    */
    .directive('nbSubscription', ['$compile', '$config', function ($compile, $config) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            scope: { lineObj: '=line' },
            compile: function(comElem, comAttrs){

                //console.log('inside the compile function:');
                //console.log(comElem);
                //console.log(comAttrs);

                return function (scope, element, attrs) {

                    var showTime = attrs.showtime == 'true';
                    var showLineNum = attrs.showLineNum ? true : false;

                    var template = 
                        '<div class="lotto-line line-grid-'+( (scope.$parent.$index) % 2 +1)+'">' +
                            '<div class="lottery-line-number" ng-show="'+showLineNum+'">L'+(scope.$parent.$index+1)+'</div>'+    
                            '<div class="inner-panel-title" ng-show="'+showTime+'">{{lineObj.betEffReadableDate}}</div>'+
                            '<div class="balls-line">'+
                                '<div class="lotto-number" ng-repeat="number in lineObj.standard track by $index" ng-class="{\'ball-normal\':$index<'+$config.subscription.std_ball_amount+'}">{{number}}</div>' +
                                '<div class="lotto-number bonus-ball">{{lineObj.bonus}}</div>' +
                            '</div>'+
                        '</div>';

                    var newElement = angular.element(template);
                    $compile(newElement)(scope);
                    element.replaceWith(newElement);
                }
            }
            
        }
    }])
    /*
     * This directive is used to display one row/line of lottery numbers from each lotteryObject
     * The format of the "lotteryLineObject" is :
     * {standard:[{number:lottery_number_value,match:matched|unmatched},{}...],
     *  bonus:[{number:lottery_number_value,match:matched|unmatched},{}...],
     *  betEffReadableDate: bet_effective_readable_date_string}
    */
    .directive('lotteryNumberObjs', ['$compile', 'Functions',function ($compile, Functions) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            scope: { line: '=' },
            link: function (scope, element, attrs) {
                
                var showMatchResult = attrs.showmatchresult == 'true';

                var template = 
                    '<div class="lotto-line">' +
                        '<div class="lottery-line-number col-lg-1 col-md-1 col-sm-1 col-xs-12">Line '+(scope.$parent.$index+1)+' </div>'+
                        '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">'+
                            '<div class="lotto-number lottery-number-std-{{numberObj.match}}" ng-repeat="numberObj in line.standard">{{numberObj.number}}</div>' +
                            '<div class="lotto-number lottery-number-bonus-{{numberObj.match}}" ng-repeat="numberObj in line.bonus">{{numberObj.number}}</div>' +
                        '</div>';

                var isBonusMatchedStr = scope.line.bonusMatchedNumber === 0 ? '' : ' + bonus';
                var prizeResult = Functions.checkPrize( scope.line.stdMatchedNumber,scope.line.bonusMatchedNumber);
                var prizeString = '' === prizeResult ? 'not a winner' : "You've won "+prizeResult;
                template += '<div class="matched-num-str col-lg-5 col-md-5 col-sm-5 col-xs-12" ng-if="'+showMatchResult+'">{{line.stdMatchedNumber}} numbers'+isBonusMatchedStr+'</div><div class="prize-result-str">'+(scope.line.bonusMatchedNumber == 0 ? ' ' : ' bonus ') + prizeString + '</div>'+
                    '</div>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }])
    /*
     * This is used to display one group/array of lotteryLineObject:
     * [lotteryLineObject,lotteryLineObject...]
     * each "lotteryLineObject" will be one row/line in the html view page
    */
    .directive('lotteryResultGroup', ['$compile', 'Functions', function ($compile, Functions) {
        return {
            restrict: 'E',
            replace: true,
            //terminal: true,
            scope: { group: '=' },
            link: function (scope, element, attrs) {
                console.log('drawResultObj is:');
                console.log(scope.drawResultObj);

                var drawResultDate = (scope.group.length > 0) ? scope.group[0].betEffReadableDate : '';
                
                var template = 
                    '<div ng-if='+(''!==drawResultDate)+'>Results from draw '+drawResultDate+'</div>'+
                    '<lottery-number-objs line="oneline" ng-repeat="oneline in group" showMatchResult="'+attrs.showmatchresult+'"></lottery-number-objs>'+
                    '<div class="row-buffer-normal"></div>'+
                    //'<div class="row draw-group-footer"><div class="col-md-4 col-md-offset-2">O Denotes Numbers Drawn</div></div>'+
                    '<hr ng-hide="'+scope.$parent.$last+'">';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }]).directive('lotteryNumberEditObjs', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            scope: { line: '=', testFunc: "&" },
            link: function (scope, element, attrs) {

                var template = 
                    '<div class="lotto-line">';

                console.log('scope in link function:');
                console.log(scope);
                //console.log('calling testFunc from the lotteryNumberEditObjs->link func');
                //scope.testFunc;
                //console.log(scope.testFunc.toString());

                if('edit' == scope.line.status){
                    template +=
                        '<button ng-click="testFunc()" class="btn btn-success qp">QP</button>'+
                        '<input class="" ng-repeat="numberObj in parent.numbers() track by $index"/>'+
                        '<div></div>';
                }
                else if('edit' !== scope.line.status){
                    template +=
                        //'<button ng-click="testFunc()" class="btn btn-success qp">QP</button>'+
                        '<div class="lottery-line-number">L'+(scope.$parent.$index+1)+'</div>'+
                        '<div class="lotto-number" ng-repeat="numberObj in line.standard">{{numberObj}}</div>' +
                        '<div class="lotto-number bonus-ball">{{line.bonus}}</div>';
                }

                template +=
                        '<div class="" ng-show="true" ng-click="">x</div>'+
                        '<div>This line will be deleted after draw on {{line.renewDate}}</div>'+
                    '</div>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }])
    /*
     * Optional Attributes on the directive
     * showlinebg: show the backgrond color or not
     * showlinenum : show the line number or not
    */
    .directive('lotteryNumberEditObjs2', ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            //scope: { line: '=', testFunc: "&" },
            link: function (scope, element, attrs) {

                /*
                 * Events binding functions
                */
                //bind the 'blur' event
                element.bind('blur', function(){
                    console.log('event "blur" is triggered');
                });

                var transformInterval   = 3000;
                var currentLineIndex    = scope.$index;
                scope.lineInEditing       = false;
                var transformPromise    = {};

                /*
                 * Define scope functions
                */
                scope.testme = function(){
                    console.log('testme');
                };

                scope.endEdit = function(){
                    console.log('current lineInEditing is:');
                    console.log(scope.lineInEditing);
                    if(true == scope.lineInEditing){
                        return ;
                    }
                    scope.oneline.editStatus = 'after';
                }

                scope.selectBall = function(lineIndex, numIndex, ballType){
                    if('bonus' == ballType){
                        numIndex = 6;
                    }
                    console.log('selecting the ball with:'+ lineIndex +' | '+ numIndex +' | '+ ballType);
                    scope.$parent.editBall(lineIndex, numIndex, ballType);
                    scope.$parent.editingBall = {row: lineIndex, col: numIndex};

                    scope.lineInEditing = true;
                }

                scope.focusOnBall = function(ballIndex){
                    var inputArray = element.find('input');
                    console.log(inputArray);
                    scope.lineInEditing   = true;
                    inputArray[ballIndex].focus();
                };

                scope.ballBlur  = function(){
                    scope.lineInEditing   = false;
                    scope.checkEmptyBall();
                };

                scope.ballFocus = function(){
                    scope.lineInEditing   = true;
                }

                scope.checkEmptyBall = function(){
                    console.log('firing the checkEmptyBall function...');
                    //check if there is any empty ball
                    var emptyIndex = scope.$parent.checkEmptyIndex(currentLineIndex);

                    console.log("*The empty index is :"+emptyIndex+" after blur *");
                    //if there is, focus the first empty ball
                    //if()
                    //scope.focusOnBall(emptyIndex);

                    //if there's no empty ball, transform the line in secs
                    if(false === emptyIndex){
                        transformPromise    = $timeout(function(){},transformInterval)
                        .then(function(){
                            console.log('==delayed transform==');
                            scope.endEdit();
                        });   
                    }
                };

                /*
                 * Utility functions
                */
                var getLineBGColorCSSStr = function(){
                    
                    var resultStr   = '';
                    var showlinebg  = (attrs.showlinebg && 'true' == attrs.showlinebg) ? true : false;
                    
                    if( scope.oneline.editStatus && 
                        'in' === scope.oneline.editStatus){
                        console.log('This new added element is in edit status');
                        return resultStr;
                    }

                    if(true == scope.oneline.deleted){
                        resultStr = ' deleted-line';
                    }
                    else if('new' === scope.oneline.status){
                        resultStr  = ' new-line';
                    }

                    if(true === showlinebg){
                        resultStr += ' bg';
                    }

                    console.log('result css string is:'+resultStr);
                    return resultStr;
                };

                var getFocused = function(colIndex){
                    console.log('checking the ball with the index:'+colIndex);
                }

                var genLineTemplateStr = function(){
                    var template = 
                        '<div class="lotto-line'+getLineBGColorCSSStr()+' line-focus" line-focus="true">';

                    console.log("The scope in lotteryNumberEditObjs2->link function is:");
                    console.log(scope);

                    var ballsBody   ='';
                    var showLineNum = true;
                    var showRemoveBtn = false;

                    if( scope.oneline.editable && 
                        scope.oneline.editable !== false ){
                        showRemoveBtn = true;
                    }

                    var closeBtnHTMLStr = '<button class="close delete-line-btn" ng-show="'+showRemoveBtn+'" ng-click="removeLine($index)">x</button>';
                    

                    if( 'new' == scope.oneline.status && 
                        'in' == scope.oneline.editStatus)
                    {
                        showLineNum    = false;
                        ballsBody =
                            '<button ng-click="randomNumbers($index);checkEmptyBall();" class="btn btn-success qp">QP</button>'+
                            '<input type="text" class="input-sm input-line-number" ng-maxlength="2" maxlength="2" ng-repeat="numberObj in numbers() track by $index" ng-model="oneline.standard[$index]" ball-focus="true" ng-blur="ballBlur()" ng-focus="ballFocus()"/>'+
                            '<input type="text" class="input-sm input-line-number bonus-ball" ng-maxlength="2" maxlength="2" ng-model="oneline.bonus" ng-blur="ballBlur()" ng-focus="ballFocus()"/>'+//'<div class="star"></div>'+
                            closeBtnHTMLStr;
                    }
                    else{
                        /*
                         * only 'new' added elements has the click event to go back to the edit mode
                         * the display are the same for both 'old' lines and 'new' lines
                        */
                        

                        var standardClickEvent = 'ng-click="selectBall()"';
                        var bonusClickEvent    = 'ng-click="selectBall()"';

                        if('new' == scope.oneline.status){
                            standardClickEvent  = 'ng-click="selectBall('+currentLineIndex+',$index,'+"'standard'"+');"';
                            bonusClickEvent     = 'ng-click="selectBall('+currentLineIndex+',$index,'+"'bonus'"+');"';
                        }

                        ballsBody =
                            '<div class="lotto-number" '+standardClickEvent+' ng-repeat="numberObj in oneline.standard track by $index">{{numberObj}}</div>' +
                            '<div class="lotto-number bonus-ball" '+bonusClickEvent+'>{{oneline.bonus}}</div>'+
                            closeBtnHTMLStr+
                            '<div ng-show="oneline.status == '+"'new'"+'" class="ball-edit-comment">This line will be added after the draw on {{line.renewDate}}</div>';
                    }

                    template +=
                            '<div class="lottery-line-number" ng-show="'+showLineNum+'">L'+(currentLineIndex+1)+'</div>'+
                            ballsBody +
                            '<div ng-show="oneline.deleted == true" class="ball-edit-comment">This line will be deleted after draw on {{line.renewDate}}</div>'+
                        '</div>';
                    return template;
                };

                var compilenlink = function(){
                    $compile(element.html(genLineTemplateStr()).contents())(scope);
                };
                

                /*
                 * Register watch functions
                 * Only in editable != false
                */
                if(scope.oneline.editable !== false){
                    scope.$watch('oneline.deleted',function(newValue, oldValue){
                        console.log('the lottery object->deleted nested in the ng-repeat has changed to:');
                        console.log(newValue);
                        console.log(oldValue);

                        
                        if( newValue !== oldValue ){
                            console.log('get the latest css string:'+getLineBGColorCSSStr());
                            compilenlink();
                        }
                        
                    });

                    scope.$watch('oneline.editStatus',function(newValue, oldValue){
                        console.log('the lottery object->editStatus nested in the ng-repeat has changed to:');
                        console.log(newValue);
                        console.log(oldValue);

                        
                        if( newValue !== oldValue){
                            console.log('transform the line format');
                            compilenlink();
                        }
                        
                    });

                    scope.$watch('$parent.editingBall',function(newValue, oldValue){
                        console.log('watching the editingBall in one line');
                        console.log(newValue);
                        console.log(oldValue);
                        if( newValue != oldValue ){
                            //newValue && element.focus();
                            console.log('the target value has changed');
                            console.log(newValue);

                            if(currentLineIndex == scope.$parent.editingBall.row){
                                console.log('**Current Line is selected**');
                                console.log(currentLineIndex);
                                console.log('get all children input elements');
                                scope.focusOnBall(scope.$parent.editingBall.col);                            
                            }
                        }
                    },true);
                }

                /*
                 * Main Function Body
                */
                console.log('The scope is:');
                console.log(scope);

                compilenlink();
                
            },
            
        }
    }]).directive('loadingSpinner' ,['$compile', function($compile){
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            scope: { hide: '=' },
            link: function (scope, element, attrs){

                /*
                 * Avaliable attributes:
                   spinner-type
                   hide-switcher
                */

                /*
                 * Utility functions
                */
                var genTemplateStr = function(type){
                    if(1 === type){
                        var template = '<div class="spinner">'+
                                          '<div class="rect1"></div>'+
                                          '<div class="rect2"></div>'+
                                          '<div class="rect3"></div>'+
                                          '<div class="rect4"></div>'+
                                          '<div class="rect5"></div>'+
                                          '<p>Loading, please wait.</p>'+
                                        '</div>';
                    }
                    else if(2 === type){
                        var template =  '<div class="circle-spinner">'+
                                            '<div class="spinner-container container1">'+
                                                '<div class="circle1"></div>'+
                                                '<div class="circle2"></div>'+
                                                '<div class="circle3"></div>'+
                                                '<div class="circle4"></div>'+
                                            '</div>'+
                                            '<div class="spinner-container container2">'+
                                                '<div class="circle1"></div>'+
                                                '<div class="circle2"></div>'+
                                                '<div class="circle3"></div>'+
                                                '<div class="circle4"></div>'+
                                            '</div>'+
                                            '<div class="spinner-container container3">'+
                                                '<div class="circle1"></div>'+
                                                '<div class="circle2"></div>'+
                                                '<div class="circle3"></div>'+
                                                '<div class="circle4"></div>'+
                                            '</div>'+
                                        '</div>';
                    }

                    return template;
                };

                var browserSupportsCSSProperty = function (propertyName) {
                      var elm = document.createElement('div');
                      propertyName = propertyName.toLowerCase();

                      if (elm.style[propertyName] != undefined)
                        return true;

                      var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
                        domPrefixes = 'Webkit Moz ms O'.split(' ');

                      for (var i = 0; i < domPrefixes.length; i++) {
                        if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined)
                          return true;
                      }

                      return false;
                };
                
                var compilenlink = function(){
                    //check if any type of spinner has been selected through the attr
                    var spinnerType = 1;
                    if(!_.isUndefined(attrs.spinnerType)){
                        spinnerType = parseInt(attrs.spinnerType);
                    }

                    $compile(element.html(genTemplateStr(spinnerType)).contents())(scope);

                    //var newElement = angular.element(genTemplateStr());
                    //$compile(newElement)(scope);
                    //element.replaceWith(newElement);
                };

                var hideSpinner = function (){
                    //console.log('Need to hide the spinner');
                    //console.log(element);
                    element.css('display', 'none');
                };

                var displaySpinner = function(){
                    var displayVal = !_.isUndefined(attrs.displayVal) ? attrs.displayVal : 'block';
                    element.css('display', displayVal);
                }

                /*
                 * Register watch functions
                */
                scope.$watch('hide',function(newValue, oldValue){
                    console.log('Watching the HIDE value:');
                    console.log(newValue);
                    console.log(oldValue);

                    console.log('attrs.hideSwitcher is:');
                    console.log(attrs.hideSwitcher);
                    console.log(typeof attrs.hideSwitcher);
                    
                    if( newValue !== oldValue){
                        if(true === newValue){
                            hideSpinner();
                        }
                        else if(false === newValue && 
                            !_.isUndefined(attrs.hideSwitcher) &&
                            attrs.hideSwitcher == 'open'){
                            console.log('display the spinner again');
                            displaySpinner();
                        }
                    }
                });

                /*
                 * Main Function Body
                */
                console.log('checking the animation attribute...');
                if (!browserSupportsCSSProperty('animation')) {
                    // fallback…
                    console.log('NOT supporting !');
                }
                compilenlink();
            }
        }
    }])

    .directive('regCheckPhoneNum',[function(){
        return{
            restrict: 'A',
            priority: 100,
            require: '?ngModel',
            link:function(scope, element, attrs, ngModel){

                if(!ngModel) return;

                element.bind('blur',function(event){
                    console.log('catch blur event inside the directive');
                    //event.preventDefault();
                    console.log('the current input value is:');  
                    console.log('>'+ngModel.$viewValue+'<');
                    if(  ngModel.$viewValue == '' ||
                        _.isUndefined(ngModel.$viewValue) ){
                        ngModel.$setValidity('required',false);
                    }
                    else{
                        scope.checkPhoneNum();
                    }
                });
            }
        }
    }])
    /*
     * This directive is used on the "confirm password" field to 
     * validate the "password" and the "repassword"
    */
    .directive('passwordCheck',['$compile',function ($compile){
        return{
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel){

                if(!ngModel) return;

                //console.log('the controller inside the password-check directive');
                //console.log(ngModel);
                //console.log('attrs.ngModel is: '+attrs.ngModel);

                //initialize the 'matched' value
                //ngModel.$setValidity('matched', true);

                //watching the changes to the repassword field
                scope.$watch(attrs.ngModel, function(){
                    
                    //console.log('The repassword attrs.ngModel is changed');
                    checkPassword();
                });

                //watching the changes to the password field
                attrs.$observe('passwordCheck', function(){
                    //console.log('The password attribute is changed');
                    checkPassword();
                });

                var checkPassword = function (){
                    var password = ngModel.$viewValue;
                    var repassword = attrs.passwordCheck;
                    //console.log('logging the password:'+ attrs.passwordCheck);

                    ngModel.$setValidity('matched', password === repassword);
                }
            }
        }
    }])
    .directive('dateCheck', ['$compile', function ($compile){
        return{
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel){
                if(!ngModel) return;

                scope.$watch(attrs.ngModel, function(){
                    console.log('user birthdate has changed to:');
                    console.log(attrs.ngModel);
                    console.log(ngModel.$viewValue);
                    checkDate();
                });

                var minDateObj = new Date(attrs.minDate);
                var maxDateObj = new Date(attrs.maxDate)
                var currentDateObj = new Date();

                var checkDate = function (){
                    var maxDate = attrs.maxDate;
                    var minDate = attrs.minDate;

                    var inputDateObj = new Date(ngModel.$viewValue);

                    console.log('the current inputDate is:');
                    console.log(inputDateObj);
                    console.log('the max date is:');
                    console.log(attrs.maxDate);
                    console.log(maxDateObj);

                    ngModel.$setValidity('maxdate', inputDateObj <= maxDateObj );
                    ngModel.$setValidity('mindate', inputDateObj > minDateObj );
                }
            }
        }
    }])
    /*
     * Auto change the size of the registration modal when forms are switched between each other
    */
    .directive('regModalAutoResize',[function(){
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attr, ngModel){

                return;
                var lgSize = '710px';
                var mdSize = '510px';

                console.log('the forms size is:');
                console.log(element.closest('div.modal-content'));
                console.log(attr.regModalAutoResize);
                console.log(attr.id);

                var sizeVal = lgSize;
                switch(attr.regModalAutoResize){
                    case 'md':
                        sizeVal = mdSize;
                        break;
                    case 'lg':
                        sizeVal = lgSize;
                        break;
                    default:
                        sizeVal = lgSize;
                }

                attr.$observe('ngShow', function(newValue, oldValue){
                    console.log('the ngShow value changed:');
                    console.log(newValue);
                    console.log(oldValue);
                    if(true === newValue){
                        element.closest('div.modal-content').css('width',sizeVal);
                    }
                });

                
                return;

                enquire.register("screen and (min-width:992px)", {
                    // OPTIONAL
                    // If supplied, triggered when a media query matches.
                    match : function() {
                        console.log('desktop screen is matched ...');

                        //realacate the two widgets after finishing the view rendering 
                        $timeout(function(){
                            //console.log('checking the target element');
                            //console.log($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                            $(".ball-picker-body.numbers-panel").css('display','none');
                            $(".line-jackpot").css('display','none');
                            $(".line-nextdraw").css('display','none');
                            
                            $(".intro-line").show();
                            $(".comment-line").hide();

                            $("#slider-panel").show();
                            $(".slider-panel-mb-static").hide();

                            $(".line-jackpot").insertAfter($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                            $(".line-nextdraw").insertAfter($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                        },0);
                    },      
                                                
                    // OPTIONAL
                    // If supplied, triggered when the media query transitions 
                    // *from a matched state to an unmatched state*.
                    unmatch : function() {
                        //$(".line-jackpot").css('height','50px');
                        $(".ball-picker-body .numbers-panel").css('display','block');
                        $(".line-jackpot").css('display','block');
                        $(".line-nextdraw").css('display','block');
                        $(".line-jackpot").insertBefore($(".line-lastdraw"));
                        $(".line-nextdraw").insertBefore($(".line-lastdraw"));
                    },    
                    
                    // OPTIONAL
                    // If supplied, triggered once, when the handler is registered.
                    setup : function() {},    
                                                
                    // OPTIONAL, defaults to false
                    // If set to true, defers execution of the setup function 
                    // until the first time the media query is matched
                    deferSetup : true,
                                                
                    // OPTIONAL
                    // If supplied, triggered when handler is unregistered. 
                    // Place cleanup code here
                    destroy : function() {}
                      
                });
            }
        }
    }])
    
    .directive('numbersGrid', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            link: function (scope, element, attrs) {

                //define a function to "watch" the change of the variables
                scope.getBallStyle = function(ballIndex){
                    //console.log('The ball style is : '+ballIndex+" "+scope.originalBalls[ballIndex].style);
                    return 'ball-'+scope.originalBalls[ballIndex].style;
                }

                var template = '<div class="numbers-grid">';
                console.log('scope variable');
                console.log(scope);
                //console.log(scope.originalBalls);

                if( scope.originalBalls && 
                    0 < scope.originalBalls.length)
                {
                    for (var i = 1; i < scope.originalBalls.length+1; i++) {
                        var ball = scope.originalBalls[i-1];
                        var newLineFlag = (1 == (i%9)) ? ",'new-line'" : "";
                        //console.log('Number Grid newLineFlag: ' + i+ ' => '+newLineFlag);
                        template += '<div '+ 'ng-class="[getBallStyle('+(i-1)+')'+
                                                         ', \'lotto-number\''+
                                                         newLineFlag+' ]"' +' ng-click="chooseNumber(' + ball.number + ');">' + ball.number + '</div>';                                                     
                    }
                }

                template += '</div>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }]).directive('integer', function () {
        return {
            require: 'ngModel',
            //priority: 500,
            link: function (scope, ele, attr, ctrl) {
                
                ctrl.$parsers.unshift(function (viewValue) {
                    return parseInt(viewValue);
                });
            }
        };
    })
    /*
        This directive is just reuse the method to switch the style
    */
    .directive('styleSwitcher',[function(){
        var switchToBall = function(ele){
            ele.removeClass('input-line-number');
            ele.removeClass('input-sm');
            ele.addClass('input-line-ball');
        };

        var switchToInput = function(ele){
            ele.removeClass('input-line-ball');
            ele.addClass('input-line-number');
            ele.addClass('input-sm');
        };

        return{
            controller:function($scope){
                this.switchToBall = switchToBall;
                this.switchToInput = switchToInput;
            },
            priority:500,
            link: function(scope, ele, attr){

            }
        }

    }])
    /*
    This directive is used on the element that need to switch style when the 
    element's number has changed
    */
    .directive('switchStyle', function () {

        var switchToBall = function(ele){
            ele.removeClass('input-line-number');
            ele.removeClass('input-sm');
            ele.addClass('input-line-ball');
        };

        var switchToInput = function(ele){
            ele.removeClass('input-line-ball');
            ele.addClass('input-line-number');
            ele.addClass('input-sm');
        };

        return {
            controller: function($scope){
                this.switchToBall = switchToBall;
                this.switchToInput = switchToInput;
            },
            require: "ngModel",
            priority: 400,
            link: function (scope, ele, attr, ngModel) {
                //switch to ball style when the page loading
                if( _.isNumber(ngModel.$modelValue) && 
                    !_.isNaN(ngModel.$modelValue)){
                    switchToBall(ele);
                }

            }
        };
    }).directive('ngUnfocus', function () {
        return {
            require: ["switchStyle", "ngModel"],
            priority: 100,
            link: function (scope, element, attrs, ctrls) {

                var switchStyleCtrl = ctrls[0];
                var ngModelCtrl     = ctrls[1];

                element.bind("blur", function (event) {
                    //console.log('The ball input field lost the cursor');

                    if( _.isNumber(ngModelCtrl.$modelValue) && 
                        !_.isNaN(ngModelCtrl.$modelValue)){
                        switchStyleCtrl.switchToBall(element);
                    }
                    
                    //apply the function bound to the element's "ng-unfocus" attribute
                    scope.$apply(function () {
                        scope.$eval(attrs.ngUnfocus);
                    });
                    //event.preventDefault();
                });

                element.bind("focus", function (event){
                    switchStyleCtrl.switchToInput(element);
                    element.select();
                });

                //the mouseup event will cancel the effect of "select()" 
                //so just return false;
                element.mouseup(function(event){
                    return false;
                });
            }
        }
    })/*.directive('nbFocus', ['$parse', function($parse) {
      return function(scope, element, attr) {
        var fn = $parse(attr['nbFocus']);
        element.bind('focus', function(event) {
            console.log('***Get Focus***');
          scope.$apply(function() {
            fn(scope, {$event:event});
          });
        });
      }
    }])*/
    /*
      This directive is used to blur the ball input field when user
      click the enter key on the keyboard
    */
    .directive('nbBallInputEnter', ['$timeout',function($timeout){
        return {
            link: function(scope, element, attrs){
                element.bind("keydown keypress",function(event){
                    if(13 === event.which){
                        event.preventDefault();
                        element.blur();
                    }
                })
            }
        }
    }])
    .directive('numChange',['$parse', 'subscriptionManager', 'Functions', '$rootScope',function($parse, subscriptionManager, Functions, $rootScope){
        return{
            require: ['ngModel', 'switchStyle'],
            priority: 200,
            link: function(scope, element, attrs, ctrls){

                console.log('inside the numChange link function');
                var ngModel     = ctrls[0];
                var switchStyle = ctrls[1];     
                if( !ngModel ) {
                    console.log('ngmodel doesnt exist');
                    return;
                }
                //console.log('The parsers are:');
                //console.log(ngModel.$parsers[0].toString());
                //console.log(ngModel.$parsers[1].toString());
                ngModel.$parsers.push(function(val){
                    //replace anything with '' that is not integer  
                    var clean = val.replace( /[^0-9]/g, '');
                    if(val !== clean){
                        //update the model value
                        ngModel.$setViewValue(clean);
                        //update the view
                        ngModel.$render();
                    }
                    return parseInt(clean);
                });

                //watch the ngModel
                scope.$watch(attrs.ngModel, function(newValue, oldValue){
                    //console.log('watching the ngModel:');
                    //console.log('old value is :'+oldValue);
                    //console.log('new value is :'+newValue);
                    if(newValue !== oldValue){
                        console.log('numChange => Number has changed');

                        //if the current element is not on focus then update the style immediately
                        if(!$(element).is(':focus')){
                            console.log('the current elememnt is not on focus');

                            //switch to ball if the new value is integer
                            if( _.isNumber(newValue) && 
                                !_.isNaN(newValue)){
                                switchStyle.switchToBall(element);
                            }
                            //else switch to input style
                            else{
                                switchStyle.switchToInput(element);
                            }
                        }

                        //check if the alert popup appear the current input field
                        var currentInvalidBallInfo = subscriptionManager.getInvalidBall();
                        console.log('the current invalid ball info is:');
                        console.log(currentInvalidBallInfo);

                        console.log("The current ball position is:");
                        console.log("lineIndex:"+attrs.lineIndex);
                        console.log("ballIndex:"+attrs.ballIndex);

                        //check if the new value is valid everytime it changes
                        /*if(false === Functions.checkSingleInput(newValue,false,true)){
                            console.log('The new value is not valid');
                            var ballType = (6==attrs.ballIndex) ? 'invalid bonus' : 'invalid';
                            data = {
                                line: attrs.lineIndex,
                                number: newValue,
                                index: attrs.ballIndex,
                                type: ballType
                            };

                            $rootScope.$emit('nb:subscription:invalidnumber', data);
                        }*/

                        //if the new value is valid and the pop up is appearing on the current input field
                        //then remove the popup alert
                        if(!_.isEmpty(currentInvalidBallInfo)){
                            if( currentInvalidBallInfo.lineIndex == parseInt(attrs.lineIndex) && 
                                currentInvalidBallInfo.ballIndex == parseInt(attrs.ballIndex)){
                                console.log('this is the alert one');

                                if(true === Functions.checkSingleInput(newValue,false,true)){
                                    $rootScope.$emit('nb:subscription:cleanup_tooltips');
                                }
                                else{
                                    
                                }
                            }
                        }

                    }
                    else if(newValue === oldValue){
                        if( !$(element).is(':focus') && 
                            _.isNumber(newValue) && 
                            !_.isNaN(newValue)){
                            switchStyle.switchToBall(element);
                        }
                    }
                });
            }
        }
    }]).directive('ballFocus', ['$parse', function($parse) {
        return function(scope, element, attr) {
            //console.log('ready to watch the nbFocus attribute');
            //console.log(scope);
            //scope.$watch('$parent.$parent.editingBall', function(newValue, oldValue){
                /*console.log('watching the editingBall');
                console.log(newValue);
                console.log(oldValue);
                if( newValue != oldValue ){
                    //newValue && element.focus();
                    console.log('the target value changed');
                    console.log(newValue);
                }*/
            //},true);
      }
    }])
    .directive('lineFocus', ['$parse', function($parse) {
        return {
            //terminal:true,
            link:function(scope, element, attr) {
                /*console.log('ready to watch the nbFocus attribute');
                console.log(scope);
                console.log('element is:');
                console.log(element);
                console.log('get all of the children input elements');
                console.log(element.find('input'));
                scope.$watch('$parent.editingBall', function(newValue, oldValue){
                    console.log('watching the editingBall');
                    console.log(newValue);
                    console.log(oldValue);
                    if( newValue != oldValue ){
                        //newValue && element.focus();
                        console.log('the target value changed');
                        console.log(newValue);
                    }
                },true);*/
            }
        }
    }]).directive('cardIframe', ['$parse', 'CardService', '$compile', function($parse, CardService, $compile){
        return{
            replace: true,
            terminal: true,
            link: function (scope, element, attr){

                console.log('Log attr on cardForm directive');
                console.log(attr);
                /*scope.$watch(attr.cardFormParam, function(newValue, oldValue){
                    if(newValue != oldValue){
                        console.log('The cardFormParam has changed to :');
                        console.log(newValue);
                        //call the card service
                        loadCardForm(newValue.amid);
                    }
                });*/

                attr.$observe('cardFormParam', function(newValue){
                    console.log('The cardFormParam has changed to :');
                    console.log(newValue);
                    console.log(newValue.amid);

                    if('' != newValue){
                        //call the card service
                        var formParamsArray = JSON.parse(newValue);
                        loadCardForm(formParamsArray.amid);
                    }
                });

                var loadCardForm = function(amid){
                    CardService.getCardForm(amid)
                        .then(function(formData){
                            //success handler function
                            console.log('The retrived html code is:');
                            console.log(formData);

                            attr.bindHtmlResponse = formData;

                            /*var newElement = angular.element(formData);
                            $compile(newElement)(scope);
                            element.replaceWith(newElement);*/

                            //element.append($compile(angular.element(formData))(scope));

                        },function(){
                            //error handler function
                        });
                }

            }
        }
    }]).directive('imgSlider', [function(){
        return{
            link: function(scope, element, attr){
                console.log('in the directive body');
                console.log($("#sequence"));
                console.log(element);
                var options = {
                    animateStartingFrameIn : false,
                    reverseAnimationsWhenNavigatingBackwards: true,
                    autoPlay: true,
                    autoPlayDelay: 5000,
                    nextButton: true,
                    prevButton: true,
                    pagination: true,

                };
                console.log($("#sequence").sequence(options));
                var sequence = $("#sequence").sequence(options).data("sequence");
                console.log(sequence);
            }
        }
    }]).directive('flipClock',['Functions', 'LotteryInfoManager','$timeout', function(Functions, LotteryInfoManager, $timeout){
        return{
            link: function(scope, element, attr){

                console.log('counter loaded');
                //Fake a time just for the DEMO:
                // Grab the current date
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

                console.log('The weekDayDiff is :'+ weekDayDiff);

                //first update the nextDrawInfo
                LotteryInfoManager.updateNextDrawInfo().then(function(){
                    var nextDrawInfo    = LotteryInfoManager.getNextDrawInfo();
                    var futureDate      = ( !_.isUndefined(nextDrawInfo.history.results) && 0<nextDrawInfo.history.results.length ) ? nextDrawInfo.history.results[0] : {};
                    console.log('the next draw date is:');
                    console.log(futureDate);

                    //------------------------
                    //HACK PART
                    // Set some date in the future. In this case, it's always Jan 1
                    futureDate  = ( !_.isEmpty(futureDate) ) ? futureDate : new Date(currentDate.getFullYear() , currentDate.getMonth(), currentDate.getDate()+weekDayDiff, 20, 10, 0);
                    console.log('the future date temp is :');
                    console.log(futureDate);
                    
                    //var futureDateStr  = "2014-08-22T19:20:00";
                    //-------------------------
                    
                    //var futureDateStr  = nextDrawInfo.history.results[0].drawDate;

                    //var dateParts    = (futureDateStr.split('T'))[0].split('-');
                    //var timeParts    = (futureDateStr.split('T'))[1].split(':');

                    //futureDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1])-1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]) );

                    //console.log('the new futureDate is:');
                    //console.log(futureDate);

                    // Calculate the difference in seconds between the future and current date
                    //var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

                    //var timeString = ""+currentDate.getFullYear() + '/' + (currentDate.getMonth()+1)  + '/' + (currentDate.getDate()+weekDayDiff) + ' ' + '17:30:00';

                    var timeString = (Functions.getNextDrawDate(futureDate)).counterStr;

                    console.log('the timeString object is:');
                    console.log(timeString);

                    $timeout(function(){
                        generateClock(timeString);
                    },1000);
                    
                },function(){

                });
                
                var generateClock = function(timeString){

                    jQuery(document).ready(function(){
                        jQuery(element).jCountdown({
                            timeText:timeString,//"2014/06/30 00:00:00",
                            //timeZone:parseInt(-(new Date().getTimezoneOffset())/60),
                            timeZone:0,
                            style:"slide",
                            color:"white",
                            width:245,
                            textGroupSpace:15,
                            textSpace:0,
                            reflection:false,
                            reflectionOpacity:10,
                            reflectionBlur:0,
                            dayTextNumber:2,
                            displayDay:true,
                            displayHour:true,
                            displayMinute:true,
                            displaySecond:true,
                            displayLabel:false,
                            onFinish:function(){
                                //alert("finish");
                                //TODO:refresh the time and display the next one
                            }
                        });
                    });
                }

            }
        }
    }]).directive('nbCalendar',[function(){
        return {
            link: function(scope, element, attr){
                console.log('loading the datepicker...');
                
                $('#datePicker').datepicker({
                    numberOfMonths:[1,2],
                    showOn: 'button', 
                    buttonText:'Date',
                    dateFormat:"yy-mm-dd"
                });
            }
        }
    /*
        use the jquery plugin function .popover() to implement the 
        notification 
    */
    }]).directive('nbNotification', ['$compile', '$timeout', '$modal', 'notiManager', 'Auth',function($compile, $timeout, $modal, notiManager, Auth){
        return {
            link: function(scope, element, attr){

                var notiArray = [];
                var notiArray = [{category:'prize',title:"You're a winner !",body:'You won &#163;25 in the Sat 21 September draw. Congratulations!'},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"}];

                

                var popupTemplate = '<div class="popover nb-noti-popover" role="tooltip">'+
                                        '<div class="arrow"></div>'+
                                        '<h3 class="popover-title"></h3>'+
                                        '<div class="popover-content"></div>'+
                                    '</div>';

                
                var numOfNotifIni   = 2;
                var popoverStatus   = 'closed';

                var getNotiIconHtml = function(type){
                    return (type==='prize') ? '<div class="noti-icon-winner"><img src="../assets/images/trophy.svg" /></div>' : '<div class="noti-icon-normal"><img src="../assets/images/notification.svg" /></div>';
                }

                var getNotiListBody = function(notiArray,numOfNoti){
                    var popupCon        = '';

                    for(var notiNum=0;notiNum<numOfNoti;notiNum++){
                        if(0>=notiArray.length){
                            break;
                        }

                        var notiObj = notiArray[notiNum];
                        var gridNum = ( (notiNum+1) % 2 === 0 ) ? 2 : 1;
                        popupCon += '<div class="row grid-'+gridNum+'">'+
                                        '<div class="col-lg-2 col-xs-2 icon-col">'+getNotiIconHtml(notiObj.category)+'</div>'+
                                        '<div class="col-lg-10 col-xs-10">'+
                                            '<p class="title">'+notiObj.title+'</p>'+
                                            '<p class="content">'+notiObj.body+'</p>'+
                                        '</div>'+
                                    '</div>';
                    }

                    //add the content as the exture part in the noti-list
                    popupCon += '<div class="row ex-noti-panel collapse"><div class="col-lg-12">';

                    for(var notiNum=numOfNoti;notiNum<notiArray.length;notiNum++){
                        var notiObj = notiArray[notiNum];
                        var gridNum = ( (notiNum+1) % 2 === 0 ) ? 2 : 1;
                        

                        popupCon += '<div class="row grid-'+gridNum+'">'+
                                        '<div class="col-lg-2 col-xs-2 icon-col">'+getNotiIconHtml(notiObj.category)+'</div>'+
                                        '<div class="col-lg-10 col-xs-10">'+
                                            '<p class="title">'+notiObj.title+'</p>'+
                                            '<p class="content">'+notiObj.body+'</p>'+
                                        '</div>'+
                                    '</div>';
                    }

                    popupCon += '</div></div>';

                    //bottom line
                    var bottomLineGridNum = (numOfNoti+1) % 2 === 0 ? 2 : 1;
                    popupCon += '<div ng-show="false === showAllNoti" class="row bottom-line grid-'+bottomLineGridNum+'">'+
                                    '<a class="open-all" ng-click="openAllNoti()" open-all>See All</a>'+
                                '</div>';

                    //add show less button
                    popupCon += '<div ng-show="true === showAllNoti" class="row bottom-line grid-'+bottomLineGridNum+'">'+
                                    '<a class="open-all" ng-click="showLess()" open-all>See Less</a>'+
                                '</div>';

                    console.log('the popupCon is:');
                    console.log(popupCon);

                    return $compile(popupCon)(scope);
                };

                var showNotiList = function(content){
                    $('.popover-dismiss').popover({
                        trigger: 'click',
                        html: true,
                        placement: 'bottom',
                        content: content,
                        template: popupTemplate,
                        title: 'Notifications',

                    });

                    //console.log('The popover obj is:');
                    //console.log(popobj);
                }

                
                scope.showAllNoti = false;

                //event for show all of the notification when user click the 'see all'
                scope.openAllNoti = function(){
                    $('.popover-dismiss').popover('hide');

                    var allNotModalIns = $modal.open({
                       templateUrl: '/partials/modals/notiList.html',
                        controller: 'NotificationModalController',
                        windowClass:'all-noti-modal-window'
                    });

                    return;

                    //collapse the rest of the panel
                    $('.ex-noti-panel').collapse('show');
                    scope.showAllNoti = true;
                    
                };

                
                scope.showLess = function(){
                    $('.ex-noti-panel').collapse('hide');
                    scope.showAllNoti = false;
                    return;
                    //$('.popover-dismiss').popover('toggle');
                    /*$('.popover-dismiss').popover('destroy');
                    showNotiList(getNotiListBody(numOfNotifIni));
                    $('.popover-dismiss').popover('show');

                    scope.showAllNoti = false;*/
                };

                //main body start
                /*if(!Auth.isAuthenticated){
                    return;
                }*/

                //notiArray = notiManager.getNotifications();
                console.log('the notification array got from notiManager are:');
                console.log(notiArray);
                
                showNotiList(getNotiListBody(notiArray, numOfNotifIni));

                //close the popup when click outside of it
                $('body').on('click', function (e) {
                    $('[data-toggle="popover"]').each(function () {
                        //the 'is' for buttons that trigger popups
                        //the 'has' for icons within a button that triggers a popup
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                });
            }
        }
    }])
    
    .directive('nbNotiList',['$compile', '$timeout', function($compile, $timeout){
        return{
            link: function(scope, element, attr){

                /*var template =  '<p>'+
                                    '<sup id="fnref:1">'+
                                        '<a href="#fn:1" rel="footnote">1</a>'+
                                    '</sup>'+
                                '</p>'+
                                '<div class="footnotes">'+
                                    '<ol>'+
                                        '<li class="footnote" id="fn:1">'+
                                            '<p>footnote.<a href="#fnref:1" title="return to article"> ↩</a><p>'+
                                        '</li>'+
                                    '</ol>'+
                                '</div>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);*/

                $timeout(function(){
                    generateClock();
                },1000);

                var generateClock = function(){

                    //jQuery(document).ready(function(){
                        //$bigfoot({

                        //});
                    //});
                }
            }
        }
    }])
    /*
        This directive is used to run blocks of functions when the screen-size changed
        with the plugin 'enquire'
    */
    .directive('mbViewUpdate',['$timeout', function($timeout){
        return {
            link: function(scope, element, attr){

                //if (matchMedia('only screen and (max-width: 510px)').matches) {
                    //element.insertAfter($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                    //$(".line-jackpot").insertAfter($(".submit-btn-line"));
                //}
                console.log('the scope for mbViewUpdate:');
                console.log(scope);

                //using the library 'enquire'
                //enquire.register("screen and (max-width:767px)", {
                enquire.register("screen and (max-width:991px)", {
                    // OPTIONAL
                    // If supplied, triggered when a media query matches.
                    match : function() {
                        console.log('mobile view screen is matched ...');

                        //realacate the two widgets after finishing the view rendering 
                        $timeout(function(){
                            //console.log('checking the target element');
                            //console.log($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                            $(".ball-picker-body .numbers-panel").css('display','none');
                            $(".line-jackpot").css('display','none');
                            $(".line-nextdraw").css('display','none');
                            
                            $(".intro-line").show();
                            $(".comment-line").hide();

                            $("#slider-panel").show();
                            $(".slider-panel-mb-static").hide();

                            $(".line-jackpot").insertAfter($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                            $(".line-nextdraw").insertAfter($(".body-right-side-panel.right-side-panel .submit-btn-line"));
                        },0);
                    },      
                                                
                    // OPTIONAL
                    // If supplied, triggered when the media query transitions 
                    // *from a matched state to an unmatched state*.
                    unmatch : function() {
                        //$(".line-jackpot").css('height','50px');
                        $(".ball-picker-body .numbers-panel").css('display','block');
                        $(".line-jackpot").css('display','block');
                        $(".line-nextdraw").css('display','block');
                        $(".line-jackpot").insertBefore($(".line-lastdraw"));
                        $(".line-nextdraw").insertBefore($(".line-lastdraw"));

                    },    
                    
                    // OPTIONAL
                    // If supplied, triggered once, when the handler is registered.
                    setup : function() {},    
                                                
                    // OPTIONAL, defaults to false
                    // If set to true, defers execution of the setup function 
                    // until the first time the media query is matched
                    deferSetup : true,
                                                
                    // OPTIONAL
                    // If supplied, triggered when handler is unregistered. 
                    // Place cleanup code here
                    destroy : function() {}
                      
                });
            }
        }
    }])
    .directive('mbViewEditPageUpdate',['$timeout', function($timeout){
        return {
            link: function(scope, element, attr){

                enquire.register("screen and (max-width:991px)", {
                    // OPTIONAL
                    // If supplied, triggered when a media query matches.
                    match : function() {
                        console.log('mbViewEditPageUpdate mobile view screen is matched ...');

                        //realacate the two widgets after finishing the view rendering 
                        $timeout(function(){
                            //reorder the elements on edit-ball page
                            if($(".draw-edit-body")){
                                $(".line-lastdraw-big").css('display','block');
                                $(".line-lastdraw-big").insertAfter($(".line-nextdraw"));
                                $(".line-nextdraw").css('display','block');
                                $(".package-line .package-collapse-content").css('display','block');
                            }
                            
                        },0);
                    },      
                                                
                    // OPTIONAL
                    // If supplied, triggered when the media query transitions 
                    // *from a matched state to an unmatched state*.
                    unmatch : function() {
                        console.log('mbViewEditPageUpdate mobile view screen is unmatched ...');
                        $timeout(function(){
                            //if($(".draw-edit-body")){
                                //$(".line-lastdraw-big").css('display','block');
                                $(".line-lastdraw-big").insertAfter($(".anchor-header"));
                            //}
                        },0);
                        
                    },    
                    
                    // OPTIONAL
                    // If supplied, triggered once, when the handler is registered.
                    setup : function() {},    
                                                
                    // OPTIONAL, defaults to false
                    // If set to true, defers execution of the setup function 
                    // until the first time the media query is matched
                    deferSetup : true,
                                                
                    // OPTIONAL
                    // If supplied, triggered when handler is unregistered. 
                    // Place cleanup code here
                    destroy : function() {}
                      
                });
            }
        }
    }])
    /*
      This directive is used on the mobile view
      When user first click on the "play" button the hidden elements will be displayed
      When user click again then submit the form
    */
    .directive('mbViewPlayBtn',[function(){
        return{
            link: function(scope, element, attr){

                element.on('click', function(event){

                    if($(".ball-picker-body .numbers-panel").css('display') == 'none'){
                        //display the number panel
                        //$(".numbers-panel").css('display','block');
                        $(".ball-picker-body .numbers-panel").show(400);
                        $(".intro-line").hide();
                        $(".comment-line").show();

                        $("#slider-panel").hide();
                        $(".slider-panel-mb-static").show();

                        $(".line-jackpot").show();
                        $(".line-nextdraw").show();
                    }
                    else{
                        scope.saveSubscriptionAndRegister();
                    }
                    
                });
                
            }
        }
    }])

    .directive('mbPaymentTab',[function(){
        return{
            restrict:'E',
            replace:true,
            scope:{ card: '=' },
            link: function(scope, element, attr){

            }
        }
    }])

    /* This directive is used to attached to any element that when click event happens
       on them the account page will be opened through service 
    */
    .directive('mbAccountLink',['UserService', function(UserService){
        return{
            
            link: function(scope, element, attr){

                element.bind('click',function(e){
                    UserService.openAccountPage();
                    
                })
            }
        }
    }])
    /*
        This directive is used in the account page --> payment method section
        because each card needs its own scope 
    */
    .directive('mbUpdateCardExpiry',[ '$compile', 'CardService' ,function($compile, CardService){
        return{
            restrict:'AE',
            //replace: true,
            terminal: true,
            scope:{card:'='},
            link: function(scope, element, attr){
                console.log('the card obj is:');
                console.log(scope);

                scope.updateStatus = 'ready';

                var expiryDate  = scope.card.expiry;
                var expiryMonth   = ( expiryDate && _.isString(expiryDate) && '' != expiryDate.trim(expiryDate) ) ? parseInt((expiryDate.split('/'))[0]) - 1 : '';
                var expiryYear   = ( expiryDate && _.isString(expiryDate) && '' != expiryDate.trim(expiryDate) ) ? 2000+parseInt((expiryDate.split('/'))[1]) : '';

                console.log('the expiry day and year are:');
                console.log(expiryDate);
                console.log(expiryMonth);
                console.log(expiryYear);

                scope.expiryMonth = expiryMonth;
                scope.expiryYear = expiryYear;

                scope.getNewExpiryDate = function(){
                    return ( (scope.expiryMonth<9) ? "0"+(scope.expiryMonth+1) : ""+(scope.expiryMonth+1) ) + (""+scope.expiryYear).substring(2);
                }

                scope.updateCardExpiryDate = function(){
                    CardService.updateCardExpiryDate(scope.card.cardId,scope.getNewExpiryDate()).then(function(){
                        scope.updateStatus = 'successful';
                    },function(){
                        scope.updateStatus = 'failed';
                    });
                }
                


                var template = 
                    '<div class="row">'+
                        '<div class="col-lg-6 col-lg-offset-3">'+
                            '<div class="row">'+
                                '<div class="col-lg-4 col-xs-4 content-title">Expiry date:</div>'+
                                '<div class="col-lg-3 col-xs-4 month-select-col">'+
                                    //<!-- <select name="viewMonth" id="viewMonth" class="month-picker" ng-model="viewMonth" ng-options="month.id as month.value for month in monthArray"></select> -->
                                    '<span class="dropdown" on-toggle="toggled(open)">'+
                                        '<button type="button" data-toggle="dropdown" class="btn btn-primary" >'+
                                            '{{($parent.monthArray[expiryMonth]).value}} <span class="caret"></span>'+
                                        '</button>'+
                                        '<ul class="dropdown-menu">'+
                                            '<li ng-repeat="month in $parent.monthArray">'+
                                                '<a ng-click="$parent.expiryMonth = month.id;closeDropDown()">{{month.value}}</a>'+
                                            '</li>'+
                                        '</ul>'+
                                    '</span>'+
                                '</div>'+
                                '<div class="col-lg-3 col-xs-4 year-select-col">'+
                                    //'<select name="viewYear" id="viewYear" class="year-picker" ng-model="viewYear" ng-options="year for year in yearArray"></select>'+
                                    '<span class="dropdown" on-toggle="toggled(open)">'+
                                        '<button type="button" data-toggle="dropdown" class="btn btn-primary" >'+
                                            '{{ -1 !== $parent.yearArray.indexOf(expiryYear) ? expiryYear : ""}} <span class="caret"></span>'+
                                        '</button>'+
                                        '<ul class="dropdown-menu">'+
                                            '<li ng-repeat="year in $parent.yearArray">'+
                                                '<a ng-click="$parent.expiryYear = year;closeDropDown()">{{year}}</a>'+
                                            '</li>'+
                                        '</ul>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="row row-buffer-normal visible-xs"></div>'+    
                        '<div class="col-xs-6 button-line visible-xs">'+
                            '<button class="pull-right">CANCEL</button>'+
                        '</div>'+
                        '<div class="col-lg-3 col-xs-6 button-line">'+
                            '<div class="btn-right-side pull-right" ng-show="updateStatus === \'ready\' "></div>'+
                            '<button ng-show="updateStatus === \'ready\' " class="pull-right" ng-click="updateCardExpiryDate()">SAVE</button>'+
                            '<p ng-show="updateStatus === \'successful\' ">Saved!</p>'+
                        '</div>'+
                    '</div>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }])

    /*  This directive is used for update the style of the line on ball picker page
        
    */
    .directive('nbDuplicateLine',[ '$compile', function($compile){
        return {
            restrict:'AE',
            require: ['styleSwitcher'],
            link: function(scope, element, attr, ctrls){
                console.log('inside the duplicate line directive');
                console.log(scope);

                var switchStyle     = ctrls[0];

                var highLightDuplicateLine = function(){
                    element.addClass('high-light');

                    //find all of the input children element 
                    var inputElems = element.find('input');
                    console.log('the found input elements');
                    console.log(inputElems);

                    _.each(inputElems, function(elem){
                        switchStyle.switchToInput($(elem));
                    });
                }

                var removeStyle = function(){
                    element.removeClass('high-light');
                }

                scope.$watch('line.msgType', function(newValue, oldValue){

                    if(newValue !== oldValue){

                        switch(newValue){
                            case 'duplicate':
                                highLightDuplicateLine();
                                break;

                            default:
                                removeStyle();
                                break;
                        }
                    }
                });
            }
        }
    }])

/*    .directive('nbBreadCrumbs',['$rootScope', 'breadCrumbs',function($rootScope, breadCrumbs){
        return{
            restrict:'AE',
            link: function(scope, element, attr){
                $rootScope.breadCrumbs = breadCrumbs.generate();
            }
        }
    }])*/;