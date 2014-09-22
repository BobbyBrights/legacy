(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.innerPage = this.$element.find('.innerPage');
			this.backPage = "homePage";
			$('#dACP_deactivateConfirmButton').tap(function() {
				self.application.gotoPage(self.backPage);
			});
		},

		onShow : function(options) {
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			this.backPage = "homePage";
			if(options && options.cancelPage){
				this.backPage = options.cancelPage;
			}
			this.fetch();
		},
				
		/**
		 * Fetch the data from the remote server
		 */
		fetch : function() {
			var self = this;
			var success = function(){
				// Update confirmation page
				self.application.unBlockUI();
				self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
				$('#desactiveAutopayConfirmationText').text($.i18n._('MANAGE_AUTOPAY_DISABLE_CONFIRMATION_TEXT')).attr('data-i18n', 'MANAGE_AUTOPAY_DISABLE_CONFIRMATION_TEXT');
				$('#desactiveAutopayConfirmationTitle').text($.i18n._('MANAGE_AUTOPAY_DISABLE_CONFIRMATION_TITLE')).attr('data-i18n', 'MANAGE_AUTOPAY_DISABLE_CONFIRMATION_TITLE');
			};
			var error = function(){				
				// Update confirmation page
				$('#desactiveAutopayConfirmationText').html($.i18n._('MANAGE_AUTOPAY_DISABLE_CONFIRMATION_TEXT_ERROR')).attr('data-i18n', 'MANAGE_AUTOPAY_DISABLE_CONFIRMATION_TEXT_ERROR');
				self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
				self.application.unBlockUI();
			};
			self.application.blockUI('Loading <span aria-hidden="true">...</span>');
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			this.application.connector.deleteAutomaticPayment(success,error);
		},
		
		onRefresh : function() {
		},
	};

	Pages.DesactivateAutopayConfirmationPage = MVC.Page.extend(methods);

})($, MVC);
