function Connector(mainDebug) {
	
	var ZIP_292_ENABLE = false;
	
	$.ajaxSetup({timeout : 60000});
	var self = this;

	/*[@if DEV]*/
	var env = "dev";
	/*[@endif DEV]*/
	/*[@if ENV]
	var env = "@@webservice.env@@";
	/*[@endif ENV]*/

	var envHost = "";
	var queue = "";
	
	switch (env) {
//	case "iut33":
//		envHost = "http://ilsun037:43300/rest/";
//		break;
	case "iut34":
		envHost = "http://ilsun037:43400/rest/";
		queue = "58997";
		break;
	case "iut42":
		envHost = "http://ilsun037:44200/rest/";
		queue = "58997";
		break;
	case "env56":
		envHost = "http://ilsun037:45600/rest/";
		queue = "58997";
		break;
	case "env52":
		envHost = "http://ilsun037:45200/rest/";
		queue = "58997";
		break;
	case "env53":
		envHost = "http://ilsun037:45300/rest/";
		queue = "58997";
		break;
	case "env50":
		envHost = "http://ilsun037:45000/rest/";
		queue = "58997";
		break;
	case "env43":
		envHost = "http://ilsun037:44300/rest/";
		queue = "58997";
		break;
	case "env35":
		envHost = "http://ilsun037:43500/rest/";
		queue = "58997";
		break;
	case "env54":
		envHost = "http://ilsun037:45400/rest/";
		queue = "58997";
		break;
	case "env21":
		envHost = "http://ilsun037:42100/rest/";
		queue = "58997";
		break;
	case "sit":
		envHost = "https://apimyaiosit1.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "sit2":
		envHost = "https://apimyaiosit2.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "sit3":
		envHost = "https://apimyaiosit3.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "sit4":
		envHost = "https://apimyaiosit4.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "sit5":
		envHost = "https://apimyaiosit5.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "sit6":
		envHost = "https://apimyaiosit6.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "sit7":
		envHost = "https://apimyaiosit7.connect.aiowireless.com/rest/";
		queue = "58997";
		break;
	case "prod":
		envHost = "https://apimyaio.aiowireless.com/rest/";
		queue = "58275";
		break;
	default:
		// dev
		envHost = "http://5.56.62.135:8080/cwstz-zig-0.11/rest/";
		envHost = "http://localhost:8080/cwstz-zig/rest/";
		//	envHost = "http://193.43.245.151:48080/rest2/rest/";
		queue = "58997";
		break;
	}

	var MSG_NETWORK_ERROR_TITLE = $.i18n._('GENERIC_NETWORK_ERROR_TITLE');
	var MSG_NETWORK_ERROR_MESSAGE = $.i18n._('GENERIC_NETWORK_ERROR_MESSAGE');
	var MSG_404_ERROR_TITLE = $.i18n._('GENERIC_NETWORK_ERROR_TITLE');
	var MSG_404_ERROR_MESSAGE = $.i18n._('GENERIC_NETWORK_ERROR_MESSAGE');
	var MSG_500_ERROR_TITLE = $.i18n._('GENERIC_NETWORK_ERROR_TITLE');
	var MSG_500_ERROR_MESSAGE = $.i18n._('GENERIC_NETWORK_ERROR_MESSAGE');
	var MSG_TIMEOUT_ERROR_TITLE = $.i18n._('GENERIC_NETWORK_ERROR_TITLE');
	var MSG_TIMEOUT_ERROR_MESSAGE = $.i18n._('GENERIC_NETWORK_ERROR_MESSAGE');
	var MSG_UNKNOWN_ERROR_TITLE = $.i18n._('GENERIC_NETWORK_ERROR_TITLE');
	var MSG_UNKNOWN_ERROR_MESSAGE = $.i18n._('GENERIC_NETWORK_ERROR_MESSAGE');
	var MSG_PARSE_ERROR_TITLE = $.i18n._('GENERIC_SYSTEM_ERROR_TITLE');
	var MSG_PARSE_ERROR_MESSAGE = $.i18n._('GENERIC_SYSTEM_ERROR_MESSAGE');
	/*[@if DEV]*/
	MSG_NETWORK_ERROR_TITLE = $.i18n._('NETWORK_ERROR_TITLE');
	MSG_NETWORK_ERROR_MESSAGE = $.i18n._('NETWORK_ERROR_MESSAGE');
	MSG_404_ERROR_TITLE = $.i18n._('404_ERROR_TITLE');
	MSG_404_ERROR_MESSAGE = $.i18n._('404_ERROR_MESSAGE');
	MSG_500_ERROR_TITLE = $.i18n._('500_ERROR_TITLE');
	MSG_500_ERROR_MESSAGE = $.i18n._('500_ERROR_MESSAGE');
	MSG_TIMEOUT_ERROR_TITLE = $.i18n._('TIMEOUT_ERROR_TITLE');
	MSG_TIMEOUT_ERROR_MESSAGE = $.i18n._('TIMEOUT_ERROR_MESSAGE');
	MSG_UNKNOWN_ERROR_TITLE = $.i18n._('UNKNOWN_ERROR_TITLE');
	MSG_UNKNOWN_ERROR_MESSAGE = $.i18n._('UNKNOWN_ERROR_MESSAGE');
	MSG_PARSE_ERROR_TITLE = $.i18n._('PARSE_ERROR_TITLE');
	MSG_PARSE_ERROR_MESSAGE = $.i18n._('PARSE_ERROR_MESSAGE');
	/*[@endif DEV]*/
	
	
	var genericNetErrorHandling = this.genericNetErrorHandling = function(jqXHR, status, error, options){
		if (jqXHR.status === 0) {
        	application.showMsg(MSG_NETWORK_ERROR_MESSAGE, MSG_NETWORK_ERROR_TITLE, options);
        } else if (jqXHR.status == 404) {
            application.showMsg(MSG_404_ERROR_MESSAGE, MSG_404_ERROR_TITLE, options);
        } else if (jqXHR.status == 500) {
        	application.showMsg(MSG_500_ERROR_MESSAGE, MSG_500_ERROR_TITLE, options);
        } else if (error === 'parsererror') {
        	application.showMsg(MSG_PARSE_ERROR_MESSAGE, MSG_PARSE_ERROR_TITLE, options);
        } else if (error === 'timeout') {
        	application.showMsg(MSG_TIMEOUT_ERROR_MESSAGE, MSG_TIMEOUT_ERROR_TITLE, options);
        } else {
        	application.showMsg(MSG_UNKNOWN_ERROR_MESSAGE, MSG_UNKNOWN_ERROR_TITLE, options);
        	application.log('Uncaught Error.\n' + jqXHR.responseText);
        }
	};

	this.configuration = {
		debug : mainDebug,
		host : envHost,
		apiVersion : '0.11',
		queueIdentifier: queue
	};

	var session = {
		token : '',
		phoneNumber : undefined,
		username : undefined,
		accountId : undefined,
		accountBalance : undefined,
		amountDue : undefined,
		planId : undefined
	};

	this.sessionModel = new MVC.Model(session);
	this.homeModel = new MVC.Model();
	this.myPlanModel = new MVC.Model();
	
	this.billDetailsModel = new MVC.Model();
	
	this.payMyBillModel = new MVC.Model();
	this.payMyBillReviewModel = new MVC.Model();
	this.payMyBillConfirmationModel = new MVC.Model();
	
	this.shopServicesModel = new MVC.Model();
	this.servicesVerificationModel = new MVC.Model();
	this.servicesConfirmationModel = new MVC.Model();
	this.servicesPaymentModel = new MVC.Model();

	this.resetPasswordModel = new MVC.Model();
	this.transactionsHistoryModel = new MVC.Model();

	this.manageAutopayConfirmationModel = new MVC.Model();
	
	this.desactivateAutopayModel = new MVC.Model();
	this.manageAutopayModel = new MVC.Model();

	this.usageModel = new MVC.Model();
	this.myProfileModel = new MVC.Model();
	
	this.onlineSecurityPageModel = new MVC.Model();


	/* * Check API version * */
	this.checkVersion = function(newVersion,continueLogin) {
		var onError = function(request, status, error) {
			if(continueLogin){
				continueLogin();
			}
		};

		var onSuccess = function(json) {
			if (json.status == "success" && newVersion){
				newVersion(json.version);
			} else {
				if(continueLogin){
					continueLogin();
				}
			}
		};

		jsonpAjaxCall("version", {}, onError, onSuccess);
	};

	/* * Check PIN * */
	this.checkPin = function(pinCode, successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.PIN = pinCode;
		jsonInputs.sessionToken = self.sessionModel.get('token');
		
		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			
			if(errorCB) {
				errorCB();
			}
			
			var onOk = function () {
				application.blockUI("Loading ...");
				self.checkPin(pinCode, successCB, errorCB);
			};
			var onCancel = function () {};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
			application.unBlockUI();
		};

		var onSuccess = function(json) {

			if (json.status == "success") {
				self.sessionModel.set({
					isPinChecked : true
				});

				if(successCB){
					successCB();
				}

			} else if (json.status == "failure") {
				if(json.messages) {
					manageErrorCases(json.messages, "CHECK PIN");
				}
				
				if(errorCB){
					errorCB(json);
				}
			} else {
				application.showMsg("Unknown error!", "error");
				if(errorCB){
					errorCB(json);
				}
			}
			
			application.unBlockUI();
		};
		
		return jsonpAjaxCall("authentication/verifypin", jsonInputs, onError, onSuccess);
	};

	/* * Perform login * */
	this.login = function(user, password,successCB,errorCB) {
		var jsonInputs = {};
		jsonInputs.username = user;
		jsonInputs.password = password;
		application.aid = undefined;
		self.sessionModel.set({
			username : user
		});

		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			if(errorCB){
				errorCB();
			}
			var onOk = function () {
				application.blockUI("Loading ...");
				self.login(user, password,successCB,errorCB);
			};
			var onCancel = function () {};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {

			if (json.status == "success") {
				self.sessionModel.set({
					token : json.sessionToken
				});

				if(successCB){
					successCB();
				}

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "LOG IN");
				if(errorCB){
					errorCB();
				}
			} else {
				application.showMsg("Unknown error!", "error");
				if(errorCB){
					errorCB();
				}
			}
		};

		return jsonpAjaxCall("authentication/login", jsonInputs, onError, onSuccess);
	};

	this.logout = function() {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');

		var onSuccess = function(json) {

			if (json.status == "failure") {
				application.log("[ERROR] LOG OUT: Status failure in the JSON response");

			} else {
				application.log("[ERROR] LOG OUT: Bad format of the JSON response");
			}
		};

		jsonpAjaxCall("authentication/logout", jsonInputs, onSuccess, onSuccess);
		var uname = self.sessionModel.get('username');
		
		//quit chat session
		if(application.isChatSessionOpen && application.supportChatPage && application.supportChatPage.chatEngine) {
			application.isChatSessionOpen = false;
			application.aid = undefined;
			application.supportChatPage.chatEngine.unbind();
			application.supportChatPage.chatEngine.exit({ error : function(){/*ignore errors*/}});
		}
		
		/*
		 * TODO: Clear all models ?
		 * 
		self.desactivateAutopayModel.clear();
		self.homeModel.clear();
		self.manageAutopayConfirmationModel.clear();
		self.manageAutopayModel.clear();
		self.myBillModel.clear();
		self.myPlanModel.clear();
		self.payMyBillConfirmationModel.clear();
		self.payMyBillModel.clear();
		self.payMyBillReviewModel.clear();
		self.resetPasswordModel.clear();
		self.servicesConfirmationModel.clear();
		self.servicesPaymentModel.clear();
		self.servicesVerificationModel.clear();
		self.shopServicesModel.clear();
		self.transactionsHistoryModel.clear();
		self.usageModel.clear();*/

		self.myProfileModel.clear();
		self.sessionModel.clear();
		self.sessionModel.set({
			rememberMe :  false,
			username :  uname
		},true);
		application.saveCredentials(uname, '');
		// Go to login page
		application.gotoPage('loginPage');
	};

	/* * Perform registration * */
	this.selfRegistration = function(username, phoneNumber,successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.username = username;
		jsonInputs.ctn = phoneNumber;

		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			application.unBlockUI();
			if(status === "abort"){
				return;
			}
			if (errorCB)
				errorCB();

			genericNetErrorHandling(jqXHR,status,error);
		};

		var onSuccess = function(json) {
			application.unBlockUI();

			if (json.status == "success") {
				self.sessionModel.set({
					username : username,
					phoneNumber : phoneNumber
				});

				if (successCB)
					successCB();

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "SIGN UP");
				if (errorCB)
					errorCB();

			} else {
				if (errorCB)
					errorCB();
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] SIGN UP: Bad format of the JSON response");
			}
		};
		application.blockUI("Connecting");

		return jsonpAjaxCall("register", jsonInputs, onError, onSuccess);
	};

	/* * Change password * */
	this.changePassword = function(tmpPassword, newPassword, successCB, errorCB, origin) {
		var sessionToken = self.sessionModel.get('token');
		var isLogged = (sessionToken != '' && sessionToken != undefined && sessionToken != null);

		var jsonInputs = {};
		jsonInputs.oldPassword = tmpPassword;
		jsonInputs.newPassword = newPassword;
		if (isLogged)
			jsonInputs.sessionToken = self.sessionModel.get('token');
		else
			jsonInputs.username = self.sessionModel.get('username');


		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			if(errorCB){
				errorCB();
			} else {
				application.unBlockUI("Connecting");
			}

			var onOk = function () {
				application.blockUI("Loading ...");
				self.changePassword(tmpPassword, newPassword, successCB, errorCB, origin);
			};
			var onCancel = function () {};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};


			genericNetErrorHandling(jqXHR,status,error,options);
		};
		var onSuccess = function(json) {

			if (json.status == "success") {
				self.sessionModel.set({
					token : json.sessionToken
				});
				
				if( window.appSecureData.pwd){
					window.appSecureData.pwd = newPassword;
					window.saveSecureData();
				};
				
				if(successCB){
					successCB();
				} else {
					application.unBlockUI();
					if (isLogged){
						application.gotoPage('changePwdConfirmationPage');
					} else {
						application.gotoPage('homePage', {fromPage: application.currentPage});
					}
				}

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, origin);
				if(errorCB){
					errorCB();
				} else {
					application.unBlockUI("Connecting");
				}

			} else {
				application.showMsg("Unknown error!", "error");
				if(errorCB){
					errorCB();
				} else {
					application.unBlockUI("Connecting");
				}
			}
		};
		application.blockUI("Connecting");

		jsonpAjaxCall("authentication/change/userpassword", jsonInputs, onError, onSuccess);
	};

	/* * Get security question * */
	this.getSecurityQuestion = function(phoneNumber, success, errorCB) {
		var jsonInputs = {};
		jsonInputs.ctn = phoneNumber;

		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			application.unBlockUI("Connecting");
			if (errorCB)
				errorCB();
			var onOk = function () {
				application.gotoPage('forgotPwdPhonePage');
			};

			genericNetErrorHandling(jqXHR,status,error);
		};
		var onSuccess = function(json) {

			if (json.status == "success") {
				self.resetPasswordModel.set(json);
				if (success) {
					success();
				}

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET SECURITY QUESTION");
				if (errorCB) {
					errorCB();
				}

			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET SECURITY QUESTION: Bad format of the JSON response");
				if (errorCB) {
					errorCB();
				}
			}
		};

		return jsonpAjaxCall("authentication/securityquestion", jsonInputs, onError, onSuccess);
	};

	/* * Validate security question * */
	this.validateSecurityQuestion = function(phoneNumber, answer, successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.ctn = phoneNumber;
		jsonInputs.securityQuestionAnswer = answer;

		var onError = function(jqXHR, status, error) {
			if (errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.validateSecurityQuestion(phoneNumber, answer, successCB, errorCB);
			};
			var onCancel = function () {};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.sessionModel.set({
					username : json.username
				});
				if (successCB)
					successCB();

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "VALIDATE SECURITY QUESTION");
				if (errorCB)
					errorCB();

			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] VALIDATE SECURITY QUESTION: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("authentication/securityquestion/validate", jsonInputs, onError, onSuccess);
	};

	/* * Get home * */
	this.getHome = function(success, errorCB, origin) {
		var jsonInputs = {}, self = this;
		jsonInputs.sessionToken = self.sessionModel.get('token');

		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			application.unBlockUI("Connecting");
			if (errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getHome(success, errorCB, origin);
			};
			var onCancel = function () {
				if("REFUEL" == origin){
					if(application.isWP8){
						//TODO handle this better
						$('#payMyBillAutoPay').hide().css('visibility', 'hidden').attr("aria-hidden", "true");
						application.payMyBillPage.$element.addClass('failed_to_load');
					} else {
						application.gotoPage('homePage');
					}
				} else {
					if(typeof deviceapis !== "undefined"){
						deviceapis.quit();
					}
					self.logout();
					
				}
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {

				// Update desactivateAutopayModel
				self.desactivateAutopayModel.set(json);
				
				self.homeModel.set(json);
				self.payMyBillModel.set(json);
				self.payMyBillReviewModel.set(json);
				self.sessionModel.set({
					accountBalance : json.accountBalance,
					PINSecurityOn : (json.pinSecurityOn == "true")
				});
				
				if (success) {
					success();
				}
				
				// tracking
				if(application.tracking.enabled) {
					application.tracking.identify();
				}
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET HOME_" + origin);
				if (errorCB) {
					errorCB();
				}
			} else {
				application.showMsg("Unknown error!", "error");
				if (errorCB) {
					errorCB();
				}
			}
		};

		return jsonpAjaxCall("authentication/home", jsonInputs, onError, onSuccess);
	};

	/* * Get home auto-pay * */
	this.getHomeAutoPay = function(success, errorCB, origin) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		// Clean informations in pay my bill model about autopay
		self.payMyBillModel.attr.autoPayDetails = {};
		
		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			application.unBlockUI("Connecting");
			if (errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getHomeAutoPay(success, errorCB, origin);
			};
			var onCancel = function () {
				if("REFUEL" == origin){
					if(application.isWP8){
						//TODO handle this better
						$('#payMyBillAutoPay').hide().css('visibility', 'hidden').attr("aria-hidden", "true");
						application.payMyBillPage.$element.addClass('failed_to_load');
					} else {
						application.gotoPage('homePage');
					}
				} else {
					 if(typeof deviceapis !== "undefined"){
							deviceapis.quit();
					 }
					 self.logout();
				}
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success" && json.autoPayExists) {
				json.cardNumber = json.cardNumber.split('x').join('*');
				
				// Update desactivateAutopayModel
				self.desactivateAutopayModel.set(json);
				// Save informations in pay my bill model and review
				self.payMyBillModel.attr.autoPayDetails = json;
				// Replace auto-pay message on home
				$('#i18n_homeWhyNot').height($('#i18n_homeWhyNot').height());
				$('#i18n_homeWhyNot').css('line-height', $('#i18n_homeWhyNot').height() + "px");
				$('#i18n_homeWhyNot').html($.i18n._('HOME_AUTO_PAY_SET'));
				$('#i18n_homeWhyNot').addClass('autopay-on');
				$('#homePage .sub-page .column1').width('90%');
				$('#i18n_autoPayLearnMore').hide().attr("aria-hidden", "true");
				$('#payMyBillAutoPay').hide().css('visibility', 'hidden').attr("aria-hidden", "true");
				$('#i18n_homeSetupAutoPayButton').text($.i18n._('HOME_DISABLE_AUTO_PAY'));
				$('#i18n_homeSetupAutoPayButton').attr('data-state', 'activated');				
				if (success) {
					success();
				}

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET HOME AUTOPAY_" + origin);
				if (errorCB) {
					errorCB();
				}
			} else {
				// Auto pay not set
				if($('#i18n_homeWhyNot').hasClass('autopay-on')){
					$('#i18n_homeWhyNot').css('line-height', $('#i18n_homeWhyNot').height() / 2 + "px");
				}
				$('#i18n_homeWhyNot').html($.i18n._('HOME_TRY_AUTO_PAY')).removeClass('autopay-on');
				$('#homePage .sub-page .column1').width('60%');
				$('#i18n_autoPayLearnMore').html($.i18n._('HOME_LEARN_MORE')).show().attr("aria-hidden", "false");
				$('#payMyBillAutoPay').show().css('visibility', 'visible').attr("aria-hidden", "false");
				$('#i18n_homeSetupAutoPayButton').html($.i18n._('HOME_SETUP_AUTO_PAY')).attr('data-state', 'deactivated');				
				if (success) {
					success();
				}
			}
		};

		return jsonpAjaxCall("payment/auto/details", jsonInputs, onError, onSuccess);
	};
	
	/* * Get service payment auto-pay * */
	this.getServicePaymentAutoPay = function(success, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		
		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			application.unBlockUI("Connecting");
			if (errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getServicePaymentAutoPay(success, errorCB);
			};
			var onCancel = function () {
				if(typeof deviceapis !== "undefined"){
					deviceapis.quit();
				}
				self.logout();
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};
			
			genericNetErrorHandling(jqXHR,status,error,options);
		};
		
		var onSuccess = function(json) {
			if(json && json.cardNumber){
				json.cardNumber = json.cardNumber.split('x').join('*');
			}
			self.servicesPaymentModel.set({autopay:json});
			if (success)
				success();
		};
		
		jsonpAjaxCall("payment/auto/details", jsonInputs, onError, onSuccess);
	};

	/* * Get bill details * */
	this.getBillDetails = function(success, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		
		application.billDetailsPage.$element.removeClass('failed_to_load');
		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			application.unBlockUI();
			if (errorCB)
				errorCB();
			var onOk = function () {
				//retry
				application.blockUI("Loading ...");
				self.getBillDetails(success, errorCB);
			};
			//to allow wp nav display blank page ?
			var onCancel = function () {
				if(application.isWP8){
					application.myBillPage.$element.addClass('failed_to_load');
				} else {
					application.gotoPage('homePage');
				}
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.billDetailsModel.set(json);
				if (success) {
					success();
				}

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET BILL DETAILS");
				if(errorCB)
					errorCB();

			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET BILL DETAILS: Bad format of the JSON response");
				if(errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("billdetails", jsonInputs, onError, onSuccess);
	};

	/* * Get transactions history * */
	this.getTransactionsHistory = function(success, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getTransactionsHistory(success, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('payMyBillPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.transactionsHistoryModel.set(json);
				if (success)
					success();

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET TRANSACTIONS HISTORY");
				if(errorCB)
					errorCB();

			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] TRANSACTIONS HISTORY: Bad format of the JSON response");
				if(errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("payment/transactions", jsonInputs, onError, onSuccess);
	};
	
	/* * Make one time payment * */
	this.makeOTPayment = function(params, success, errorCB, origin) {
		var jsonInputs = {};
		
		var paymentProfileId = params.paymentProfileId ? params.paymentProfileId : undefined;
		var model = params.payment;
		
		// Change date format for API request
		var expirationDate = moment(model.expirationDate,"MM/YY").format("MMYY");
		
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');
		jsonInputs.amount = model.amount;
		jsonInputs.creditCard = {
			cardName : model.name,
			cardType : model.cardType,
			cardNumber : model.cardNumber,
			securityCode : model.securityCode,
			cardExpirationDate : expirationDate,
			paymentMethod : "CREDITCARD"
		};
		jsonInputs.postalCode = model.postalCode;
		if(paymentProfileId)
			jsonInputs.creditCard.paymentProfileId = paymentProfileId;

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.makeOTPayment(params, success, errorCB, origin);
			};
			var onCancel = function () {
				if(origin == "REFUEL")
					application.gotoPage('payMyBillPage',options);
				else if(origin == "SHOP")
					application.gotoPage('manageServicesPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.payMyBillConfirmationModel.clear(true);
				self.payMyBillConfirmationModel.set(json);
				self.servicesConfirmationModel.set(json);
				
				if(model.autoPay){
					self.createAutomaticPayment(model, success, errorCB, "PAYMENT");
				}
				else if (success) {
					success();
				}
			
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "MAKE OT PAYMENT_" + origin);
				if(errorCB)
					errorCB();

			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] MAKE OT PAYMENT: Bad format of the JSON response");
				if(errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall('payment/onetime', jsonInputs, onError, onSuccess);
	};

	/* * Create Autopay * */
	this.createAutomaticPayment = function(model, success, errorCB, origin) {
		// Change date format for API request
		var expirationDate = moment(model.expirationDate,"MM/YY").format("MMYY");

		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');
		jsonInputs.creditCard = {
			cardName : model.name,
			cardType : model.cardType,
			cardNumber : model.cardNumber,
			securityCode : model.securityCode,
			cardExpirationDate : expirationDate,
			paymentMethod : "CREDITCARD"
		};
		jsonInputs.postalCode = model.postalCode;
		jsonInputs.ctn = model.ctn;
		
		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.createAutomaticPayment(model, success, errorCB, origin);
			};
			var onCancel = function () {
				application.gotoPage('manageAutopayPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.manageAutopayConfirmationModel.set(json);
				if (success) {
					success();
				}
				
			} else if (origin == "AUTOPAY" && json.status == "failure") {
				manageErrorCases(json.messages, "CREATE AUTOPAY");
				if(errorCB)
					errorCB();
	
			} else if (origin == "AUTOPAY") {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] CREATE AUTOPAY: Bad format of the JSON response");
				if(errorCB)
					errorCB();
			} else if (origin == "PAYMENT") {
				/* DO NOTHING ON ERROR IF PAYMENT SUCCEED */
				if(success)
					success();
			}
		};
		
		if(origin == "AUTOPAY")
			jsonpAjaxCall("payment/auto/create", jsonInputs, onError, onSuccess);
		else if(origin == "PAYMENT") /* DO NOTHING ON ERROR IF PAYMENT SUCCEED */
			jsonpAjaxCall("payment/auto/create", jsonInputs, success, onSuccess);
		
	};
	
	/* * Delete Autopay * */
	this.deleteAutomaticPayment = function(successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.deleteAutomaticPayment(successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('desactivateAutopayPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};
		
		var onSuccess = function(json) {
			if (json.status == "success") {
				if(successCB)
					successCB();
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "DELETE AUTOPAY");
				if(errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] DELETE AUTOPAY: Bad format of the JSON response");
				if(errorCB)
					errorCB();
			}
		};
		
		jsonpAjaxCall("payment/auto/delete", jsonInputs, onError, onSuccess);
	};

	/* * Get usage summary * */
	this.getUsageSummary = function(successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');
		
		application.usagePage.$element.removeClass('failed_to_load');
		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			if(errorCB){
				errorCB(jqXHR, status, error);
			}
			
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.usageModel.set(json);
				if(successCB)
					successCB();

			} else if (json.status == "failure") {
				if(errorCB)
					errorCB(json);

			} else {
				if(errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("usage/summary", jsonInputs, onError, onSuccess);
	};

	/* * Get usage details * */
	this.getUsageDetails = function(beginDate, endDate, successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.fromDate = beginDate;
		jsonInputs.toDate = endDate;
		jsonInputs.ctn = self.sessionModel.get('currentLine');

		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			if(errorCB)
				errorCB(jqXHR, status, error);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				if(successCB)
					successCB(json);
				
			} else if (json.status == "failure") {
				if(errorCB)
					errorCB(json);

			} else {
				if(errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("usage/details", jsonInputs, onError, onSuccess);
	};

	/* * Get plan and services * */
	this.getPlanAndServices = function(errorCB, successCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');

		application.myPlanPage.$element.removeClass('failed_to_load');
		var onError = function(jqXHR, status, error) {
			if(status === "abort"){
				return;
			}
			if(errorCB){
				errorCB();
			}
			var onOk = function () {
				//retry
				application.blockUI("Loading ...");
				self.getPlanAndServices(errorCB, successCB);
			};
			var onCancel = function () {
				if(application.isWP8){
					application.myPlanPage.$element.addClass('failed_to_load');
				} else {
					application.gotoPage('homePage');
				}
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};
			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				// self.sessionModel.set({planID : json.plan.planId});
				self.myPlanModel.set(json);
				if (successCB)
					successCB();
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET PLAN AND SERVICES");
				if (errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET PLAN AND SERVICES: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("planandservices", jsonInputs, onError, onSuccess);
	};

	/* * Get available services * */
	this.getAvailableServices = function(successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');

		if(ZIP_292_ENABLE){
			if(application.model.isIos){
				jsonInputs.deviceType = "ios";
			} else if(application.model.isAndroid){
				jsonInputs.deviceType = "android";
			} else {
				jsonInputs.deviceType = "wp";
			}
		}

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getAvailableServices(successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('myPlanPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.shopServicesModel.set(json);
				if (successCB)
					successCB();
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET AVAILABLE SERVICES");
				if (errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET AVAILABLE SERVICES: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("planandservices/available", jsonInputs, onError, onSuccess);
	};
	
	/* * Get Change Service Verification * */
	this.getChangeServiceVerification = function(summary, successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');
		jsonInputs.addedServices = summary.addedServices;
		jsonInputs.removedServices = summary.removedServices;

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getChangeServiceVerification(summary, successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('manageServicesPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.servicesVerificationModel.clear(true);
				self.servicesPaymentModel.clear(true);
				self.servicesVerificationModel.set(json);
				self.servicesPaymentModel.set(json);
				if (successCB)
					successCB();

			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET CHANGE SERVICE VERIFICATION");
				if (errorCB)
					errorCB();

			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET CHANGE SERVICE VERIFICATION: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("planandservices/validate", jsonInputs, onError, onSuccess);
	};

	/* * Submit Change Services * */
	this.submitChangeServices = function(summary, successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');
		jsonInputs.addedServices = summary.addedServices;
		jsonInputs.removedServices = summary.removedServices;
		
		var onError = function(request, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.submitChangeServices(summary, successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('manageServicesPage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};
		
		var onSuccess = function(json) {
			if (json.status == "success") {
				self.servicesConfirmationModel.set(json);
				if (successCB)
					successCB();
				
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "SUBMIT CHANGE SERVICES");
				if (errorCB)
					errorCB();
				
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] SUBMIT CHANGE SERVICES: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};
		
		jsonpAjaxCall("planandservices/submit", jsonInputs, onError, onSuccess);
	};
	
	/* * Get AID for chat from AMSS * */
	this.getAccountId = function(successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getAccountId(successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('morePage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				if (successCB){
					successCB(json.accountId, json.errorMsgVerbiage, json.chatSessionTimer, json.timeBeforeChatSessionExpires);
				}
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET ACCOUNT ID");
				if (errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET ACCOUNT ID: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("chatInfo", jsonInputs, onError, onSuccess);
	};
	
	/* * Get Profile Information * */
	this.getProfileInformation = function(successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');

		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.getProfileInformation(successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('morePage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {
			if (json.status == "success") {
				self.myProfileModel.set(json);
				if (successCB)
					successCB();
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "GET PROFILE INFORMATION");
				if (errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] GET PROFILE INFORMATION: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("profile/details", jsonInputs, onError, onSuccess);
	};
	
	/* * Set Profile Information * */
	this.setProfileInformation = function(profile, successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.homePhoneNumber = profile.homePhoneNumber;
		jsonInputs.businessPhoneNumber = profile.businessPhoneNumber;
		jsonInputs.email = profile.email;
		jsonInputs.address = profile.address;
		
		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.setProfileInformation(profile, successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('myProfilePage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};

		var onSuccess = function(json) {

			if (json.status == "success") {
				if (successCB)
					successCB();
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "SET PROFILE INFORMATION");
				if (errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] SET PROFILE INFORMATION: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};

		jsonpAjaxCall("profile/update", jsonInputs, onError, onSuccess);
	};

	/* * Reset VM password * */
	this.resetVMPassword = function(successCB, errorCB) {
		var jsonInputs = {};
		jsonInputs.sessionToken = self.sessionModel.get('token');
		jsonInputs.ctn = self.sessionModel.get('currentLine');
		
		var onError = function(jqXHR, status, error) {
			if(errorCB)
				errorCB();
			var onOk = function () {
				application.blockUI("Loading ...");
				self.resetVMPassword(successCB, errorCB);
			};
			var onCancel = function () {
				application.gotoPage('morePage',options);
			};
			var options = {buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]};

			genericNetErrorHandling(jqXHR,status,error,options);
		};
		
		var onSuccess = function(json) {

			if (json.status == "success") {
				if (successCB)
					successCB();
			} else if (json.status == "failure") {
				manageErrorCases(json.messages, "RESET VM PASSWORD");
				if (errorCB)
					errorCB();
			} else {
				application.showMsg("Unknown error!", "error");
				application.log("[ERROR] RESET VM PASSWORD: Bad format of the JSON response");
				if (errorCB)
					errorCB();
			}
		};
		
		jsonpAjaxCall("profile/change/vmpassword", jsonInputs, onError, onSuccess);
	};
	
	/* ****************** */
	/* * MAIN AJAX CALL * */
	/* ****************** */
	var jsonpAjaxCall = function(method, param, onError, onSuccess) {
		if ($.browser.msie && window.XDomainRequest && (window.location.protocol != 'file:') && (window.location.protocol != 'x-wmapp0:') && (window.location.protocol != 'x-wmapp1:')) {
			// Use Microsoft XDR
			var xdr = new XDomainRequest();
			xdr.contentType = 'application/json';
			xdr.open('POST', self.configuration.host + method);
			xdr.onload = function() {
				var json = $.parseJSON(xdr.responseText);
				onSuccess(json); // parse using same function as for jQuery's
				// success event
			};
			xdr.onerror = onError;
			xdr.send(JSON.stringify(param));
			return xdr;
		} else {
			return $.ajax({
				type : 'POST',
				url : self.configuration.host + method,
				data : JSON.stringify(param),
				contentType : 'application/json',
				// dataType : 'json',

				error : onError,
				success : onSuccess
			});
		}
	};

	var quitCB = function() {
		self.logout();
	};
	
	var routeCBAfterError = function(errorFromScreen){
		if(application.isWP8){
			if(errorFromScreen === "GET USAGE SUMMARY"){
				return function(){
					application.usagePage.$element.addClass('failed_to_load');
				};
			}
			if(errorFromScreen === "GET USAGE DETAILS"){
				return function(){
					application.usagePage.$element.addClass('failed_to_load');
				};
			}
			if(errorFromScreen === "GET BILL DETAILS"){
				return function(){
					application.myBillPage.$element.addClass('failed_to_load');
				};
			}
			if(errorFromScreen === "GET PLAN AND SERVICES"){
				return function(){
					application.myPlanPage.$element.addClass('failed_to_load');
				};
			}
			if(/*errorFromScreen === "GET HOME AUTOPAY_REFUEL" ||*/ errorFromScreen === "GET HOME_REFUEL"){
				return function(){
					application.payMyBillPage.$element.addClass('failed_to_load');
				};
			}
		}
		if($.inArray(errorFromScreen,['LOG IN','SIGN UP','SET PWD','RESET PWD','LOCKED','GET SECURITY QUESTION','VALIDATE SECURITY QUESTION','GET HOME_HOME','GET HOME AUTOPAY_HOME', 
	                              	'loginPage', 'signUpPage', 'setPwdPage', 'forgotPwdPhonePage', 'forgotPwdQuestionPage', 'resetPwdPage', 'lockedPage', 'homePage']) != -1){
			return quitCB;
		}
		if($.inArray(errorFromScreen,['GET BILL DETAILS','GET PLAN AND SERVICES','GET USAGE SUMMARY','GET USAGE DETAILS','CREATE AUTOPAY','DELETE AUTOPAY','GET HOME_REFUEL',
		                              'myPlanPage', 'myBillPage', 'payMyBillPage', 'usagePage', 'manageAutopayReviewPage', 'manageAutopayConfirmationPage', 
		                              'desactivateAutopayPage', 'desactivateAutopayConfirmationPage', 'manageAutopayPage', 'morePage', 'manageAutopayTandCPage']) != -1){
			return function(){
				application.gotoPage('homePage');
			};
		}
		if($.inArray(errorFromScreen,['GET AVAILABLE SERVICES','GET CHANGE SERVICE VERIFICATION','SUBMIT CHANGE SERVICES','MAKE OT PAYMENT_SHOP',
		                              'manageServicesPage', 'servicesReviewPage', 'manageServicesConfirmationPage', 'deleteOneServiceConfirmationPage', 
		                              'servicesPaymentPage', 'manageServicesTandCPage']) != -1){
			return function(){
				application.gotoPage('myPlanPage');
			};
		}
		if($.inArray(errorFromScreen,['GET TRANSACTIONS HISTORY','GET HOME AUTOPAY_REFUEL']) != -1){
			return function(){
				application.gotoPage('payMyBillPage');
			};
		}
		if($.inArray(errorFromScreen,['MAKE OT PAYMENT_REFUEL']) != -1){
			return function(){
				application.gotoPage('payMyBillPage', {fromBack : true});
			};
		}
		if($.inArray(errorFromScreen,['RESET VM PASSWORD','CHANGE PWD','SET PROFILE INFORMATION','GET PROFILE INFORMATION',
		                              'changePwdPage', 'changePwdConfirmationPage', 'myProfilePage', 'editProfilePage', 'aboutUsPage', 'resetVoiceMailPwdPage', 
		                              'resetVoiceMailPwdConfirmationPage', 'aboutUsTandCPage', 'aboutUsFaqsPage', 'aboutUsPrivacyPage', 'eulaPage', 'learnMorePage', 
		                              'supportPage', 'GET ACCOUNT ID']) != -1){
			return function(){
				application.gotoPage('morePage');
			};
		}
		//defaults
		return quitCB;
	};

	/* ******************** */
	/* * ERROR MANAGEMENT * */
	/* ******************** */
	var manageErrorCases = this.manageErrorCases = function(errorMessage, screenName) {
		$("#i18n_loginForgotPwdBtn").show().attr("aria-hidden", "false");
		$("#signUpInlineError").hide().attr("aria-hidden", "true");
		$("#lockedlineError").hide().attr("aria-hidden", "true");
		$("#signUpInlineError").hide().attr("aria-hidden", "true");

		var errorCode = errorMessage[0].code;
		application.log("[ERROR] " + screenName + ": Error code " + errorCode);
		switch (errorCode) {
		case '0000':
		case '0001':
		case '0002':
			application.showMsg("Sorry… looks like we're having technical difficulties.  Please try again later.", "error", {buttons: [{label: "Ok", callback: routeCBAfterError(screenName)}]});
			break;
		case '1000':
			$("#i18n_loginForgotPwdBtn").hide().attr("aria-hidden", "true");
			$("#loginInlineError").show().attr("aria-hidden", "false");
			break;
		case '1001':
			if(screenName == 'LOG IN')
				$("#lockedlineError").show().attr("aria-hidden", "false");
			else
				application.showMsg("Your account is locked. Wait 15 mins and retry.", "error", {buttons: [{label: "Ok", callback: self.logout}]});
			break;
		case '1002':
			application.showMsg("Sorry… looks like there’s an issue with your account.  Give us a call at 1-855-246-2461…to straighten this out.", "error", {buttons: [{label: "Ok", callback: self.logout}]});
			break;
		case '1003':
			application.showMsg("Please enter the correct current or temporary password.", "error");
			break;
		case '1004':
			application.showMsg("Looks like this answer is incorrect.  Lets give it another try.", "error", {buttons: [{label: "Ok", callback: function() {
				$('#i18n_forgotPasswordQuestionAnswer').val('');
			}}]});
			break;
		case '1005':
			application.showMsg("Sorry… that username is already taken – you’ll have to choose another.", "error");
			break;
		case '1006':
			application.showMsg("Sorry…that's not a valid phone number. Please try again.", "error");
			break;
		case '1007':
			$("#signUpInlineError").show().attr("aria-hidden", "false");
			break;
		case '1008':
			application.showMsg("Looks like this password does not meet our security guidelines. Please pick a new one.<br><br>" +
					"Passwords must be at least 8 characters and must contain at least one lowercase character, and one number. Your new password must be different than your last 5 passwords.", "error");
			break;
		case '1009':
		case '1010':
		case '1011':
			application.showMsg("Sorry…looks like your account is suspended. Give us a call at 1-855-246-2461 to straighten this out.", "error");
			break;
		case '1012':
//			location.hash = "#ns-setPwdPage";
			application.gotoPage('setPwdPage');
			break;
		case '2000':
			application.showMsg("Sorry… we're unable to reset the voicemail password on your device. Give us a call at 1-855-246-2461 to straighten this out.", "error", {buttons: [{label: "Ok", callback: routeCBAfterError(screenName)}]});
			break;
		case '3000':
			application.showMsg("System Error. Please try again later.", "error", {buttons: [{label: "Ok", callback: quitCB}]});
			break;
		case '4000':
			application.showMsg("Please select dates within range of one month.", "error");
			break;
		case '4001':
			application.showMsg("Please select a start date within the last 3 months.", "error");
			break;
		case '4002':
			application.showMsg("Please select a valid date range.", "error");
			break;
		case '5000':
			application.showMsg("Looks like your credit card was declined. Please try with a different card.", "error", {buttons: [{label: "Ok", callback: routeCBAfterError(screenName)}]});
			break;
		case '5001':
			application.showMsg("Looks like your credit card information is not correct.  Please try again.", "error", {buttons: [{label: "Ok", callback: routeCBAfterError(screenName)}]});
			break;
		case '5002':
			application.showMsg("Looks like all the credit card information you entered doesn't match. Please try again.", "error", {buttons: [{label: "Ok", callback: routeCBAfterError(screenName)}]});
			break;
		case '6000':
			application.showMsg("Looks like the address information isn't correct. Please try again.", "error");
			break;
		case '7000':
			application.showMsg("Looks like you've been logged out due to inactivity. Please log in again.", "error", {buttons: [{label: "Ok", callback: function(){
				self.sessionModel.set({token : ''});
				if(self.sessionModel.get('rememberMe')){
					var options;
					if(localStorage){
						options = {login: window.appSecureData.login, pwd :window.appSecureData.pwd};
					}
					application.gotoPage('loginPage',options);
				} else {
					application.gotoPage('loginPage');
				}
			}}]});
			break;
		case '8000':
			application.showMsg("Bad PIN !", "error", {buttons: [{label: "Retry"}]});
			break;
		case '8001':
			application.showMsg("Sorry… looks like you don't remember your PIN. Bye Bye !", "error", {buttons: [{label: "Ok", callback: self.logout}]});
			break;
		case '9999':
			application.showMsg("Sorry… looks like we're having technical difficulties. Please try again later.", "error", {buttons: [{label: "Ok", callback: routeCBAfterError(screenName)}]});
			break;
		default:
			application.showMsg("Unknown error!", "error", {buttons: [{label: "Ok", callback: quitCB}]});
			break;
		}
	};
};