(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;			

//			var $fastClickedElements = $("#changePwdConfirmationButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
		},

		onShow : function(options) {
			var self = this;	
			
			if(options && options.from == 'setpwdpage'){
				this.$element.addClass("no-header no-footer");
				$('div.header>div').hide().attr("aria-hidden", "true");
				$('#footer').hide().attr("aria-hidden", "true");
				$('#bottomShadow').show().attr("aria-hidden", "false");
			} else {
				this.$element.removeClass("no-header no-footer");
				$('div.header>div').show().attr("aria-hidden", "false");
				$('#footer').show().attr("aria-hidden", "false");
				$('#bottomShadow').hide().attr("aria-hidden", "true");
			}
			
			
			
			if(options && options.from == 'setpwdpage'){
				this.confirm = 'homePage';
				this.back = 'loginPage';
			}
			else {
				this.confirm = 'morePage';
				this.back = 'changePwdPage';
			}
			var changePwdConfirmationButton = $('#changePwdConfirmationButton'); 
			
			changePwdConfirmationButton.untap();
			changePwdConfirmationButton.tap(function() {
				self.application.gotoPage(self.confirm);
			});
			this.onRefresh();
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			event.preventDefault();
			var self = this;
			if(this.isLoading) {
				//ignore
				return;
			}
			self.application.gotoPage(this.back);
		},
	};

	Pages.ChangePwdConfirmationPage = MVC.Page.extend(methods);

})($, MVC);