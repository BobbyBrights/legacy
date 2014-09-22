(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			this.isLoading = false;

//			var $fastClickedElements = $("#i18n_setPasswordCancelBtn, #i18n_setPasswordBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			var sub = function() {
				if (!$('#i18n_setPasswordBtn').hasClass('disabled')) {
					
					var wasLogged = (self.application.connector.sessionModel.get('token') != '' && self.application.connector.sessionModel.get('token') != undefined && self.application.connector.sessionModel.get('token') != null);
					var tmpPassword = $('#i18n_setPasswordTmpPwd').val();
					var newPassword = $('#i18n_setPasswordPwd').val();
					var renewPassword = $('#i18n_setPasswordRePwd').val();

					if (newPassword != renewPassword) {
						self.application.showMsg("Passwords do not match!", "error");

					} else if (tmpPassword == newPassword) {
						self.application.showMsg("You cannot use your temporary password as new password!", "error");

					} else if (!self.application.formValidator.password(newPassword)) {
						// Validate pwd policy
						self.application.showMsg(self.application.formValidator.lastMessage, "Password Error");

					} else if (newPassword == renewPassword) {
						
						var homeSuccess = function() {
							var json = application.connector.homeModel.attr; 
							
							if(self.application.showInformationOverlay && window.appSecureData.showOverlay != "true"){
								application.gotoPage('supportChatOverlayPage');
							}
							else {
								if (wasLogged){
									application.gotoPage('changePwdConfirmationPage', {from: 'setpwdpage'});
								}
								else {
									application.gotoPage("homePage", {fromPage: "setpwdpage"});
								}
							}
							
						};
						
						var homeError = function() {
							
						};
						
						var changePwdSuccess = function() {
							self.application.connector.getHome(homeSuccess, homeError);
						};
						
						var changePwdError = function() {
							
						};
						
						
						self.isLoading = true;
						self.isCanceled = false;
						self.application.connector.changePassword(tmpPassword, newPassword,changePwdSuccess,changePwdError, "SET PWD");
					} 
				}
				return false;
			};

			$('#i18n_setPasswordBtn').tap(function(){
				$('#setPwdPageForm').submit();
				return false;
			});
			$('#setPwdPageForm').submit(sub);

			// oninput event not available on jQuery, using classic
			// javascript
			$('#i18n_setPasswordTmpPwd')[0].oninput = $('#i18n_setPasswordPwd')[0].oninput = $('#i18n_setPasswordRePwd')[0].oninput = function() {
				// Activate or deactivate button
				if ($('#i18n_setPasswordTmpPwd').val() != "" && $('#i18n_setPasswordPwd').val() != "" && $('#i18n_setPasswordRePwd').val() != "") {
					$('#i18n_setPasswordBtn').removeClass('disabled').attr("aria-disabled", "false");
				} else {
					$('#i18n_setPasswordBtn').addClass('disabled').attr("aria-disabled", "true");
				}
			};
		},

		onShow : function() {
			$('#i18n_setPasswordTmpPwd').val("");
			$('#i18n_setPasswordPwd').val("");
			$('#i18n_setPasswordRePwd').val("");
			$('#i18n_setPasswordBtn').addClass('disabled').attr("aria-disabled", "true");
			this.onRefresh();
		},

		onRefresh : function() {
			// Set phone number into introducing text (in dictionaries and screen)
			self.application.replaceTextPlaceholder("SET_PWD_TEXT", "[PHONE_NUMBER]", self.application.connector.sessionModel.get('phoneNumber'));
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			event.preventDefault();
			if(this.isLoading){
				//cannot cancel this
				return;
			}
			this.application.gotoPage('loginPage');
		},

	};

	Pages.SetPwdPage = MVC.Page.extend(methods);

})($, MVC);
