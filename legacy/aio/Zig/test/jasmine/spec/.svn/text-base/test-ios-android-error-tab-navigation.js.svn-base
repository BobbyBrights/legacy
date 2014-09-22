describe("test ios android Error Tab Navigation", function() {
	var usageSummaryResponseTemplate = $.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"90","consumedAllowance":"72","remainingAllowance":"18","uom":"mins","serviceType":"Voice","thresholdLower":"50","thresholdLimit":"85"},{"totalAllowance":"50","consumedAllowance":"18","remainingAllowance":"32","uom":"sms","serviceType":"SMS","thresholdLower":"50","thresholdLimit":"85"},{"totalAllowance":"300","consumedAllowance":"14.1","remainingAllowance":"258.9","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"85"}]}');
	var usageDetailsResponseTemplate = $.parseJSON('{"status":"success","usageDetails":[{"dateAndTime":"05/12/2013","type":"Long Distance Call","quantity":"13","unit":"mins","calledNumber":"3312341234"},{"dateAndTime":"05/13/2013","type":"Long Distance Call","quantity":"13","unit":"mins","calledNumber":"3312341234"},{"dateAndTime":"05/13/2013","type":"Premium SMS","quantity":"1","unit":"SMS","calledNumber":"01234"},{"dateAndTime":"05/14/2013","type":"Premium SMS","quantity":"1","unit":"SMS","calledNumber":"01234"},{"dateAndTime":"05/17/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"05/18/2013","type":"SMS","quantity":"1","unit":"SMS","calledNumber":"3312341234"},{"dateAndTime":"05/21/2013","type":"Long Distance Call","quantity":"13","unit":"mins","calledNumber":"3312341234"},{"dateAndTime":"05/23/2013","type":"SMS","quantity":"1","unit":"SMS","calledNumber":"3312341234"},{"dateAndTime":"05/24/2013","type":"International Call","quantity":"9","unit":"mins","calledNumber":"4412341234"},{"dateAndTime":"05/25/2013","type":"SMS","quantity":"1","unit":"SMS","calledNumber":"3312341234"},{"dateAndTime":"05/26/2013","type":"International SMS","quantity":"1","unit":"SMS","calledNumber":"4412341234"},{"dateAndTime":"05/27/2013","type":"MMS","quantity":"1","unit":"MMS","calledNumber":"3312341234"},{"dateAndTime":"05/29/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"05/29/2013","type":"International Call","quantity":"9","unit":"mins","calledNumber":"4412341234"},{"dateAndTime":"06/01/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"06/02/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"},{"dateAndTime":"06/02/2013","type":"Data","quantity":"233","unit":"kB","calledNumber":"data usage - App & Web"}]}');
	
	goToHomePage(true);

	
	var mSumId ,mDetailsId ;
	
	it('Transition from home to usage page is working', function() {
		mSumId = $.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageSummaryResponseTemplate)
		});
		
		mDetailsId = $.mockjax({
			url : '*/usage/details',
			responseTime : 1000,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});
		
		runs(function() {
			application.gotoPage('usagePage');
		});
		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'usage'});
			expect($('#homePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
		});
	});
	
it('Transition from usage to home page is working', function() {

//		application.gotoPage('homePage');
		runs(function() {
			application.gotoPage('homePage');
		});
		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'wp8-home'});
			expect($('#homePage')).toBeVisible();
			expect($('#usagePage')).toBeHidden();
		});
	});
	

	it('home to usage page with network error', function() {
		
		$.mockjaxClear(mSumId);
		mSumId = $.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			status: 500,
		});
	
