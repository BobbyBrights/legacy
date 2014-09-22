(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var quantityAttrName = "numberOfInstances";// "quantity"
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var that = this;
			this.isLoading = false;
			this.contextualBack = 'manageServicesPage';
			this.$element.find('.back-button').tap(function() {
				that.application.gotoPage(that.contextualBack, {
					fromBack : true
				});
			});
			
			$(window).bind('resize',this.layout.bind(this));			
			window.setTimeout(this.layout.bind(this), 100);
			this.innerPage = this.$element.find('.innerPage');
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
//			new FastClick(this.innerPage[0]);
		},

		onShow : function(options) {
			var currentLine = this.application.getCurrentLine();
			
			if (options && options.fromPage) {
				this.contextualBack = options.fromPage;
			} else {
				this.contextualBack = 'manageServicesPage';
			}
			this.summary = options.summary;
			
			if(currentLine && this.application.isCurrentAccountMultiLine()){
				this.$element.find(".phone-number").html((currentLine.isTablet ? "Tablet" : "Phone")+" "+this.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".phone-number").hide().attr("aria-hidden", "true").empty();
			}
			
			this.fetch();
		},

		/**
		 * Fetch the data from the remote server
		 */
		fetch : function() {
			var self = this;
			
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			
			var done = function() {
				self.isLoading = false;
				self.application.unBlockUI();
			};
			
			// Reinit title
			self.$element.find('h3').html($.i18n._('MANAGE_SERVICES_REVIEW_TITLE_ADDED')).attr('data-i18n', 'MANAGE_SERVICES_REVIEW_TITLE_ADDED');
			$('#servicesReviewOTContainer').hide().attr("aria-hidden", "true");
			$('#servicesReviewRecContainer').hide().attr("aria-hidden", "true");
			$('#servicesReviewRemovedContainer').hide().attr("aria-hidden", "true");
			$('#servicesReviewAmountDueContainer').hide().attr("aria-hidden", "true");
			self.$element.find(".information").hide().attr("aria-hidden", "true");
			$("#servicesReviewAccountInfo").hide().attr("aria-hidden", "true");
			$('#servicesReviewOTServicesContainer').empty();
			$('#servicesReviewRecServicesContainer').empty();
			$('#servicesReviewRemovedServicesContainer').empty();
			$('#servicesReviewAmountDue').empty();
			$("#conflictsInlineError").hide().attr("aria-hidden", "true");
			$("#i18n_servicesReviewBtn").removeClass('disabled').attr("aria-disabled", "false");

			this.isLoading = true;
			this.application.connector.getChangeServiceVerification(this.summary, done, done);
		},
		
		onBack : function(event){
			event.preventDefault();
			if(!this.isLoading){
				this.application.gotoPage(this.contextualBack, {
					fromBack : true
				});
			}
		},

		layout : function() {
			/*var divToResize = $('#servicesReviewPage').find('.sub-page');
			divToResize.css('padding-top', '0px');
			divToResize.height('auto');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#servicesReviewPage').find('.page-bottom-margin').height() - parseInt(divToResize.css('border-top-width'));
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + 3*(freeSpace/4);
			
			divToResize.css('padding-top', parseInt(freeSpace/4) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');*/
		},
				
		onRefresh : function() {
			window.setTimeout(this.layout.bind(this), 100);
			
			var json = this.model.attr, self = this;
			$('#i18n_servicesReviewBtn').untap();
			
			if(json.validationInfo){
				// there are conflicts
				$("#conflictsInlineError").show().attr("aria-hidden", "false");
				$("#i18n_servicesReviewBtn").addClass('disabled').attr("aria-disabled", "true");
				
				var conflictsServices = json.validationInfo.conflictingSocArr;
				$.each(conflictsServices, function(index, added) {
					var value = self._getServiceFromId(added.serviceId);
					if (!value) {
						return;
					}
					var serviceName = $('<div/>').addClass('plan-name large').text(value.serviceName);
					var serviceSeparator = $('<div/>').addClass('point-separator');

					if (value.typeIndicator == "OT") {
						var serviceTotal = value.amount * added[quantityAttrName];
						var serviceValue = $('<div/>').addClass('value large').text(self.application.displayPrice(value.amount) + " x " + added[quantityAttrName] + " = " + self.application.displayPrice(serviceTotal));
						var listItem = $('<div/>').addClass('title pointfill').append(serviceName).append(serviceSeparator).append(serviceValue);
						$('#servicesReviewOTServicesContainer').append(listItem);
						$('#servicesReviewOTContainer').show().attr("aria-hidden", "false");

					} else if (value.typeIndicator == "REC") {
						var serviceValue = $('<div/>').addClass('value large').text(self.application.displayPrice(value.amount));
						var listItem = $('<div/>').addClass('title pointfill').append(serviceName).append(serviceSeparator).append(serviceValue);
						$('#servicesReviewRecServicesContainer').append(listItem);
						$('#servicesReviewRecContainer').show().attr("aria-hidden", "false");
					}
				});

			}

			// Services list
			// TODO get this from the API ?
			var addedServices = this.summary.addedServices;
			if (addedServices.length > 0) {
				$("#servicesReviewButtonBar").addClass('no-border');

				$.each(addedServices, function(index, added) {
					var value = self._getServiceFromId(added.serviceId);
					if (!value) {
						return;
					}
					var serviceName = $('<div/>').addClass('plan-name large').text(value.serviceName);
					var serviceSeparator = $('<div/>').addClass('point-separator');

					if (value.typeIndicator == "OT") {
						var serviceTotal = value.amount * added[quantityAttrName];
						var serviceValue = $('<div/>').addClass('value large').text(self.application.displayPrice(value.amount) + " x " + added[quantityAttrName] + " = " + self.application.displayPrice(serviceTotal));
						var listItem = $('<div/>').addClass('title pointfill').append(serviceName).append(serviceSeparator).append(serviceValue);
						$('#servicesReviewOTServicesContainer').append(listItem);
						$('#servicesReviewOTContainer').show().attr("aria-hidden", "false");

					} else if (value.typeIndicator == "REC") {
						var serviceValue = $('<div/>').addClass('value large').text(self.application.displayPrice(value.amount));
						var listItem = $('<div/>').addClass('title pointfill').append(serviceName).append(serviceSeparator).append(serviceValue);
						$('#servicesReviewRecServicesContainer').append(listItem);
						$('#servicesReviewRecContainer').show().attr("aria-hidden", "false");
					}
				});

				// Balance and total due
				var currentBalance = Math.abs(parseFloat(json.arBalance));

				if (json.immediatePayment) {
					var immediateTotal = parseFloat(json.immediatePayment.totalAmount);
					
					var $amountDue = $('#servicesReviewAmountDue'); 
					$amountDue.text(self.application.displayPrice(immediateTotal));
					
					// CATO fix : Talkback is not able to read "zero dollar" ...
					if(self.application.model.isAndroid) {
						if(immediateTotal == 0) {
							$amountDue.attr("aria-labelledby", "zeroDollar");
						}
						else {
							$amountDue.removeAttr("aria-labelledby");
						}
					}
					
					$('#servicesReviewAmountDueContainer').show().attr("aria-hidden", "false");
					self.$element.find(".information").show().attr("aria-hidden", "false");

					var $currentBalanceValue = $('#servicesReviewCurrentBalance').find('.value'); 
					$currentBalanceValue.text(self.application.displayPrice(currentBalance));
					
					// CATO fix : Talkback is not able to read "zero dollar" ...
					if(self.application.model.isAndroid) {
						if(currentBalance == 0) {
							$currentBalanceValue.attr("aria-labelledby", "zeroDollar");
						}
						else {
							$currentBalanceValue.removeAttr("aria-labelledby");
						}
					}

					if(currentBalance > 0) {
						$('#servicesReviewAccountInfo').show().attr("aria-hidden", "false");
					}
					
					var $nextBalanceValue = $('#servicesReviewNextBalance').find('.value'); 
					if(typeof json.balanceAfterPurchase !== "undefined"){
						var newBalance = parseFloat(json.balanceAfterPurchase);
						$nextBalanceValue.text(self.application.displayPrice(newBalance));
						
						// CATO fix : Talkback is not able to read "zero dollar" ...
						if(self.application.model.isAndroid) {
							if(newBalance == 0) {
								$nextBalanceValue.attr("aria-labelledby", "zeroDollar");
							}
							else {
								$nextBalanceValue.removeAttr("aria-labelledby");
							}
						}
					} else {
						$nextBalanceValue.text("").removeAttr("aria-labelledby");
					}
					
					var $i18n_servicesReviewBtn = $("#i18n_servicesReviewBtn");
					
					if (immediateTotal <= 0) {
						// Next button: process
						$i18n_servicesReviewBtn.html($.i18n._('MANAGE_SERVICES_REVIEW_PROCESS_BUTTON')).attr('data-i18n', 'MANAGE_SERVICES_REVIEW_PROCESS_BUTTON').untap();
						$i18n_servicesReviewBtn.tap(function() {
							if(!$i18n_servicesReviewBtn.hasClass('disabled'))
								self.application.gotoPage('manageServicesConfirmationPage',{summary :self.summary , fromPage : '#servicesReviewPage', transactionInfos : {debitFromBalance : json.debitFromBalance}});
						});
						self.$element.find('.back-button').hide();
					} else {
//						$('#servicesReviewAccountInfo').hide().attr("aria-hidden", "true");
						// Next button: pay now
						$i18n_servicesReviewBtn.html($.i18n._('MANAGE_SERVICES_REVIEW_PAY_NOW_BUTTON')).attr('data-i18n', 'MANAGE_SERVICES_REVIEW_PAY_NOW_BUTTON').untap();
						$i18n_servicesReviewBtn.tap(function() {
							if(!$i18n_servicesReviewBtn.hasClass('disabled'))
								self.application.gotoPage('servicesPaymentPage',{summary :self.summary , fromPage : '#servicesReviewPage', transactionInfos : {debitFromBalance : json.debitFromBalance}});
						});
						self.$element.find('.back-button').show();
					}
				} else {
					$('#servicesReviewAmountDueContainer').hide().attr("aria-hidden", "true");
					self.$element.find(".information").hide().attr("aria-hidden", "true");
				}
			} else {
				$('#servicesReviewOTContainer').hide().attr("aria-hidden", "true");
				$('#servicesReviewRecContainer').hide().attr("aria-hidden", "true");
			}

			var removedServices = this.summary.removedServices;
			if (removedServices.length > 0) {
				$("#servicesReviewButtonBar").removeClass('no-border');
				
				$('#servicesReviewRemovedContainer').show().attr("aria-hidden", "false");
				
				self.$element.find('h3').text($.i18n._('MANAGE_SERVICES_REVIEW_TITLE_REMOVED')).attr('data-i18n', 'MANAGE_SERVICES_REVIEW_TITLE_REMOVED');
				self.$element.find('.back-button').hide();
				
				var currentLine = this.application.getCurrentLine();
				if(currentLine) {
					$('#servicesReviewRemovedContainer').find('.phone-number').html((currentLine.isTablet ? 'Tablet' : 'Phone') + ' ' + self.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hiden", "false");
				}
				else {
					$('#servicesReviewRemovedContainer').find('.phone-number').empty().hide().attr("aria-hiden", "true");
				}
				
				var removedServicesObjects = this.summary.removedServicesObjects;
				self.$element.find("div[data-i18n=MANAGE_SERVICES_REVIEW_REMOVE_TEXT]").html($.i18n._('MANAGE_SERVICES_REVIEW_REMOVE_TEXT').replace("{0}", removedServicesObjects[0].serviceName));
				
				var $i18n_servicesReviewBtn = $('#i18n_servicesReviewBtn'); 
				$i18n_servicesReviewBtn.html($.i18n._('MANAGE_SERVICES_REVIEW_CONTINUE_BUTTON')).attr('data-i18n', 'MANAGE_SERVICES_REVIEW_CONTINUE_BUTTON');

				$i18n_servicesReviewBtn.untap();
				$i18n_servicesReviewBtn.tap(function() {
					if(!$i18n_servicesReviewBtn.hasClass('disabled'))
						self.application.gotoPage('deleteOneServiceConfirmationPage',{summary :self.summary , fromPage : '#servicesReviewPage'});
				});

			} else {
				$('#servicesReviewRemovedContainer').hide().attr("aria-hidden", "true");
				self.$element.find('.back-button').show();
			}
			

			if(json.validationInfo){
				// there are conflicts
				$("#servicesReviewAmountDueContainer").hide().attr("aria-hidden", "true");
				self.$element.find(".information").hide().attr("aria-hidden", "true");
//				$("#servicesReviewAccountInfo").hide().attr("aria-hidden", "true");
			}

			self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");

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

	Pages.ServicesReviewPage = MVC.Page.extend(methods);

})($, MVC);
