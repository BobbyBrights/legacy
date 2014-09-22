homeMockResponse = {
	status : "success",
	ctn : "(123) 222-7845",
	accountId : "123456789012",
	accountName : "alpha",
	accountStatus : "Hot Lined",
	billCycleDate : moment().add("day", 7).format('MM/DD/YYYY hh:mm:ss'),
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

describe("Hot lined account flow", function() {
	checkEULA();

	var autopayResponse = $.parseJSON('{"status":"success","autoPayExists":true,"cardNumber":"****-****-****-6812","cardName":"Bello","postalCode":"35000","cardType":"VISA","cardExpirationDate":"0716","paymentProfileId":"t4dagcaq4j"}');

	it('Go to home ', function() {
		$('#i18n_loginUsername').val('alpha').triggerHandler('input');
		$('#i18n_loginPwd').val('pass').triggerHandler('input');

		waits(500);
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
			responseText : JSON.stringify(autopayResponse)
		});
		$.mockjax({
			url : '*/payment/onetime',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success","confirmationId":"24ff57cf","amountReceived":"45.00","newBalance":"10.00"}'

		});

		$("#i18n_loginBtn").triggerHandler('tap');

		waits(1000);

		runs(function() {
			expect($('#loginPage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	waits(1000);

	it('UI is locked on pay form', function() {
		runs(function() {
			expect($('#footer')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	waits(1000);

	it('Can\'t quit pay form', function() {
		application.gotoPage("usagePage");

		waits(1000);
		
		runs(function() {
			expect($('#usagePage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	waits(1000);

	it("Pay now", function() {
		runs(function() {
			expect($("#termsAndConditions")).not.toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'false');
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
		});
		
		waits(500);

		runs(function() {
			$("#i18n_payMyBillSecurityCodeInput").val("123");
			$("#termsAndConditions").trigger("click");
		});
		
		waits(500);
		
		runs(function() {
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'false');
			
			$("#i18n_payMyBillPayNowButton").trigger("tap");
		});
	});

	waits(1000);

	it("Payment review", function() {
		runs(function() {
			expect($("#i18n_payMyBillReviewAmountInput").val()).toContain(homeMockResponse.amountDueToday);
			expect($("#i18n_payMyBillReviewButton")).not.toHaveClass("disabled");
			expect($("#i18n_payMyBillReviewButton")).not.toHaveAttr('aria-disabled', 'true');
			expect($("#i18n_payMyBillReviewCancelButton")).not.toHaveClass("disabled");
			expect($("#i18n_payMyBillReviewCancelButton")).not.toHaveAttr('aria-disabled', 'true');
		});
		
		runs(function() {
			$("#i18n_payMyBillReviewButton").trigger("tap");
		});
	});

	waits(1000);

	it("Payment confirmation", function() {
		homeMockResponse.accountStatus = "Active";
		homeMockResponse.amountDueToday = "0.00";
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
			responseText : JSON.stringify(autopayResponse)
		});
		
		runs(function() {
			$("#i18n_payMyBillConfirmationButton").trigger("tap");
		});
	});

	waits(1000);

	it("Home after payment", function() {
		expect($("#iOwe").html()).toContain('$0.00');
		expect($("#myCredit").html()).toContain('$10.00');
	});

	waits(1000);

	it("UI is unlocked", function() {
		runs(function() {
			application.gotoPage("morePage");
		});
		
		waits(1000);
		
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
			expect($('#footer')).toBeVisible();
		});
	});
});