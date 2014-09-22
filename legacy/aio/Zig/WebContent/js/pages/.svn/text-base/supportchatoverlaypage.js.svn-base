(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			if (this.application.isWP8)
				this.WP8_init();
			else if (this.application.isWP7)
				this.WP7_init();
			else
				this.init();
		},

		
		init : function() {
			var self = this;
			// Set active state on navigation link and title
			self.application.setNavLinkActive('#morePage');

			window.setTimeout(this.layout.bind(this), 200);

			var goHomePage = function() {
				window.appSecureData.showOverlay = "true";
				window.saveSecureData();
				$('div.over-navbar').hide().attr("aria-hidden", "true");
				$('#imgOverlay').hide().attr("aria-hidden", "true");
				$('body').css('padding-left', '3%').css('padding-right', '3%');
				self.application.gotoPage('homePage');
			};

//			var $fastClickedElements = $("#imgOverlay, #supportChatOverlayPage .over-navbar");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#imgOverlay').tap(function() {
				goHomePage();
			}).show().attr("aria-hidden", "false");

			$('#supportChatOverlayPage').find('.over-navbar').tap(function() {
				goHomePage();
			});
			
			// Fix for Android 2.3, overlay is empty if no timeout.
			window.setTimeout(function() {
				var headImage = $('<img src="img/head_up.png" alt="Heads up !" role="heading" aria-level="1"/>');
				var arrowImage = $('<img src="img/chat_more_circle.png" alt="Now you can chat with an Aio advocate from the MyAio app. Just tap more. Tap to go to the home screen." role="button"/>');
				$('#headMessage').append(headImage);
				$('#contentMessage').append(arrowImage);
			}, 500);
		},

		onHide : function(){
			$('div.over-navbar').hide().attr("aria-hidden", "true");
			$('#footer').attr("aria-hidden", "false");
		},
		
		onShow : function(){
			$('#footer').attr("aria-hidden", "true");
		},
		
		layout : function() {
			$('#wp_quitButton').remove();
			$('#wp8_navbar').remove();

			$('#imgOverlay').css('padding-top', '0px').height('auto');
			$('#supportChatOverlayPage').find('.header').hide().attr("aria-hidden", "true");
			$('body').css('padding-left', '0px').css('padding-right', '0px');
			$('div.over-navbar').show().attr("aria-hidden", "false");
			$('#imgOverlay').show().attr("aria-hidden", "false");

			var windowHeight = jQuery(window).height();
			var topOfSubPage = $('#imgOverlay').offset().top;
			var heightOfSubPage = $('#imgOverlay').height();
			var heightOfNavbar = $('#footer').height();
			var freeSpace = windowHeight - topOfSubPage - heightOfSubPage - heightOfNavbar;
			if (freeSpace < this.application.minFreeSpaceValue)
				freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = freeSpace;

			$('#imgOverlay').height(parseInt(newSubPageHeight) + 'px');
			$('div.over-navbar').css('top', parseInt(newSubPageHeight) + 'px');
		},

		WP8_init : function() {
			var self = this;
			window.setTimeout(this.WP8_layout.bind(this), 100);
			window.setTimeout(this.WP8_layout.bind(this), 1000);

			var goHomePage = function() {
				window.appSecureData.showOverlay = "true";
				window.saveSecureData();
				$('#imgOverlay').hide().attr("aria-hidden", "true");
				self.application.gotoPage('homePage');
			};

			$('#imgOverlay').tap(function() {
				goHomePage();
			}).show().attr("aria-hidden", "false");

			$('#wp_quitButton').append('<img src="img/windows_phone/overlay_exit.png"/>');
			$('#wp8_navbar').append('<img src="img/windows_phone/overlay_menu.png"/>');
			$('#headMessage').append('<img src="img/windows_phone/overlay_heads_up.png"/>');
			$('#contentMessage').append('<img src="img/windows_phone/overlay_arrow.png"/>');
		},
		
		WP8_layout : function() {
			//$('div.over-navbar').remove();
			
			$('#imgOverlay').css('padding-top', '0px');
			$('#imgOverlay').height('auto');
			$('#supportChatOverlayPage').find('.header').hide().attr("aria-hidden", "true");
			$('#imgOverlay').show().attr("aria-hidden", "false");
			$('div.over-navbar').show().attr("aria-hidden", "false");

			var windowHeight = jQuery(window).height();
			var topOfSubPage = $('#imgOverlay').offset().top;
			var heightOfSubPage = $('#imgOverlay').height();
			var freeSpace = windowHeight - topOfSubPage - heightOfSubPage ;
			if (freeSpace < this.application.minFreeSpaceValue)
				freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = freeSpace;

			$('#imgOverlay').height(parseInt(newSubPageHeight) + 'px');
		},

		WP7_init : function() {
			var self = this;
			// Set active state on navigation link and title
			self.application.setNavLinkActive('#morePage');

			window.setTimeout(this.WP7_layout.bind(this), 100);
			window.setTimeout(this.WP7_layout.bind(this), 1000);

			var goHomePage = function() {
				window.appSecureData.showOverlay = "true";
				window.saveSecureData();
				$('#imgOverlay').hide().attr("aria-hidden", "true");
				self.application.gotoPage('homePage');
			};

			$('#imgOverlay').tap(function() {
				goHomePage();
			}).show().attr("aria-hidden", "false");

			$('#wp_quitButton').append('<img src="img/windows_phone/overlay_exit.png"/>');
			$('#headMessage').append('<img src="img/windows_phone/overlay_heads_up.png"/>');
			$('#contentMessage').append('<img src="img/windows_phone/overlay_wp7_arrow.png"/>');
		},
		
		WP7_layout : function() {
			var self = this;
			//$('div.over-navbar').remove();
			$('#wp8_navbar').remove();
			
			$('#imgOverlay').css('padding-top', '0px').height('auto');
			$('#supportChatOverlayPage').find('.header').hide().attr("aria-hidden", "true");
			$('#imgOverlay').show().attr("aria-hidden", "false");
			$('div.over-navbar').detach().appendTo("body").show().tap(function(e) {
				e.preventDefault();
				window.appSecureData.showOverlay = "true";
				window.saveSecureData();
				$('#imgOverlay').hide().attr("aria-hidden", "true");
				self.application.gotoPage('homePage');
			});

			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var windowHeight = jQuery(window).height() + statusBarHeight;
			var topOfSubPage = $('#imgOverlay').offset().top;
			var heightOfSubPage = $('#imgOverlay').height();
			var freeSpace = windowHeight - topOfSubPage - heightOfSubPage ;
			if (freeSpace < this.application.minFreeSpaceValue)
				freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = freeSpace;
			
			$('#imgOverlay').height(parseInt(newSubPageHeight) + 'px');
		}

	};

	Pages.supportChatOverlayPage = MVC.Page.extend(methods);

})($, MVC);