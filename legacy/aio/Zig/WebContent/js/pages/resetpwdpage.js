(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			
			this.application.replaceTextPlaceholder("RESET_PWD_TEXT", "[USERNAME]", this.model.get('username'));
			$('#i18n_resetPasswordText').html($.i18n._('RESET_PWD_TEXT'));

			var sub = function() {
				if (!$('#i18n_resetPasswordBtn').hasClass('disabled')) {

					self.application.blurActiveElement();
					$("input").blur();
					var tmpPassword = $('#i18n_resetPasswordTmpPwd').val();
					var newPassword = $('#i18n_resetPasswordPwd').val();
					var renewPassword = $('#i18n_resetPasswordRePwd').val();
					var screenName = "RESET PWD";

					self.application.validatePwdChange(tmpPassword, newPassword, renewPassword, screenName);
				}
				return false;
			};

//			var $fastClickedElements = $("#i18n_resetPasswordCancelBtn, #i18n_resetPasswordBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
			
			$('#i18n_resetPasswordBtn').tap(function(){
				$('#resetPwdPageForm').submit();
				return false;
			});
			$('#resetPwdPageForm').submit(sub);

			$('#i18n_resetPasswordTmpPwd')[0].oninput = $('#i18n_resetPasswordPwd')[0].oninput = $('#i18n_resetPasswordRePwd')[0].oninput = function() {

				// Activate or deactivate button
				if ($('#i18n_resetPasswordTmpPwd').val() != "" && $('#i18n_resetPasswordPwd').val() != "" && $('#i18n_resetPasswordRePwd').val() != "") {
					$('#i18n_resetPasswordBtn').removeClass('disabled').attr("aria-disabled", "false");
				} else {
					$('#i18n_resetPasswordBtn').addClass('disabled').attr("aria-disabled", "true");
				}
			};
		},

		onHide : function() {
		},
		
		onShow : function() {
			$('#i18n_resetPasswordTmpPwd').val("");
			$('#i18n_resetPasswordPwd').val("");
			$('#i18n_resetPasswordRePwd').val("");
			$('#i18n_resetPasswordBtn').addClass('disabled').attr("aria-disabled", "true");
			this.onRefresh();
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			//TODO cancel jqxHR ? and prevent default transition
			this.application.unBlockUI();
			this.application.gotoPage('loginPage');
			event.preventDefault();
		},
	};

	Pages.ResetPwdPage = MVC.Page.extend(methods);
})($, MVC);
