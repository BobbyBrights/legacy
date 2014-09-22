describe("Pay amount", function() {
	// Go from start to home page
	goToHomePage(true);

	var homeResponse =            		$.parseJSON('{"status":"success","accountId":"92909918","accountName":"alpha","accountStatus":"Active","billCycleDate":"01/14/2014 22:25:16","accountBalance":"0.00","amountDueToday":"55.00","anniversaryDate":"01/12/2013 00:00:00","nextBillDueDays":"12","subscribers":[{"ctn":"1111111753","subscriberId":"63822842051","status":"active","isTablet":false,"tablet":false}],"totalMRC":"90","pinSecurity":"1"}');
	var validateServicesResponse =		$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"100.0"},"arBalance":10.0,"balanceAfterPurchase":0.0,"debitFromBalance":10.0}');
	var autopayExistsResponse = 		$.parseJSON('{"status":"success","autoPayExists":true,"cardNumber":"************3456","cardName":"Bello","postalCode":"35000","cardType":"VISA","cardExpirationDate":"0716","paymentProfileId":"t4dagcaq4j"}');
	var autopayResponse = 				$.parseJSON('{"status":"success","autoPayExists":false}');
	var paymentSubmissionResponse = 	$.parseJSON('{"status":"success","confirmationId":"cc2f5d6f","amountReceived":"100.0","newBalance":"10.80"}');
	
	it("Go to pay my bill", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(homeResponse)
		});
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(autopayResponse)
		});

		runs(function() {
			application.gotoPage("payMyBillPage");
		});
		waits(1000);

		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});

	waits(1000);
	
	it("Validate form - without amount", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(0);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay10-paymentAmount'});
		});
	});

	waits(1000);
	
	it("Validate form - wrong security code length", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

//			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("12").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillSecurityCodeInput")).toHaveClass("error");
			
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay11-paymentSecurityCode'});
		});
	});

	waits(1000);
	
	it("Validate form - wrong Card number length", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("AE");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

//			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("1234").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillCardNumberInput")).toHaveClass("error");
			
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay12-paymentCardNumber'});
		});
	});

	waits(1000);
	
	it("Validate form - wrong postal code length", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val("35").triggerHandler("input");

//			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPostalCodeInput")).toHaveClass("error");
			
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay13-paymentPostalCode'});
		});
	});

	waits(1000);
	
	it("Validate form - wrong expiration date", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment("0113", "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment("0113", "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment("0113", "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

//			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			if(application.model.isIos) {
				expect($("#i18n_payMyBillExpirationDateInput")).toHaveClass("error");
			}
			else {
				expect($("#i18n_payMyBillExpirationDateYear")).toHaveClass("error");
				expect($("#i18n_payMyBillExpirationDateMonth")).toHaveClass("error");
			}
			
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay14-paymentExpirationDate'});
		});
	});

	waits(1000);
	
	it("Validate form - Set Autopay - pin required missing", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

			$("#termsAndConditions").trigger("click");
			$("#payMyBillAutoPayCheckBox").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).not.toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'false');
			
			expect($("#payMyBillAutoPayCheckBox")).toBeChecked();
			expect($("#payMyBillAutoPayCheckBox")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay15-paymentPinMissing'});
		});
	});

	waits(1000);
	
	it("Validate form - Set Autopay - pin required", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillPinInput").val("1234").triggerHandler("input");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveAttr('aria-disabled', 'true');
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			expect($("#payMyBillAutoPayCheckBox")).toBeChecked();
			expect($("#payMyBillAutoPayCheckBox")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay16-paymentPinRequired'});
		});
	});

	waits(1000);
	
	it("Validate form - without terms and conditions", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

			$("#termsAndConditions").trigger("click");
			$("#payMyBillAutoPayCheckBox").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPayNowButton")).toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).toHaveAttr('aria-disabled', 'true');
			
			expect($("#termsAndConditions")).not.toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'false');
			callPhantom({cmd : 'capture', name:'pay19-paymentTerms'});
		});
	});

	waits(1000);
	
	it("Validate form", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveAttr('aria-disabled', 'true');
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'pay1-addonsPayment'});
		});
	});

	waits(1000);

	it("Submit payment", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(homeResponse)
		});
		
		runs(function() {
			$("#i18n_payMyBillPayNowButton").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#payMyBillPage')).toBeHidden();
			expect($('#payMyBillReviewPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Check confirmation page", function() {

		$.mockjaxClear();
		$.mockjax({
			url : '*/payment/onetime',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(paymentSubmissionResponse)
		});
	
		runs(function() {
			$("#i18n_payMyBillReviewButton").triggerHandler("tap");
		});
	
		waits(1000);
      
		runs(function() {
			expect($("#payMyBillConfirmationCode").html()).toContain(paymentSubmissionResponse.confirmationId);
			expect($("#payMyBillConfirmationAmount").html()).toContain(paymentSubmissionResponse.amountReceived);
			expect($("#payMyBillConfirmationName").html()).toContain(autopayExistsResponse.cardName);
			expect($("#payMyBillConfirmationCardNumber").html()).toContain(autopayExistsResponse.cardNumber);
			expect($("#payMyBillConfirmationExpirationDate").html()).toContain(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM/YYYY"));
			callPhantom({cmd : 'capture', name:'pay2-addonsConfirmation'});
		});
	});

	waits(1000);

	it("Final validation - go home", function() {
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
			$("#i18n_payMyBillConfirmationButton").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#payMyBillReviewPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	it("Return to pay my bill", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(homeResponse)
		});
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(autopayResponse)
		});

		runs(function() {
			application.gotoPage("payMyBillPage");
		});
		waits(1000);

		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#payMyBillPage')).toBeVisible();
		});
	});
	
	waits(1000);
	
	it("Validate form - without error", function() {
		runs(function() {
			$("#i18n_payMyBillAmountInput").val(validateServicesResponse.immediatePayment.totalAmount);
			$("#i18n_payMyBillNameInput").val(autopayExistsResponse.cardName);
			$("#payMyBillCardType").val("DISC");
			$("#i18n_payMyBillCardNumberInput").val("1234567890123456").triggerHandler("input");
			if(application.model.isIos) {
				$("#i18n_payMyBillExpirationDateInput").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY-MM")).triggerHandler("input");
			}
			else {
				$("#i18n_payMyBillExpirationDateYear").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("YYYY")).triggerHandler("input");
				$("#i18n_payMyBillExpirationDateMonth").val(moment(autopayExistsResponse.cardExpirationDate, "MMYY").format("MM")).triggerHandler("input");
			}
			$("#i18n_payMyBillPostalCodeInput").val(autopayExistsResponse.postalCode).triggerHandler("input");

			$("#termsAndConditions").trigger("click");
			$("#i18n_payMyBillSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveClass("disabled");
			expect($("#i18n_payMyBillPayNowButton")).not.toHaveAttr('aria-disabled', 'true');
			expect($("#termsAndConditions")).toBeChecked();
			expect($("#termsAndConditions")).toHaveAttr('aria-checked', 'true');
		});
	});
	
	var errorTestFct = function(request){
		it("Check confirmation page - errors ", function() {
			waits(1000);
		
			$.mockjaxClear();
			$.mockjax({
				url : '*/authentication/home',
				responseTime : 500,
				contentType : 'text/json',
				responseText : JSON.stringify(homeResponse)
			});
			$.mockjax({
				url : '*/payment/auto/details',
				responseTime : 250,
				contentType : 'text/json',
				responseText : JSON.stringify(autopayResponse)
			});
			$.mockjax({
				url : '*/payment/onetime',
				responseTime : 500,
				contentType : 'text/json',
				responseText : JSON.stringify(request.json)
			});
			
			runs(function() {
				$("#i18n_payMyBillPayNowButton").triggerHandler("tap");
			});
	
			waits(1000);
	
			runs(function() {
				expect($('#payMyBillPage')).toBeHidden();
				expect($('#payMyBillReviewPage')).toBeVisible();
			});
	
			runs(function() {
				$("#i18n_payMyBillReviewButton").triggerHandler("tap");
			});
		
			waits(1000);
	      
			runs(function() {
				expect($('#zAlert')).toExist();
				expect($('#zAlert #zContent').html()).toMatch(request.message);
			});
	
			waits(1000);
			runs(function() {
				$("#zAlert .bright").triggerHandler('tap');
			});
			waits(1000);
	
			runs(function() {
				expect($('#payMyBillReviewPage')).toBeHidden();
				expect($('#payMyBillPage')).toBeVisible();
			});
		});
	};
	
	errorTestFct({json : $.parseJSON('{"status":"failure","messages":[{"code":"5000","severity":"error"}]}'), message: "Looks like your credit card was declined. Please try with a different card."});
	errorTestFct({json : $.parseJSON('{"status":"failure","messages":[{"code":"5001","severity":"error"}]}'), message: "Looks like your credit card information is not correct.  Please try again."});
	errorTestFct({json : $.parseJSON('{"status":"failure","messages":[{"code":"5002","severity":"error"}]}'), message: "Looks like all the credit card information you entered doesn't match. Please try again."});

});