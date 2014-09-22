(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var backPageId = 'manageAutopayPage';
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self=this;
			this.cancelPage = "homePage";

//			var $fastClickedElements = $("#manageAutopayReviewCancelButton, #manageAutopayReviewButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
			
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage(backPageId, {fromBack : true});
			});
			$('#manageAutopayReviewButton').tap(function() {
				self.application.gotoPage('manageAutopayConfirmationPage', {summary : self.summary, cancelPage : self.cancelPage});
			});
			
			$('#manageAutopayReviewCancelButton').tap(function() {
				self.application.gotoPage(self.cancelPage);
			});
		},

		onShow : function(options) {
			this.cancelPage = "homePage";
			if(options){
				this.summary = options.summary;
				this.cancelPage = options.cancelPage;
			} 
			
			// Empty fields
			$('#manageAutopayReviewNameOnCard').empty();
			$('#manageAutopayReviewCardNumber').empty();
			$('#manageAutopayReviewExpirationDate').empty();

			this.onRefresh();
		},

		onRefresh : function() {
			if (!this.isVisible)
				return;
			
			// Set info in page with options params
			$('#manageAutopayReviewNameOnCard').text(this.summary.name);
			$('#manageAutopayReviewCardNumber').text(self.application.maskCCNumber(this.summary.cardNumber));
			$('#manageAutopayReviewExpirationDate').text(moment(this.summary.expirationDate, "MM/YY").format("MM/YYYY"));
		},
		
		onBack : function(event){
			this.application.gotoPage(backPageId, {fromBack : true});
		}
	};

	Pages.ManageAutopayReviewPage = MVC.Page.extend(methods);

})($, MVC);
