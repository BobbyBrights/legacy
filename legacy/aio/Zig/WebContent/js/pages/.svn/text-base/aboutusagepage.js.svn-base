(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	
	var methods = {

		WiFiAppLink : {
			ios : 'https://itunes.apple.com/us/app/id626950140?mt=8',
			android : 'market://details?id=com.mizmowireless.wifi',
			wp : 'http://www.windowsphone.com/s?appid=e4e3c33e-1b35-458f-9e9f-e61fa23e7991'
		},
				
		setApplication : function(application){
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			this.contextualBack = 'usagePage';
			
//			this.innerPage = this.$element.find('.innerPage');
//			new FastClick(this.innerPage[0]);
			
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage(self.contextualBack, {
					fromBack : true
				});
			});
			$("#i18n_aboutUsagePageMyPlanLink").tap(function(e) {
				e.preventDefault();
				self.application.gotoPage("myPlanPage");
			});
			this.$element.find(".AIOWiFiAppInstallLink").tap(function(e) {
				e.preventDefault();
				deviceapis.open((function() {
					if(self.application.model.isIos){
						return self.WiFiAppLink.ios;
					} else if(self.application.model.isAndroid){
						return self.WiFiAppLink.android;
					} else if(self.application.model.isWinPhone){
						return self.WiFiAppLink.wp;
					}
				})());
			});
		},

		onShow : function(options) {
			if(options) {
				$("#userDataTotalAllowance").text((options.userDataTotalAllowance || ""));
			}
		},
		
		onHide : function() {
			
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			event.preventDefault();
			self.application.gotoPage(this.contextualBack, {
				fromBack : true
			});
		}
	};

	Pages.AboutUsagePage = MVC.Page.extend(methods);
})($, MVC);
