describe("Shop addons", function() {
	goToHomePage(true);

	var planDetailsResponse =            		$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
	var availableServicesResponse =      		$.parseJSON('{"status":"success","addedServices":[],"availableServices":[{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you.","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"08","serviceName":"FR Unlimited","serviceShortDescription":"Unlimited calls within France, see http://www.aiowireless.com/int for more informations.","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"09","serviceName":"Hardcore Browsing 3GB","serviceShortDescription":"Enjoy a monthly data transfer capacity of3 GB at a fixed rate, see aiowireless.com/plop for more informations.","amount":"25","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"10","serviceName":"500 Messages","serviceShortDescription":"500-message add-on","amount":"55","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"11","serviceName":"Conference Call","serviceShortDescription":"Talk to several parties at the same time","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}]}');
	var validateServicesResponse =		 		$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"100.0"},"arBalance":10.0,"balanceAfterPurchase":0.0,"debitFromBalance":10.0}');
	var autopayResponse = 				 		$.parseJSON('{"status":"success","autoPayExists":true,"cardNumber":"****-****-****-6812","cardName":"Bello","postalCode":"35000","cardType":"VISA","cardExpirationDate":"0716","paymentProfileId":"t4dagcaq4j"}');
	var paymentSubmissionResponse = 	 		$.parseJSON('{"status":"success","confirmationId":"72050adc","amountReceived":"100.0","newBalance":"0"}');

	var afterUpdatePlanDetailsResponse = 		$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
	var afterUpdateAvailableServicesResponse = 	$.parseJSON('{"status":"success","addedServices":[],"availableServices":[{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"08","serviceName":"FR Unlimited","serviceShortDescription":"Unlimited calls within France","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"09","serviceName":"Hardcore Browsing 3GB","serviceShortDescription":"Enjoy a monthly data transfer capacity of3 GB at a fixed rate","amount":"25","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"10","serviceName":"500 Messages","serviceShortDescription":"500-message add-on","amount":"55","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"11","serviceName":"Conference Call","serviceShortDescription":"Talk to several parties at the same time","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}]}');
	var afterUpdateValidateServicesResponse =	$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"70.0"},"arBalance":0.0,"balanceAfterPurchase":0.0,"debitFromBalance":0.0}');
	var afterUpdateValidateServicesResponse_e =	$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"0.0"},"arBalance":80.0,"balanceAfterPurchase":10.0,"debitFromBalance":70}');
	var afterUpdateAutopayResponse = 			$.parseJSON('{"status":"success","autoPayExists":true,"cardNumber":"****-****-****-6812","cardName":"Bello","postalCode":"35000","cardType":"VISA","cardExpirationDate":"0716","paymentProfileId":"t4dagcaq4j"}');
	var afterUpdatePaymentSubmissionResponse = 	$.parseJSON('{"status":"success","confirmationId":"72050adc","amountReceived":"70.0","newBalance":"0"}');

	var afterSecondUpdatePlanDetailsResponse = 	$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
	var afterThirdUpdatePlanDetailsResponse = 	$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');

	var afterRemoveAddonResponse = 				$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
	
	var PINCheckResponse =		 				$.parseJSON('{"status":"success"}');
	
	var qtyButtonsEventName = "tap";
	
	
	it("Go to my plan", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(planDetailsResponse)
		});

		application.gotoPage("myPlanPage");
		waits(1000);

		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
		});
	});

	waits(1000);

	it("My plan details are well populated", function() {
		runs(function() {
			expect($("#myPlanContainer .services-list li")).toHaveLength(planDetailsResponse.includedServices.length);
			expect($("#myPlanOTServicesContainer > div")).toHaveLength($.grep(planDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "OT";
			}).length);
			expect($("#myPlanRecServicesContainer > div")).toHaveLength($.grep(planDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "REC";
			}).length);
			callPhantom({cmd : 'capture', name:'shop1-myPlanDetails'});
		});
	});

	waits(1000);

	it("Go to shop addons page", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/available',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(availableServicesResponse)
		});
		$.mockjax({
			url : '*/authentication/verifypin',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(PINCheckResponse)
		});

		$("#i18n_myPlanButton").triggerHandler("tap");
		waits(1000);
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

	it("Go to shop addons page", function() {
		runs(function() {
			expect($('#myPlanPage')).toBeHidden();
			expect($('#manageServicesPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Addons list is well populated", function() {
		runs(function() {
			expect($("#manageServicesOTServices > li > div[data-type = 'OT']")).toHaveLength($.grep(availableServicesResponse.availableServices, function(service, index) {
				return service.typeIndicator == "OT";
			}).length);
			expect($("#manageServicesRecServices > li > div[data-type = 'REC']")).toHaveLength($.grep(availableServicesResponse.availableServices, function(service, index) {
				return service.typeIndicator == "REC";
			}).length);
			callPhantom({cmd : 'capture', name:'shop2-addonsPage'});
		});
	});

	waits(1000);

	it("Links in addons description are tagged", function() {
		runs(function() {
			expect($("#manageServicesOTServices").find("a")).toHaveLength(2);
		});
	});
	
	waits(1000);
	
	it("Adding an OT addon", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$0.00");
			expect($("#i18n_manageServicesButton")).toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).toHaveAttr('aria-disabled', 'true');
		});

		runs(function() {
			$("#manageServicesOTServices .ui-plus").first().triggerHandler(qtyButtonsEventName);
		});
		
		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop3-addonsPage-addAnOT'});
		});
	});
	
	waits(1000);

	it("Adding an REC addon", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
		});

		runs(function() {
			$("#manageServicesRecServices .ui-plus").first().trigger(qtyButtonsEventName);
		});

		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$110.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop4-addonsPage-addAREC'});
		});
	});
	
	waits(1000);
	
	it("Deleting an REC add-on", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$110.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
		});
		
		runs(function() {
			$("#manageServicesRecServices .ui-minus").first().trigger(qtyButtonsEventName);
		});
		
		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop5-addonsPage-delAREC'});
		});
		
		runs(function() { // add again the add-on to complete the test process. Do not check again.
			$("#manageServicesRecServices .ui-plus").first().trigger(qtyButtonsEventName);
		});
	});
	
	waits(1000);
	
	it("Validate addons choice", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/validate',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(validateServicesResponse)
		});

		runs(function() {
			$("#i18n_manageServicesButton").triggerHandler("tap");
		});
		
		waits(1000);

		runs(function() {
			expect($('#manageServicesPage')).toBeHidden();
			expect($('#servicesReviewPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Loading addons choice review", function() {
		runs(function() {
			expect($("#servicesReviewAmountDue").html()).toContain(validateServicesResponse.immediatePayment.totalAmount);			
			expect($("#i18n_servicesReviewBtn")).not.toHaveClass("disabled");
			expect($("#i18n_servicesReviewBtn")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop5-addonsReview'});
		});
	});

	waits(1000);

	it("Confirm addons choice", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(autopayResponse)
		});

		runs(function() {
			$("#i18n_servicesReviewBtn").triggerHandler("tap");
		});
		
		waits(1000);

		runs(function() {
			expect($('#servicesReviewPage')).toBeHidden();
			expect($('#servicesPaymentPage')).toBeVisible();
		});
	});

	waits(1000);
	
	it("Validate payment", function() {
		runs(function() {
			expect($("#servicesPaymentAmountInput").val()).toContain(validateServicesResponse.immediatePayment.totalAmount);
			expect($("#servicesPaymentNameInput").val()).toContain(autopayResponse.cardName);
			expect($("#servicesPaymentCardType").val()).toContain(autopayResponse.cardType);
			expect($("#servicesPaymentCardNumberInput").val()).toContain(autopayResponse.cardNumber);
			if(application.model.isIos) {
				expect($("#servicesPaymentExpirationDateInput").val()).toContain(moment(autopayResponse.cardExpirationDate, "MMYY").format("YYYY-MM"));
			}
			else {
				expect($("#servicesPaymentExpirationDateYear").val()).toContain(moment(autopayResponse.cardExpirationDate, "MMYY").format("YYYY"));
				expect($("#servicesPaymentExpirationDateMonth").val()).toContain(moment(autopayResponse.cardExpirationDate, "MMYY").format("MM"));
			}
			expect($("#servicesPaymentPostalCodeInput").val()).toContain(autopayResponse.postalCode);
			expect($("#servicesPaymentPayNowButton")).toHaveClass("disabled");
			expect($("#servicesPaymentPayNowButton")).toHaveAttr('aria-disabled', 'true');
			expect($("#servicesPaymentTermsAndConditions")).not.toBeChecked();
			expect($("#servicesPaymentTermsAndConditions")).toHaveAttr('aria-checked', 'false');
		});

		runs(function() {
			$("#servicesPaymentTermsAndConditions").trigger("click");
			$("#servicesPaymentSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#servicesPaymentPayNowButton")).not.toHaveClass("disabled");
			expect($("#servicesPaymentPayNowButton")).not.toHaveAttr('aria-disabled', 'true');
			expect($("#servicesPaymentTermsAndConditions")).toBeChecked();
			expect($("#servicesPaymentTermsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'shop6-addonsPayment'});
		});
	});

	waits(1000);

	it("Submit payment", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/payment/onetime',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(paymentSubmissionResponse)
		});
		$.mockjax({
			url : '*/planandservices/submit',
			responseTime : 500,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdatePlanDetailsResponse)
		});

		runs(function() {
			$("#servicesPaymentPayNowButton").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#servicesPaymentPage')).toBeHidden();
			expect($('#manageServicesConfirmationPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Check confirmation page", function() {
		runs(function() {
			expect($("#confirmationCodeValue").html()).toContain(paymentSubmissionResponse.confirmationId);
			expect($("#paymentReceivedValue").html()).toContain(paymentSubmissionResponse.amountReceived);
			expect($("#nameOnCardValue").html()).toContain(autopayResponse.cardName);
			expect($("#cardNumberValue").html()).toContain(autopayResponse.cardNumber);
			expect($("#expirationDateValue").html()).toContain(moment(autopayResponse.cardExpirationDate, "MMYY").format("MM/YYYY"));
			callPhantom({cmd : 'capture', name:'shop7-addonsConfirmation'});
		});
	});

	waits(1000);

	it("Validate confirmation", function() {
		runs(function() {
			$("#manageServicesConfirmationPage .sub-page .button.blue-button").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#manageServicesConfirmationPage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'shop8-myNewPlan'});
		});
	});

	waits(1000);

	it("My new plan details are well populated", function() {
		runs(function() {
			expect($("#myPlanContainer .services-list li")).toHaveLength(afterUpdatePlanDetailsResponse.includedServices.length);
			expect($("#myPlanOTServicesContainer > div")).toHaveLength($.grep(afterUpdatePlanDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "OT";
			}).length);
			expect($("#myPlanRecServicesContainer > div")).toHaveLength($.grep(afterUpdatePlanDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "REC";
			}).length);
			callPhantom({cmd : 'capture', name:'shop9-myPlanNewDetails'});
		});
	});

	waits(1000);

	it("Go to shop addons page again", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/available',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdateAvailableServicesResponse)
		});

		$("#i18n_myPlanButton").triggerHandler("tap");
		waits(1000);

		runs(function() {
			expect($('#myPlanPage')).toBeHidden();
			expect($('#manageServicesPage')).toBeVisible();
		});
	});

	waits(1000);

	it("New addons list is well populated", function() {
		expect($("#manageServicesOTServices > li > div[data-type = 'OT']")).toHaveLength($.grep(afterUpdateAvailableServicesResponse.availableServices, function(service, index) {
			return service.typeIndicator == "OT";
		}).length);
		expect($("#manageServicesRecServices > li > div[data-type = 'REC']")).toHaveLength($.grep(afterUpdateAvailableServicesResponse.availableServices, function(service, index) {
			return service.typeIndicator == "REC";
		}).length);
		callPhantom({cmd : 'capture', name:'shop10-newAddonsPage'});
	});

	waits(1000);

	it("Adding another OT addon", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$0.00");
			expect($("#i18n_manageServicesButton")).toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).toHaveAttr('aria-disabled', 'true');
		});

		runs(function() {
			$("#manageServicesOTServices .ui-plus").first().triggerHandler(qtyButtonsEventName);
		});

		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop11-newAddonsPage-addAnotherOT'});
		});
	});
	
	waits(1000);

	it("Adding another REC addon", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
		});

		runs(function() {
			$("#manageServicesRecServices .ui-plus").first().trigger(qtyButtonsEventName);
		});

		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$70.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop12-newAddonsPage-addAnotherREC'});
		});
	});
	
	waits(1000);

	it("Validate new addons choice", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/validate',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdateValidateServicesResponse)
		});

		runs(function() {
			$("#i18n_manageServicesButton").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#manageServicesPage')).toBeHidden();
			expect($('#servicesReviewPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Loading new addons choice review", function() {
		runs(function() {
			expect($("#servicesReviewAmountDue").html()).toContain(afterUpdateValidateServicesResponse.immediatePayment.totalAmount);			
			expect($("#i18n_servicesReviewBtn")).not.toHaveClass("disabled");
			expect($("#i18n_servicesReviewBtn")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop13-newAddonsReview'});
		});
	});

	waits(1000);

	it("Confirm new addons choice", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdateAutopayResponse)
		});

		runs(function() {
			$("#i18n_servicesReviewBtn").triggerHandler("tap");
		});
		
		waits(1000);

		runs(function() {
			expect($('#servicesReviewPage')).toBeHidden();
			expect($('#servicesPaymentPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Validate new payment", function() {
		runs(function() {
			expect($("#servicesPaymentAmountInput").val()).toContain(afterUpdateValidateServicesResponse.immediatePayment.totalAmount);
			expect($("#servicesPaymentNameInput").val()).toContain(afterUpdateAutopayResponse.cardName);
			expect($("#servicesPaymentCardType").val()).toContain(afterUpdateAutopayResponse.cardType);
			expect($("#servicesPaymentCardNumberInput").val()).toContain(afterUpdateAutopayResponse.cardNumber);
			if(application.model.isIos) {
				expect($("#servicesPaymentExpirationDateInput").val()).toContain(moment(afterUpdateAutopayResponse.cardExpirationDate, "MMYY").format("YYYY-MM"));
			}
			else {
				expect($("#servicesPaymentExpirationDateYear").val()).toContain(moment(afterUpdateAutopayResponse.cardExpirationDate, "MMYY").format("YYYY"));
				expect($("#servicesPaymentExpirationDateMonth").val()).toContain(moment(afterUpdateAutopayResponse.cardExpirationDate, "MMYY").format("MM"));
			}
			expect($("#servicesPaymentPostalCodeInput").val()).toContain(afterUpdateAutopayResponse.postalCode);
			expect($("#servicesPaymentPayNowButton")).toHaveClass("disabled");
			expect($("#servicesPaymentPayNowButton")).toHaveAttr('aria-disabled', 'true');
			expect($("#servicesPaymentTermsAndConditions")).not.toBeChecked();
			expect($("#servicesPaymentTermsAndConditions")).toHaveAttr('aria-checked', 'false');
		});

		runs(function() {
			$("#servicesPaymentTermsAndConditions").trigger("click");
			$("#servicesPaymentSecurityCodeInput").val("123").triggerHandler("input");
		});
		
		runs(function() {
			expect($("#servicesPaymentPayNowButton")).not.toHaveClass("disabled");
			expect($("#servicesPaymentPayNowButton")).not.toHaveAttr('aria-disabled', 'true');
			expect($("#servicesPaymentTermsAndConditions")).toBeChecked();
			expect($("#servicesPaymentTermsAndConditions")).toHaveAttr('aria-checked', 'true');
			callPhantom({cmd : 'capture', name:'shop14-newAddonsPayment'});
		});
	});

	waits(1000);

	it("Submit new payment", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/payment/onetime',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdatePaymentSubmissionResponse)
		});
		$.mockjax({
			url : '*/planandservices/submit',
			responseTime : 500,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterSecondUpdatePlanDetailsResponse)
		});

		runs(function() {
			$("#servicesPaymentPayNowButton").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#servicesPaymentPage')).toBeHidden();
			expect($('#manageServicesConfirmationPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Check new confirmation page", function() {
		runs(function() {
			expect($("#confirmationCodeValue").html()).toContain(afterUpdatePaymentSubmissionResponse.confirmationId);
			expect($("#paymentReceivedValue").html()).toContain(afterUpdatePaymentSubmissionResponse.amountReceived);
			expect($("#nameOnCardValue").html()).toContain(afterUpdateAutopayResponse.cardName);
			expect($("#cardNumberValue").html()).toContain(afterUpdateAutopayResponse.cardNumber);
			expect($("#expirationDateValue").html()).toContain(moment(afterUpdateAutopayResponse.cardExpirationDate, "MMYY").format("MM/YYYY"));
			callPhantom({cmd : 'capture', name:'shop15-newAddonsConfirmation'});
		});
	});

	waits(1000);

	it("Validate new confirmation", function() {
		runs(function() {
			$("#manageServicesConfirmationPage .sub-page .button.blue-button").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#manageServicesConfirmationPage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'shop16-mySecondNewPlan'});
		});
	});

	waits(1000);

	it("My second new plan details are well populated", function() {
		runs(function() {
			expect($("#myPlanContainer .services-list li")).toHaveLength(afterSecondUpdatePlanDetailsResponse.includedServices.length);
			expect($("#myPlanOTServicesContainer > div")).toHaveLength($.grep(afterSecondUpdatePlanDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "OT";
			}).length);
			expect($("#myPlanRecServicesContainer > div")).toHaveLength($.grep(afterSecondUpdatePlanDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "REC";
			}).length);
			callPhantom({cmd : 'capture', name:'shop17-mySecondPlanNewDetails'});
		});
	});
	
	/**
	 * Test the case when enough money stays on the account balance
	 */
	it("Go to shop addons page again - balance is enough", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/available',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdateAvailableServicesResponse)
		});

		$("#i18n_myPlanButton").triggerHandler("tap");
		waits(1000);

		runs(function() {
			expect($('#myPlanPage')).toBeHidden();
			expect($('#manageServicesPage')).toBeVisible();
		});
	});

	waits(1000);

	it("New addons list is well populated - balance is enough", function() {
		expect($("#manageServicesOTServices > li > div[data-type = 'OT']")).toHaveLength($.grep(afterUpdateAvailableServicesResponse.availableServices, function(service, index) {
			return service.typeIndicator == "OT";
		}).length);
		expect($("#manageServicesRecServices > li > div[data-type = 'REC']")).toHaveLength($.grep(afterUpdateAvailableServicesResponse.availableServices, function(service, index) {
			return service.typeIndicator == "REC";
		}).length);
		callPhantom({cmd : 'capture', name:'shop18-newAddonsPage'});
	});

	waits(1000);

	it("Adding another OT addon - balance is enough", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$0.00");
			expect($("#i18n_manageServicesButton")).toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).toHaveAttr('aria-disabled', 'true');
		});

		runs(function() {
			$("#manageServicesOTServices .ui-plus").first().triggerHandler(qtyButtonsEventName);
		});

		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop19-newAddonsPage-addAnotherOT'});
		});
	});
	
	waits(1000);

	it("Adding another REC addon - balance is enough", function() {
		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$55.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
		});

		runs(function() {
			$("#manageServicesRecServices .ui-plus").first().trigger(qtyButtonsEventName);
		});

		waits(1000);

		runs(function() {
			expect($("#manageServicesPage .summary-total-text .total-value").html()).toContain("$70.00");
			expect($("#i18n_manageServicesButton")).not.toHaveClass("disabled");
			expect($("#i18n_manageServicesButton")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop20-newAddonsPage-addAnotherREC'});
		});
	});
	
	waits(1000);

	it("Validate new addons choice - balance is enough", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/validate',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterUpdateValidateServicesResponse_e)
		});
		$.mockjax({
			url : '*/planandservices/submit',
			responseTime : 500,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterThirdUpdatePlanDetailsResponse)
		});

		runs(function() {
			$("#i18n_manageServicesButton").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#manageServicesPage')).toBeHidden();
			expect($('#servicesReviewPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Loading new addons choice review - balance is enough", function() {
		runs(function() {
			expect($("#servicesReviewAmountDue").html()).toContain(afterUpdateValidateServicesResponse_e.immediatePayment.totalAmount);			
			expect($("#i18n_servicesReviewBtn")).not.toHaveClass("disabled");
			expect($("#i18n_servicesReviewBtn")).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'shop21-newAddonsReview'});
		});
	});

	waits(1000);

	it("Confirm new addons choice - balance is enough", function() {
		runs(function() {
			$("#i18n_servicesReviewBtn").triggerHandler("tap");
		});

		waits(1000);
		
		runs(function() {
			expect($('#servicesReviewPage')).toBeHidden();
			expect($('#servicesPaymentPage')).toBeHidden();
			expect($('#manageServicesConfirmationPage')).toBeVisible();
		});
	});

	waits(1000);

	it("Check new confirmation page - balance is enough", function() {
		runs(function() {
			expect($("#confirmationCodeValue").html()).toContain(afterUpdatePaymentSubmissionResponse.confirmationId);
			expect($("#paymentReceivedValue").html()).toContain(afterUpdatePaymentSubmissionResponse.amountReceived);
			callPhantom({cmd : 'capture', name:'shop23-newAddonsConfirmation'});
		});
	});

	waits(1000);

	it("Validate new confirmation - balance is enough", function() {
		runs(function() {
			$("#manageServicesConfirmationPage .sub-page .button.blue-button").triggerHandler("tap");
		});

		waits(1000);

		runs(function() {
			expect($('#manageServicesConfirmationPage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'shop24-mySecondNewPlan'});
		});
	});

	waits(1000);

	it("My second new plan details are well populated - balance is enough", function() {
		runs(function() {
			expect($("#myPlanContainer .services-list li")).toHaveLength(afterThirdUpdatePlanDetailsResponse.includedServices.length);
			expect($("#myPlanOTServicesContainer > div")).toHaveLength($.grep(afterThirdUpdatePlanDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "OT";
			}).length);
			expect($("#myPlanRecServicesContainer > div")).toHaveLength($.grep(afterThirdUpdatePlanDetailsResponse.addedServices, function(service, index) {
				return service.typeIndicator == "REC";
			}).length);
			callPhantom({cmd : 'capture', name:'shop25-mySecondPlanNewDetails'});
		});
	});

	waits(1000);
	
	it("Remove one REC addon - Click on remove button", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/planandservices/submit',
			responseTime : 500,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		$.mockjax({
			url : '*/planandservices',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(afterRemoveAddonResponse)
		});

		$($("#myPlanRecServicesContainer").find('.toggle.ui-shop-icon.ui-minus')[0]).triggerHandler("tap");
		
		waits(1000);
		runs(function() {
			expect($('#myPlanPage')).toBeHidden();
			expect($('#servicesReviewPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'shop26-removeAddonReview'});
		});
	});
	
	waits(1000);
	
	it("Remove one REC addon - Click on continue button (review page)", function() {
		$("#i18n_servicesReviewBtn").triggerHandler("tap");
		
		waits(1000);
		runs(function() {
			expect($('#servicesReviewPage')).toBeHidden();
			expect($('#deleteOneServiceConfirmationPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'shop27-removeAddonConfirmation'});
		});
	});
	
	waits(1000);
	
	it("Remove one REC addon - Click on OK button (confirmation page)", function() {
		$("#deleteOneServiceConfirmationPage").find('.blue-button').triggerHandler("tap");
		
		waits(1000);
		runs(function() {
			expect($('#deleteOneServiceConfirmationPage')).toBeHidden();
			expect($('#myPlanPage')).toBeVisible();
			expect($("#myPlanRecServicesContainer > div")).toHaveLength($.grep(afterRemoveAddonResponse.addedServices, function(service, index) {
				return service.typeIndicator == "REC";
			}).length);
			callPhantom({cmd : 'capture', name:'shop28-addonRemoved'});
		});
	});
	
});