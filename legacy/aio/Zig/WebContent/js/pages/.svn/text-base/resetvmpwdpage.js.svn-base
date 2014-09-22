(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},
		
		onInit : function() {
			var self = this;
			this.application.setNavLinkActive('#morePage');
			
//			var $fastClickedElements = $("#resetVoiceMailPwdPageBackButton, #resetVoiceMailPwdPage .inline-button");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#resetVoiceMailPwdPageBackButton').tap(function() {
				self.application.gotoPage('morePage', {fromBack : true});
			});
			this.application.unBlockUI();
		},	
			
		onShow : function(options) {
			var currentLine = this.application.getCurrentLine();
			
			this.application.setNavLinkActive('#morePage');
			this.application.unBlockUI();
			
			if(currentLine && this.application.isCurrentAccountMultiLine()){
				this.$element.find(".phone-number").html((currentLine.isTablet ? "Tablet" : "Phone")+" "+this.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".phone-number").hide().attr("aria-hidden", "true").empty();
			}
		},
		
		onBack : function(event) {
			event.preventDefault();
			if(this.isLoading) {
				//ignore
				return;
			}
			this.application.gotoPage('morePage', {fromBack : true});
		},
	};

	Pages.ResetVMPwdPage = MVC.Page.extend(methods);
	
})($, MVC);
