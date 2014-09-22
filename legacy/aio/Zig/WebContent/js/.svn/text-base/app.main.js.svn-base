function App() {

	var self = this;
	this.navigationHandler = null;
	this.displayVersion = "1.4";
	// versions :
	// first = IOS
	// second = Android
	// third = WP8
	// forth = WP7
	this.versions = [ 30, 30, 30, 30 ];

	this.applink = {
		ios : 'https://itunes.apple.com/us/app/id626392754?mt=8',
		android : 'market://details?id=com.mizmowireless.acctmgt',
		wp : 'http://www.windowsphone.com/s?appid=8c15a1a3-4977-4e3f-a291-21ad2a7ece6f'
	};
	
	// MAP for URLs replacement in plan and addon's descriptions.
	this.planLinks = [
          {url: "http://mytestlink.com", link: "http://myoptionalreplacementurl.com", label: "mylabel"},
          {url: "http://mytestlink.com", link: "http://myoptionalreplacementurl.com", label: "mylabel"}
	];

	// Default value for chat session (manage the chat button)
	this.isChatSessionOpen = false;
	
	// Activate or deactivate the "what's new" screen automatic display
	this.showInformationOverlay = false;

	this.configuration = {
		debug : false,
		debugConsole : false,
		debugKeys : false
	};
		
	this.tracking = {
		enabled: false,
		inactivityDelay: 300000,
		pingInterval: 30000,
		cookieName: "WooAIOMobileApp",
		domain: "test.aiowireless.com",
		trackNavigation: function(pageName, pageTitle) {
			if(pageName && typeof(woopra) != "undefined" && woopra) {
				woopra.track({
			        url: "/MyAIO_APP/"+pageName,
			        title: pageTitle||pageName,
			        mobile_app_platform: (self.model.isIos ? "iOS" : (self.model.isAndroid ? "Android" : "Windows")),
			        mobile_app_version: self.displayVersion,
			        channel: "Mobile app"
			    }); 
			}
		},
		identify: function() {
			if(self.homePage && self.homePage.model && self.homePage.model.attr && typeof(woopra) != "undefined" && woopra) {
				woopra.identify({
					email: "",
					company: "",
					name: self.homePage.model.attr.accountName,
					acct: self.homePage.model.attr.accountId
				});
			}
		},
		config: function() {
			if(typeof(woopra) != "undefined" && woopra) {
				woopra.config({
					domain: self.tracking.domain,
//					cookie_name: self.tracking.cookieName,
//					ping: (self.tracking.pingInterval > 0),
//					ping_interval: self.tracking.pingInterval,
//					idle_timeout: self.tracking.inactivityDelay,
					protocol: "http"
				});
			}
		}
	};
	
	if(this.tracking.enabled) {
		(function(){
			var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="js/lib/woopra.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e);
			})("woopra");
		
		this.tracking.config();
	}

	this.connector = undefined;
	this.formValidator = undefined;
	this.android_le = navigator.userAgent.match(/Android 2/gi);
	this.isWP8 = $.browser.msie && window.innerWidth > 400;
	this.isWP7 = $.browser.msie && !this.isWP8;
	// We have to add the status bar height to $(window).height()
	// to get the real window height in WP7
	this.wp7StatusBarHeight = 32;

	this.aid = undefined;
	this.timeLimitMessage = 120;
	this.timeLimitDisconnect = 180;
	this.chatSessionExpirationDelay = 90;
	this.bufferMessagePopup = null;
	this.cardValidityYearNumber = 15;

	this.model = {
		isIos : false,
		isAndroid : false,
		isWinPhone : false
	},

	this.winPhone = {
		datePicker : undefined
	},

	this.init = function() {
		// Init text with default dictionary
		self.translate(i18n_en);

		// Init connector
		self.connector = new Connector(self.configuration.debug);

		// Init form validator
		self.formValidator = new FormValidator();

		// Init model values
		initModel();
		initPages();

		// Set active css class on touch on links
		$('a:not(.disabled)').bind('touchstart', function() {
			$(this).addClass('link-active');
		});
		$('a').bind('touchend', function() {
			$(this).removeClass('link-active');
		});

		// The user has logged in previously with "remember me"

		if (window.appSecureData.login && window.appSecureData.pwd) {
			self.navigationOptions = {
				login : window.appSecureData.login,
				pwd : window.appSecureData.pwd
			};
			this.connector.sessionModel.set({
				'rememberMe' : true
			}, true);
		}
		self.connector.sessionModel.set({
			'username' : window.appSecureData.login
		});
		
		if(window.appSecureData.fontSize){
			this.setFontSize(window.appSecureData.fontSize,true);
		}

		// Init navigation
		if (this.navigationHandler == null) {
			initNavigation();
		} else {
			this.navigationHandler.initNavigation(this);
		}

		if (!self.model.isWinPhone) {
			// If not winPhone, delete the wonderful RSE datePicker
			$('#datePickerOverlay').remove();
			$('#datePicker').remove();
		} // else {
		// If winPhone, create the wonderful RSE datePicker object
		// self.winPhone.datePicker = new DatePicker();
		// }
		
		/* FIX CATO Navbar bug with fixed positionning.
		 * On iPhone the bar is considered as fixed when voiceover is on, we need to
		 * force refreshes.
		 * Notive that with voiceover there are no scroll/touchmove event on document 
		 */
		if(self.model.isIos){
			(function(){
				var lastOffset = window.pageYOffset;
				var lastPage = self.currentPage;
				var hasMoved = false;
				document.addEventListener("touchmove", function(){hasMoved = true}, false);
				window.setInterval(function(){
					var currentOffset = window.pageYOffset;
					var currentPage = application.currentPage;
					if(currentOffset != lastOffset && !hasMoved && (currentPage === lastPage) ){
						application.log('bar trick');
						$('#footer').css({'position' : 'absolute','top' : ($(window).height() + window.pageYOffset - $('#footer').height()) + 'px', 'bottom':'' });
						window.setTimeout(function(){
							$('#footer').css('position','fixed');
							$('#footer').css('top','');
							$('#footer').css('bottom','0px');
							},70);
					}
					hasMoved = false;
					lastOffset = currentOffset;
					lastPage = currentPage;
				}, 1000);
			})();
		}
		
		
		// Init navbar & keyboard management
		self.initGenericKeyboardListeners();

		// Set up layout
		self.layout();

		// Init debug
		initDebug();
		
	};

	this.layout = function(handler) {
		if(self.isWP7) {
			$("body").css("min-height", "520px");
		}
	};

	this.setNavigationHandler = function(handler) {
		this.navigationHandler = handler;
	};

	var initPages = function() {
		var headerEl = $('#header').remove();
		$('div.page').prepend(headerEl.clone().removeAttr('id').addClass("header"));

		new Pages.EulaPage($('#eulaDisclamerPage'), null, self);

		self.loginPage = new Pages.LoginPage($('#loginPage'), self.connector.sessionModel);
		self.loginPage.setApplication(self);

		self.signUpPage = new Pages.SignUpPage($('#signUpPage'), self.connector.sessionModel);
		self.signUpPage.setApplication(self);

		self.setPwdPage = new Pages.SetPwdPage($('#setPwdPage'), self.connector.sessionModel);
		self.setPwdPage.setApplication(self);

		self.forgotPwdPhonePage = new Pages.ForgotPwdPhonePage($('#forgotPwdPhonePage'), self.connector.sessionModel);
		self.forgotPwdPhonePage.setApplication(self);

		self.forgotPwdQuestionPage = new Pages.ForgotPwdQuestionPage($('#forgotPwdQuestionPage'), self.connector.resetPasswordModel);
		self.forgotPwdQuestionPage.setApplication(self);

		self.resetPwdPage = new Pages.ResetPwdPage($('#resetPwdPage'), self.connector.sessionModel);
		self.resetPwdPage.setApplication(self);

		self.lockedPage = new Pages.LockedPage($('#lockedPage'), self.connector.sessionModel);
		self.lockedPage.setApplication(self);

		self.homePage = new Pages.HomePage($('#homePage'), self.connector.homeModel);
		self.homePage.setApplication(self);

		self.myPlanPage = new Pages.MyPlanPage($('#myPlanPage'), self.connector.myPlanModel);
		self.myPlanPage.setApplication(self);

		self.shopServicesPage = new Pages.ShopServicesPage($('#manageServicesPage'), self.connector.shopServicesModel);
		self.shopServicesPage.setApplication(self);

		self.servicesReviewPage = new Pages.ServicesReviewPage($('#servicesReviewPage'), self.connector.servicesVerificationModel);
		self.servicesReviewPage.setApplication(self);

		self.servicesConfirmationPage = new Pages.ServicesConfirmationPage($('#manageServicesConfirmationPage'), self.connector.servicesConfirmationModel);
		self.servicesConfirmationPage.setApplication(self);

		self.deleteOneServiceConfirmationPage = new Pages.DeleteOneServiceConfirmationPage($('#deleteOneServiceConfirmationPage'), self.connector.servicesConfirmationModel);
		self.deleteOneServiceConfirmationPage.setApplication(self);

		self.payMyBillPage = new Pages.PayMyBillPage($('#payMyBillPage'), self.connector.payMyBillModel);
		self.payMyBillPage.setApplication(self);

		self.billDetailsPage = new Pages.BillDetailsPage($('#billDetailsPage'), self.connector.billDetailsModel);
		self.billDetailsPage.setApplication(self);
		
		self.payMyBillReviewPage = new Pages.PayMyBillReviewPage($('#payMyBillReviewPage'), self.connector.payMyBillReviewModel);
		self.payMyBillReviewPage.setApplication(self);

		self.payMyBillConfirmationPage = new Pages.PayMyBillConfirmationPage($('#payMyBillConfirmationPage'), self.connector.payMyBillConfirmationModel);
		self.payMyBillConfirmationPage.setApplication(self);

		self.pinPage = new Pages.pinPage($('#pinPage'), self.connector.pinPageModel);
		self.pinPage.setApplication(self);
		
		self.transactionsHistoryPage = new Pages.TransactionsHistoryPage($('#transactionsHistoryPage'), self.connector.transactionsHistoryModel);
		self.transactionsHistoryPage.setApplication(self);

		self.manageAutopayReviewPage = new Pages.ManageAutopayReviewPage($('#manageAutopayReviewPage'), self.connector.manageAutopayModel);
		self.manageAutopayReviewPage.setApplication(self);

		self.manageAutopayConfirmationPage = new Pages.ManageAutopayConfirmationPage($('#manageAutopayConfirmationPage'), self.connector.manageAutopayConfirmationModel);
		self.manageAutopayConfirmationPage.setApplication(self);

		self.desactivateAutopayPage = new Pages.DesactivateAutopayPage($('#desactivateAutopayPage'), self.connector.desactivateAutopayModel);
		self.desactivateAutopayPage.setApplication(self);

		self.desactivateAutopayConfirmationPage = new Pages.DesactivateAutopayConfirmationPage($('#desactivateAutopayConfirmationPage'), self.connector.desactivateAutopayModel);
		self.desactivateAutopayConfirmationPage.setApplication(self);

		self.manageAutopayPage = new Pages.ManageAutopayPage($('#manageAutopayPage'), self.connector.manageAutopayModel);
		self.manageAutopayPage.setApplication(self);

		self.usagePage = new Pages.UsagePage($('#usagePage'), self.connector.usageModel);
		self.usagePage.setApplication(self);
		
		self.aboutUsagePage = new Pages.AboutUsagePage($('#aboutUsagePage'),self.connector.aboutUsageModel);
		self.aboutUsagePage.setApplication(self);

		self.changePwdPage = new Pages.ChangePwdPage($('#changePwdPage'), self.connector.sessionModel);
		self.changePwdPage.setApplication(self);

		self.changePwdConfirmationPage = new Pages.ChangePwdConfirmationPage($('#changePwdConfirmationPage'), self.connector.sessionModel);
		self.changePwdConfirmationPage.setApplication(self);

		self.myProfilePage = new Pages.MyProfilePage($('#myProfilePage'), self.connector.myProfileModel);
		self.myProfilePage.setApplication(self);

		self.editProfilePage = new Pages.EditProfilePage($('#editProfilePage'), self.connector.myProfileModel);
		self.editProfilePage.setApplication(self);

		self.servicesPaymentPage = new Pages.ServicesPaymentPage($('#servicesPaymentPage'), self.connector.servicesPaymentModel);
		self.servicesPaymentPage.setApplication(self);

		self.morePage = new Pages.MorePage($('#morePage'), new MVC.Model());
		self.morePage.setApplication(self);

		self.supportChatPage = new Pages.supportChatPage($('#supportChatPage'), self.connector.chatModel);
		self.supportChatPage.setApplication(self);

		self.supportChatOverlayPage = new Pages.supportChatOverlayPage($('#supportChatOverlayPage'), new MVC.Model());
		self.supportChatOverlayPage.setApplication(self);

		self.aboutUsPage = new Pages.AboutUsPage($('#aboutUsPage'), new MVC.Model());
		self.aboutUsPage.setApplication(self);

		self.resetVMPwdPage = new Pages.ResetVMPwdPage($('#resetVoiceMailPwdPage'), new MVC.Model());
		self.resetVMPwdPage.setApplication(self);

		self.resetVMPwdConfirmPage = new Pages.ResetVMPwdConfirmPage($('#resetVoiceMailPwdConfirmationPage'), new MVC.Model());
		self.resetVMPwdConfirmPage.setApplication(self);

		self.aboutDiscount  = new Pages.remotePage($('#aboutDiscountPage'), new MVC.Model(),self,'http://devel.streamezzo.com/vfedronic/p.html','myPlanPage');

		self.onlineSecurityPage = new Pages.onlineSecurityPage($('#onlineSecurityPage'), self.connector.onlineSecurityPageModel);
		self.onlineSecurityPage.setApplication(self);
	};

	this._adjusetIframeSize = function(ifid) {
		var available = $(window).height() - $(ifid).offset().top - $('div.page-bottom-margin').height();
		if (available > 100) {
			$(ifid).css('height', available + 'px');
		}
		;
	};

	/* *********************** */
	/* Chat with Customer Care */
	/* *********************** */
	$('#supportChatPage').bind('pageshow', function() {
		// Set active state on navigatin link and title
		setNavLinkActive('#morePage');

		// Back
		$('#customerCareBackButton').tap(function() {
			self.gotoPage('morePage', {
				fromBack : true
			});
		});

		// Set content in page
		$("#customerCareContent").empty();

		// Adding available soon description
		var item = $('<div/>').addClass('message').text("Customer care chat feature will be soon available.");

		// Adding items
		// var chatFrame = $('<iframe/>').attr('src',
		// 'http://193.43.245.151:48080/files/topic.htm').addClass('chatIFrame');
		// var inputFrame = $('<iframe/>').attr('src',
		// '').addClass('chatInputIFrame');
		// var item =
		// $('<div/>').addClass('iframeContainer').append(chatFrame).append(inputFrame);

		$("#customerCareContent").append(item);
	});

	/* ********************** */
	/* ***** NAVIGATION ***** */
	/* ********************** */
	var initNavigation = function() {

		// Init events for navigation bar

		$('#footer').find('a').tap(function() {
			$('#footer').find('.ui-nav-active').removeClass('ui-nav-active').attr('aria-selected', 'false');
			$(this).addClass('ui-nav-active').attr('aria-selected', 'true');
			self.gotoPage($(this).attr('data-href').replace('#ns-', ''));
		});

		// Init event onhashchange
		$(window).hashchange(function() {
			onHashChange();
		});
		this.currentPage = null;

		// var needRefresh = location.hash === "#ns-loginPage";
		// location.hash = "#ns-loginPage";
		// if(needRefresh)
		$(window).hashchange();
	};

	var setNavLinkActive = this.setNavLinkActive = function(hash) {
		if (self.navigationHandler) {
			self.navigationHandler.setNavLinkActive(hash);
		} else {
			hash = hash.replace('#', '#ns-');
			var $footer = $("#footer");
			$footer.find('.ui-nav-active').removeClass('ui-nav-active').attr('aria-selected', 'false');
			$footer.find('a[data-href="' + hash + '"]').addClass('ui-nav-active').attr('aria-selected', 'true');
		}
	};

	self.gotoPage = function(pageHash, options) {
		self.navigationOptions = options;
		// document.location.href = "#ns-"+ pageHash;
		if (this.navigationHandler) {
			this.navigationHandler.onHashChange(pageHash, options);
		} else {
			onHashChange(pageHash, options);
		}
	};

	var animTimeOut = -1;
	var onHashChange = function(hash, options) {
		options = options || self.navigationOptions || {};
		
		if(options && options.fromPage == undefined && self.currentPage) {
			options.fromPage = self.currentPage.replace("#", "");
		}
		if (!hash) {
			hash = location.hash == "" ? "#loginPage" : location.hash.replace('ns-', '');
		} else {
			hash = '#' + hash;
		}
		self.log("Hash : " + hash);
		
		var token = self.connector.sessionModel.get('token');

		if (token == "") {
			if (hash != '#signUpPage' && hash != '#forgotPwdPhonePage' && hash != '#forgotPwdQuestionPage' && hash != '#resetPwdPage' && hash != '#setPwdPage' & hash != '#lockedPage')
				hash = "#loginPage";
		}
		if (self.connector.homeModel.get('accountStatus') == "Hot Lined") {
			if (hash != '#homePage' && hash != '#payMyBillPage' && hash != '#payMyBillReviewPage' && hash != '#payMyBillConfirmationPage' && hash != '#payMyBillTandCPage')
				hash = "#homePage";
		}
		
		// if first launch show disclaimer
		var isEulaAccepted = (window.appSecureData.eula == "true");
		if (!isEulaAccepted) {
			hash = "#eulaDisclamerPage";
		}
		if (self.currentPage === hash) {
			// nothing to do ?
			return;
		}

		var $hash = $(hash); 
		
		// Check PIN authentication
		if($hash.hasClass('pin-auth') && self.connector.sessionModel.get("PINSecurityOn") && !self.connector.sessionModel.get("isPinChecked")) {
			var pinOk = function() {
				self.gotoPage($hash.attr("id"), options);
			};
			
			var pinKo = function(json) {
				if(json && json.messages && json.messages[0] && json.messages[0].error == "8000") {
					$("#pinCode").val("").focus();
				}
			};
			
			self.askForPin(pinOk, pinKo, self.currentPage.replace("#", ""));
			
			return;
		}

		self.blurActiveElement();
		$("input").blur();

		// Hide all pages, scroll to top and show the wanted page
		$('div.page').hide().attr("aria-hidden", "true");
		$(self.currentPage).trigger('pagehide');
		var toHide = self.currentPage;
		if (self.currentPage) {
			$(self.currentPage).show().attr("aria-hidden", "false");

			$(toHide).css("-webkit-transition", "opacity 190ms");
			$(toHide).css("opacity", "0");
		}
		
		if (self.currentPage) {
			// $(hash).css('top', $(window).height() + $(window).scrollTop());
			$hash.css({
				position: 'absolute',
				top: '0px',
				visibility: 'hidden'
			}).attr("aria-hidden", "true");
		}
		$hash.show().attr("aria-hidden", "false");
		window.clearTimeout(animTimeOut);
		animTimeOut = window.setTimeout(function() {
			$(toHide).hide().attr("aria-hidden", "true");
			window.scrollTo(0, 0);
			
			$hash.css({
				opacity: 1,
				position: 'relative',
				top: '0px',
				visibility: 'visible'
			}).attr("aria-hidden", "false");
			
			$('div.header').css('visibility', 'visible').attr("aria-hidden", "false");
			$("div.page").attr("aria-hidden", "true");
			$hash.attr("aria-hidden", "false");
		}, 210);

		// Hide or show the header and the footer
		if ($hash.hasClass('no-header'))
			$('div.header>div').hide().attr("aria-hidden", "true");
		else
			$('div.header>div').show().attr("aria-hidden", "false");

		if ($hash.hasClass('no-footer')) {
			$('#footer').hide().attr("aria-hidden", "true");
			$('#bottomShadow').show().attr("aria-hidden", "false");
		} else {
			$('#footer').show().attr("aria-hidden", "false");
			$('#bottomShadow').hide().attr("aria-hidden", "true");
		}

		// Fire an event to tell the page is displayed
		$hash.trigger('pageshow', options);

		self.currentPage = hash;
		self.navigationOptions = null;
		
		// tracking
		if(self.tracking.enabled) {
			self.tracking.trackNavigation(hash, $hash.find("h3").text());
		}
	};

	self.handleBack = function() {

		if (this.navigationHandler) {
			this.navigationHandler.handleBack();
		} else {
			if (zAlerts.isActivePopup()) {
				// prevent key
				return;
			}

			// See if any page is listening to back.
			var bevent = $.Event('zbackkey');
			if (self.currentPage) {
				$(self.currentPage).trigger(bevent);
			}
			if (!bevent.isDefaultPrevented()) {
			}
		}

	};

	/* ************************* */
	/* ***** LOCAL STORAGE ***** */
	/* ************************* */
	this.saveCredentials = function(login, pwd) {
		if (window.appSecureData) {
			window.appSecureData.login = login;
			window.appSecureData.pwd = pwd;
			window.saveSecureData();
			if (login && pwd) {
				this.connector.sessionModel.set({
					'rememberMe' : true
				}, true);
			} else {
				this.connector.sessionModel.set({
					'rememberMe' : false
				}, true);
			}
		} else {
			self.log("[WARNING] Local storage not supported");
		}
	};

	/* **************** */
	/* ***** I18N ***** */
	/* **************** */
	/* Translate texts in application */
	this.translate = function(dictionnary, $root) {
		var callback4Content, callback4Attributes;
		
		self.log("Initialize dictionnaries");
		
//		self.translate2(dictionnary);

		$.i18n.setDictionary(dictionnary);

		// Moment.js internationalization
		moment.lang('en', {
			relativeTime : {
				future : $.i18n._('MOMENTJS_FUTURE'),
				past : $.i18n._('MOMENTJS_PAST'),
				s : $.i18n._('MOMENTJS_s'),
				ss : $.i18n._('MOMENTJS_ss'),
				m : $.i18n._('MOMENTJS_m'),
				mm : $.i18n._('MOMENTJS_mm'),
				h : $.i18n._('MOMENTJS_h'),
				hh : $.i18n._('MOMENTJS_hh'),
				d : $.i18n._('MOMENTJS_d'),
				dd : $.i18n._('MOMENTJS_dd'),
				M : $.i18n._('MOMENTJS_M'),
				MM : $.i18n._('MOMENTJS_MM'),
				y : $.i18n._('MOMENTJS_y'),
				yy : $.i18n._('MOMENTJS_yy')
			}
		});
		
		callback4Content = function($elements, attrName) {
			var i, $elt;
			
			for(i = 0; i < $elements.length; i++) {
				$elt = $($elements[i]);
				
				$elt.html($.i18n._($elt.attr(attrName)));
			}
		};
		
		callback4Attributes = function($elements, srcAttrName, tgtAttrName) {
			var i, $elt;
			
			for(i = 0; i < $elements.length; i++) {
				$elt = $($elements[i]);
				$elt.attr(tgtAttrName, $.i18n._($elt.attr(srcAttrName)));
			}
		};
		
		$root = $root || $("body");
		
		callback4Content($root.find("*[data-i18n]"), "data-i18n");
		callback4Attributes($root.find("*[data-i18n-alt]"), "data-i18n-alt", "alt");
		callback4Attributes($root.find("*[data-i18n-placeholder]"), "data-i18n-placeholder", "placeholder");
		callback4Attributes($root.find("*[data-i18n-title]"), "data-i18n-title", "title");
	};
	
	/* Replace text placeholders in dictionnaries */
	this.replaceTextPlaceholder = function(textLabel, placeholder, value) {
		i18n_en[textLabel] = i18n_en[textLabel].replace(placeholder, value);
		// i18n_es[textLabel] = i18n_es[textLabel].replace(placeholder, value);
	};

	/* Translate texts in application */
	this.translate2 = function(dictionnary) {
		self.log("Initialize dictionnaries");

		$.i18n.setDictionary(dictionnary);

		/* Moment.js internationalization */
		moment.lang('en', {
			relativeTime : {
				future : $.i18n._('MOMENTJS_FUTURE'),
				past : $.i18n._('MOMENTJS_PAST'),
				s : $.i18n._('MOMENTJS_s'),
				ss : $.i18n._('MOMENTJS_ss'),
				m : $.i18n._('MOMENTJS_m'),
				mm : $.i18n._('MOMENTJS_mm'),
				h : $.i18n._('MOMENTJS_h'),
				hh : $.i18n._('MOMENTJS_hh'),
				d : $.i18n._('MOMENTJS_d'),
				dd : $.i18n._('MOMENTJS_dd'),
				M : $.i18n._('MOMENTJS_M'),
				MM : $.i18n._('MOMENTJS_MM'),
				y : $.i18n._('MOMENTJS_y'),
				yy : $.i18n._('MOMENTJS_yy')
			}
		});

		/* Login page */
//		$('#i18n_loginUsernameLabel').text($.i18n._('LOGIN_USERNAME_LABEL'));
//		$('#i18n_loginUsername').attr('placeholder', $.i18n._('LOGIN_USERNAME_INPUT'));
//		$('#i18n_loginPwdLabel').text($.i18n._('LOGIN_PWD_LABEL'));
//		$('#i18n_loginPwd').attr('placeholder', $.i18n._('LOGIN_PWD_INPUT'));
//		$('#i18n_loginRememberMeLabel').text($.i18n._('LOGIN_REMEMBER_ME_LABEL'));
//		$('#i18n_loginBtn').text($.i18n._('LOGIN_BTN'));
//		$('#i18n_loginForgotPwdBtn').text($.i18n._('LOGIN_FORGOT_PWD_BTN'));
//		$('#i18n_loginSignUpNewTo').text($.i18n._('LOGIN_SIGN_UP_NEW_TO'));
//		$('#i18n_loginSignUpMessage').text($.i18n._('LOGIN_SIGN_UP_MESSAGE'));
//		$('#i18n_loginSignUpBtn').text($.i18n._('LOGIN_SIGN_UP_BTN'));

		/* Signup page */
//		$('#i18n_signUpText').text($.i18n._('SIGN_UP_TEXT'));
//		$('#i18n_signupUsernameLabel').text($.i18n._('SIGN_UP_USERNAME_LABEL'));
//		$('#i18n_signupUsername').attr('placeholder', $.i18n._('SIGN_UP_USERNAME_INPUT'));
//		$('#i18n_signupPhoneNumberLabel').text($.i18n._('SIGN_UP_PHONE_LABEL'));
//		$('#i18n_signupPhoneNumber').attr('placeholder', $.i18n._('SIGN_UP_PHONE_INPUT'));
//		$('#i18n_signUpCancelBtn').text($.i18n._('SIGN_UP_CANCEL_BTN'));
//		$('#i18n_signUpBtn').text($.i18n._('SIGN_UP_BTN'));

		/* Set password page */
//		$('#i18n_setPasswordText').html($.i18n._('SET_PWD_TEXT'));
//		$('#i18n_setPasswordTmpPwdLabel').text($.i18n._('SET_PWD_TMP_PWD_LABEL'));
//		$('#i18n_setPasswordTmpPwd').attr('placeholder', $.i18n._('SET_PWD_TMP_PWD_INPUT'));
//		$('#i18n_setPasswordPwdLabel').text($.i18n._('SET_PWD_PWD_LABEL'));
//		$('#i18n_setPasswordPwd').attr('placeholder', $.i18n._('SET_PWD_PWD_INPUT'));
//		$('#i18n_setPasswordRePwdLabel').text($.i18n._('SET_PWD_REPWD_LABEL'));
//		$('#i18n_setPasswordRePwd').attr('placeholder', $.i18n._('SET_PWD_REPWD_INPUT'));
//		$('#i18n_setPasswordCancelBtn').text($.i18n._('SET_PWD_CANCEL_BTN'));
//		$('#i18n_setPasswordBtn').text($.i18n._('SET_PWD_BTN'));

		/* Forgot password "phone" page */
//		$('#i18n_forgotPasswordPhoneText').html($.i18n._('FORGOT_PWD_PHONE_TEXT'));
//		$('#i18n_forgotPasswordPhoneLabel').text($.i18n._('FORGOT_PWD_PHONE_LABEL'));
//		$('#i18n_forgotPasswordPhone').attr('placeholder', $.i18n._('FORGOT_PWD_PHONE_INPUT'));
//		$('#i18n_forgotPasswordPhoneCancelBtn').text($.i18n._('FORGOT_PWD_PHONE_CANCEL_BTN'));
//		$('#i18n_forgotPasswordPhoneBtn').text($.i18n._('FORGOT_PWD_PHONE_BTN'));

		/* Forgot password "question" page */
//		$('#i18n_forgotPasswordQuestionText').html($.i18n._('FORGOT_PWD_QUESTION_TEXT'));
//		$('#i18n_forgotPasswordQuestionPhoneLabel').text($.i18n._('FORGOT_PWD_QUESTION_PHONE_LABEL'));
//		$('#i18n_forgotPasswordQuestionLabel').text($.i18n._('FORGOT_PWD_QUESTION_LABEL'));
//		$('#i18n_forgotPasswordQuestionAnswerLabel').text($.i18n._('FORGOT_PWD_QUESTION_ANSWER_LABEL'));
//		$('#i18n_forgotPasswordQuestionAnswer').attr('placeholder', $.i18n._('FORGOT_PWD_QUESTION_ANSWER_INPUT'));
//		$('#i18n_forgotPasswordQuestionCancelBtn').text($.i18n._('FORGOT_PWD_QUESTION_CANCEL_BTN'));
//		$('#i18n_forgotPasswordQuestionBtn').text($.i18n._('FORGOT_PWD_QUESTION_BTN'));

		/* Reset password page */
//		$('#i18n_resetPasswordText').html($.i18n._('RESET_PWD_TEXT'));
//		$('#i18n_resetPasswordTmpPwdLabel').text($.i18n._('RESET_PWD_TMP_PWD_LABEL'));
//		$('#i18n_resetPasswordTmpPwd').attr('placeholder', $.i18n._('RESET_PWD_TMP_PWD_INPUT'));
//		$('#i18n_resetPasswordPwdLabel').text($.i18n._('RESET_PWD_PWD_LABEL'));
//		$('#i18n_resetPasswordPwd').attr('placeholder', $.i18n._('RESET_PWD_PWD_INPUT'));
//		$('#i18n_resetPasswordRePwdLabel').text($.i18n._('RESET_PWD_REPWD_LABEL'));
//		$('#i18n_resetPasswordRePwd').attr('placeholder', $.i18n._('RESET_PWD_REPWD_INPUT'));
//		$('#i18n_resetPasswordCancelBtn').text($.i18n._('RESET_PWD_CANCEL_BTN'));
//		$('#i18n_resetPasswordBtn').text($.i18n._('RESET_PWD_BTN'));

		/* Locked page */
//		$('#i18n_lockedText').html($.i18n._('LOCKED_TEXT'));
//		$('#i18n_lockedCcpNumberLabel').text($.i18n._('LOCKED_CCP_NUMBER_LABEL'));
//		$('#i18n_lockedCcpNumber').attr('placeholder', $.i18n._('LOCKED_CCP_NUMBER_INPUT'));
//		$('#i18n_lockedPwdLabel').text($.i18n._('LOCKED_PWD_LABEL'));
//		$('#i18n_lockedPwd').attr('placeholder', $.i18n._('LOCKED_PWD_INPUT'));
//		$('#i18n_lockedRePwdLabel').text($.i18n._('LOCKED_REPWD_LABEL'));
//		$('#i18n_lockedRePwd').attr('placeholder', $.i18n._('LOCKED_REPWD_INPUT'));
//		$('#i18n_lockedBtn').text($.i18n._('LOCKED_BTN'));

		/* Header */
//		$('span.i18n_headerAccount').text($.i18n._('HEADER_ACCOUNT'));
//		$('span.i18n_headerPhone').text($.i18n._('HEADER_PHONE'));

		/* Navigation */
//		$('#i18n_navigationHomeLink').text($.i18n._('NAVIGATION_HOME_LINK'));
//		$('#i18n_navigationUsagesLink').text($.i18n._('NAVIGATION_USAGES_LINK'));
//		$('#i18n_navigationMyBillsLink').text($.i18n._('NAVIGATION_MY_BILLS_LINK'));
//		$('#i18n_navigationMyPlanLink').text($.i18n._('NAVIGATION_MY_PLAN_LINK'));
//		$('#i18n_navigationMoreLink').text($.i18n._('NAVIGATION_MORE_LINK'));

		/* Home */
//		$('#i18n_homeLogOutButton').text($.i18n._('HOME_LOGOUT'));
//		$('#i18n_homeNeedHelpButton').text($.i18n._('HOME_NEED_HELP'));
//		$('#i18n_refuelText').text($.i18n._('HOME_MISS_OUT'));
//		$('#i18n_myCreditText').text($.i18n._('HOME_MY_CREDIT'));
//		$('#i18n_iOweText').text($.i18n._('HOME_I_OWE'));
//		$('#i18n_homeRefuelButton').text($.i18n._('HOME_REFUEL_BUTTON'));
//		$('#i18n_billDetails').text($.i18n._('HOME_BILL_BUTTON'));
		// Following texts set in connector.getHomeAutoPay
//		$('#i18n_homeWhyNot').html($.i18n._('HOME_TRY_AUTO_PAY'));
//		$('#i18n_autoPayLearnMore').html($.i18n._('HOME_LEARN_MORE'));
//		$('#i18n_homeSetupAutoPayButton').text($.i18n._('HOME_SETUP_AUTO_PAY'));

		/* Usage page */
//		$('#i18n_usagePageTitle').text($.i18n._('USAGE_TITLE_PAGE'));
		$('#i18n_usageDataTitle').text($.i18n._('USAGE_DATA_TITLE'));
		$('#i18n_usageDataDetail').text($.i18n._('USAGE_DATA_DETAILS'));
		$('#i18n_usageDetailsButton').text($.i18n._('USAGE_DETAILS_BUTTON'));
//		$('#usageSelectorInfo').text($.i18n._('USAGE_MULTILINE_DESCRIPTION'));

		/* Usage details page */
		$('#i18n_usageDetailsTitle').text($.i18n._('USAGE_DETAILS_TITLE'));
//		$('#i18n_usageDetailsSelectLabel').text($.i18n._('USAGE_DETAILS_SELECT_LABEL'));

		/* Pay my bill page */
//		$('#i18n_payMyBillDetailsLink').attr('placeholder', $.i18n._('PAY_MY_BILL_DETAILS'));
//		$('#i18n_payMyBillCardTypeLabel').text($.i18n._('PAY_MY_BILL_CARD_TYPE_LABEL'));		
//		$('#i18n_payMyBillCredit').text($.i18n._('PAY_MY_BILL_CREDIT') + ":");
//		$('#i18n_payMyBillOwe').text($.i18n._('MY_BILL_OWE') + ":");
//		$('#i18n_payMyBillAmountLabel').text($.i18n._('PAY_MY_BILL_AMOUNT_LABEL'));
//		$('#i18n_payMyBillAmountInput').attr('placeholder', $.i18n._('PAY_MY_BILL_AMOUNT_PLACEHOLDER'));
//		$('#i18n_payMyBillCardTypeLabel').text($.i18n._('PAY_MY_BILL_CARD_TYPE_LABEL'));
//		$('#i18n_payMyBillCardNumberLabel').text($.i18n._('PAY_MY_BILL_CARD_NUMBER_LABEL'));
//		$('#i18n_payMyBillCardNumberInput').attr('placeholder', $.i18n._('PAY_MY_BILL_CARD_NUMBER_PLACEHOLDER'));
//		$('#i18n_payMyBillExpirationDateLabel').text($.i18n._('PAY_MY_BILL_EXPIRATION_DATE_LABEL'));
//		$('#i18n_payMyBillExpirationDateInput').attr('placeholder', $.i18n._('PAY_MY_BILL_EXPIRATION_DATE_PLACEHOLDER'));
//		$('#i18n_payMyBillNameLabel').text($.i18n._('PAY_MY_BILL_NAME_LABEL'));
//		$('#i18n_payMyBillNameInput').attr('placeholder', $.i18n._('PAY_MY_BILL_NAME_PLACEHOLDER'));
//		$('#i18n_payMyBillSecurityCodeLabel').text($.i18n._('PAY_MY_BILL_SECURITY_CODE_LABEL'));
//		$('#i18n_payMyBillSecurityCodeInput').attr('placeholder', $.i18n._('PAY_MY_BILL_SECURITY_CODE_PLACEHOLDER'));
//		$('#i18n_payMyBillPostalCodeLabel').text($.i18n._('PAY_MY_BILL_POSTAL_CODE_LABEL'));
//		$('#i18n_payMyBillPostalCodeInput').attr('placeholder', $.i18n._('PAY_MY_BILL_POSTAL_CODE_PLACEHOLDER'));
//		$('#i18n_payMyBillPinLabel').text($.i18n._('PAY_MY_BILL_PIN_PLACEHOLDER'));
//		$('#i18n_payMyBillPinInput').attr('placeholder', $.i18n._('PAY_MY_BILL_PIN_PLACEHOLDER'));
//		$('#i18n_payMyBillAutoPayInput').text($.i18n._('PAY_MY_BILL_AUTOPAY_LABEL'));
//		$('#i18n_payMyBillPayNowButton').text($.i18n._('PAY_MY_BILL_PAY_NOW_BUTTON'));
//		$('#i18n_payMyBillTermsCondition_1').text($.i18n._('PAY_MY_BILL_CONFIRM_TERMS'));
//		$('#i18n_payMyBillTermsCondition_2').text($.i18n._('PAY_MY_BILL_TERMS_CONDITIONS'));
//		$('#i18n_payMyBillTransactionHistoryButton').html($.i18n._('MY_BILL_TRANSACTION_HISTORY_BUTTON') + ' <span aria-hidden="true">&gt;</span>');

		/* Pay my bill review page */
//		$('#i18n_payMyBillReviewCredit').text($.i18n._('PAY_MY_BILL_CREDIT') + ":");
//		$('#i18n_payMyBillReviewOwe').text($.i18n._('MY_BILL_OWE') + ":");
//		$('#i18n_payMyBillReviewAmountLabel').text($.i18n._('PAY_MY_BILL_AMOUNT_LABEL'));
//		$('#i18n_payMyBillReviewAmount').text($.i18n._('PAY_MY_BILL_REVIEW_AMOUNT'));
//		$('#i18n_payMyBillReviewName').text($.i18n._('PAY_MY_BILL_REVIEW_NAME'));
//		$('#i18n_payMyBillReviewCardNumber').text($.i18n._('PAY_MY_BILL_REVIEW_CARD_NUMBER'));
//		$('#i18n_payMyBillReviewExpirationDate').text($.i18n._('PAY_MY_BILL_REVIEW_EXPIRATION_DATE'));
//		$('#i18n_payMyBillReviewButton').text($.i18n._('PAY_MY_BILL_REVIEW_BUTTON'));
//		$('#i18n_payMyBillReviewCancelButton').text($.i18n._('PAY_MY_BILL_REVIEW_CANCEL_BUTTON'));

		/* Pay my bill confirmation page */
//		$('#i18n_payMyBillConfirmationPaymentText').text($.i18n._('PAY_MY_BILL_CONFIRMATION_PAYMENT_TEXT'));
//		$('#i18n_payMyBillConfirmationCode').text($.i18n._('PAY_MY_BILL_CONFIRMATION_CODE'));
//		$('#i18n_payMyBillConfirmationAmount').text($.i18n._('PAY_MY_BILL_CONFIRMATION_AMOUNT'));
//		$('#i18n_payMyBillConfirmationBalance').text($.i18n._('PAY_MY_BILL_CONFIRMATION_BALANCE'));
//		$('#i18n_payMyBillConfirmationName').text($.i18n._('PAY_MY_BILL_CONFIRMATION_NAME'));
//		$('#i18n_payMyBillConfirmationCardNumber').text($.i18n._('PAY_MY_BILL_CONFIRMATION_CARD_NUMBER'));
//		$('#i18n_payMyBillConfirmationExpirationDate').text($.i18n._('PAY_MY_BILL_CONFIRMATION_EXPIRATION_DATE'));
//		$('#i18n_payMyBillConfirmationQuestionText').text($.i18n._('PAY_MY_BILL_CONFIRMATION_QUESTION_TEXT'));
//		$('#i18n_payMyBillConfirmationButton').text($.i18n._('PAY_MY_BILL_CONFIRMATION_BUTTON'));
//		$('#i18n_manageAutopayMultilineDesc').text($.i18n._('MANAGE_AUTOPAY_PAY_MULTILINE_DESCRIPTION'));

		/* Manage autopay review page */
//		$('#i18n_manageAutopayReviewText').text($.i18n._('MANAGE_AUTOPAY_REVIEW_TEXT'));
//		$('#i18n_manageAutopayReviewName').text($.i18n._('MANAGE_AUTOPAY_REVIEW_NAME'));
//		$('#i18n_manageAutopayReviewCardNumber').text($.i18n._('MANAGE_AUTOPAY_REVIEW_CARD_NUMBER'));
//		$('#i18n_manageAutopayReviewExpirationDate').text($.i18n._('MANAGE_AUTOPAY_REVIEW_EXPIRATION_DATE'));
//		$('#i18n_manageAutopayReviewButton').text($.i18n._('MANAGE_AUTOPAY_REVIEW_BUTTON'));

		/* Manage autopay confirmation page */
//		$('#i18n_manageAutopayConfirmationText').text($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_TEXT'));
//		$('#i18n_manageAutopayConfirmationName').text($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_NAME'));
//		$('#i18n_manageAutopayConfirmationCardNumber').text($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_CARD_NUMBER'));
//		$('#i18n_manageAutopayConfirmationExpirationDate').text($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_EXPIRATION_DATE'));
//		$('#i18n_manageAutopayConfirmationButton').text($.i18n._('MANAGE_AUTOPAY_CONFIRMATION_BUTTON'));

		/* My plan */
		$('#i18n_myPlanOneTimeAddon').text($.i18n._('MY_PLAN_ONE_TIME_ADDON'));
		$('#i18n_myPlanRecurringAddon').text($.i18n._('MY_PLAN_RECURRING_ADDON'));
//		$('#i18n_myPlanButton').text($.i18n._('MY_PLAN_BUTTON'));

		/* Manage services */
		$('#i18n_manageServicesOneTimeAddon').text($.i18n._('MANAGE_SERVICES_ONE_TIME_ADDON'));
		$('#i18n_manageServicesRecurringAddon').text($.i18n._('MANAGE_SERVICES_RECURRING_ADDON'));
//		$('#i18n_manageServicesButton').text($.i18n._('MANAGE_SERVICES_BUTTON'));
//		$('#i18n_manageServicesClearButton').text($.i18n._('MANAGE_SERVICES_CLEAR_BUTTON'));
//		$('#i18n_manageSummaryText').text($.i18n._('MANAGE_SERVICES_SUMMARY_TEXT'));

		/* Review services */
//		$('#i18n_servicesReviewCancelBtn').text($.i18n._('REVIEW_CANCEL_BUTTON'));
//		$('#i18n_servicesReviewBtn').text($.i18n._('REVIEW_PAY_NOW_BUTTON'));

		
		/* Services confirmation page */
//		$('#i18n_serviceConfirmationConfirmationCode').text($.i18n._('CONFIRM_CONFIRMATION_CODE')); 
//		$('#i18n_serviceConfirmationPaymentReceiced').text($.i18n._('CONFIRM_SERVICE_CARD_CHARGED'));  
//		$('#i18n_serviceConfirmationCreditUsed').text($.i18n._('CONFIRM_SERVICE_CREDIT_USED'));   

		/* More Page */
//		$('#i18n_resetVmPwLink').html($.i18n._('RESET_VOICEMAIL_PASSWORD'));
//		$('#i18n_changeProfPwLink').html($.i18n._('CHANGE_PROFILE_PASSWORD'));
//		$('#i18n_aboutUsLink').html($.i18n._('ABOUT_US'));

		/* Profile Page */
		$('#i18n_profilePageTitle').text($.i18n._('PROFILE_PAGE_TITLE'));
//		$('#i18n_accountTableTitle').text($.i18n._('PROFILE_PAGE_ACCOUNT_TABLE_TITLE'));
//		$('#i18n_contactTableTitle').text($.i18n._('PROFILE_PAGE_CONTACT_TABLE_TITLE'));

		/* Change Password Page */
//		$('#i18n_changePasswordText').html($.i18n._('CHANGE_PWD_TEXT'));
//		$('#i18n_changePasswordCurrentPwdLabel').text($.i18n._('CHANGE_PWD_TMP_PWD_LABEL'));
//		$('#i18n_changePasswordCurrentPwd').attr('placeholder', $.i18n._('CHANGE_PWD_TMP_PWD_INPUT'));
//		$('#i18n_changePasswordPwdLabel').text($.i18n._('CHANGE_PWD_PWD_LABEL'));
//		$('#i18n_changePasswordPwd').attr('placeholder', $.i18n._('CHANGE_PWD_PWD_INPUT'));
//		$('#i18n_changePasswordRePwdLabel').text($.i18n._('CHANGE_PWD_REPWD_LABEL'));
//		$('#i18n_changePasswordRePwd').attr('placeholder', $.i18n._('CHANGE_PWD_REPWD_INPUT'));
//		$('#i18n_changePasswordCancelBtn').text($.i18n._('CHANGE_PWD_CANCEL_BTN'));
//		$('#i18n_changePasswordBtn').text($.i18n._('CHANGE_PWD_BTN'));
	};
	
	
	/* ***************** */
	/* ***** UTILS ***** */
	/* ***************** */
	this.askForPin = function(successCb, errorCb, fromPage) {
		window.setTimeout(function() {
			self.gotoPage("pinPage", {pinSuccessCb: successCb, pinErrorCb: errorCb, fromPage: fromPage});
		}, 0);
	};
	
	this.isCurrentAccountMultiLine = function() {
		return (this.connector.homeModel.attr.subscribers.length > 1);
	};
	
	this.getCurrentLine = function() {
		var i = 0, currentLine = null, ctn = this.connector.sessionModel.get("currentLine");
		
		for(i; i < this.connector.homeModel.attr.subscribers.length; i++) {
			if(this.connector.homeModel.attr.subscribers[i].ctn == ctn) {
				currentLine = this.connector.homeModel.attr.subscribers[i];
				break;
			}
		}
		
		return currentLine;
	};
	
	this.showDropdown = function(element) {
	    var event;
	    event = document.createEvent('MouseEvents');
	    event.initMouseEvent('mousedown', true, true, window);
	    element.dispatchEvent(event);
	};
	
	this.setupLabelledDropdown = function(selector) {
		var i = 0, $elt, $cForm = selector.closest("form"), currentText;
		
		for(i = 0; i < selector.length; i++) {
			$elt = $(selector[i]);
			currentText = $elt.children("option:eq("+$elt[0].selectedIndex+")").text();
			$elt.before('<span class="select-label'+($elt.attr("class") ? " "+$elt.attr("class") : "")+'" role="combobox" aria-required="'+($elt.attr("aria-required") == "true" ? " true" : "false")+'" aria-label="'+currentText+'">'+currentText+'</span>');
		}
		
		selector.attr("aria-hidden", "true");
		
		selector.change(function() {
			var $that = $(this), $label = $that.prev('.select-label'), selectedOptionText = $that.children("option:eq("+$that[0].selectedIndex+")").text();
			$label.text(selectedOptionText);
			if(self.model.isAndroid) {
				$label.attr("aria-label", selectedOptionText)
			}
			if($that.val()) {
				$label.removeClass("notValued");
			}
			else {
				$label.addClass("notValued");
			}
		});
		selector.hide();

		/*selector.focus(function() {
			var $form = $(this).closest("form");
			if($form.data("focusTimeout")) {
				window.clearTimeout($form.data("focusTimeout"));
				$form.data("focusTimeout", null);
			}
		});*/

		selector.prev('.select-label').tap(function() {
			var $that = $(this), $form = $that.closest("form"), $select = $that.next("select");
			/*if($form.data("focusTimeout")) {
				window.clearTimeout($form.data("focusTimeout"));
				$form.data("focusTimeout", null);
			}*/
			$select.show();
//			if(self.model.isAndroid) {
				window.setTimeout(function() {
					self.showDropdown($select[0]);
				}, 50);
//			}
//			else {
//				$select.focus();
//			} 
		});

		$cForm.find("input, textarea" + (self.model.isAndroid ? "" : ", select")).focus(function() {
			var $that = $(this), $form = $that.closest("form");

			/*if($form.data("focusTimeout")) {
				window.clearTimeout($form.data("focusTimeout"));
				$form.data("focusTimeout", null);
			}*/
			$form.find("select").show();
		});
		
		$cForm.find("input, textarea" + (self.model.isAndroid ? "" : ", select")).blur(function() {
			var $that = $(this), $form = $that.closest("form");

			/*if($form.data("focusTimeout")) {
				window.clearTimeout($form.data("focusTimeout"));
				$form.data("focusTimeout", null);
			}
			$form.data("focusTimeout", window.setTimeout(function() {
				$form.find("select").hide();
				$form.data("focusTimeout", null);
			}, 0));*/
			$form.find("select").hide();
		});
	};
	
	this.displayPhoneNumber = function(number) {
		// in case of small number or string
		if (number.length < 10 || !(/^\d+$/.test(number)))
			return number;

		var offset = number.length - 10;
		var pre = number.substring(0, offset);
		var first = number.substring(offset, offset + 3);
		var second = number.substring(offset + 3, offset + 6);
		var third = number.substring(offset + 6, offset + 10);

		if (pre != "")
			pre = pre + "-";
		if(offset === 0){
			return "(" + first + ") " + second + "-" + third;
		}
		return pre + "(" + first + ") " + second + "-" + third; //pre + first + "-" + second + "-" + third;
	};
	this.displayPrice = function(value) {
		value = parseFloat(value);
		if (value < 0) {
			value = "-$" + Math.abs(value.toFixed(2)).toString();
		} else {
			value = "$" + value.toFixed(2).toString();
		}
		return value;
	};
	this.displaySecurityCodeHelper = function(cardType) {
		$("#alertWrapper").attr("aria-hidden", "false").append('<div id="securityCode"><div class="overlay" style="height: ' + $(document).height() + 'px;"></div><div class="card ' + ((cardType === "AE") ? "amex" : "visa") + '" role="button" aria-label="' + ((cardType === "AE") ? "Security code is the 4 numbers on the front of the card." : "Security code is the 3 numbers on the back of the card.") + ' Tap to close this message."></div></div>');
		$('#securityCode .card').tap(function() {
			console.log("test");
			self.hideSecurityCodeHelper();
		});
		$(self.currentPage).attr("aria-hidden", "true");
		$("#footer").attr("aria-hidden", "true");
	};
	this.hideSecurityCodeHelper = function() {
		$('#securityCode').remove();
		
		var $alertWrapper = $("#alertWrapper");
		if($alertWrapper.is(":empty")) {
			$alertWrapper.attr("aria-hidden", "true");
			$(self.currentPage).attr("aria-hidden", "false");
			$("#footer").attr("aria-hidden", "false");
		}
		else {
			$alertWrapper.attr("aria-hidden", "false");
		}
	};

	var maskCCNumber = this.maskCCNumber = function(creditCardNumber) {
		if (creditCardNumber.indexOf("*") != -1) {
			return creditCardNumber;
		}
		creditCardNumber = creditCardNumber.replace(/[^\d.]/g, "");

		var nbVisible = 4;
		var length = creditCardNumber.length;
		var endNumber = creditCardNumber.substring(length - nbVisible, length);
		var maskedCCNumber = "";

		for ( var i = 0; i < length - nbVisible; i++) {
			maskedCCNumber += "*";
			// if((i+1)%4 == 0)
			// maskedCCNumber += " ";
		}

		return maskedCCNumber + endNumber;
	};
	var maskCCNumberForInput = this.maskCCNumberForInput = function(creditCardNumber) {
		return creditCardNumber.replace(/[^(\d- )]/g, "*");
	};

	var validatePwdChange = this.validatePwdChange = function(tmpPassword, newPassword, renewPassword, screenName) {
		if (newPassword != renewPassword) {
			application.showMsg("Passwords do not match!", "error");
			application.log("[ERROR] " + screenName + ": Passwords do not match");

		} else if (tmpPassword == newPassword) {
			application.showMsg("You cannot use your temporary password as new password!", "error");
			application.log("[ERROR] " + screenName + ": Temporary password used");

		} else if (!self.formValidator.password(newPassword)) {
			// Validate pwd policy
			application.showMsg(self.formValidator.lastMessage, "Password Error");
			application.log("[ERROR] " + screenName + ": Password not strong enough");

		} else if (newPassword == renewPassword) {
			
			var homeSuccess = function() {
				var json = application.connector.homeModel.attr;
				var sessionToken = application.connector.sessionModel.get('token');
				var isLogged = (sessionToken != '' && sessionToken != undefined && sessionToken != null);
				
				if(application.showInformationOverlay && window.appSecureData.showOverlay != "true"){
					application.gotoPage('supportChatOverlayPage');
				}
				else if(isLogged && (self.currentPage == "#setPwdPage" || self.currentPage == "#changePwdPage")) {
					application.gotoPage('changePwdConfirmationPage', {fromPage: self.currentPage});
				}
				else {
					application.gotoPage("homePage", {fromPage: self.currentPage});
				}
			};
			
			var homeError = function() {
				
			};
			
			var changePwdSuccess = function() {
				self.connector.getHome(homeSuccess, homeError);
			};
			
			var changePwdError = function() {
				
			};
			
			self.connector.changePassword(tmpPassword, newPassword, changePwdSuccess, changePwdError, screenName);

		} else {
			application.showMsg("Unknown error!", "error");
			application.log("[ERROR] " + screenName + ": Error when creating password");
		}
	};
	this.convertDataUsage = function(usage, unit, tofixed) {
		usage = parseFloat(usage);
		var hugeValue	= usage > Math.pow(2, 20);
		
		if (usage < 1024)
			return eval(usage.toFixed(tofixed)) + unit.toUpperCase();
		
		var divisor		= hugeValue?Math.pow(2, 20):1024;
		var newUsage	= eval((usage / divisor).toFixed(tofixed));
		var newUnit		= "KB"; // never used ?
		
		switch (unit.toLowerCase()) {
		case "kb":
			newUnit = hugeValue?"GB":"MB";
			break;
		case "mb":
			newUnit = hugeValue?"TB":"GB";
			break;
		}

		return newUsage + newUnit;
	};
	this.linkURLs = function(text, map) {
		text = text || "";
		map = map || self.planLinks;
		
		var links = text.match(/(?:https?:\/\/)?((?:www\.)?aiowireless\.com\/[A-Za-z0-9\-\.\_\/\~\=\&\;\,\*\#]+)/gi), result = text, found = false, url;

		if(links) {
			for(var i = 0; i < links.length; i++) {
				found = false;
				
				for(var j = 0; j < map.length; j++) {
					if(map[j].url.toLowerCase() == links[i].toLowerCase()) {
						
						result = result.replace(links[i], '<a href="'+(map[j].link || map[j].url)+'" class="link">'+(map[j].label || map[j].url)+'</a>');
						
						found = true;
						break;
					}
				}
				
				if(!found) {
					url = links[i];
					
					if(url.indexOf("http://") < 0) {
						url = "http://" + url;
					}
					
					result = result.replace(links[i], '<a href="'+url+'" class="link">'+links[i]+'</a>');
				}
			}
		}
		
		return result;
	};
	
	// keyboard / navbar management
	var $footer = $("#footer"); 
	
	//If keyboard is open, blur anything on scroll to avoid fix element issues.
	var hideKBonmove = function(){ 
		$(document).unbind('touchmove',hideKBonmove);
		$("input").blur();
		self.blurActiveElement();
		window.setTimeout(function(){
			$(document).bind('touchmove',hideKBonmove);
		},1000);
	};
	$(document).bind('touchmove',hideKBonmove);
	
	this.initialWindowHeight = window.innerHeight;
	this.initGenericKeyboardListeners = function(elts) {
		if(self.model.isAndroid && !self.android_le) {
			$(window).resize(function() {
				if($footer.hasClass('fixfix') && self.initialWindowHeight <= window.innerHeight) {
					$footer.removeClass('fixfix');
					$footer.attr("aria-hidden", "false");
				}
				else if(!$footer.hasClass('fixfix') && self.initialWindowHeight > window.innerHeight) {
					$footer.addClass('fixfix');
					$footer.attr("aria-hidden", "true");
				}
			});
		}
	};
	this.initKeyboardListeners = function(elts) {
		if(self.model.isIos) {
//			elts.focus(function(){
//				if((this.tagName.toLowerCase() == "input" || !self.model.isTablet) && !$footer.hasClass('fixfix')) {
//					$footer.addClass('fixfix');
//					$footer.attr("aria-hidden", "true");
//				}
//			});
//			elts.blur(function(){
//				if((this.tagName.toLowerCase() == "input" || !self.model.isTablet) && $footer.hasClass('fixfix')) {
//					$footer.removeClass('fixfix');
//					$footer.attr("aria-hidden", "false");
//				}
//			});
		}
		else if(self.model.isAndroid && self.android_le) {
			elts.focus(function(){
				if(!$footer.hasClass('fixfix')) {
					$footer.addClass('fixfix');
					$footer.attr("aria-hidden", "true");
				}
			});
			elts.blur(function(){
				if($footer.hasClass('fixfix')) {
					$footer.removeClass('fixfix');
					$footer.attr("aria-hidden", "false");
					$(this).blur();
				}
			});
		}
	};
	


	/* ****************** */
	/* ***** ALERTS ***** */
	/* ****************** */
	// - type : notice, warning, error, success
	this.showMsg = function(msg, type, options) {
		if (type === "confirm")
			confirm(msg);
		else {
			var title = type.charAt(0).toUpperCase() + type.slice(1);
			if ($.browser.msie && typeof deviceapis !== "undefined") {
				if (options && options.cancel) {
					var cancelLabel = ((options.cancelLabel) ? options.cancelLabel : "Cancel");
					var okLabel = ((options.okLabel) ? options.okLabel : "Ok");
					deviceapis.application.confirm(title, msg, cancelLabel, okLabel, options.cancel, okCallback);
				} else {
					deviceapis.application.alert(title, msg, "Ok", okCallback);
				}
			} else {
				window.zAlerts.alert(title, msg, options);
			}
			// alert(msg);
		}
	};

	/* *********************** */
	/* ***** PHONE MODEL ***** */
	/* *********************** */
	var initModel = function() {
		var userAgent = navigator.userAgent;

		self.model.isIos = userAgent.match(/(iPhone|iPad|iPod)/gi) ? true : false;
		self.model.isIos7 = self.model.isIos &&  userAgent.match(/os 7/i);
		self.model.isAndroid = userAgent.match(/Android/gi) ? true : false;
		self.model.isWinPhone = userAgent.match(/Windows/gi) ? true : false;
		self.model.isTablet = (window.innerWidth >= 600);
		self.model.isIPhone5 = (self.model.isIos && (window.innerWidth == 320) && (window.innerHeight == 548));

		self.log("Model : " + (self.model.isIos ? "iOS" : (self.model.isAndroid ? "Android" : "WinPhone")));
		
		self.minFreeSpaceValue = 20;
	};
	


	/* ***************** */
	/* ***** DEBUG ***** */
	/* ***************** */
	var initDebug = function() {
		// Init debug console
		if (self.configuration.debug && self.configuration.debugConsole) {
			$('#debug').show().find('a').tap(function() {
				self.clearLogs();
			});
		}

		// Init debug shortcuts (ctrl+X)
		if (self.configuration.debug && self.configuration.debugKeys) {
			$(window).keypress(function(event) {
				// On key 1, translate to english
				if (event.which == 49)
					application.translate(i18n_en);
				// On key 2, translate to spanish
				if (event.which == 50)
					application.translate(i18n_es);
				// On key 5, display date picker screen
				if (event.which == 53) {
					if (self.winPhone.datePicker)
						self.winPhone.datePicker.show("usageDetailsStartDate");
				}
			});
		}
	};

	/* ******************** */
	/* ***** UI Utils ***** */
	/* ******************** */
	this.blurActiveElement = function(targetElement) {
		// On some Android devices activeElement needs to be blurred otherwise
		// the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}
	};
	this.blockUI = function(message, timeout) {
		var self = this;
		// try this with a timeout for glaxy xpress...
		window.setTimeout(function() {
			self.blurActiveElement();
			$("input").blur();
		}, 100);

		var $blc = $('#blockUI');
		if ($blc[0]) {
			// already blocking;
			return;
		}
		var statusBarHeight = this.isWP7 ? this.wp7StatusBarHeight : 0;
		$blc = $('<div id="blockUI" role="alert" aria-describedby="blockUIMessage" style="position: absolute; z-index: 8000; width: 100%; min-width: 320px; height: '+($(document).height() + statusBarHeight)+'px; top: 0; opacity: 1;"><p class="blockui_box" id="blockUIMessage">' + ((message) ? message : 'please wait <span aria-hidden="true">...</span>') + '</p></div>');
		// XXX (bit hugly ...) compensate body padding
		$(window).on('resize.blockUI', function() {
			$blc.css('height', $(document).height() + statusBarHeight);
		});

		if (!$.browser.msie) {
			$blc.css('margin', '0 -3%');
		}
		self.blurActiveElement();
		$("input").blur();

		var events = 'mousedown.blockUI mouseup.blockUI keydown.blockUI keypress.blockUI touchstart.blockUI touchend.blockUI touchmove.blockUI';
		$blc.bind(events, function(event) {
			event.preventDefault();
		});
		//$('body').append($blc);
		$('#alertWrapper').attr("aria-hidden", "false").append($blc);
		$blc.focus();
		$("div.page, #footer").attr("aria-hidden", "true");
		if (timeout) {
			window.setTimeout(function() {
				self.unBlockUI();
			}, timeout);
		}
	};

	this.unBlockUI = function() {
		var $blockUI = $('#blockUI');
		$blockUI.unbind(".blockUI");
		$(window).off('resize.blockUI');
		$blockUI.remove();
		
		var $footer = $("#footer");
		if($footer.is(":visible")) {
			$footer.attr("aria-hidden", "false");
		}
		else {
			$footer.attr("aria-hidden", "true");
		}
		
		var $alertWrapper = $("#alertWrapper");
		if($alertWrapper.is(":empty")) {
			$alertWrapper.attr("aria-hidden", "true");
			$(self.currentPage).attr("aria-hidden", "false");
		}
		else {
			$alertWrapper.attr("aria-hidden", "false");
		}
	};
	
	this.setFontSize = function (size,silent) {
		if(size === 'Large'){
			$('body').removeClass('cato_medium');
			$('body').addClass('cato_large');
		} else if (size === 'Medium'){
			$('body').removeClass('cato_large');
			$('body').addClass('cato_medium');
		} else {
			$('body').removeClass('cato_large');
			$('body').removeClass('cato_medium');
		}
		$(window).trigger('resize');
		if(!silent){
			appSecureData.fontSize = size;
			window.saveSecureData();
		}
	};

	/* **************** */
	/* ***** LOGS ***** */
	/* **************** */
	this.log = function(message) {
		if (self.configuration.debug) {
			if (window.console)
				console.log(message);

			if (self.configuration.debugConsole)
				$('#debug').append(message + "<br/>");
		}
	};
	this.clearLogs = function() {
		$('#debug').html("<a>Clear</a>").find('a').tap(function() {
			self.clearLogs();
		});
	};
};