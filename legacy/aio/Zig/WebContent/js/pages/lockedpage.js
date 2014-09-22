(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;

			var sub = function() {
				if (!$('#i18n_lockedBtn').hasClass('disabled')) {

					self.application.blurActiveElement();
					$("input").blur();
					var tmpPassword = $('#i18n_lockedCcpNumber').val();
					var newPassword = $('#i18n_lockedPwd').val();
					var renewPassword = $('#i18n_lockedRePwd').val();
					var screenName = "LOCKED";

					self.application.validatePwdChange(tmpPassword, newPassword, renewPassword, screenName);
				}
				return false;
			};

//			var $fastClickedElements = $("#i18n_lockedBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_lockedBtn').tap(function(){
				$('#lockedPageForm').submit();
				return false;
			});
			$('#lockedPageForm').submit(sub);

			$('#i18n_lockedCcpNumber')[0].oninput = $('#i18n_lockedPwd')[0].oninput = $('#i18n_lockedRePwd')[0].oninput = function() {
				// Activate or deactivate button
				if ($('#i18n_lockedCcpNumber').val() != "" && $('#i18n_lockedPwd').val() != "" && $('#i18n_lockedRePwd').val() != "") {
					$('#i18n_lockedBtn').removeClass('disabled').attr("aria-disabled", "false");
				} else {
					$('#i18n_lockedBtn').addClass('disabled').attr("aria-disabled", "true");
				}
			};
		},

		onShow : function() {
			this.onRefresh();
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}

			$('#i18n_lockedCcpNumber').val("");
			$('#i18n_lockedPwd').val("");
			$('#i18n_lockedRePwd').val("");
			$('#i18n_lockedBtn').addClass('disabled').attr("aria-disabled", "true");
		},

	};

	Pages.LockedPage = MVC.Page.extend(methods);
})($, MVC);
