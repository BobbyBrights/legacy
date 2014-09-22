describe("Test Open external links", function() {
	var usageSummaryResponse1 = $.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"100","consumedAllowance":"10","remainingAllowance":"90","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"75"}]}');
	var usageDetailsResponse1 = $.parseJSON('{"status":"success","usageDetails":[{"dateAndTime":"07/24/2013 11:06:34","type":"Data","quantity":"2048","unit":"kB","calledNumber":"-"},{"dateAndTime":"06/30/2013 3:30:29","type":"Data","quantity":"2965","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/01/2013 19:49:24","type":"Data","quantity":"4495","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/03/2013 23:20:43","type":"Data","quantity":"1209","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/04/2013 17:41:51","type":"Data","quantity":"9106","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/05/2013 5:23:18","type":"Data","quantity":"6376","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/05/2013 9:3:3","type":"Data","quantity":"7840","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/07/2013 22:50:22","type":"Data","quantity":"3568","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/08/2013 20:40:45","type":"Data","quantity":"2903","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 3:43:20","type":"Data","quantity":"7890","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 13:53:31","type":"Data","quantity":"6835","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 17:27:44","type":"Data","quantity":"5074","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 22:14:23","type":"Data","quantity":"1612","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/13/2013 10:40:50","type":"Data","quantity":"6677","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/15/2013 17:39:31","type":"Data","quantity":"6094","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"}]}');
	var PINCheckResponse =	$.parseJSON('{"status":"success"}');

	var qtyButtonsEventName = "tap";
	
	goToHomePage(true);
	
	it('Home page Learn More link', function() {
		$("#i18n_autoPayLearnMore").triggerHandler('tap');
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeVisible();
		});
	});
	
	it('Transition to pay page', function() {
		//no need to add additional mockajax
		application.gotoPage('payMyBillPage');
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	it('Pay page T&C link', function() {
		$("#i18n_payMyBillTermsCondition_2").triggerHandler('click');
		waits(1000);
		runs(function() {
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	
	it('Transition to plan page', function() {
		//no need to add additional mockajax
		$.mockjax({
			url : '*/planandservices/available',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","addedServices":[],"availableServices":[{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"08","serviceName":"FR Unlimited","serviceShortDescription":"Unlimited calls within France","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"09","serviceName":"Hardcore Browsing 3GB","serviceShortDescription":"Enjoy a monthly data transfer capacity of3 GB at a fixed rate","amount":"25","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"10","serviceName":"500 Messages","serviceShortDescription":"500-message add-on","amount":"55","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"11","serviceName":"Conference Call","serviceShortDescription":"Talk to several parties at the same time","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}]}'
		});
		$.mockjax({
			url : '*/validate',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0.0","totalAmount":"55.0"},"arBalance":0.0,"balanceAfterPurchase":0.0,"debitFromBalance":0.0}'
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","plan":{"planId":"zig_031","planName":"Tablet Toter","planDescription":"Made for the gotta-have-my-tablet-everywhere-I-go kind of person. Plenty of data to keep you connected while you’re on the go. You now have a companion for all your travels.","planMRC":55},"addedServices":[],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}'
		});
		$.mockjax({
			url : '*/authentication/verifypin',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(PINCheckResponse)
		});
		application.gotoPage('myPlanPage');
		waits(1000);
		runs(function() {
			expect($('#payMyBillPage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
			$("#i18n_myPlanButton").triggerHandler('tap');
		});
	});
	
	waits(1000);

	it("Enter the PIN code", function() {
		runs(function() {
			expect($('#myPlanPage')).toBeHidden();
			expect($('#pinPage')).toBeVisible();
			$("#pinCode").val("0000").triggerHandler("keyup");
		});
	});
	
	waits(1000);
	
	it('Transition to manage services page', function() {
		waits(1000);
		runs(function() {
			expect($('#manageServicesPage')).toBeVisible();
			$("#manageServicesPage").find('.ui-plus').triggerHandler(qtyButtonsEventName);
		});
		waits(1000);
		runs(function() {
			$("#i18n_manageServicesButton").triggerHandler('tap');
		});
		waits(1000);
		runs(function() {
			expect($('#servicesReviewPage')).toBeVisible();
			$("#i18n_servicesReviewBtn").triggerHandler('tap');
		});
		waits(1000);
		runs(function() {
			expect($('#servicesPaymentPage')).toBeVisible();
		});
	});
	
	
	it('Shop Pay page T&C link', function() {
		$("#servicesPaymentTermsCondition_2").triggerHandler('tap');
		waits(1000);
		runs(function() {
			expect($('#servicesPaymentPage')).toBeVisible();
			$("#servicesPaymentCancelButton").triggerHandler('tap');
		});
	});
	
	
	it('Transition to more', function() {
		//no need to add additional mockajax
		application.gotoPage('payMyBillPage');
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	it('About usage links', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/usage/summary',
			responseTime : 100,
			contentType : 'text/json',
			responseText : JSON.stringify(usageSummaryResponse1)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 100,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponse1)
		});

		application.gotoPage('usagePage');
		waits(1000);
		
		runs(function() {
			$('#i18n_usageLearnMore').triggerHandler('tap');
		});
		waits(1000);
		
		runs(function() {
			expect($('#usagePage')).toBeHidden();
			expect($('#aboutUsagePage')).toBeVisible();
		});
	});
});
