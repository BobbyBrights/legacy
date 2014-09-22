(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.cancelPage = "homePage";
			this.innerPage = this.$element.find('.innerPage');
//			new FastClick(this.innerPage[0]);
			
			$('#i18n_manageAutopayConfirmationButton').tap(function() {
				self.application.gotoPage(self.cancelPage, {fromPage : true});
			});
		},

		onShow : function(options) {
			$('#i18n_manageAutopayConfirmationText').html($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_TEXT')).attr('data-i18n', 'MANAGE_AUTOPAY_CONFIRMATION_TEXT');
			$('#i18n_manageAutopayConfirmationName').show().attr("aria-hidden", "false");
			$('#i18n_manageAutopayConfirmationCardNumber').show().attr("aria-hidden", "false");
			$('#i18n_manageAutopayConfirmationExpirationDate').show().attr("aria-hidden", "false");
			$('#autopayConfirmationName').empty().show().attr("aria-hidden", "false");
			$('#autopayConfirmationCardNumber').empty().show().attr("aria-hidden", "false");
			$('#autopayConfirmationExpirationDate').empty().show().attr("aria-hidden", "false");

			if(options) {
				this.summary = options.summary;
				this.cancelPage = options.cancelPage;
			}
			this.fetch();
		},

		/**
		 * Fetch the data from the remote server
		 */
		fetch : function() {
			var self = this;
			self.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function(){
				self.application.unBlockUI();
			};
			var error = function(){
				self.application.unBlockUI();
				$('#i18n_manageAutopayConfirmationText').html($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_TEXT_ERROR')).attr('data-i18n', 'MANAGE_AUTOPAY_CONFIRMATION_TEXT_ERROR');
				$('#i18n_manageAutopayConfirmationName').hide().attr("aria-hidden", "true");
				$('#i18n_manageAutopayConfirmationCardNumber').hide().attr("aria-hidden", "true");
				$('#i18n_manageAutopayConfirmationExpirationDate').hide().attr("aria-hidden", "true");
			};
			self.application.connector.createAutomaticPayment(self.summary, done, error, "AUTOPAY");
		},
		
		layout : function() {
		},
		
		onRefresh : function() {
			if (!this.isVisible)
				return;

			$('#autopayConfirmationName').html(this.summary.name);
			$('#autopayConfirmationCardNumber').html(self.application.maskCCNumber(this.summary.cardNumber));
			$('#autopayConfirmationExpirationDate').html(moment(this.summary.expirationDate,"MM/YY").format("MM/YYYY"));
		},
		
		onBack : function(event) {
			//do nothing
			event.preventDefault();
		},
	};

	Pages.ManageAutopayConfirmationPage = MVC.Page.extend(methods);

})($, MVC);