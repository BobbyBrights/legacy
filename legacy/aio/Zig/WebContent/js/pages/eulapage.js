(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	
	
	var methods = {

		initialize : function(application){
			this.application = application;
		},
		

		onInit : function() {
			var self = this;
			
//			var $fastClickedElements = $("#i18n_eulaChekBoxText, #i18n_eulaLink, #i18n_eulaAcceptButton, #i18n_eulaDeclineButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
			
			this.$element.find('#i18n_eulaLink').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/myaio-eula');
				}
			});
			this.$element.find('#i18n_ppLink').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/privacy_mobileview');
				}
			});
			
			$('#eulaChekBox').bind('change',function() {
				var $that = $(this);
				
				if(this.checked) {
					$('#i18n_eulaAcceptButton').removeClass('disabled').attr("aria-disabled", "false");
					$that.attr("aria-checked", "true");
				} else {
					$('#i18n_eulaAcceptButton').addClass('disabled').attr("aria-disabled", "true");
					$that.attr("aria-checked", "false");
				}
			});

			$('#eulaChekBox + span').tap(function() {
				var eulaChekBox = document.getElementById("eulaChekBox");
				var $eulaChekBox = $(eulaChekBox);
				
				if(eulaChekBox) {
					eulaChekBox.checked = !eulaChekBox.checked;
					if(eulaChekBox.checked){
						$('#i18n_eulaAcceptButton').removeClass('disabled').attr("aria-disabled", "false");
						$eulaChekBox.attr("aria-checked", "true");
					} else {
						$('#i18n_eulaAcceptButton').addClass('disabled').attr("aria-disabled", "true");
						$eulaChekBox.attr("aria-checked", "false");
					}
				}
			});
			
			$('#i18n_eulaAcceptButton').tap(function() {
				if($('#i18n_eulaAcceptButton').hasClass('disabled')){
					return;
				}
				window.appSecureData.eula = "true";
				window.saveSecureData();
				application.gotoPage('loginPage');
			});
			$('#i18n_eulaDeclineButton').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.quit();
				} else {
					//for emulation test
					//[@if DEV]
					window.alert('quit');
					//[@endif] 
				}
			});
		},

		onShow : function(options) {
			this._adjustLayout();
			$(window).bind('resize.eula',this._adjustLayout.bind(this));
			/*Add just a slight delay for layout (issue with fixed)*/
			window.setTimeout(function(){
				/*This can be the first page shown ;)*/
				if(typeof deviceapis !== "undefined"){
					deviceapis.application.hideSplashScreen();
				}
			}, 300);
		},
		
		onHide : function(){
			$(window).unbind('resize.eula');
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event){
			if(event)
				event.preventDefault();
		},
		
		_adjustLayout : function() {
			if(!this.isVisible){
				return;
			}
			this.$element.find('.eulaFixedBottom').css('min-width',window.innerWidth+'px');
			this.$element.find('.eulaFixedBottomPlaceHolder').css('height',this.$element.find('.eulaFixedBottom').outerHeight(true)+'px');
		}
	};

	Pages.EulaPage = MVC.Page.extend(methods);
})($, MVC);
