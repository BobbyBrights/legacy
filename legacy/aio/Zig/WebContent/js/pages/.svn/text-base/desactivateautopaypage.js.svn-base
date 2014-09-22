(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this, sub = function() {
//				location.hash = "ns-desactivateAutopayPage";
				self.application.gotoPage('desactivateAutopayPage');
				return false;
			};

//			var $fastClickedElements = $("#i18n_desactivateAutopayCancelButton, #i18n_desactivateAutopayContinueButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_desactivateAutopayCancelButton').tap(function() {
				self.onBack();
				return false;
			});
			$('#i18n_desactivateAutopayContinueButton').tap(function() {
				//call function
//				document.location.href = '#desactivateAutopayConfirmationPage';
				self.application.gotoPage('desactivateAutopayConfirmationPage',{cancelPage : self.fromPage});
				return false;
			});
			
			this.$element.find('.back-button').tap(function() {
				self.onBack();
			});
		},

		onShow : function(options) {
			if(options && options.fromPage){
				this.fromPage = options.fromPage;
			} else {
				this.fromPage = "homePage";
			}
			this.onRefresh();
		},
				
		onRefresh : function() {
			var json = this.model.attr;
			$('#desactivateAutopayDay').text(json.billCycleDate);
			$('#desactivateAutopayAmount').text("$" /*+json.accountBalance*/); // TODO:  Strange code
			$('#desactivateAutopayNameOnCard').text(json.cardName);
			$('#desactivateAutopayCardNumber').text(json.cardNumber);
			$('#desactivateAutopayExpirationDate').text(moment(json.cardExpirationDate, "MM/YY").format("MM/YYYY"));
		},
		
		onBack : function(event){
			if(event)
				event.preventDefault();
			this.application.gotoPage(this.fromPage, {fromBack : true});
		}
	};

	Pages.DesactivateAutopayPage = MVC.Page.extend(methods);

})($, MVC);
