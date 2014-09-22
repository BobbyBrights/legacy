(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	
	var adjusetIframeSize = function(ifid){
		var available = $(window).height() - $(ifid).offset().top -  $('div.page-bottom-margin').height();
		if(available > 100) {
			$(ifid).css('height',available +'px');
		};
	};
	
	var methods = {

		initialize : function(navId,url, backPage){
			this.url = url;
			this.navId = navId;
			this.backPage = backPage;
		},
		
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.$element.find('.back-button').tap(function() {
				self.onBack();
//				self.application.gotoPage(self.backPage, {fromBack : true});
			});
		},

		onShow : function(options) {
			var frame = this.$element.find('iframe');
			if(!frame.attr('src')){
				frame.attr('src',this.url);
			}
			var navLink = this.navId;
			if(options && options.navLink){
				navLink = options.navLink;
			}
			if(options && options.fromPage){
				this.backPage = options.fromPage;
			}
			if(options && options.accountStatus == "Hot Lined"){
				this.options = options;
				$("#footer").hide().attr("aria-hidden", "true");
				this.$element.find('.spacer').hide().attr("aria-hidden", "true");
			} else {
				$("#footer").show().attr("aria-hidden", "false");
				this.$element.find('.spacer').show().attr("aria-hidden", "false");
			}
			this.application.setNavLinkActive(navLink);
			adjusetIframeSize('#'+this.$element.find('iframe').attr('id'));
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event){
			if(event)
				event.preventDefault();
			this.application.gotoPage(this.backPage, {fromBack : true, summary : this.options});
		}
	};

	Pages.IFramePage = MVC.Page.extend(methods);
})($, MVC);
