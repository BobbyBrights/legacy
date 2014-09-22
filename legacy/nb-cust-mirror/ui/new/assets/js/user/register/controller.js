'use strict';
angular.module('nb.controllers')
	.controller('RegisterController',[ '$rootScope' ,'$scope', '$modalInstance', '$stateParams', '$state', '$modal', '$config', 'phoneService', 'subscriptionManager','UserService', '$q', 'SubscriptionService', 'userInfoManager','$timeout', 'UserSubscription','UserSharedProperties', 'Auth', '$log','transformRequestAsFormPost', '$http', 'Functions',
		function($rootScope, $scope, $modalInstance, $stateParams, $state, $modal, $config, phoneService, subscriptionManager, UserService, $q, SubscriptionService, userInfoManager, $timeout, UserSubscription, UserSharedProperties, Auth, $log, transformRequestAsFormPost, $http, Functions){

			//before any

			console.log('Output the scope');
	        console.log($scope);

	        console.log('Log the stateParams in the controller:');
	        console.log($stateParams);

	        //pre-defined functions which are used to initilize other parameters
	        var getBirthDateMaxDate = function (){
	            var currentDate = new Date();
	            var targetDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate() +1);
	            return (targetDate.getFullYear() )+"-"+( (targetDate.getMonth()+1)<10 ? "0"+ (targetDate.getMonth()+1) : (targetDate.getMonth()+1) )+"-"+( targetDate.getDate() <10 ? "0"+targetDate.getDate() : targetDate.getDate() );
	        };

	        var getBirthDateMinDate = function(){
	            var currentDate = new Date();
	            return (currentDate.getFullYear() - 150)+"-"+( (currentDate.getMonth()+1)<10 ? "0"+ (currentDate.getMonth()+1) : (currentDate.getMonth()+1) )+"-"+currentDate.getDate();  
	        }


	        //few steps to check where should we bring the custormer to

	        //first:
			//check the 'step' variable from the query string

	        //second:
	        //TODO: check if the phone number already in database
	        //If not then follow the normal steps
	        //If yes then log the user in? And jump to the choosing card page? 

	        //initialization
	        $scope.forms 					= {};
	        $scope.mainTitle				= 'WELCOME TO NOVABALL';
	        $scope.modalHeading             = 'Register';
	        $scope.showMsisdnForm           = false;
	        $scope.showPNReEnterForm		= false;
	        $scope.showPinVerificationForm  = false;
	        $scope.showRegistrationForm 	= false;
	        $scope.showCardForm             = false;
	        $scope.showPaymentForm          = false;
	        $scope.showPMSucceedForm		= false;
	        $scope.showChooseCardsForm		= false;
	        $scope.showExistingCardForm		= false;
	        $scope.showExistingSubForm 		= false;
	        $scope.showS3dIframe 			= false;

	        $scope.showLoginAfterEmailCheck = false; //whether to display the login link after the email check
	        
	        $scope.resendingPin 			= false;
	        $scope.pinResent 				= false;
	        $scope.pinResentResult 			= '';

	        $scope.card_form_param			= '';

	        $scope.userWallet 				= {};
	        $scope.cardParams 				= {};
	        $scope.cardParams.selectedCardArrayIndex	= -1;
	        $scope.cardParams.finishLoadingCards		= false;
	        $scope.cardParams.loadCardHasErr			= false;
	        $scope.cardParams.loadCardErrMsg			= '';

	        $scope.cardParams.chooseCardHasErr			= false;
	        $scope.cardParams.chooseCardErrMsg			= "";

	        $scope.cardParams.selectedCard 				= {};		
	        $scope.finishAddNewCard 					= false;//whether to display the "Thanks for adding your card" on payment form

	        $scope.userCards 							= [];
	        //test dumy data
	        /*$scope.userCards = [{holdername:'test1',card_type:'Visa',card_num:'*******1111',expire_date:'20/08'},
				    								{holdername:'test1',card_type:'Visa',card_num:'*******2222',expire_date:'20/08'},
				    								{holdername:'test1',card_type:'Visa',card_num:'*******3333',expire_date:'20/08'}];
*/

	        //define an array to store the emails that have been registered
	        var registeredEmails			= [];
	        //store the info from the basic registration form
	        var oldUserInfo					= {};

	        //Form parameter for adding new user
	        //initialize the user object
	        $scope.user = {
	        	phoneNumber	: '',//just for prototype
	        	phoneNumRe  : '',
	        	pin 		: '',
	        	pinToken 	: '',
	            title       : '',
	            firstname   : '',
	            surname     : '',
	            countryOfResidence: '',
	            birthDate   : '',
	            birthDateYear: 'Year',
	            birthDateMonth: 'Month',
	            birthDateDay: 'Date',
	            email       : '',
	            password    : '',
	            repassword  : '',
	            marketingOptIn      : false,
	            termncond   : false,
	            minBirthdate: getBirthDateMinDate(),
	            maxBirthdate: getBirthDateMaxDate(),
	            pnReEnterFormSubmitted : false,
	            pinVerifyFormSubmitted: false,
	            formSubmitted : false,
	            needValidation : true //just for functional prototype
	        };

	        $scope.payments = {
	        	cvv				: '',
	        	subscriptions 	: {},
	        	formSubmitted 	: false,
	        	formHasError	: false,
	        	formMsg			: '' 
	        };

	        //fill with dumy data just for test
	        /*$scope.user = {
	        	phoneNumber	: '12332111',//just for prototype
	            title       : 'Mr.',
	            firstname   : 'test',
	            surname     : 't',
	            countryOfResidence: 'United Kingdom',
	            birthDate   : '1992-01-02',
	            email       : 'test@gmail.com',
	            password    : '123123',
	            repassword  : '123123',
	            marketingOptIn      : true,
	            termncond   : false,
	            minBirthdate: getBirthDateMinDate(),
	            maxBirthdate: getBirthDateMaxDate(),
	            formSubmitted : false,
	            formHasError: false,
	            formMsg 	: '',
	            needValidation : true //just for functional prototype
	        };*/

	        $scope.titleList    = ['Mr.','Mrs.','Ms.'];
	        $scope.countryList  = ['United Kingdom'];
	        var countryCode		= ['GB'];

	        $scope.user.errors  = {
	            title       : { hasError: false, errorMsg: ''},
	            firstname   : { hasError: false, errorMsg: ''},
	            surname     : { hasError: false, errorMsg: ''},
	            countryOfResidence: { hasError: false, errorMsg: ''},
	            birthDate   : { hasError: false, errorMsg: ''},
	            email       : { hasError: false, errorMsg: ''},
	            password    : { hasError: false, errorMsg: ''},
	            repassword  : { hasError: false, errorMsg: ''},
	            marketingOptIn      : { hasError: false, errorMsg: ''},
	            termncond   : { hasError: false, errorMsg: ''}
	        };

	        //Form parameter for adding card
	        $scope.card = {
	            cardtype    : false,
	            holdername  : false,
	            cardnum     : false,
	            expiremonth : false,
	            expireyear  : false,
	            country     : false,
	            billadd1    : false,
	            billadd2    : false,
	            city        : false,
	            region      : false,
	            postcode    : false
	        };
	        $scope.card.errors = {
	            cardtype    : { hasError: false, errorMsg: ''},
	            holdername  : { hasError: false, errorMsg: ''},
	            cardnum     : { hasError: false, errorMsg: ''},
	            expiremonth : { hasError: false, errorMsg: ''},
	            expireyear  : { hasError: false, errorMsg: ''},
	            country     : { hasError: false, errorMsg: ''},
	            billadd1    : { hasError: false, errorMsg: ''},
	            billadd2    : { hasError: false, errorMsg: ''},
	            city        : { hasError: false, errorMsg: ''},
	            region      : { hasError: false, errorMsg: ''},
	            postcode    : { hasError: false, errorMsg: ''}
	        }

	        $scope.birthDateYearGroup 	= [];
	        $scope.birthDateMonthGroup 	= [];
	        $scope.birthDateDayGroup 	= [];
	        $scope.iniBirthDateDayAmount = 31;

	        $scope.cardtypes = ['Master','Visa'];
	        $scope.months = _.range(1,13);
	        $scope.years = _.range(new Date().getFullYear(), new Date().getFullYear()+15);

	        //get shared properties
	        $scope.userSubscription = subscriptionManager.getNewSubscriptions();
	        console.log('the userSubscription the user choose from landing page is:');
	        console.log($scope.userSubscription);
	        //console.log('The numDraws is:'+ $scope.userSubscription.numDraws);

	        /*var testCards	= [	{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'},
								{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'},
								{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'}];
*/

	        /*******************************
	         * Private function definition *
	         *******************************/

	        //user registration form validation
	        var checkRegisterForm = function(isFormValid){
	            console.log('do checking register form');
	            console.log('Logging the valid status of this form:'+isFormValid);

	            console.log('Summary Flag: '+isFormValid);
	        };


	        var checkUsermarketingOptIn = function(){
	            console.log('checking the user marketingOptIn');
	            console.log($scope.user.marketingOptIn);

	            if(!$scope.user.marketingOptIn){
	                $scope.user.errors.marketingOptIn.hasError  = true;
	                $scope.user.errors.marketingOptIn.errorMsg  = 'The marketingOptIn needs to be accepted.';
	            }
	            else{
	                $scope.user.errors.marketingOptIn.hasError  = false;
	            }
	        };

	        var checkUserTernCond = function(){
	            if(!$scope.user.termncond){
	                $scope.user.errors.termncond.hasError  = true;
	                $scope.user.errors.termncond.errorMsg  = 'The Terms and Conditions needs to be accepted.';
	            }
	            else{
	                $scope.user.errors.termncond.hasError  = false;
	            }
	        };


	        //validation for adding new card
	        var checkCardForm = function(){
	            checkCardType();
	            checkCardHolderName();
	            checkCardNumber();
	            checkCardExpireDate();
	            checkCardCountry();
	            checkCardBillAdd1();
	            checkCardCity();
	            checkCardCounty();
	            checkCardPostCode();
	        };

	        var checkCardType = function(){
	            if( !$scope.card.cardtype ){
	                $scope.user.errors.cardtype.hasError = true;
	                $scope.user.errors.cardtype.errorMsg = 'The Card Type field is required.';
	            }
	        };

	        var checkCardHolderName = function(){
	            if( !$scope.card.holdername ){
	                $scope.user.errors.holdername.hasError = true;
	                $scope.user.errors.holdername.errorMsg = "The Cardholder's Name field is required.";
	            }
	        };

	        var checkCardNumber = function(){
	            if( !$scope.card.cardnum ){
	                $scope.user.errors.cardnum.hasError = true;
	                $scope.user.errors.cardnum.errorMsg = 'The Card Number field is required.';
	            }
	        };

	        var checkCardExpireDate = function(){
	            if( !$scope.card.expiremonth ){
	                $scope.user.errors.expiremonth.hasError = true;
	                $scope.user.errors.expiremonth.errorMsg = 'The Expire Month field is required.';
	            }

	            if( !$scope.card.expireyear ){
	                $scope.user.errors.expireyear.hasError = true;
	                $scope.user.errors.expireyear.errorMsg = 'The Expire Year field is required.';
	            }
	        };

	        var checkCardCountry = function(){
	            if( !$scope.card.country ){
	                $scope.user.errors.country.hasError = true;
	                $scope.user.errors.country.errorMsg = 'The Country field is required.';
	            }
	        };

	        var checkCardBillAdd1 = function(){
	            if( !$scope.card.billadd1 ){
	                $scope.user.errors.billadd1.hasError = true;
	                $scope.user.errors.billadd1.errorMsg = 'The Billing Address 1 field is required.';
	            }
	        };

	        var checkCardCity = function(){
	            if( !$scope.card.city ){
	                $scope.user.errors.city.hasError = true;
	                $scope.user.errors.city.errorMsg = 'The City field is required.';
	            }
	        };

	        var checkCardCounty = function(){
	            if( !$scope.card.region ){
	                $scope.user.errors.region.hasError = true;
	                $scope.user.errors.region.errorMsg = 'The County/Region field is required.';
	            }
	        };
	        var checkCardPostCode = function(){
	            if( !$scope.card.postcode ){
	                $scope.user.errors.postcode.hasError = true;
	                $scope.user.errors.postcode.errorMsg = 'The Postcode field is required.';
	            }
	        };

	        var displayRegErrMsg = function (errMsg){
	        	if( -1 != errMsg.indexOf('Duplicate entry') && 
	        		-1 != errMsg.indexOf('name_uni') ){
	        		//email address is duplicate
	        		
	        		$scope.forms.registerForm.email.$setValidity("duplicate", false);
	        		console.log('Setting the duplicate error');
	        		console.log($scope.forms.registerForm);

	        		//add the duplicate email to the 'registeredEmails' array
	        		if( -1 == _.indexOf(registeredEmails, oldUserInfo.email)){
	        			registeredEmails.push(oldUserInfo.email);
	        		}

	        		console.log('The registered emails are:');
	        		console.log(registeredEmails);
	        	}
	        };

	        var clearRegForm = function (){
	        	//reset duplicate value
	        	$scope.forms.registerForm.email.$setValidity("duplicate", true);

	        	//reset the form error message 
	        	$scope.user.formMsg = '';
	        }

	        var showAddCardForm = function(){
	        	//$scope.card_form_param = paramObj;

	        	//refresh the userInfo before use it
	        	userInfoManager.getUserInfo().then(function(data){
	        		userInfo = data;
		        	//reset the flag variable to display the loading spinner of 'choosing card form'
		        	$scope.cardParams.finishLoadingCards = false;
		        	console.log('ready to add the card:');
		        	console.log(userInfo);
		        	console.log(userInfo.am_id);

		        	//-------------------------------------------------
		        	//Quick way for testing:
		        	//TODO:remove the lines below to fire the real logic
		        	//userInfo.am_id = 28;

		        	//--------------------------------------------------

		        	//check the 'am_id' property
		        	if( !_.isEmpty(userInfo) && 
		        		userInfo.am_id){

		        		console.log('setting the adding card url');
		        		//$('#add_payment_card').attr('src','http://54.72.210.157/add_card/24?final_url=http%3A%2F%2F0.0.0.0%3A4444');
		        		//var call_back_url = 'http://54.72.103.19/paymentSuccess';

		        		//fix the issue that no 'window.location.origin' in ie browser
		        		if (!window.location.origin) {
  							window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
						}

		        		if( '/' !== window.location.origin.charAt(window.location.origin.length-1)){
		        			var call_back_url = window.location.origin + '/' + 'partials/pages/payment/' + 'paymentSuccess.html';
		        		}else{
		        			var call_back_url = window.location.origin + 'partials/pages/payment/' + 'paymentSuccess.html';
		        		}
		        		

		        		$('#add_payment_card').attr('src','add_card/'+userInfo.am_id+'?final_url='+encodeURIComponent(call_back_url));	
		        		//$('#add_payment_card').attr('src','../partials/includes/cardform2.html?final_url='+encodeURIComponent(call_back_url));	
		        	}

		        	//just for test purpose
		        	//TODO: remove this line in production mode
		        	//$('#add_payment_card').attr('src','add_card/28?final_url=http%3A%2F%2F0.0.0.0%3A4444/paymentSuccess');
	        	},function(){

	        	});

	        		

	        };

	        var getUserCards = function(){
	        	//send request to get the info about user's cards
	        	//display the loading spinner
	        	console.log('getting the user cards...');
	        	$scope.cardParams.finishLoadingCards	= false;

	        	//var deferred = $q.defer();

	        	return userInfoManager.updateUserCards().then(function(){
	        		var cardObj = userInfoManager.getUserCards();
	        		console.log('the retrived cards list is:');
	        		console.log(cardObj);
	        		$scope.userCards = cardObj.cards;

	        		var cardsAmount = (!_.isUndefined($scope.userCards) && !_.isUndefined($scope.userCards.length)) ? $scope.userCards.length : 0 ;
	        		$scope.cardParams.finishLoadingCards	= true;

	        		return {hasErr:false, data:cardsAmount};
	        	},function(errObj){
	        		$scope.cardParams.finishLoadingCards	= true;

			    	return {hasErr:true, data:0, msg:'error happened while getting the cards info'};
	        	});

	        	//update the user's wallet info
			    /*
			    	return userInfoManager.updateUserWallet().then(function(){
			    	//if update successfully then fetch the updated wallet
			    	$scope.userWallet = userInfoManager.getUserWallet();

			    	//*********************************************
			    	//HACK part
			    	//generate some mock data only for test
			    	//TODO: remove this part in the production mode
			    	var cardsAmount = 3;

			    	$scope.userCards = [{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'},
			    								{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'},
			    								{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'}];
			    		

			    	//*********************************************

			    	//update the flag variable to show all of the credit cards' info
			    	$scope.cardParams.finishLoadingCards	= true;

			    	//get the amount of the credit cards the user has
			    	//resolve with the amount of the cards
			    	//TODO: asign the amount of the cards to the variable cardsAmount when get /wallet is finished
			    	//var cardsAmount = ;

			    	return {hasErr:false, data:cardsAmount};

			    },function(errObj){
			    	console.log('The error object of userInfoManager.updateUserWallet() inside the getUserCards is:');
			    	console.log(errObj);
			    	//error handler when cant load credit cards info
			    	$scope.cardParams.finishLoadingCards	= true;

			    	return {hasErr:true, data:0, msg:'error happened while getting the cards info'};
			    	//TODO: show error message when can't load or error eccor
			    	//$scope.cardParams.loadCardHasErr = errMsgObj.hasError;
			    	//$scope.cardParams.loadCardErrMsg = errMsgObj.msg;

			    	//$scope.userCards = [{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'},
			    	//							{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'},
			    	//							{holdername:'test1',card_type:'Visa',card_num:'*******1234',expire_date:'20/08'}];
			    	//				
				});
				*/
	        };

	        //try to catch the submit event inside the adding card iframe
	        $('#add_payment_card').load(function(){
	        	console.log('Inside card iframe loading function');

	        	var iframe = $('#add_payment_card').contents();

	        	iframe.find("#form_helper").submit(function(event){
		        	console.log('Card form is submitted');
		        	console.log(event);
		        });
	        });

	        /*
			 * Catch the load event when the iframe is reloading
	        */
	        window.loadCardForm = function(iframe){
	        	console.log('loading card iframe...');
	        	console.log('The iframe is redirected to :'+$(iframe).attr('src'));

	        	console.log('iframe object:');
	        	console.log($('#add_payment_card'));

	        	var iframeElem = document.getElementById('add_payment_card');
	        	var iframeWinObj = (iframeElem.contentWindow || iframeElem.contentDocument);
	        	var redirectUrl = iframeWinObj.location.href;

	        	console.log('log the iframe inner window object');
	        	console.log(iframeWinObj);
	        	console.log('The redirection target url is:');
	        	console.log(redirectUrl);

	        	//attach the css file to the iframe
	        	if( !_.isUndefined($(iframe).attr('src')) && 
	        		$(iframe).attr('src')){
	        		var $head = $('#add_payment_card').contents().find("head");                
					$head.append($("<link/>", { rel: "stylesheet", href: "../../../assets/styles/payments-iframe.css", type: "text/css" }));
	        	}

	        	//catch the server redirection event when user successfully add a card
	        	//var targetUrlPattern = /^(http:\/\/0\.0\.0\.0:4444\/paymentSuccess[\/]?)$/;54.72.103.19
	        	//var targetUrlPattern = /^(http:\/\/54\.72\.103\.19\/paymentSuccess[\/]?)$/;
	        	var targetUrlPattern = /^(.*\/paymentSuccess.*)$/;
	        	if( targetUrlPattern.test(redirectUrl)){
	        		console.log('Get the desired redirection url');

	        		//stop bubbling the event
				    //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true)
				    //event.preventDefault();

				    //close the adding card form
					$scope.closeAddCardForm();	
					//open the choose card form
					$scope.openChooseCardForm();
					//trigger the variable checking process
					$scope.$digest();
	        	}

	        	var iframe = $('#add_payment_card').contents();

	        	//=====================================
	        	//Hack part: pre-fill the fields of the card form
	        	//just for the prototype


	        	//=====================================

	        	var iframeForm = iframe.find("#form_helper");

	        	iframeForm.submit(function(event){
		        	console.log('Card form is submitted');
		        	console.log(event);

				    console.log('iframeForm:');
				    console.log(iframeForm);

				    console.log('serialize the input values');
				    console.log(iframeForm.serializeArray());

				    //************************************************************
				    //HACK PART
				    //TODO: remove this part in production mode
				    
				    //stop bubbling the event
				    //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true)
				    //event.preventDefault();
				    //display the choose card form
				    //close the adding card form
					//$scope.closeAddCardForm();	
					//open the choose card form
					//$scope.openChooseCardForm();
					//$scope.openPaymentForm();


					//$scope.$digest();

					//return;

				    //update the user's wallet info
				    userInfoManager.updateUserWallet().then(function(){
				    	//if update successfully then fetch the updated wallet
				    	$scope.userWallet = userInfoManager.getUserWallet();

				    	//--------------------------------
				    	//TODO: remove the lines below when under product mode
				    	//$scope.userCards = testCards;
				    	//--------------------------------

				    	//update the flag variable to show all of the credit cards' info
				    	$scope.cardParams.finishLoadingCards	= true;

				    },function(errMsgObj){
				    	console.log('This is the error object when loading user wallet:');
				    	console.log(errMsgObj);
				    	//error handler when cant load credit cards info
				    	$scope.cardParams.finishLoadingCards	= true;
				    	//TODO: show error message when can't load or error eccor
				    	//$scope.cardParams.loadCardHasErr = errMsgObj.hasError;
				    	//$scope.cardParams.loadCardErrMsg = errMsgObj.msg;
				    });

					//display the payment form
					//$scope.closeAddCardForm();

					//$scope.$digest();
					//************************************************************
		        });
	        };

	        window.submitCardForm = function(){
	        	console.log('onsubmit event is fired on iframe');
	        };

	        window.autoResizeIframeCon = function(id){
	        	var newheight;
			    var newwidth;

			    if(document.getElementById){
			        newheight=document.getElementById(id).contentWindow.document .body.scrollHeight;
			        newwidth=document.getElementById(id).contentWindow.document .body.scrollWidth;
			    }

			    document.getElementById(id).height= (newheight) + "px";
			    document.getElementById(id).width= (newwidth) + "px";
	        }

	        window.load3dsForm = function(iframe){
	        	console.log('loading card iframe...');
	        	console.log('The iframe is redirected to :'+$(iframe).attr('src'));

	        	console.log('iframe object:');
	        	console.log($('#s3dIframe'));

	        	var iframeElem = document.getElementById('s3dIframe');
	        	var iframeWinObj = (iframeElem.contentWindow || iframeElem.contentDocument);
	        	var redirectUrl = iframeWinObj.location.href;

	        	console.log('log the iframe inner window object');
	        	console.log(iframeWinObj);
	        	console.log('The redirection target url is:');
	        	console.log(redirectUrl);

	        	//=====================================
	        	//Hack part: pre-fill the fields of the card form
	        	//just for the prototype


	        	//=====================================

	        	//var iframeForm = iframe.find("#form_helper");

	        	iframeElem.submit(function(event){
	        	//iframeForm.submit(function(event){
		        	console.log('3ds form is submitted');
		        	console.log(event);

		        	return;

				    console.log('iframeForm:');
				    console.log(iframeForm);

				    console.log('serialize the input values');
				    console.log(iframeForm.serializeArray());

				    //************************************************************
				    //HACK PART
				    //TODO: remove this part in production mode
				    
				    //stop bubbling the event
				    //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true)
				    //event.preventDefault();
				    //display the choose card form
				    //close the adding card form
					//$scope.closeAddCardForm();	
					//open the choose card form
					//$scope.openChooseCardForm();
					//$scope.openPaymentForm();


					//$scope.$digest();

					//return;

				    //update the user's wallet info
				    userInfoManager.updateUserWallet().then(function(){
				    	//if update successfully then fetch the updated wallet
				    	$scope.userWallet = userInfoManager.getUserWallet();

				    	//--------------------------------
				    	//TODO: remove the lines below when under product mode
				    	//$scope.userCards = testCards;
				    	//--------------------------------

				    	//update the flag variable to show all of the credit cards' info
				    	$scope.cardParams.finishLoadingCards	= true;

				    },function(errMsgObj){
				    	console.log('This is the error object when loading user wallet:');
				    	console.log(errMsgObj);
				    	//error handler when cant load credit cards info
				    	$scope.cardParams.finishLoadingCards	= true;
				    	//TODO: show error message when can't load or error eccor
				    	//$scope.cardParams.loadCardHasErr = errMsgObj.hasError;
				    	//$scope.cardParams.loadCardErrMsg = errMsgObj.msg;
				    });

					//display the payment form
					//$scope.closeAddCardForm();

					//$scope.$digest();
					//************************************************************
		        });
	        };

	        //src="/partials/includes/cardform.html?token=44ef2863233b47892b930d71001878b64e4b0353c9161f796c07e6978b476616&amp;final_url=https://www.betbrightpcitesting.com/account/cards&amp;product=1"

	        /*document.getElementById("add_payment_card").contentWindow.document.body.onclick = 
			function() {
			  console.log("iframe clicked");
			}*/

	        /*******************************
	         * Public functions definition *
	         *******************************/

	        //monitoring the email input field
	        $scope.checkDuplicateEmail = function(){
	        	if( -1 != _.indexOf(registeredEmails, $scope.user.email) ){
	        		$scope.forms.registerForm.email.$setValidity("duplicate", false);
	        	}
	        	else{
	        		$scope.forms.registerForm.email.$setValidity("duplicate", true);
	        	}
	        }

	        $scope.setTitle = function(_title) {
	            console.log('Calling set title');
	            $scope.user.title = _title;
	        }

	        //submit phone number formf
	        $scope.validateNumber = function (phoneNumInput,formInvalid) {
	        	$scope.user.pnReEnterFormSubmitted = true;

	        	if(!formInvalid){
	        		return;
	        	}

	        	phoneService.verifyPhone(phoneNumInput).then(function(data){
	        		if( !_.isUndefined(data.hasError) && 
	        			false === data.hasError){
	        			//update the phone number modal on the pin verification form
	        			$scope.user.phoneNumber = phoneNumInput;

	        			//replace the phone number in the "oldUserInfo" object
	        			oldUserInfo.mobileNo = phoneNumInput;

	        			//reset the phoneNumInput
	        			$scope.user.msisdn 		= '';
	        			$scope.user.phoneNumRe 	= '';

	        			$scope.showMsisdnForm 		= false;
	        			$scope.showPNReEnterForm 	= false;
	        			$scope.user.pnReEnterFormSubmitted = false;
	                    $scope.openPinVerificationForm();
	        		}
	        	},function(){

	        	});

	            /*VerifyPhone.query({msisdn: $scope.user.msisdn}, function (data) {
	                console.log('Result of validating phone number:');
	                console.log(data);
	                if (data.$resolved) {
	                    $scope.showMsisdnForm = false;
	                    $scope.openPinVerificationForm();
	                }
	            });*/
	        };

	        //resend the pin
	        $scope.resendPin 	= function(){
	        	//the resending is in progress, just ignore
	        	if(true === $scope.resendingPin){
	        		return;
	        	}
	        	//update the status
	        	$scope.resendingPin = true;
	        	
	        	//resend pin means re-create the 'lead', the number will be the same as the one inside 'oldUserInfo'
	        	//TODO:ADD time limitation between two 're-send pin' request
	        	phoneService.resendPin(oldUserInfo.mobileNo).then(function(data){
	        	//phoneService.verifyPhone(oldUserInfo.mobileNo).then(function(data){
	        		if( !_.isUndefined(data.hasError) && 
	        			false === data.hasError){
	        			//update the status after secs
	        			$timeout(function(){
		        			$scope.resendingPin = false;
		        			$scope.pinResent 	= true;
		        			$scope.pinResentResult = true;
		        		},2000);

	        			//TODO:show promp after receive the response

	        		}
	        	},function(){
	        		//if failed then hide the spinner in 20 sec
	        		//TODO:show error message and hide the spinner
	        		$timeout(function(){
	        			$scope.resendingPin 	= false;
	        			$scope.pinResentResult 	= false;
	        		},5000);
	        	});
	        };


	        //submit pin validation form
	        $scope.validatePIN = function () {
	        	$scope.user.pinVerifyFormSubmitted = true;
	        	//TODO: remove the lines below to fire the real logic
	        	//$scope.closePinVerificationForm();
	            //$scope.openAddCardForm();
	            //return;
	            //-----------------------------------

	            //use the mobile number stored insid the "oldUserInfo"
	        	phoneService.verifyPin(oldUserInfo.mobileNo, $scope.user.pin).then(function(data){
	        		if( data ){
	        			console.log('Receive the response from pin verification');
	        			console.log(data);
	        			$scope.user.pinToken 	= data;
	        			//set the token
	        			oldUserInfo.token 		= $scope.user.pinToken;
	        			//update the shared old user reg info
	        			UserSharedProperties.setOldUserRegInfo(oldUserInfo);

	        			//=============================================
		            	//HACK PART
		            	//for the reason that new user can't be created, use the old account to sign in to the system
						//TODO: remove this line after this issue is fixed
						//var simpleUserObj = _.clone({username: 'test@gmail.com', password: '123123'});
						//UserService.userLogin(simpleUserObj);
						//return;
						//TODO: uncomment this line after this issue is fixed
						var simpleUserObj = _.clone({username: oldUserInfo.email, password: oldUserInfo.password});
		            	//=============================================
		            	
		            	//call the service to create new user
		            	//createResult is a $promise object
		            	var createResult = UserService.createUser(oldUserInfo);

		            	console.log('Returned result after creating new user:');
		            	console.log(createResult);

		            	//after the createResult is resolved then display result message
		            	var verifyPromiseObj = createResult
		            	.then(function(resultObj){
		            		console.log('Registration succeed');
		            		console.log(resultObj);

		            		//clean the shared registration info
		            		UserSharedProperties.setOldUserRegInfo({});

		            		$scope.user.formHasError = false;
		            		$scope.user.formMsg 	 = 'Registration Successful';

		            		//call server to log the user into the system
		            		var loginPromiseObj = UserService.userLogin(simpleUserObj);

		            		return loginPromiseObj;

		            	}, function(resultObj){
		            		console.log('Registration failed');
		            		console.log(resultObj);

		            		//set the error message
		            		$scope.user.formHasError = true;
		            		$scope.user.formMsg 	 = resultObj.data.message;

		            		//display this error message on the panel
		            		displayRegErrMsg(resultObj.data.message);

		            		//close current form and open the registration form
		            		$scope.closePinVerificationForm();
		            		$scope.openRegistrationForm();

		            		//reject with error message
		            		return $q.reject({hasError: true, errReason:'invalid_input_value'});
		            	})
		            	//handle the result for logging the user into the system
		            	.then(function(resultObj){
	            			//success handler
	            			console.log('Returned value from login promise object');
	            			console.log(resultObj);
	            			nextForm = true;
	            		},function(resultObj){
	            			//error handler
	            			console.log('Returned errorMsg from login promise object');
	            			console.log(resultObj);

	            			if('get_user_failed' == resultObj.errReason ){
	            				nextForm = true;
	            			}

		            	});

		            	//finally step
		            	verifyPromiseObj['finally'](function(){
		            		console.log('Next form is: '+nextForm);

				            if(true == nextForm){
					            $scope.closePinVerificationForm();
					            $scope.openAddCardForm();
				            }
		            	});


	                    //$scope.closePinVerificationForm();
	                    //$scope.openAddCardForm();
	        		}
	        	},function(err){

	        	});

	            /*VerifyPhone.query({msisdn: $scope.user.msisdn, pin: $scope.user.pin}, function (data) {
	                if (data.$resolved) {
	                    $scope.showMsisdnForm = false;
	                    $scope.closePinVerificationForm();
	                    $scope.openRegistrationForm();
	                }
	            });*/
	        };

	        /*
	          Fetch the user's subscriptions
	        */
	        $scope.getUserSubscriptions = function(){
	        	
	        	//display the adding new card form or display the cards list
	        	/*var afterGetUserCards = function(){
	        		//check if user has any credit cards
        			getUserCards().then(function(resultObj){
        				console.log('the result from getting user cards is:');
        				console.log(resultObj);

        				//-------------------------------
		        		//TODO:remove the lines below after the getSubscription is fixed
		    			resultObj.hasErr = false;
		    			//assume there's one card
		    			resultObj.data 	= 1;
						//-------------------------------


        				//if there's no error
        				if( resultObj && 
        					false === resultObj.hasErr){

        					if(0 === resultObj.data){
        						//no cards, display the adding card form directily
        						console.log('no cards, ready to open the adding card form');

        						$scope.openAddCardForm();
        					}
        					else{
        						//display the form to let user choose between "add a new card" or "use existing cards"
        						$scope.openExistingCardForm();
        					}
        				}
        				else{
        					//if error happened then display the error message

        				}
        			});
	        	};*/

	        	//get user's subscriptions
	        	subscriptionManager.getSubscriptions().then(function (data){
	        		console.log('the result of getting subscriptions from the subscriptionManager: ');
	        		console.log(data);

	        		if( data &&
	        			!_.isUndefined(data.lines) && 
	        			_.isNumber(data.lines.length) && 
	        			!_.isNaN(data.lines.length) &&
	        			0 < data.lines.length){
	        			//user has subscriptions
	        			//display the popup to let the user choose how to deal with the lines
	        			console.log('ask user how to deal with the lines');
	        			$scope.openExistingSubForm();

	        			//-----------------
	        			//TODO:remove the lines before when in product mdoe
	        			//$modalInstance.dismiss();


	        			//-----------------

	        		}else{
	        			//user don't have any subscriptions
	        			//afterGetUserCards();
	        			$scope.checkPaymentType();
	        		}
	        	}, function(){
	        		//error handler for getting user subscriptions
                	//-------------------------------
	        		//TODO:remove the lines below after the getSubscription is fixed
        			//afterGetUserCards();
        			$scope.checkPaymentType();
					//-------------------------------
	        	});

	        	//get user's subscriptions
	        	/*UserSubscription.get({}, function (data) {
                    
	        		if( data &&
	        			!_.isUndefined(data.lines) && 
	        			_.isNumber(data.lines.length) && 
	        			!_.isNaN(data.lines.length) &&
	        			0 < data.lines.length){
	        			//user has subscriptions
	        			//display the popup to let the user choose how to deal with the lines
	        			console.log('ask user how to deal with the lines');

	        			//-----------------
	        			//TODO:remove the lines before when in product mdoe
	        			$modalInstance.dismiss();


	        			//-----------------

	        		}else{
	        			//user don't have any subscriptions
	        			//afterGetUserCards();
	        			$scope.checkPaymentType();
	        		}
                }, function(){
                	//error handler for getting user subscriptions
                	//-------------------------------
	        		//TODO:remove the lines below after the getSubscription is fixed
        			//afterGetUserCards();
        			$scope.checkPaymentType();
					//-------------------------------
                });*/
	        };

	        /*
			 * Check if user has any cards, if not show the "adding card form", if does show the 
			 * choice page "adding new card or use existing cards"
	        */
	        $scope.checkPaymentType = function(){
	        	//check if user has any credit cards
    			getUserCards().then(function(resultObj){
    				console.log('the result from getting user cards is:');
    				console.log(resultObj);

    				//-------------------------------
	        		//TODO:remove the lines below after the getSubscription is fixed
	    			//resultObj.hasErr = false;
	    			//assume there's one card
	    			//resultObj.data 	= 1;
					//-------------------------------


    				//if there's no error
    				if( resultObj && 
    					false === resultObj.hasErr){

    					if(0 === resultObj.data){
    						//no cards, display the adding card form directily
    						console.log('no cards, ready to open the adding card form');

    						$scope.openAddCardForm();
    					}
    					else{
    						//display the form to let user choose between "add a new card" or "use existing cards"
    						$scope.openExistingCardForm();
    					}
    				}
    				else{
    					//if error happened then display the error message
    					$log.error(resultObj.msg);

    					$modalInstance.dismiss();

    					var errMsgModalIns = $modal.open({
                        templateUrl: '/partials/modals/errMsg.html',
                        windowClass: 'modal-window-style',
                        controller:function($modalInstance, $scope){
                            $scope.mainTitle = "WELCOME TO NOVABALL";
                            $scope.modalHeading = "Error";
                            $scope.errorMsg = "Can't get the user's cards information. Please try again later.";
                            $scope.submitBtnText = "CONTINUE";

                            $scope.submitFunc = function(){
                                $modalInstance.close();
                            }

                            $scope.close = function(){
                                $modalInstance.close();
                            }
                        }
                    });
    				}
    			});
	        }

	        /*
			  Check with the server to see if the phone number has been registered or not
	        */
	        $scope.checkPhoneNum = function(){
	        	//console.log('blur fired in the controller');
	        	//return;

	        	var loginWithExistAccount = function(){
	        		//close the modal
					$modalInstance.dismiss();

		        	//open the login modal 
		        	var loginModal = $modal.open({
		                templateUrl: '/partials/modals/login.html',
		                controller: function($scope, $modalInstance){
		                	$scope.mainTitle 	= "YOU ALREADY HAVE AN ACCOUNT";
		                	$scope.modalHeading	= "You can log into NovaBall with your BetBright Account";
		                	$scope.infoLine1 	= "Looks like you already have an account with BetBright!";
		                	$scope.infoLine2 	= "Enter your BetBright account details below to continue.";
		                	$scope.submitBtnText = 'CONTINUE';

		                	$scope.user = {
				                username: '',
				                password: ''
				                //username: 'ned.stark@test.com',
				                //password: 'ned.stark'
				            };

				            $scope.user.formSubmitted 	= false;
				            $scope.loginResult      	= false;
		        			$scope.loginResultMsg   	= '';
		                	
		                	$scope.close = function(){
		                		$modalInstance.close();
		                	};

		                	//define it's own behavior after user login
		                	$scope.login = function (mainForm) {

		                		if(!mainForm){
		                			return;
		                		}

				                $scope.user.formSubmitted = true;
				                UserService.userLogin($scope.user).then(function(){
				                    $modalInstance.close();
				                    $state.go('root.register', {step:'checkSub'});

				                },function(){

				                	//-----------------	
				                	//TODO:Remove the lines below when in product mode
				                	//$modalInstance.close();
				                    //$state.go('root.register', {step:'checkSub'});
				                    

				                	//-----------------

				                });
				            };
		                },
		                windowClass: "login-modal-window",
		                //size:'lg'
		            });
	        	}

	        	//---------------------------------
	        	//HACK PART just for testing
	        	//TODO: remove the lines below when in the product mode
	        	if('0000123456789' == $scope.user.phoneNumber) {
	        		loginWithExistAccount();
	        		return;
	        	}
	        	//---------------------------------

	        	//checking the phone number
	        	phoneService.verifyPhone($scope.user.phoneNumber).then(function(data){
	        		//success handler for verifyPhone
	        		//the case that the user is already a sportsbook user
	        		//TODO:add condition for checking the data, get the 
	        		//if( '' == data.status)
		        	//$modalInstance.close();

		        	$scope.user.phoneNumRe 	= '';

	        	},function(err){
	        		//error handler for verifyPhone
	        		//if the response is 409 for "conflict" which means the phones number has been registered
	        		if(409 === err.status){
	        			loginWithExistAccount();
	        		}
	        	});


	        };

	        //close the registration form and open the login form instead
	        $scope.openLoginFormWithExistEmail = function(){

	        	var loginWithDupEmail = function(){

	        		var loginModal = $modal.open({
		                templateUrl: '/partials/modals/login.html',
		                controller: function($scope, $modalInstance){

		                	$scope.mainTitle 	= "WELCOM TO NOVABALL";
		                	$scope.modalHeading	= "Login";
		                	$scope.submitBtnText = 'LOGIN';

		                	$scope.user = {
				                username: oldUserInfo.email,
				                password: ''
				            };

				            $scope.user.formSubmitted 	= false;
				            $scope.loginResult      	= false;
		        			$scope.loginResultMsg   	= '';
		                	
		                	$scope.close = function(){
		                		$modalInstance.close();
		                	};

		                	//define it's own behavior after user login
		                	$scope.login = function (mainForm) {

		                		if(!mainForm){
		                			return;
		                		}

				                $scope.user.formSubmitted = true;
				                UserService.userLogin($scope.user).then(function(){
				                    $modalInstance.close();
				                    $state.go('root.register', {step:'checkSub'});

				                },function(){


				                });
				            };
		                },
		                windowClass: "login-modal-window",
		            });
	        	}

	        	//close the modal
				$modalInstance.dismiss({
					funcAfterModalDismiss: function(){
						loginWithDupEmail();
					}
				});
	        }

	        //submit user register form
	        $scope.doRegister = function (isFormValid) {

	        	//reset form variables
	        	clearRegForm();
	        	
	        	//rest the oldUserInfo
	        	oldUserInfo = _.clone({
            		name 		: $scope.user.email,
            		password 	: $scope.user.password,
            		email  		: $scope.user.email,
            		title 		: (!_.isUndefined($scope.titleList[_.indexOf($scope.titleList,$scope.user.title)]) ? $scope.titleList[_.indexOf($scope.titleList,$scope.user.title)] : ''),
            		firstName 	: $scope.user.firstname,
            		lastName 	: $scope.user.surname,
            		birthDate 	: $scope.user.birthDate,
            		countryOfResidence : (!_.isUndefined(countryCode[_.indexOf($scope.countryList, $scope.user.countryOfResidence)]) ? countryCode[_.indexOf($scope.countryList, $scope.user.countryOfResidence)] : ''),
            		mobileNo 	: $scope.user.phoneNumber,
            		marketingOptIn : $scope.user.marketingOptIn,
            		//token 		: $scope.user.pinToken //the token will be set after pin validation
            	});

	        	console.log('the oldeUserInfo is:');
	        	console.log(oldUserInfo);
	        	//save the oldUserInfo so they can be used in the later steps
	        	UserSharedProperties.setOldUserRegInfo(oldUserInfo);

	        	//---------------
	        	//just for test prototype
	        	if(false == $scope.user.needValidation){
	        		$scope.closeRegistrationForm();
		            $scope.openPinVerificationForm();

		            return;
	        	}
	        	//--------------

	        	//var nextForm = false;

	            //check the fields in the register form
	            $scope.user.formSubmitted = true;
	            checkRegisterForm(isFormValid);

	        	
	        	//execute this function if the basic information is passed
	        	var passBasicInfoCheck = function(){
		            
		            if(true !== isFormValid){
		                return;
		            }
		            else{
		            	//log the form params first
		            	console.log('The registration form check is passed');
		            	console.log($scope.user);

		            	$scope.closeRegistrationForm();
					    $scope.openPinVerificationForm();

		            	/*//=============================================
		            	//HACK PART
		            	//for the reason that new user can't be created, use the old account to sign in to the system
						//TODO: remove this line after this issue is fixed
						//var simpleUserObj = _.clone({username: 'test@gmail.com', password: '123123'});
						//UserService.userLogin(simpleUserObj);
						//return;
						//TODO: uncomment this line after this issue is fixed
						var simpleUserObj = _.clone({username: oldUserInfo.email, password: oldUserInfo.password});
		            	//=============================================
		            	
		            	//call the service to create new user
		            	//createResult is a $promise object
		            	var createResult = UserService.createUser(oldUserInfo);

		            	console.log('Returned result after creating new user:');
		            	console.log(createResult);

		            	//after the createResult is resolved then display result message
		            	var verifyPromiseObj = createResult
		            	.then(function(resultObj){
		            		console.log('Registration succeed');
		            		console.log(resultObj);

		            		$scope.user.formHasError = false;
		            		$scope.user.formMsg 	 = 'Registration Successful';

		            		//call server to log the user into the system
		            		var loginPromiseObj = UserService.userLogin(simpleUserObj);

		            		return loginPromiseObj;

		            	}, function(resultObj){
		            		console.log('Registration failed');
		            		console.log(resultObj);

		            		$scope.user.formHasError = true;
		            		$scope.user.formMsg 	 = resultObj.data.message;

		            		//display this error message on the panel
		            		displayRegErrMsg(resultObj.data.message);
		            		//reject with error message
		            		return $q.reject({hasError: true, errReason:'invalid_input_value'});
		            	})
		            	//handle the result for logging the user into the system
		            	.then(function(resultObj){
	            			//success handler
	            			console.log('Returned value from login promise object');
	            			console.log(resultObj);
	            			nextForm = true;
	            		},function(resultObj){
	            			//error handler
	            			console.log('Returned errorMsg from login promise object');
	            			console.log(resultObj);

	            			if('get_user_failed' == resultObj.errReason ){
	            				nextForm = true;
	            			}
		            	});

		            	//finally step
		            	verifyPromiseObj['finally'](function(){
		            		console.log('Next form is: '+nextForm);

				            if(true == nextForm){
				            	$scope.closeRegistrationForm();
					            $scope.openPinVerificationForm();
				            }
		            	});*/
		            }
	            }

	            //check the user's email address
	        	UserService.checkUserEmail($scope.user.email).then(function(data){
	        			passBasicInfoCheck();
	        		},function(errObj){
	        			console.log('the errObj in register form for checking email is:');
	        			console.log(errObj);
	        			if(errObj.status == 409){
	        				//this email address has been registered
	        				//set duplicate error message
	        				console.log('setting the error message on email field');
	        				//set the error message
		            		//$scope.user.formMsg 	 = resultObj.data.message;
	        				$scope.forms.registerForm.email.$setValidity("duplicate", false);
	        				//show the login link
	        				$scope.showLoginAfterEmailCheck = true;
	        			}
	        			//stop the process
	        			return;
	        	});
	        };

	        $scope.addMoreSubscription = function( addOrNot ){
	        	if(true === addOrNot){
	        		//add the new chosen lines as new part of the user's subscriptions and redirect them to the ball-edit page
	        		//update the flag variable to true
	        		subscriptionManager.setKeepNewAddedSub(true);
	        		$scope.closeExistingSubForm();

	        		$modalInstance.close({funcAfterModalClose:function(){
	        			
	        			$state.go('root.home');
	        		}});
	        		
	        	}
	        	else{
	        		subscriptionManager.setKeepNewAddedSub(false);
	        		$scope.closeExistingSubForm();
	        		$modalInstance.close({funcAfterModalClose:function(){
	        			
	        			$state.go('root.home');
	        		}});
	        	}
	        };

	        $scope.checkBirthDate = function(){
	        	console.log('checking the birth date');
	        	console.log('year:'+$scope.user.birthDateYear);
	        	console.log('month:'+$scope.user.birthDateMonth);
	        	console.log('day:'+$scope.user.birthDateDay);

	        	if( !isNaN($scope.user.birthDateYear) &&
	        		!isNaN($scope.user.birthDateMonth) &&
	        		!isNaN($scope.user.birthDateDay)){
	        			console.log('all of the dropdown value are set');
	        			//get number of days
	        			var birthDateDaysAmount = Functions.getNumOfDays($scope.user.birthDateYear, $scope.user.birthDateMonth-1);
	        			console.log('the correct amount of days in this month is:'+birthDateDaysAmount);
	        			console.log('current amount of days in the selected month is:'+$scope.birthDateDayGroup.length);

	        			//check if the amount of new selected days is different from previous
	        			if($scope.birthDateDayGroup.length !== birthDateDaysAmount){
	        				//re-generate the date picker drop down list
	        				$scope.genBirthDateDayGroup(birthDateDaysAmount);
	        			}

	        			//check if the selected day is outof range
	        			if($scope.user.birthDateDay > birthDateDaysAmount){
	        				//reset the day picker
	        				$scope.user.birthDateDay 	= "Date";
	        				$scope.user.birthDate 		= '';
	        			}
	        			else{
	        				//all of the values selected are ok
	        				$scope.user.birthDate = ""+$scope.user.birthDateYear + "-" + ($scope.user.birthDateMonth<10 ? "0" + $scope.user.birthDateMonth : $scope.user.birthDateMonth ) + "-" + ($scope.user.birthDateDay < 10 ? "0"+$scope.user.birthDateDay: $scope.user.birthDateDay);
	        			}

	        			/*//check if the selected birthDate is over 18
	        			if((new Date($scope.user.maxBirthdate)) < (new Date($scope.user.birthDate))){
	        				forms.registerForm.birthDate.$error.mindate = true;
	        			}
	        			else{
	        				forms.registerForm.birthDate.$error.mindate = false;
	        			}*/
	        	}
	        	
	        };

	        $scope.genBirthDateDayGroup = function(numOfDays){

	        	//reset first
	        	$scope.birthDateDayGroup = [];

	        	for(var num=0;num<numOfDays;num++){
	        		$scope.birthDateDayGroup.push(num+1);
	        	}
	        };

	        $scope.genBirthDateMonthGroup = function(){
	        	for(var num=0;num<12;num++){
	        		$scope.birthDateMonthGroup.push({
	        			value:num+1,
	        			display: Functions.getMonthShortName(num) + "("+(num<9 ? "0"+(num+1) : (num+1) ) +")"
	        		});
	        	}
	        };

	        $scope.genBirthDateYearGroup = function(){
	        	var startYear = (new Date()).getUTCFullYear();
	        	var amount = 100;
	        	
	        	for(var num=0;num<amount;num++){
	        		$scope.birthDateYearGroup.push(startYear - 18 - num);
	        	}
	        };

	        //phone number verification form
	        $scope.openPhoneNumReEnterForm = function(){
	        	$scope.showPNReEnterForm = true;
	        }

	        $scope.closePhoneNumReEnterForm = function(){
	        	$scope.showPNReEnterForm = false;
	        }

	        //pin verification form
	        $scope.openPinVerificationForm = function(){
	        	$scope.user.pinVerifyFormSubmitted = false;
	        	//clean the old pin
	        	$scope.user.pin 	= '';
	        	//reset the resend pin parameters
	        	$scope.pinResent 				= false;
	        	$scope.pinResentResult 			= '';

	        	$scope.showPinVerificationForm = true;
	        }

	        $scope.closePinVerificationForm = function(){
	        	$scope.showPinVerificationForm = false;
	        }

	        //user registration form
	        $scope.openRegistrationForm = function(){
	        	//check if there's any oldUserRegInfo fetched from the service
	        	var oldUserRegInfo = UserSharedProperties.getOldUserRegInfo();

	        	if(!_.isEmpty(oldUserRegInfo)){

	        		console.log('output the oldUserRegInfo:');
	        		console.log(oldUserRegInfo);
	        		//reasign the user info to the $scope.user object
	        		$scope.user.email 	= oldUserRegInfo.email;
	        		$scope.user.title 	= oldUserRegInfo.title;
	        		$scope.user.firstname 	= oldUserRegInfo.firstName;
	        		$scope.user.surname 	= oldUserRegInfo.lastName;
	        		$scope.user.birthDate 	= oldUserRegInfo.birthDate;
	        		$scope.user.countryOfResidence 	= (-1 !== _.indexOf(countryCode, oldUserRegInfo.countryOfResidence) ) ? $scope.countryList[_.indexOf(countryCode, oldUserRegInfo.countryOfResidence)] : '';
	        		$scope.user.phoneNumber 		= oldUserRegInfo.mobileNo;
	        		$scope.user.marketingOptIn 		= oldUserRegInfo.marketingOptIn;
	        		$scope.user.pinToken 	= oldUserRegInfo.token; 

	        	}

	        	$scope.showRegistrationForm = true;
	        	$scope.modalHeading = 'Register your details';
	        }

	        $scope.closeRegistrationForm = function(){
	        	$scope.showRegistrationForm = false;
	        }

	        //add card form
	        $scope.openAddCardForm = function(){
	        	$scope.showCardForm = true;
	            $scope.modalHeading = 'Your Cards';
	            showAddCardForm();
	        }

	        $scope.closeAddCardForm = function() {
	        	console.log('ready to show the payment form');
	            $scope.showCardForm = false;
	        };

	        //payment form
	        $scope.openPaymentForm = function(finishAddNewCard){
	        	//check the selected card index
	        	if( $scope.cardParams.selectedCardArrayIndex >=0 && 
	        		$scope.cardParams.selectedCardArrayIndex < $scope.userCards.length){
	        		$scope.cardParams.selectedCard = $scope.userCards[$scope.cardParams.selectedCardArrayIndex];
	        	}
	        	console.log('The selected card is:');
	        	console.log($scope.cardParams.selectedCard);

	        	if( !_.isUndefined(finishAddNewCard) && 
	        		finishAddNewCard === true){
	        		$scope.finishAddNewCard = true;
	        	}

	        	$scope.showPaymentForm = true;
	            $scope.modalHeading = "Payment";
	        }

	        $scope.closePaymentForm = function(){
	        	$scope.showPaymentForm = false;
	        	$scope.finishAddNewCard = false;
	        }

	        //choose card form
	        $scope.openChooseCardForm = function(){
	        	$scope.showChooseCardsForm = true;
	        	$scope.modalHeading	= 'Choose Payment Type';
	        	getUserCards();
	        };

	        $scope.closeChooseCardForm = function(){
	        	console.log('closing the choose card form...');
	        	$scope.showChooseCardsForm = false;
	        };

	        $scope.openPMSucceedForm = function(){
	        	$scope.showPMSucceedForm = true;
			    $scope.modalHeading = "Good luck!";
	        }

	        $scope.closePMSucceedForm = function(){
	        	$scope.showPMSucceedForm = false;
	        }

	        $scope.addAnotherCard = function(){
	        	$scope.closeChooseCardForm();
	        	$scope.openAddCardForm();
	        }

	        $scope.finishChooseCard	= function(){
	        	console.log('Finishing choose card...');
	        	//check if any card is selected
	        	if( -1 === $scope.cardParams.selectedCardArrayIndex){
	        		//not selected
	        		console.log('the selectedCardArrayIndex is :');
	        		console.log($scope.cardParams.selectedCardArrayIndex);
	        		console.log($scope);
	        		$scope.cardParams.chooseCardHasErr = true;
	        		$scope.cardParams.chooseCardErrMsg	= "Please select one payment type";
	        	}
	        	else{
	        		console.log('ready to close the choose card form');
	        		$scope.closeChooseCardForm();
	        		$scope.openPaymentForm();
	        	}

	        }

	        $scope.paySubs  = function(isFormValid){
	        	$scope.payments.formSubmitted = true;

	        	if(true == isFormValid){
	        		var subObj = {	lotteryId: _.clone($scope.userSubscription.lotteryId),
	        						numDraws: _.clone($scope.userSubscription.numDraws),
	        						lines: _.clone($scope.userSubscription.lines),
	        						//recurring : _.clone($scope.userSubscription.recurring)
	        						cardId: _.clone($scope.cardParams.selectedCard.cardId),
	        						cvv: _.clone($scope.payments.cvv)
	        					};

	        		console.log('The new subscription object is:');
	        		console.log(subObj);

	        		//---------------------------------
	        		//HACK PART------------------------

	        		/*$scope.closePaymentForm();
					$scope.showS3dIframe 			= true;
					console.log('The scope s3dForm is:');
	                console.log($scope.forms.s3dform);
	                //action="https://secure.metacharge.com/mcpe/acs"    

					$('#s3dform').attr('action','https://secure.metacharge.com/mcpe/acs');
	                $('#s3dform #MD').val('MTkyODU1Njk4MTkyODU1Njk4MTkyODU1Njk4MTkyODU1Njk4MTkyODU1Njk4');
	                $('#s3dform #PaReq').val('VGVzdE1vZGVUcmFuc2FjdGlvblRlc3RNb2RlVHJhbnNhY3Rpb25UZXN0TW9kZVRyYW5zYWN0aW9uVGVzdE1vZGVUcmFuc2FjdGlvbn5+fn5+fn5+fn5+fn5+fn4=');
					$('#s3dform #TermUrl').val('http://0.0.0.0:4444'+'/api/user/subscriptions/resume');            
					//$('#s3dform #TermUrl').val( $config.http.servers.real_server_abs+'/api/subscriptions/resume');            

					console.log('The s3dForm is:');
	                console.log($('#s3dform'));

	                $('#s3dform').submit();

	                return;*/

			        //-------------------------------------

	        		//post the subscriptions
	        		SubscriptionService.createSubscriptions(subObj).then(function(resultObj){
	        			//success handler
	        			console.log('Successfully create the subscriptions');
	        			console.log(resultObj);
	        			$scope.payments.formHasError = false;

	        			//check if there's need to redirect the user to s3d site
	        			//1. check the response's status code
	        			//2, check if the s3dUrl property has been set
	        			if(!_.isUndefined(resultObj.data.s3dUrl) && 
	        				''!==resultObj.data.s3dUrl){
	        				console.log('ready to post to the s3dUrl');
	        				//the s3dUrl is set
	        				//post to the target url as a form post
	        				//var request = $http({
	        				//	method: "post",
	        				//	url: resultObj.data.s3dUrl,
	        				//	transformRequest: transformRequestAsFormPost,
	        				//	data:{
	        				//		MD: resultObj.data.MD,
	        				//		PaReq: resultObj.data.PaReq
	        				//	}
	        				//});

	        				//request.success(function(html){
	        				//	console.log('the returned html from s3d is:');
	        				//	console.log(html);
	        				//});

							$scope.closePaymentForm();
							$scope.showS3dIframe 			= true;
							console.log('The scope s3dForm is:');
			                console.log($scope.forms.s3dform);
			                //action="https://secure.metacharge.com/mcpe/acs"

			                $('#s3dform').attr('action',resultObj.data.s3dUrl);
			                $('#s3dform #MD').val(resultObj.data.MD);
			                $('#s3dform #PaReq').val(resultObj.data.PaReq);
							//$('#s3dform #TermUrl').val('http://0.0.0.0:4444');

							//var targetBaseUrl = (true === $config.http.testing) ? 'http://0.0.0.0:4444' : $config.http.servers.real_server_abs;
							var targetBaseUrl = window.location.protocol+'//'+window.location.hostname
							$('#s3dform #TermUrl').val( targetBaseUrl+'/api/user/subscriptions/resume');

							console.log('the value of TermUrl is:');
							console.log($('#s3dform #TermUrl').val());

							console.log('The s3dForm is:');
			                console.log($('#s3dform'));

			                $('#s3dform').submit();
	        			}

	        			//emit an event that update the user's subscription
	        			$rootScope.$emit('nb:subscription:refreshSubs');
	        			console.log('emitting the event nb:subscription:refreshSubs');

	        			//redirect to the success page
			            //$scope.closePaymentForm();
			            //$scope.openPMSucceedForm();

	        		},function(resultObj){
	        			//error handler
	        			console.log('Creating the subscriptions failed');
	        			console.log(resultObj);

	        			//display the error message
	        			$scope.payments.formHasError = true;
	        			$scope.payments.formMsg 	= resultObj.msg;
	        		});	

					

	        	}
	        	
	        };

	        $scope.openExistingCardForm = function(){
	        	console.log('inside openExistingCardForm func...');
	        	$scope.modalHeading = 'Payment';
	        	$scope.showExistingCardForm	= true;
	        };

	        $scope.closeExistingCardForm = function(){
	        	$scope.showExistingCardForm	= false;
	        };

	        $scope.openExistingSubForm = function(){
	        	$scope.mainTitle	= 'WELCOME BACK!';
	        	$scope.modalHeading = 'You already have an existing NovaBall subscription.'
	        	$scope.showExistingSubForm = true;
	        };

	        $scope.closeExistingSubForm = function(){
	        	$scope.showExistingSubForm = false;
	        	$scope.mainTitle	= 'WELCOME TO NOVABALL';
	        };

	        $scope.finishRegister = function(){
	        	$scope.closePMSucceedForm();
	        	$state.go("root.home");
	        	$modalInstance.close();
	        	
	        };

	        $scope.ok = function () {
	            $modalInstance.close($scope.selected.item);
	        };

	        $scope.cancel = function () {
	            //if (confirm('Dont go!')) {
	                $modalInstance.dismiss('cancel');
	            //}
	        };

	        /*window.replaceLoad = function(iframe){
	        	alert(iframe.contentWindow.location);

	        	iframe.onload = function(){
	        		window.replaceLoad(iframe);
	        	}
	        }*/

	        /*******************
             * Main Logic Part *
             *******************/
	        //get the user's info object
	        userInfoManager.getUserInfo().then(function(data){
	        	var userInfo = data;

		        console.log('The retrived userInfo:');
		        console.log(userInfo);
	        },function(){

	        });

	        //generate the birth date day/month/year group
	        $scope.genBirthDateYearGroup();
	        $scope.genBirthDateMonthGroup();
	        $scope.genBirthDateDayGroup($scope.iniBirthDateDayAmount);
	        

	        console.log('The step from the stateParams is :'+ $stateParams.step);

	        switch($stateParams.step){
	        	case 'phoneNumber':
	        		$scope.showMsisdnForm			= true;
	        		break;
	        	case 'pinVerify':
	        		$scope.showPinVerificationForm  = true;
	        		break;
	        	case 'userInfo':
	        		$scope.openRegistrationForm();
	        		break;
	        	case 'addCard':
	        		$scope.showCardForm             = true;
	        		break;
	        	case 'checkSub':
	        		console.log('checking the user subscription...');
	        		//return;

	        		$scope.getUserSubscriptions();
	        		break;
	        	case 'checkPaymentType':
	        		$scope.checkPaymentType();
	        		break;
	        	default:
	        		//$scope.showMsisdnForm           = true;

	        		//$scope.openAddCardForm();

	        		//just for test purpose
	       			$scope.openRegistrationForm();
	       			//$scope.openExistingSubForm();
	       			//$scope.showPaymentForm		= true;
	       			//$scope.showExistingCardForm		= true;
	       			//$scope.openExistingCardForm();
	       			//$scope.showPinVerificationForm           = true;
	       			
	       			/*$scope.openChooseCardForm();
	       			
	       			$timeout( function(){
                            $scope.cardParams.finishLoadingCards	= true;
                        }, 0, true);*/

					//$scope.openPMSucceedForm();
	       			
	     		  			
	        }


	}]);