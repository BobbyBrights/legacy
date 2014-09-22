(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
//			var $fastClickedElements = $("#aboutUsPage .back-button, #aboutUsFaqsPageLink, #aboutUsPrivacyPageLink, #aboutUsTandCPageLink, #eulaPageLink");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			// Back
			$('#aboutUsPage').find('.back-button').tap(function() {
				self.application.gotoPage('morePage', {fromBack : true});
			});
			
			$('#versionNumber').tap(function(){
				var svg = $('#versionNumber').text();
				$('#versionNumber').html($('#versionNumber').attr('data-buildnb'));
				$('#versionNumber').attr('data-buildnb',svg);
			});
		},

		onShow : function() {
			// Set active state on navigatin link and title
			this.application.setNavLinkActive('#morePage');
			$('#versionNumber').html("v" + this.application.displayVersion);
			
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
			self.application.gotoPage('morePage', {fromBack : true});
		},
	};

	Pages.AboutUsPage = MVC.Page.extend(methods);

})($, MVC);