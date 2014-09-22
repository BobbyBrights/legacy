describe("About Usage Page", function() {
	var planDetailsResponse =           $.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
	var usageSummaryResponse4 = 		$.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"3072","consumedAllowance":"120","remainingAllowance":"00","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"75"}]}');
	var usageDetailsResponseTemplate = 	$.parseJSON('{"status":"success","usageDetails":[{"dateAndTime":"05/12/2013","type":"Long Distance Call","quantity":"13","unit":"mins","calledNumber":"3312341234"},{"dateAndTime":"05/13/2013","type":"Long Distance Call","quantity":"13","unit":"mins","calledNumber":"3312341234"},{"dateAndTime":"05/13/2013","type":"Premium SMS","quantity":"1","unit":"SMS","calledNumber":"01234"},{"dateAndTime":"05/14/2013","type":"Premium SMS","quantity":"1","unit":"SMS","calledNumber":"01234"},{"dateAndTime":"05/17/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"05/18/2013","type":"SMS","quantity":"1","unit":"SMS","calledNumber":"3312341234"},{"dateAndTime":"05/21/2013","type":"Long Distance Call","quantity":"13","unit":"mins","calledNumber":"3312341234"},{"dateAndTime":"05/23/2013","type":"SMS","quantity":"1","unit":"SMS","calledNumber":"3312341234"},{"dateAndTime":"05/24/2013","type":"International Call","quantity":"9","unit":"mins","calledNumber":"4412341234"},{"dateAndTime":"05/25/2013","type":"SMS","quantity":"1","unit":"SMS","calledNumber":"3312341234"},{"dateAndTime":"05/26/2013","type":"International SMS","quantity":"1","unit":"SMS","calledNumber":"4412341234"},{"dateAndTime":"05/27/2013","type":"MMS","quantity":"1","unit":"MMS","calledNumber":"3312341234"},{"dateAndTime":"05/29/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"05/29/2013","type":"International Call","quantity":"9","unit":"mins","calledNumber":"4412341234"},{"dateAndTime":"06/01/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"06/02/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"06/02/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"}]}');
	var homeMultilineMockResponse = {
			status : "success",
			ctn : "(123) 222-7845",
			accountId : "123456789012",
			accountName : "alpha",
			accountStatus : "Active",
			billCycleDate : moment().add("days", 7).format('MM/DD/YYYY hh:mm:ss'),
			accountBalance : "10.00",
			amountDueToday : "45.00",
			planName : "Trailblazer",
			planMRC : "55.00",
			subscriberId : "55512345",
			anniversaryDate : "01/12/2013 00:00:00",
			nextBillDueDays : "8",
			subscribers: [
		       	{ctn : "1111111753", subscriberId : "63822842051", status : "active", isTablet : false},
		       	{ctn : "212342342", subscriberId : "123213645", status : "active", isTablet : false},
		       	{ctn : "1200546512", subscriberId : "78986565", status : "active", isTablet : true},
		       	{ctn : "02054645465", subscriberId : "6654237871312", status : "pendingActivation", isTablet : false},
		       	{ctn : "8798465654", subscriberId : "254d56454dfa", status : "active", isTablet : false}
		   	],
		   	pinSecurity: "1",
		   	totalMRC: "90"
		};
	
	goToHomePage(true);

	it("Go to the usage page", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageSummaryResponse4)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});

		application.gotoPage("usagePage");
		
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'usage'});
		});
	});

	it("Go to the usage about page", function() {
		$("#i18n_usageLearnMore").trigger("tap");
		waits(1000);
		
		runs(function() {
			expect($('#usagePage')).toBeHidden();
			expect($('#aboutUsagePage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'usage-about'});
		});
	});
	
	it("User data total allowance is defined", function() {
		expect($("#userDataTotalAllowance").text()).toContain("3GB");
	});

	it("My plan link is present and works", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(planDetailsResponse)
		});

		runs(function() {
			expect($("#i18n_aboutUsagePageMyPlanLink")).toExist();
		});
		
		$("#i18n_aboutUsagePageMyPlanLink").trigger("tap");
		waits(1000);
		
		runs(function() {
			expect($('#usagePage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
		});
	});

	it("Back button works", function() {
		application.gotoPage("usagePage");
		waits(1000);
		
		runs(function() {
			expect($('#myPlanPage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
			$("#i18n_usageLearnMore").trigger("tap");
		});

		waits(1000);
		
		runs(function() {
			expect($('#usagePage')).toBeHidden();
			expect($('#aboutUsagePage')).toBeVisible();
			$("#aboutUsagePage").find(".back-button").triggerHandler("tap");
		});
		
		waits(1000);
		
		runs(function() {
			expect($('#aboutUsagePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
		});
	});


	goToHomePage(true, true);
	
	it("Go to the usage page - multiline", function() {
		application.gotoPage("usagePage");
		
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'usage2'});
		});
	});
	
	it("Check usage page containers - multiline selected", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageSummaryResponse4)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});
		
		$("#usageMultilineSelectNumber").val("1200546512").triggerHandler("change");
		
		waits(1000);
		runs(function() {
			expect($('#usagePageForm')).toBeVisible();
			expect($('#usageDetailsResultContent')).toBeVisible();
			expect($('#monthlyUsageContent')).toBeVisible();
		});
	});
});
