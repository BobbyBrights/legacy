(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var quantityAttrName = "numberOfInstances";// "quantity"
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.contextualBack = 'servicesReviewPage';
			this.innerPage = this.$element.find('.innerPage');
//			new FastClick(this.innerPage[0]);
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage(self.contextualBack, {
					fromBack : true
				});
			});
		},

		onShow : function(options) {
			var currentLine = this.application.getCurrentLine();

			if (options && options.fromPage) {
				this.contextualBack = options.fromPage;
			} else {
				this.contextualBack = 'servicesReviewPage';
			}
			this.payment = options.payment;
			this.summary = options.summary;
			if(options.transactionInfos){
				this.transactionInfos = options.transactionInfos;
			} else {
				this.transactionInfos = undefined;
			}
			if(options.paymentProfileId){
				this.paymentProfileId = options.paymentProfileId;
			} else {
				this.paymentProfileId = undefined;
			}
			
			if(currentLine && this.application.isCurrentAccountMultiLine()){
				this.$element.find(".phone-number").html((currentLine.isTablet ? "Tablet" : "Phone")+" "+this.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".phone-number").hide().attr("aria-hidden", "true").empty();
			}
			
			this.model.clear(true);
			this.fetch();
		},

		/**
		 * Fetch the data from the remote server
		 * 
		 * @param summary
		 *            is {addedServices: Array[3], removedServices: Array[0]}
		 */
		fetch : function(payment, summary) {
			var self = this;
			
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			
			var submitDone = function() {
				self.application.unBlockUI();
				self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
			};
			var paymentSuccess = function() {
				self.application.connector.submitChangeServices(self.summary, submitDone, submitDone);
			};
			var paymentFail = function() {
				self.application.unBlockUI();
			};
			
			// Prepare services confirmation fields
			$('#servicesConfirmationOTContainer').hide().attr("aria-hidden", "true");
			$('#servicesConfirmationRecContainer').hide().attr("aria-hidden", "true");
			$('#servicesConfirmationOTServicesContainer').empty();
			$('#servicesConfirmationRecServicesContainer').empty();
			
			// Set data on payment fields
			if(this.payment != undefined){				
				$('#manageServicesConfirmationPage').find('.card-infos, div.informations').show().attr("aria-hidden", "false");
				$('#nameOnCardValue').text(this.payment.name);
				$('#cardNumberValue').text(this.application.maskCCNumber(this.payment.cardNumber));
				$('#expirationDateValue').text(moment(this.payment.expirationDate, 'MM/YY').format("MM/YYYY"));
				
				var params = {};
				if(self.paymentProfileId)
					params.paymentProfileId = self.paymentProfileId;
				params.payment = this.payment;

				self.application.connector.makeOTPayment(params, paymentSuccess, paymentFail, "SHOP");
			} else {
				$('#manageServicesConfirmationPage').find('.card-infos, div.informations').hide().attr("aria-hidden", "true");
				
				self.application.connector.submitChangeServices(self.summary, submitDone, submitDone);
			}

			// Services list
			var addedServices = this.summary.addedServices;
			if (addedServices.length > 0) {
				$('#manageServicesConfirmationPage').find('.list-container-title').show().attr("aria-hidden", "false");				
				$.each(addedServices, function(index, added) {
					var value = self._getServiceFromId(added.serviceId);
					if (!value) {
						return;
					}
					var serviceName = $('<div/>').addClass('plan-name').text(value.serviceName);
					var serviceSeparator = $('<div/>').addClass('point-separator');

					if (value.typeIndicator == "OT") {
						var serviceTotal = value.amount * added[quantityAttrName];
						var serviceValue = $('<div/>').addClass('value').text(self.application.displayPrice(value.amount) + " x " + added[quantityAttrName] + " = " + self.application.displayPrice(serviceTotal));
						var listItem = $('<div/>').append(serviceName).append(serviceSeparator).append(serviceValue);
						$('#servicesConfirmationOTServicesContainer').append(listItem);
						$('#servicesConfirmationOTContainer').show().attr("aria-hidden", "false");
					} else if (value.typeIndicator == "REC") {
						var serviceValue = $('<div/>').addClass('value').text(self.application.displayPrice(value.amount));
						var listItem = $('<div/>').append(serviceName).append(serviceSeparator).append(serviceValue);
						$('#servicesConfirmationRecServicesContainer').append(listItem);
						$('#servicesConfirmationRecContainer').show().attr("aria-hidden", "false");
					}
				});
			} else {
				$('#manageServicesConfirmationPage').find('.list-container-title').hide().attr("aria-hidden", "true");								
			}			
		},
						
		onRefresh : function() {
			if (!this.isVisible)
				return;
			
			var json = this.model.attr, self = this;
			// Transaction details
			if(json.status == "success"){
				$('#manageServicesConfirmationPage').find('.confirmation-infos').show().attr("aria-hidden", "false");
				/* There is a code only if the card have been charged*/
				if(json.confirmationId ){				
					$('#confirmationCodeValue').text(json.confirmationId).parent().show().attr("aria-hidden", "false");
					$('#paymentReceivedValue').text(self.application.displayPrice(json.amountReceived)).parent().show().attr("aria-hidden", "false");
				} else {
					$('#confirmationCodeValue').parent().hide().attr("aria-hidden", "true");
					$('#paymentReceivedValue').parent().hide().attr("aria-hidden", "true");
				}
				
				if(this.transactionInfos){
					var debitFromBalanceFloat = parseFloat(this.transactionInfos.debitFromBalance);
					if(debitFromBalanceFloat > 0){
						$('#accountDebitfromBalance').text(self.application.displayPrice(this.transactionInfos.debitFromBalance)).parent().show().attr("aria-hidden", "false");
					} else {
						$('#accountDebitfromBalance').parent().hide().attr("aria-hidden", "true");
					}
				} else {
					$('#accountDebitfromBalance').parent().hide().attr("aria-hidden", "true");
				}
				$('#accountBalanceValue').text(self.application.displayPrice(json.newBalance));
			} else {
				$('#manageServicesConfirmationPage').find('.confirmation-infos').hide().attr("aria-hidden", "true");
			}
		},

		// privates
		_getServiceFromId : function(sid) {
			var availableServices = this.application.connector.shopServicesModel.get('availableServices');
			for (i = 0, j = availableServices.length; i < j; i++) {
				if (availableServices[i].serviceId === sid) {
					return availableServices[i];
				}
			}
		}
	};

	Pages.ServicesConfirmationPage = MVC.Page.extend(methods);

})($, MVC);
