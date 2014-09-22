describe(
		"292 device Insurance",
		function() {
			goToHomePage(true);

			var planDetailsResponse =            		$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
			var availableServicesResponse =      		$.parseJSON('{"status":"success","addedServices":[],"availableServices":[{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"08","serviceName":"FR Unlimited","serviceShortDescription":"Unlimited calls within France","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"09","serviceName":"Hardcore Browsing 3GB","serviceShortDescription":"Enjoy a monthly data transfer capacity of3 GB at a fixed rate","amount":"25","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"10","serviceName":"500 Messages","serviceShortDescription":"500-message add-on","amount":"55","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"11","serviceName":"Conference Call","serviceShortDescription":"Talk to several parties at the same time","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}]}');
			var validateServicesResponse =		 		$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"100.0"},"arBalance":10.0,"balanceAfterPurchase":0.0,"debitFromBalance":10.0}');
			var autopayResponse = 				 		$.parseJSON('{"status":"success","autoPayExists":true,"cardNumber":"****-****-****-6812","cardName":"Bello","postalCode":"35000","cardType":"VISA","cardExpirationDate":"0716","paymentProfileId":"t4dagcaq4j"}');
			var paymentSubmissionResponse = 	 		$.parseJSON('{"status":"success","confirmationId":"72050adc","amountReceived":"100.0","newBalance":"0"}');

			var afterUpdatePlanDetailsResponse = 		$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');
			var afterUpdateAvailableServicesResponse = 	$.parseJSON('{"status":"success","addedServices":[],"availableServices":[{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"08","serviceName":"FR Unlimited","serviceShortDescription":"Unlimited calls within France","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"09","serviceName":"Hardcore Browsing 3GB","serviceShortDescription":"Enjoy a monthly data transfer capacity of3 GB at a fixed rate","amount":"25","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"10","serviceName":"500 Messages","serviceShortDescription":"500-message add-on","amount":"55","typeIndicator":"OT","numberOfInstances":0,"isStackable":"true"},{"serviceId":"11","serviceName":"Conference Call","serviceShortDescription":"Talk to several parties at the same time","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}]}');
			var afterUpdateValidateServicesResponse =	$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"70.0"},"arBalance":0.0,"balanceAfterPurchase":0.0,"debitFromBalance":0.0}');
			var afterUpdateValidateServicesResponse_e =	$.parseJSON('{"status":"success","immediatePayment":{"service":"0","additionalService":"0","transactionFee":"0","totalTaxes":"0","totalAmount":"0.0"},"arBalance":70.0,"balanceAfterPurchase":0.0,"debitFromBalance":70.0}');
			var afterUpdateAutopayResponse = 			$.parseJSON('{"status":"success","autoPayExists":true,"cardNumber":"****-****-****-6812","cardName":"Bello","postalCode":"35000","cardType":"VISA","cardExpirationDate":"0716","paymentProfileId":"t4dagcaq4j"}');
			var afterUpdatePaymentSubmissionResponse = 	$.parseJSON('{"status":"success","confirmationId":"72050adc","amountReceived":"70.0","newBalance":"0"}');

			var afterSecondUpdatePlanDetailsResponse = 	$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"AOLMTSMV","serviceName":"Add-On Limited SMS MMS VOICE - For ST","serviceShortDescription":null,"amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');

			var afterRemoveAddonResponse = 				$.parseJSON('{"status":"success","plan":{"planId":"zig_031","planName":"The test plan","planDescription":"Made for testers","planMRC":55},"addedServices":[{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"14","serviceName":"Casual Browsing - 250MB","serviceShortDescription":"250MB Data Bundle","amount":"55","typeIndicator":"REC","numberOfInstances":0,"isStackable":"false"},{"serviceId":"16","serviceName":"International Calls","serviceShortDescription":"60mins International Calls","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"17","serviceName":"International SMS","serviceShortDescription":"100 International SMS","amount":"55","typeIndicator":"OT","numberOfInstances":1,"isStackable":"true"},{"serviceId":"07","serviceName":"Call Display","serviceShortDescription":"See the name and number of the person calling you","amount":"15","typeIndicator":"REC","numberOfInstances":0,"isStackable":"true"}],"includedServices":["Caller ID","Domestic Long Distance","Enhanced Voice Mail","Technical feature for switch - Unlimited SMS Domestic on PP","Technical feature for switch - Unlimited Voice Domestic/Intl on PP","Text Messaging Feature","Call Waiting","Three-Way Calling","100MB data feature - for Base Plan","Technical feature for switch - Unlimited Voice Domestic on PP","Technical feature for switch - Unlimited VoiceMail Domestic on PP"]}');

			
			it("Go to my plan", function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/planandservices',
					responseTime : 500,
					contentType : 'text/json',
					responseText : JSON.stringify(planDetailsResponse)
				});

				application.gotoPage("myPlanPage");
				waits(600);

				runs(function() {
					expect($('#homePage')).toBeHidden();
					expect($('#myPlanPage')).toBeVisible();
				});
			});

			waits(1000);
			
			it("Go to shop addons page", function() {
				$.mockjaxClear();
				var hasDeviceType = null;
				var deviceType = null;
				$.mockjax({
					url : '*/planandservices/available',
					responseTime : 500,
					contentType : 'text/json',
					response: function (settings) {
					    var data = JSON.parse(settings.data);
					    hasDeviceType = typeof data.deviceType != "undefined";
					    deviceType = data.deviceType;
					    this.responseText = JSON.stringify(availableServicesResponse);
					 }
				});

				$("#i18n_myPlanButton").triggerHandler("tap");
				waits(600);

				runs(function() {
					expect(hasDeviceType).toEqual(true);
					expect(deviceType).toEqual('wp');
				});
			});
		});
