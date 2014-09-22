describe("Autopay - Deactivate Flow", function() {
	var homeMockResponse = {
			status : "success",
			ctn : "(123) 222-7845",
			accountId : "123456789012",
			accountName : "alpha",
			accountStatus : "Active",
			billCycleDate : "05/04/2013 21:27:13",
			accountBalance : "10.00",
			amountDueToday : "45.00",
			planName : "Trailblazer",
			planMRC : "55.00",
			subscriberId : "55512345",
			anniversaryDate : "01/12/2013 00:00:00",
			nextBillDueDays : "8",
			subscribers: [
             	{ctn : "1111111753",
         		subscriberId : "63822842051",
         		totalMRC : "80",
         		planMRC : "70",
         		services : "20",
         		discount : "10"}
         	],
         	pinSecurity: "1",
         	totalMRC: "90"
		};
	var autoPayDetails = {
			status:"success",
			autoPayExists:true,
			cardNumber:"**** **** ****-4343",
			cardName:"frfrfrf",
			postalCode:"43434",
			cardType:"AE",
			cardExpirationDate:"0413",
			paymentProfileId:"glghn07spf"
		};
	var PINCheckResponse =	$.parseJSON('{"status":"success"}');

	// Go from start to home page
	it('Setup goto home', function() {
		checkEULA();
		
		$('#i18n_loginUsername').val('alpha').triggerHandler('input');
		$('#i18n_loginPwd').val('pass').triggerHandler('input');
	
		waits(1000);
		$.mockjaxClear();
		$.mockjax({
			url : '*/version',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{ "status" : "success", "version" : "0.01"}'
	
		});
		$.mockjax({
			url : '*/authentication/login',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status" : "success","sessionToken" : "2924169f"}'
	
		});
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
			responseText : JSON.stringify(autoPayDetails)
		});
		$.mockjax({
			url : '*/authentication/verifypin',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(PINCheckResponse)
		});
	
		$("#i18n_loginBtn").triggerHandler('tap');
	
		waits(1000);
		runs(function() {
			expect($('#homePage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'homeDeactive'});
			expect($('#i18n_homeSetupAutoPayButton').attr('data-state')).toBe("activated");
			$("#i18n_homeSetupAutoPayButton").triggerHandler('tap');
		});
	});

	waits(1000);

	it("Enter the PIN code", function() {
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#pinPage')).toBeVisible();
			$("#pinCode").val("0000").triggerHandler("keyup");
		});
	});

	waits(1000);

	it('Transition from PIN to autopay is working', function() {
		runs(function() {
			expect($('#pinPage')).toBeHidden();
			expect($('#desactivateAutopayPage')).toBeVisible();
		});
	});
	
	waits(1000);
	
	it('Name on card is ok',function(){
		expect($('#desactivateAutopayNameOnCard').text()).toBe(autoPayDetails.cardName);
		callPhantom({cmd : 'capture', name:'deactivatePPPage'});
	});
	
	
	it('Card number is ok',function(){
		expect($('#desactivateAutopayCardNumber').text()).toBe(autoPayDetails.cardNumber);
	});
	
	it('Expiration date is ok',function(){
		expect($('#desactivateAutopayExpirationDate').text()).toBe(autoPayDetails.cardExpirationDate);
	});
	
	it('Continue button is there',function(){
		expect($('#i18n_desactivateAutopayContinueButton')).toBeVisible();
	});
	
	it('Cancel button is there',function(){
		expect($('#i18n_desactivateAutopayCancelButton')).toBeVisible();
	});			
			
	it('On Cancel, home page should be shown',function(){
		$("#i18n_desactivateAutopayCancelButton").triggerHandler('tap');
		
		waits(1500);
		
		runs(function() {
			expect($('#desactivateAutopayPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
			
			waits(1000);
			//go back
			$("#i18n_homeSetupAutoPayButton").triggerHandler('tap');
						
			waits(1600);
			runs(function() {
				expect($('#homePage')).toBeHidden();
				expect($('#desactivateAutopayPage')).toBeVisible();
			});
		});
	});

	it("Confirmation page should be visible", function() {
		$("#i18n_desactivateAutopayContinueButton").triggerHandler('tap');
		
		waits(1600);

		runs(function() {
			expect($('#desactivateAutopayPage')).toBeHidden();
			expect($('#desactivateAutopayConfirmationPage')).toBeVisible();
			
			waits(1600);
			callPhantom({cmd : 'capture', name:'confirmPage'});
			
			//go back
			$("#dACP_deactivateConfirmButton").triggerHandler('tap');
			
			waits(1600);
			runs(function() {
				expect($('#desactivateAutopayConfirmationPage')).toBeHidden();
				expect($('#homePage')).toBeVisible();
			});
		});
	});
	
	
	
});