//		$('#i18n_navigationUsagesLink').triggerHandler('tap');
		runs(function() {
			application.gotoPage('usagePage');
		})
		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'usage-net-error-popup'});
			expect($('#homePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
			expect($('#zAlert')).toExist();
			$("#zAlert .bleft").triggerHandler('tap');
		});
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeVisible();
			expect($('#usagePage')).toBeHidden();
		});
	});
	
	it('home to usage page with API error', function() {
//		application.gotoPage('homePage');
		$.mockjaxClear(mSumId);
		mSumId = $.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			responseText: '{"status":"failure","messages":[{"code":"0001","severity":"Error"}]}'
		});
		runs(function() {
//			$('#i18n_navigationUsagesLink').triggerHandler('tap');
			application.gotoPage('usagePage');
		});
		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'usage-api-error-popup'});
			expect($('#homePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zHeader').html()).toContain('Error');
			$("#zAlert .bright").triggerHandler('tap');
		});
		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'usage-error'});
			expect($('#usagePage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	it('to pay details net error', function() {
//		application.gotoPage('payMyBillPage');
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(homeMockResponse)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 1000,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});

		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			status: 404,
		});
		runs(function() {
			application.gotoPage('payMyBillPage');
		});
		waits(2000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'pay-error'});
			expect($('#zAlert')).toExist();
			$.mockjaxClear();
			$.mockjax({
				url : '*/authentication/home',
				responseTime : 250,
				contentType : 'text/json',
				responseText : JSON.stringify(homeMockResponse)
			});

			$.mockjax({
				url : '*/payment/auto/details',
				responseTime : 250,
				contentType : 'text/json',
				responseText :  JSON.stringify('{"status" : "success","autoPayExist" : false}'),
			});
			
			$("#zAlert .bleft").triggerHandler('tap');
		});

		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'pay-error'});
			expect($('#payMyBillPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	it('to pay home net error', function() {
//		application.gotoPage('payMyBillPage');
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			status: 404,
			responseText : JSON.stringify(homeMockResponse)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 1000,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});

		mSumId = $.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageSummaryResponseTemplate)
		});
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText :  '{"status":"failure","messages":[{"code":"0001","severity":"Error"}]}',
		});
		runs(function() {
			application.gotoPage('payMyBillPage');
		});
		waits(2000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'pay-net-details-error'});
			expect($('#zAlert')).toExist();
