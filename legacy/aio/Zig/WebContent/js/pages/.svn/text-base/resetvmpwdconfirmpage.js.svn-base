(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},
			
		onInit : function() {
//			var $fastClickedElements = $("#resetVoiceMailPwdConfirmationPage").find(".button");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$(window).bind('resize',this.layout.bind(this));
		},			
			
		onShow : function(options) {
			var self = this, currentLine = this.application.getCurrentLine();
			window.setTimeout(this.layout.bind(this), 100);
			var done = function() {
				self.application.unBlockUI();
			};
			
			if(currentLine && this.application.isCurrentAccountMultiLine()){
				this.$element.find(".phone-number").html((currentLine.isTablet ? "Tablet" : "Phone")+" "+this.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".phone-number").hide().attr("aria-hidden", "true").empty();
			}

			// Make the request
			this.application.connector.resetVMPassword(done, done);
		},
		
		layout : function() {
			var divToResize = $('#resetVoiceMailPwdConfirmationPage').find('.sub-page');
			divToResize.css('margin-top', '0px');
			divToResize.css('padding-top', '0px');
			divToResize.height('auto');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#resetVoiceMailPwdConfirmationPage').find('.page-bottom-margin').height();
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + (freeSpace/2);
			
			divToResize.css('margin-top', parseInt(freeSpace/2) +'px');
			divToResize.css('padding-top', parseInt(freeSpace/4) +'px');
			divToResize.css('padding-bottom', parseInt(freeSpace/4) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');			
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

	Pages.ResetVMPwdConfirmPage = MVC.Page.extend(methods);
	
})($, MVC);
