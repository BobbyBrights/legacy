(function($, window) {

	var tabs = [ '#homePage', '#usagePage', '#payMyBillPage', '#myPlanPage', '#morePage' ];
	/* Created in global namespace */
	WP8Navigation = function(application) {
		this.currentPage = "";
		this.application = application;
	};

	WP8Navigation.prototype = {
		initNavigation : function(application) {
			var self = this;
//			application.log('Screen Width : ' + $(window).width());
//			application.log('Screen Height : ' + $(window).height());

			this.$navbar = $("#footer .nav-grid");
			this.$navbar.PivotControl();
//			this.$navbar.find('a').each(function(index){
//				$(this).unbind('click');
//			});

			this.$navbar.bind('pivotAnimationStart', self._beforePageChange.bind(this));
			this.$navbar.bind('pivotAnimationEnd', self._afterPageChange.bind(this));

			$("#i18n_homeRefuelButton").click(self._switchRefuelPage.bind(this));
			$("#i18n_homeNeedHelpButton").click(self._switchMorePage.bind(this));

			this.application = application;
			$('#footer a').click(function() {
				$('#footer a').removeClass('ui-nav-active');
				$(this).addClass('ui-nav-active');
			});
			$('#footer a').removeAttr('href');
			// Init event onhashchange
			$(window).hashchange(function() {
				self.onHashChange();
			});

//			var needRefresh = location.hash === "#ns-loginPage";
//			location.hash = "#ns-loginPage";
//			if (needRefresh)
				$(window).hashchange();
		},
		
		setNavLinkActive : function(hash){
			if(hash.indexOf("homePage")!=-1){
				this.$navbar.PivotControl("setActive",0);
			} else 	if(hash.indexOf("usagePage")!=-1){
				this.$navbar.PivotControl("setActive",1);
			} else 	if(hash.indexOf("myPlanPage")!=-1){
				this.$navbar.PivotControl("setActive",3);
			} else 	if(hash.indexOf("morePage")!=-1){
				this.$navbar.PivotControl("setActive",4);
			}
		},
		
		handleBack : function(){
			if(zAlerts.isActivePopup()){
				//prevent key
				return;
			}
			
			//See if any page is listening to back.
			var bevent = $.Event('zbackkey');
			if(this.currentPage){
				$(this.currentPage).trigger(bevent);
			}
			if(!bevent.isDefaultPrevented()){
			}
		},
		
		/* Called when the URL hash has changed */
		onHashChange : function(hash,options) {
//			console.log('_onHashChange ' + location.hash);
			if(!hash) {
				hash = location.hash == "" ? "#loginPage" : location.hash.replace('ns-', '');
			} else {
				hash = '#' + hash;
			}
			if (this.currentPage === hash) {
				return;
			}
//			this.application.log("Hash : " + hash);
			
			options = options || self.navigationOptions || {};
			
			if(options && options.fromPage == undefined && this.application.currentPage) {
				options.fromPage = self.currentPage.replace("#", "");
			}
			self.navigationOptions = null;
			
			var token = this.application.connector.sessionModel.get('token');
			if (token == "") {
				if (hash != '#signUpPage' && hash != '#forgotPwdPhonePage' && hash != '#forgotPwdQuestionPage' && hash != '#lockedPage' 
					&& hash != '#resetPwdPage'
						&& hash != '#setPwdPage'
						)
					hash = "#loginPage";
			}

			if(this.application.connector.homeModel.get('accountStatus') == "Hot Lined"){
				if(hash != '#homePage' && hash != '#payMyBillPage' && hash != '#payMyBillReviewPage' && hash != '#payMyBillConfirmationPage' && hash != '#payMyBillTandCPage')
					hash = "#homePage";
			}
			
			
			//if first launch show disclaimer
			var isEulaAccepted = (window.appSecureData.eula == "true");
			if(!isEulaAccepted){
				hash = "#eulaDisclamerPage";
			}
			
			if(hash === this.currentPage){
				return;
			}
			
			var $hash = $(hash);
			
			// Check PIN authentication
			if($hash.hasClass('pin-auth') && self.connector.sessionModel.get("PINSecurityOn") && !self.connector.sessionModel.get("isPinChecked")) {
				var pinOk = function() {
					self.gotoPage($hash.attr("id"), options);
				};
				
				var pinKo = function() {
					self.showMsg("Bad PIN !", "Error", {buttons: [{label: "Retry", callback: function() {
						$("#pinCode").val("").focus();
					}}]});
				};
				
				self.askForPin(pinOk, pinKo, self.currentPage.replace("#", ""));
				
				return;
			}
			// Hide all pages, scroll to top and show the wanted page
			$('div.page').hide();
			$(this.currentPage).trigger('pagehide');
			window.scrollTo(0, 0);
			$hash.show();
			$hash.css('left','0px');

			// Hide or show the header and the footer
			if ($hash.hasClass('no-header'))
				$('div.header>div').hide();
			else
				$('div.header>div').show();

			if ($hash.hasClass('no-footer')){
				$('#footer').hide();
			} else {
				//if(this.application.connector.homeModel.attr.accountStatus != "Hot Lined")
					$('#footer').show();
			}

			// Fire an event to tell the page is displayed
			$hash.trigger('pageshow',options);
			this.currentPage = hash;
//			console.log('this.currentPage' + this.currentPage);
			
			if(application.tracking.enabled) {
				application.tracking.trackNavigation(hash, $hash.find("h3").text());
			}
			
		},
		_beforePageChange : function(event) {
//			console.log('_beforePageChange');
			var self = this;
			// the current page will go left ASAP
			var vw = $(window).width(), $fromPage = $(this.currentPage), $toPage = $(tabs[event.index]),self=this;
			var sign = (event.direction === 'left') ? -1 : 1;
			$fromPage.css('position','relative');
			$fromPage.animate({
				left : (sign * vw) + 'px'
			}, 250, function() {
				// hide
				$fromPage.trigger('pagehide');
//				$fromPage.hide();
				$('div.page').hide();
				$toPage.css('position','relative');
				$toPage.css('left', (-sign * vw) + 'px');
				$toPage.show();
				$toPage.animate({
					left : '0px'
				}, 250, function() {
					// hide
//					$toPage.trigger('pageshow');
//					self.currentPage = tabs[event.index];
					self.application.gotoPage($toPage.attr('id'));
//					console.log('this.currentPage' + this.currentPage);
				});
			});
			//this.currentPage = tabs[event.index];
//			$toPage.css('left', (-sign * vw) + 'px');
//			$toPage.show();

		},
		_switchRefuelPage : function() {
			$(document).trigger('switchRefuelPage');
		},
		_switchMorePage : function() {
			$(document).trigger('switchMorePage');
		},
		_afterPageChange : function(event) {
			if(event.direction == 'none'){
				var $toPage = $(tabs[event.index])
				this.application.gotoPage($toPage.attr('id'));
			}
//			var $toPage = $(tabs[event.index]);
//			$toPage.show();
//			$toPage.animate({
//				left : '0px'
//			}, 250, function() {
//				// hide
//				$toPage.trigger('pageshow');
//			});
		}
	};
})($, window);
