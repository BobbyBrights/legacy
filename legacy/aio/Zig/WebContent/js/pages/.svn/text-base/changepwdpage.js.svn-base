(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;

			this.application.replaceTextPlaceholder("CHANGE_PWD_TEXT", "[USERNAME]", this.model.get('username'));
			this.application.translate(i18n_en, this.$element);

			var sub = function() {
				
				if (!$('#i18n_changePasswordBtn').hasClass('disabled')) {

					self.application.blurActiveElement();
					$("input").blur();
					var currentPassword = $('#i18n_changePasswordCurrentPwd').val();
					var newPassword = $('#i18n_changePasswordPwd').val();
					var renewPassword = $('#i18n_changePasswordRePwd').val();
					var screenName = "CHANGE PWD";
					var wasLogged = (self.application.connector.sessionModel.get('token') != '' && self.application.connector.sessionModel.get('token') != undefined && self.application.connector.sessionModel.get('token') != null);

					var homeSuccess = function() {
						var json = application.connector.homeModel.attr;
						if(self.application.showInformationOverlay && window.appSecureData.showOverlay != "true"){
							application.gotoPage('supportChatOverlayPage');
						}
						else if (wasLogged){
							application.gotoPage('changePwdConfirmationPage', {from: 'changepwdpage'});
						}
						else {
							application.gotoPage("homePage", {fromPage: "setpwdpage"});
						}
					};
					
					var homeError = function() {
						
					};
					
					var changePwdSuccess = function() {
						self.application.connector.getHome(homeSuccess, homeError);
					};
					
					var changePwdError = function() {
						
					};
					

					self.application.validatePwdChange(currentPassword, newPassword, renewPassword, screenName);
				}
				return false;
			};

//			var $fastClickedElements = $("#changePwdBackButton, #i18n_changePasswordCancelBtn, #i18n_changePasswordBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
			
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage('morePage', {fromBack : true});
			});

			$('#i18n_changePasswordBtn').tap(function(){
				$('#changePwdPageForm').submit();
				return false;
			});
			$('#changePwdPageForm').submit(sub);

			$('#i18n_changePasswordCurrentPwd')[0].oninput = $('#i18n_changePasswordPwd')[0].oninput = $('#i18n_changePasswordRePwd')[0].oninput = function() {

				// Activate or deactivate button
				if ($('#i18n_changePasswordCurrentPwd').val() != "" && $('#i18n_changePasswordPwd').val() != "" && $('#i18n_changePasswordRePwd').val() != "") {
					$('#i18n_changePasswordBtn').removeClass('disabled').attr("aria-disabled", "false");
				} else {
					$('#i18n_changePasswordBtn').addClass('disabled').attr("aria-disabled", "true");
				}
			};

			self.application.initKeyboardListeners(this.$element.find('.vb'));
		},

		onShow : function() {
			$('#i18n_changePasswordCurrentPwd').val("");
			$('#i18n_changePasswordPwd').val("");
			$('#i18n_changePasswordRePwd').val("");
			$('#i18n_changePasswordBtn').addClass('disabled').attr("aria-disabled", "true");
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

	Pages.ChangePwdPage = MVC.Page.extend(methods);

})($, MVC);