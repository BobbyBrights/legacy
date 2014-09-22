(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	
	var methods = {
				
		setApplication : function(application){
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			self.$element.find(".back-button").click(function(e) {
				self.onBack(e);
			});
		},

		onShow : function(options) {
			var self = this;
			
			if(options) {
				this.fromPage = options.fromPage;
			}
			
			var securityActivity = "On"; // just for the test, waiting AMSS API with the right value of the activity
			
			$(".on-off-security").html(securityActivity);
		},
		
		onHide : function() {
			
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			var self = this;
			event.preventDefault();
			self.application.gotoPage(self.fromPage, {
				fromBack : true
			});
		}
	};

	Pages.onlineSecurityPage = MVC.Page.extend(methods);
})($, MVC);
