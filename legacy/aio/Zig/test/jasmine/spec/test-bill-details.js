describe('"Bill details" page', function() {
	
	var billDetailsMockResponse = '{"status":"success","totalOwed":"71.00","subscriberDetails":[{"ctn":"1234567890","isTablet":false,"plan":{"name":"Pro Plan","amount":"60.00"},"discounts":[],"addedServices":[{"name":"AIO Gig","amount":"10.00"}]}],"credits":[{"name":"Account credit","amount":"1.00"},{"name":"Referral Credit","amount":"2.00"},{"name":"Promo Credit","amount":"3.00"},{"name":"New Line Credit","amount":"4.00"}],"adjustments":[{"name":"Bridge Pay Fee","amount":"5.00"},{"name":"Line Suspended Fee","amount":"6.00"}]}';
	
	// go to the home page
	goToHomePage(true);
	
	// it(s)
	it('Go to the "Bill details" page', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/billdetails',
			responseTime : 500,
			contentType : 'text/json',
			responseText : billDetailsMockResponse
		});
		
		runs(function() {
			application.gotoPage('morePage');
		});
		waits(1000);
		
		
		runs(function() {
			application.gotoPage('billDetailsPage');
		});
		waits(1000);
		
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#billDetailsPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'bill-details'});
		});
	});
	
	it('Page content is conform', function() {
		
		var billDetailsMockResponseAsJSON = $.parseJSON(billDetailsMockResponse);
		
		runs(function() {
			expect($("#billDetailsPage").find(".subscriberDetails")).toHaveLength(billDetailsMockResponseAsJSON.subscriberDetails.length);
			expect($("#billDetailsPage").find(".credits")).toHaveLength(1);
			expect($("#billDetailsPage").find(".adjustments")).toHaveLength(1);
		});
	});
	
	it('Back button brings the user to the good place', function() {
		
		$("#billDetailsPage").find(".back-button").triggerHandler("tap");
		
		waits(1000);
		
		runs(function() {
			expect($('#billDetailsPage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
		
		waits(1000);
		
		runs(function() {
			application.gotoPage('usagePage');
		});
		
		waits(1000);
		
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
		});
		
		waits(1000);

		runs(function() {
			application.gotoPage('billDetailsPage');
		});
		
		waits(1000);
		
		runs(function() {
			expect($('#usagePage')).toBeHidden();
			expect($('#billDetailsPage')).toBeVisible();
		});
		
		waits(1000);
		
		runs(function() {
			$("#billDetailsPage").find(".back-button").triggerHandler("tap");
		});
		
		waits(1000);
		
		runs(function() {
			expect($('#billDetailsPage')).toBeHidden();
			expect($('#usagePage')).toBeVisible();
		});
	});
});