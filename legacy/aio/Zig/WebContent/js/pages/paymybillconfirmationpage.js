(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			$(window).bind('resize',this.layout.bind(this));
			this.innerPage = this.$element.find('.innerPage');
//			new FastClick(this.innerPage[0]);
		},

		onShow : function(options) {
			var $payMyBillConfirmationButton = $("#i18n_payMyBillConfirmationButton");
			var $payMyBillConfirmationPage = $("#payMyBillConfirmationPage");
			
			$payMyBillConfirmationButton.untap();
			
			if(options && options.summary && options.summary.accountStatus == "Hot Lined"){
				this.homeModel = options.summary;
				$payMyBillConfirmationButton.tap(function() {
					self.application.gotoPage('homePage', {fromPage : true});
				});
				
				$payMyBillConfirmationPage.find(".page-bottom-margin").hide().attr("aria-hidden", "true");
				$("#footer").hide().attr("aria-hidden", "true");
				$payMyBillConfirmationPage.find(".spacer").hide().attr("aria-hidden", "true");
				
			} else {
				$payMyBillConfirmationButton.tap(function() {
					self.application.gotoPage('homePage', {fromPage : true});
				});
				
				$payMyBillConfirmationPage.find(".page-bottom-margin").show().attr("aria-hidden", "false");
				$("#footer").show().attr("aria-hidden", "false");
				$payMyBillConfirmationPage.find(".spacer").show().attr("aria-hidden", "false");

			}
			this.payment = options.paymentInfo;
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
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			self.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function(){
				self.application.unBlockUI();
				$('#i18n_payMyBillConfirmationPaymentText').html($.i18n._('PAY_MY_BILL_CONFIRMATION_PAYMENT_TEXT')).attr('data-i18n', 'PAY_MY_BILL_CONFIRMATION_PAYMENT_TEXT');;
				self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
			};
			var error = function(){
				self.application.unBlockUI();
				$('#i18n_payMyBillConfirmationPaymentText').html($.i18n._('PAY_MY_BILL_CONFIRMATION_PAYMENT_ERROR')).attr('data-i18n', 'PAY_MY_BILL_CONFIRMATION_PAYMENT_ERROR');
				self.application.gotoPage('payMyBillReviewPage', {fromBack: true, summary : self.homeModel});
			};
			var params = {};
			if(self.paymentProfileId)
				params.paymentProfileId = self.paymentProfileId;
			params.payment = self.payment;
			self.application.connector.makeOTPayment(params, done, error, "REFUEL");
		},

		layout : function() {
			var divToResize = $('#payMyBillConfirmationPage').find('.sub-page');
			divToResize.css('margin-top', '0px');
			divToResize.css('padding-top', '0px');
			divToResize.css('padding-bottom', '0px');
			divToResize.height('auto');

			if(this.homeModel && this.homeModel.accountStatus == "Hot Lined" )
				$('#payMyBillConfirmationPage').find('.page-bottom-margin').addClass('hotlined-bottom');
			else
				$('#payMyBillConfirmationPage').find('.page-bottom-margin').removeClass('hotlined-bottom');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#payMyBillConfirmationPage .page-bottom-margin').height() - parseInt(divToResize.css('border-top-width'));
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + freeSpace;

			divToResize.css('padding-top', parseInt(freeSpace/4/2) +'px');
			divToResize.css('margin-top', parseInt(freeSpace/4/2) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');
		},

		onRefresh : function() {
			var json = this.model.attr, self = this; 
			application.log(json);

			$('#payMyBillConfirmationCode').html(json.confirmationId);
			$('#payMyBillConfirmationAmount').html(self.application.displayPrice(json.amountReceived));
			$('#payMyBillConfirmationBalance').html(self.application.displayPrice(json.newBalance));
			
			window.setTimeout(this.layout.bind(this), 100);
		},
		
		onBack : function(event) {
			//do nothing
			event.preventDefault();
		},
	};

	Pages.PayMyBillConfirmationPage = MVC.Page.extend(methods);

})($, MVC);