//			expect($('#zAlert #zHeader').html()).toContain('Error');
			$.mockjaxClear();
			$.mockjax({
				url : '*/authentication/home',
				responseTime : 250,
				contentType : 'text/json',
				responseText : JSON.stringify(homeMockResponse)
			});

			$.mockjax({
				url : '*/payment/auto/details',
				responseTime : 250,
				contentType : 'text/json',
				responseText :  JSON.stringify('{"status" : "success","autoPayExist" : false}'),
			});
			
			$("#zAlert .bleft").triggerHandler('tap');
		});

		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'pay-details-error'});
			expect($('#payMyBillPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});

//	it('to pay page with details API error', function() {
//		$.mockjaxClear(mSumId);
//		mSumId = $.mockjax({
//			url : '*/usage/summary',
//			responseTime : 250,
//			contentType : 'text/json',
//			responseText : JSON.stringify(usageSummaryResponseTemplate)
//		});
//		runs(function() {
//			$.mockjaxClear();
//			$.mockjax({
//				url : '*/authentication/home',
//				responseTime : 250,
//				contentType : 'text/json',
//				responseText : JSON.stringify(homeMockResponse)
//			});
//			$.mockjax({
//				url : '*/usage/details',
//				responseTime : 1000,
//				contentType : 'text/json',
//				responseText : JSON.stringify(usageDetailsResponseTemplate)
//			});
//			$.mockjax({
//				url : '*/payment/auto/details',
//				responseTime : 250,
//				contentType : 'text/json',
//				responseText :  '{"status":"failure","messages":[{"code":"0001","severity":"Error"}]}',
//			});
//			 $.mockjax({
//					url : '*/usage/details',
//					responseTime : 1000,
//					contentType : 'text/json',
//					responseText : JSON.stringify(usageDetailsResponseTemplate)
//				});
//			 application.gotoPage('payMyBillPage');
//		});
//		waits(2000);
//		runs(function() {
//			callPhantom({cmd : 'capture', name:'pay-api-error-popup'});
//			expect($('#usagePage')).toBeHidden();
//			expect($('#payMyBillPage')).toBeVisible();
//			expect($('#zAlert')).toExist();
//			expect($('#zAlert #zHeader').html()).toContain('Error');
//			
//			$.mockjaxClear();
//			$.mockjax({
//				url : '*/authentication/home',
//				responseTime : 250,
//				contentType : 'text/json',
//				responseText : JSON.stringify(homeMockResponse)
//			});
//
//			$.mockjax({
//				url : '*/payment/auto/details',
//				responseTime : 250,
//				contentType : 'text/json',
//				responseText :  JSON.stringify('{"status" : "success","autoPayExist" : false}'),
//			});
//			
//			$("#zAlert .bright").triggerHandler('tap');
//		});
//		waits(1000);
//		runs(function() {
//			callPhantom({cmd : 'capture', name:'pay-api-error'});
//			expect($('#payMyBillPage')).toBeHidden();
//			expect($('#homePage')).toBeVisible();
//		});
//	});
	
	it('to pay page with Home API error', function() {
//		application.gotoPage('homePage');
		$.mockjaxClear(mSumId);
		mSumId = $.mockjax({
			url : '*/usage/summary',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(usageSummaryResponseTemplate)
		});
		runs(function() {
			$.mockjaxClear();
			$.mockjax({
				url : '*/authentication/home',
				responseTime : 250,
				contentType : 'text/json',
				responseText :'{"status":"failure","messages":[{"code":"0001","severity":"Error"}]}'
			});
			
			var autoPayResponse =  '{"status" : "success","autoPayExist" : false}';
			
			$.mockjax({
				url : '*/payment/auto/details',
				responseTime : 250,
				contentType : 'text/json',
				responseText :  JSON.stringify(autoPayResponse),
			});
			 $.mockjax({
					url : '*/usage/details',
					responseTime : 1000,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponseTemplate)
				});
			 application.gotoPage('payMyBillPage');
		});
		waits(2000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'pay-api-home-error-popup'});
			expect($('#usagePage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zHeader').html()).toContain('Error');
			$.mockjaxClear();
			$.mockjax({
				url : '*/authentication/home',
				responseTime : 250,
				contentType : 'text/json',
				responseText : JSON.stringify(homeMockResponse)
			});

			$.mockjax({
				url : '*/payment/auto/details',
				responseTime : 250,
				contentType : 'text/json',
				responseText :  JSON.stringify('{"status" : "success","autoPayExist" : false}'),
			});
			$("#zAlert .bright").triggerHandler('tap');
			
		});
		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'pay-api-home-error'});
			expect($('#payMyBillPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	
	it('to myPlan net error', function() {
//		application.gotoPage('payMyBillPage');
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(homeMockResponse)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 1000,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});
		var autoPayResponse =  '{"status" : "success","autoPayExist" : false}';
		
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText :  JSON.stringify(autoPayResponse),
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 250,
			contentType : 'text/json',
			status: 404,
		});
		runs(function() {
			 application.gotoPage('myPlanPage');
		});
		waits(2000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'plan-error-p'});
			expect($('#zAlert')).toExist();
			$("#zAlert .bleft").triggerHandler('tap');
		});

		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'plan-error'});
			expect($('#myPlanPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	it('to myPlan API error', function() {
//		application.gotoPage('payMyBillPage');
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(homeMockResponse)
		});
		$.mockjax({
			url : '*/usage/details',
			responseTime : 1000,
			contentType : 'text/json',
			responseText : JSON.stringify(usageDetailsResponseTemplate)
		});
		var autoPayResponse =  '{"status" : "success","autoPayExist" : false}';
		
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText :  JSON.stringify(autoPayResponse),
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 250,
			contentType : 'text/json',
			responseText :'{"status":"failure","messages":[{"code":"0001","severity":"Error"}]}'
		});
		runs(function() {
			 application.gotoPage('myPlanPage');
		});
		waits(2000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'plan-api-error-p'});
			expect($('#zAlert')).toExist();
			$("#zAlert .bright").triggerHandler('tap');
		});

		waits(1000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'plan-api-error'});
			expect($('#myPlanPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	
	
});
