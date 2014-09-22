(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = false;
			
//			var $fastClickedElements = $("#payMyBillReviewPage .back-button, #i18n_payMyBillReviewCancelButton, #i18n_payMyBillReviewButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$(window).bind('resize',this.layout.bind(this));
		},

		onShow : function(options) {
			var self = this;
			
			var $payMyBillReviewCancelButton = $('#i18n_payMyBillReviewCancelButton');
			var $payMyBillReviewButton = $('#i18n_payMyBillReviewButton');
			var $payMyBillReviewPage = $('#payMyBillReviewPage');
			
			$payMyBillReviewCancelButton.untap();
			$payMyBillReviewButton.untap();
			this.$element.find('.back-button').untap();
			if(options && options.summary && options.summary.accountStatus == "Hot Lined") {
				this.homeModel = options.summary;
				$payMyBillReviewCancelButton.tap(function() {
					self.application.gotoPage('payMyBillPage', {fromBack: true, summary : self.homeModel});
				});
				this.$element.find('.back-button').tap(function() {
					self.application.gotoPage('payMyBillPage', {fromBack: true, summary : self.homeModel});
				});
				
				$payMyBillReviewPage.find(".page-bottom-margin").hide().attr("aria-hidden", "true");
				$("#footer").hide().attr("aria-hidden", "true");
				$payMyBillReviewPage.find(".spacer").hide().attr("aria-hidden", "true");

				if(!options.fromBack){
					$payMyBillReviewButton.tap(function() {
						var options = {};
						if(self.paymentProfileId)
							options.paymentProfileId = self.paymentProfileId;
						options.paymentInfo = self.payment;
						options.summary = self.homeModel,
						options.fromPage = 'payMyBillReviewPage';
						self.application.gotoPage('payMyBillConfirmationPage', options);
					}).removeClass('disabled').attr("aria-disabled", "false");
				} else {
					$payMyBillReviewButton.addClass('disabled').attr("aria-disabled", "true");
				}
			} else {
				this.$element.find('.back-button').tap(function() {
					self.application.gotoPage('payMyBillPage', {fromBack : true});
				});
				$payMyBillReviewCancelButton.tap(function() {
					self.application.gotoPage('payMyBillPage', {fromBack : true});
				});
				
				$payMyBillReviewPage.find(".page-bottom-margin").show().attr("aria-hidden", "false");
				$("#footer").show().attr("aria-hidden", "false");
				$payMyBillReviewPage.find(".spacer").show().attr("aria-hidden", "false");

				$payMyBillReviewButton.tap(function() {
					var options = {};
					if(self.paymentProfileId)
						options.paymentProfileId = self.paymentProfileId;
					options.paymentInfo = self.payment;
					options.fromPage = 'payMyBillReviewPage';
					self.application.gotoPage('payMyBillConfirmationPage', options);
				});
			}
			
			// Auto Pay activated
			if(options && options.payment && options.payment.autoPay){
				$payMyBillReviewPage.find('.legal-text').find('.autopay').removeClass('really-hide');
			} else {
				$payMyBillReviewPage.find('.legal-text').find('.autopay').addClass('really-hide');
			}
			
			this.payment = options.payment;
			if(options.paymentProfileId)
				this.paymentProfileId = options.paymentProfileId;
			else
				this.paymentProfileId = undefined;
			this.fetch();
		},

		/**
		 * Fetch the data from the remote server
		 */
		fetch : function(model) {
			var self = this;
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function() {
				self.isLoading = false;
				self.application.unBlockUI();
			};
			self.isLoading = true;
			self.application.connector.getHome(done, done, "REFUEL");
		},
		
		onBack : function(event) {
			event.preventDefault();
			var self = this;
			if(this.isLoading) {
				//ignore
				return;
			}
			self.application.gotoPage('payMyBillPage', {fromBack : true, summary : self.homeModel});
		},
		
		layout : function() {
			// Disable the layout calculation, the design have changed and the grey sub page has been removed 
			/*
			var firstItem = $('#payMyBillReviewPage').find('.list-item')[0];
			$(firstItem).css('margin', '0');
			
			var divToResize = $('#payMyBillReviewPage').find('.sub-page');
			divToResize.css('padding-top', '0px');
			divToResize.css('margin-top', '0px');
			divToResize.height('auto');

			if(this.homeModel.accountStatus == "Hot Lined" )
				$('#payMyBillReviewPage').find('.page-bottom-margin').addClass('hotlined-bottom');
			else
				$('#payMyBillReviewPage').find('.page-bottom-margin').removeClass('hotlined-bottom');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#payMyBillReviewPage').find('.page-bottom-margin').height();
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + freeSpace;

			divToResize.css('padding-top', parseInt(freeSpace/4/2) +'px');
			divToResize.css('margin-top', parseInt(freeSpace/4/2) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');

			var secondItem = $('#payMyBillPage form .list-container .list-item:not(.wp7)')[1];
			var secondItemMarginTop = $(secondItem).css('margin-top');
			$(firstItem).css('margin-top', secondItemMarginTop);
			*/
		},

		onRefresh : function() {
			if (!this.isVisible)
				return;

			// hotlined cases
			this.homeModel = this.application.connector.homeModel.attr;

			window.setTimeout(this.layout.bind(this), 100);
			var json = this.model.attr;

			var $payMyBillReviewOwe = $('#payMyBillReviewOwe'); 
			var $payMyBillReviewCredit = $('#payMyBillReviewCredit'); 
			$payMyBillReviewOwe.html(self.application.displayPrice(json.amountDueToday));
			$payMyBillReviewCredit.html(self.application.displayPrice(json.accountBalance));
			
			// CATO fix : Talkback is not able to read "zero dollar" ...
			if(self.application.model.isAndroid) {
				if(parseFloat(json.amountDueToday) == 0) {
					$payMyBillReviewOwe.attr("aria-labelledby", "zeroDollar");
				}
				else {
					$payMyBillReviewOwe.removeAttr("aria-labelledby");
				}
				if(parseFloat(json.accountBalance) == 0) {
					$payMyBillReviewCredit.attr("aria-labelledby", "zeroDollar");
				}
				else {
					$payMyBillReviewCredit.removeAttr("aria-labelledby");
				}
			}
		}
	};

	Pages.PayMyBillReviewPage = MVC.Page.extend(methods);

})($, MVC);