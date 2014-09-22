(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},
		
		
		_doLogin : function(login, pwd) {
			var self = this;
			if(document.activeElement)
				document.activeElement.blur();
			$("input").blur();
		
			
			var successLogin = function() {
				// If "remember me" : save login an password for further login
				if ($('#loginRememberMe').is(':checked')) {
					self.application.saveCredentials(login, pwd);
				} else {
					self.application.saveCredentials(login, '');
				}
				
				
				var successGetHome = function() {
					var json = application.connector.homeModel.attr; 
					
					if(json.subscribers.length == 1){
						self.application.connector.sessionModel.set({currentLine : json.subscribers[0].ctn});
						$(".multiline").hide();
					}
					
					self.isLoading = false;
					self.application.unBlockUI();
					if(self.application.showInformationOverlay && window.appSecureData.showOverlay != "true"){
						self.application.gotoPage('supportChatOverlayPage');
					}
					else {
						self.application.gotoPage("homePage", {fromPage: "loginPage"});
					}
					
				};
				
				var errorGetHome = function() {
					self.isLoading = false;
					self.application.unBlockUI();
				};
				
				self.application.connector.getHome(successGetHome, errorGetHome);
			};
			
			var errorLogin = function() {
				self.isLoading = false;
				self.application.unBlockUI();
			};
			self.isLoading = true;
//			self.isCanceled = false;
			self.application.blockUI("Connecting");
			
			var continueLogin = function(){
				self.application.connector.login(login, pwd,successLogin,errorLogin);
			};
			
			var newVersion = function(version){
				if(version.split('.').length < 4)
					version += '.0.0';
				serversVersions = version.split('.');
				
				var needUpdate = false;
				var refOs = 0;
				var link = '';
				if(self.application.model.isIos){
					refOs = 0;
					link = self.application.applink.ios;
				} else if(self.application.model.isAndroid){
					refOs = 1;
					link = self.application.applink.android;
				} else if(self.application.model.isWinPhone){
					link = self.application.applink.wp;
					if(self.application.isWP8)
						refOs = 2; // WP8
					else if(self.application.isWP7)
						refOs = 3; // WP7
				}
				if(serversVersions[refOs] > self.application.versions[refOs]){
					needUpdate = true;
				}

				if(needUpdate){
					var option = {};
					var updateAppli = function(){
						deviceapis.open(link);
					};
					// mandatory = version peer, else version odd
					if(serversVersions[refOs]%2){
						option.cancel = function(){
							continueLogin();
						};
						if(typeof deviceapis !== "undefined"){
							deviceapis.application.confirm("Confirm",$.i18n._('VERSION_MESSAGE'),"Cancel","Ok",
									function(){
										continueLogin();
									}, function(){
										updateAppli();
										continueLogin();
									});
						}
						else if(confirm($.i18n._('VERSION_MESSAGE'))){
							updateAppli();
							continueLogin();
						} else {
							continueLogin();
						}
					} else {
						if(typeof deviceapis !== "undefined"){
							deviceapis.application.alert("Update",$.i18n._('VERSION_MESSAGE'),"Ok",function(){
								updateAppli();
								errorLogin();
							});
						} else{
							alert($.i18n._('VERSION_MESSAGE'));
							updateAppli();
							errorLogin();
						}
					}
				} else{
					continueLogin();
				}
			};

			// Check API version
			self.application.connector.checkVersion(newVersion, continueLogin);
		},
		

		onInit : function() {
			this.isLoading = false;
//			this.isCanceled = false;
			
			var self = this, sub = function() {
				if (!$('#i18n_loginBtn').hasClass('disabled')) {
					//trick to force hide keyboard
					self.application.blurActiveElement();
					$("input").blur();
					var login = $('#i18n_loginUsername').val();
					var pwd = $('#i18n_loginPwd').val();
					self._doLogin(login,pwd);
				}
				return false;
			};
			
//			var $fastClickedElements = $("#i18n_loginRememberMeLabel, #i18n_loginBtn, #i18n_loginForgotPwdBtn, #i18n_loginSignUpBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_loginBtn').tap(function(){
				$('#loginForm').submit();
				return false;
			});
			$('#loginForm').submit(sub);
			// oninput event accountName not available on jQuery, using classic
			// javascript
			$('#i18n_loginUsername')[0].oninput = $('#i18n_loginPwd')[0].oninput = function() {
				// Activate or deactivate button
				self._validate();
			};

			$('#loginRememberMe').bind('change',function() {
				var $that = $(this);
				var isChecked = this.checked;
				
				self.model.set({
					rememberMe : isChecked
				}, true);
				
				$that.attr("aria-checked", isChecked ? "true" : "false");
			});
			$('#loginRememberMe + span').tap(function() {
				var loginRememberMe = document.getElementById("loginRememberMe");
				var $loginRememberMe = $(loginRememberMe);

				if(loginRememberMe) {
					loginRememberMe.checked = !loginRememberMe.checked;
					self.model.set({
						rememberMe : loginRememberMe.checked
					}, true);
				}
				
				$loginRememberMe.attr("aria-checked", loginRememberMe.checked ? "true" : "false");
			});
			
			$('#loginVersionNumber span').html("v" + this.application.displayVersion);
			$('#loginVersionNumber span').tap(function(){
				var svg = $('#loginVersionNumber span').text();
				$('#loginVersionNumber span').html($('#loginVersionNumber').attr('data-buildnb'));
				$('#loginVersionNumber').attr('data-buildnb',svg);
			});
			
			$(window).bind('resize',this.layout.bind(this));
		},
		
		_validate : function(){
			var username = $('#i18n_loginUsername').val();
			var password = $('#i18n_loginPwd').val();
			if (username != "" && !/^\s*$/.test(username) && password != "" && !/^\s*$/.test(password)) {
				$('#i18n_loginBtn').removeClass('disabled').attr("aria-disabled", "false");
			} else {
				$('#i18n_loginBtn').addClass('disabled').attr("aria-disabled", "true");
			}
		},

		onHide : function() {
		},

		onShow : function(options) {
			if(typeof deviceapis !== "undefined"){
				deviceapis.application.hideSplashScreen();
//				window.setTimeout(function(){
//				}, 300);
			}
			if(options) {
				//auto login scenario
				var login = options.login;
				var pwd = options.pwd;
				if(login && pwd)
					this._doLogin(login,pwd);
			}
			this._validate();
			this.onRefresh();
		},
		
		
		layout : function(){
			$('#loginSignUp').css('padding-top', '0px');
			$('#loginSignUp').height('auto');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var windowHeight = jQuery(window).height();
			var topOfSubPage = $('#loginSignUp').offset().top;
			var heightOfSubPage = $('#loginSignUp').height();
			var freeSpace = windowHeight - topOfSubPage - heightOfSubPage;
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + (freeSpace/2) + statusBarHeight;
			
			$('#loginSignUp').css('padding-top', parseInt(freeSpace/2) +'px');
			$('#loginSignUp').height(parseInt(newSubPageHeight) + 'px');
		},

		onRefresh : function() {
			window.setTimeout(this.layout.bind(this), 100);
			
			$('#i18n_loginUsername').val(this.model.get('username'));
			$('#loginRememberMe').attr('checked', this.model.get('rememberMe'));
			$('#loginRememberMe').attr('aria-checked', this.model.get('rememberMe') ? "true" : "false");
			$('#i18n_loginPwd').val(window.appSecureData.pwd);
			
			// Hide inline error message
			$("#i18n_loginForgotPwdBtn").show().attr("aria-hidden", "false");
			$("#loginInlineError").hide().attr("aria-hidden", "true");
			$("#lockedlineError").hide().attr("aria-hidden", "true");
			this._validate();
		},
		
		onBack : function(event) {
			event.preventDefault();
			if(this.isLoading){
				//cannot cancel this
				return;
			}
			//default behaviour (popup to quit)
			if(typeof deviceapis !== "undefined"){
				deviceapis.application.confirm("Confirm","Are you sure you want to quit the application?","Cancel","Ok",function(){}, function(){deviceapis.quit();});
			} else {
				 //[@if DEV] only for debug
				if(window.confirm("Are you sure you want to quit the application?")){
					document.location.href = "http://www.perdu.com";
				};
				//[@endif]
			}
		},

	};

	Pages.LoginPage = MVC.Page.extend(methods);

})($, MVC);
