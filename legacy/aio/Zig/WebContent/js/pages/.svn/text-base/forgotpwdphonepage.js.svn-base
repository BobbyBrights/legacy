(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {

			this.isLoading = false;
			this.isCanceled = false;
		
			var self = this, sub = function() {
				if (!$('#i18n_forgotPasswordPhoneBtn').hasClass('disabled')) {
					var phoneNum = $('#i18n_forgotPasswordPhone').val();

					self.model.set({
						phoneNumber : phoneNum
					}, true);

					// TODO: validate phone
					// number
					self.application.blockUI('Loading <span aria-hidden="true">...</span>');
					var success = function() {
						if(!self.isCanceled) {
							self.isLoading = false;
							self.application.unBlockUI();
							self.application.gotoPage('forgotPwdQuestionPage');
						}
					};
					var error = function() {
						self.isLoading = false;
						self.application.unBlockUI();
					};
					self.isLoading = true;
					self.isCanceled = false;
					// Get security question
					self.application.connector.getSecurityQuestion(phoneNum, success, error);
				}
				return false;
			};

//			var $fastClickedElements = $("#i18n_forgotPasswordPhoneBtnSbmt, #i18n_forgotPasswordPhoneCancelBtn, #i18n_forgotPasswordPhoneBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_forgotPasswordPhoneBtn').tap(function(){
				self._checkForm(); // fix for window phone
				$('#forgotPwdPhonePageForm').submit();
				return false;
			});
			$('#forgotPwdPhonePageForm').submit(sub);

			$('#i18n_forgotPasswordPhone')[0].oninput = function(){
				self._checkForm();
			};
		},
		
		_checkForm : function() {
			var self = this;
			var $i18n_forgotPasswordPhone = $('#i18n_forgotPasswordPhone');
			if($i18n_forgotPasswordPhone.val() != "" && !self.application.formValidator.digits($i18n_forgotPasswordPhone.val())){
				var reg=new RegExp("\\D", "g");
				var newValue = $i18n_forgotPasswordPhone.val().replace(reg, "");
				$i18n_forgotPasswordPhone.val(newValue);
			}
			// Activate or deactivate button
			if ($i18n_forgotPasswordPhone.val() != "" && self.application.formValidator.phoneNumber($i18n_forgotPasswordPhone.val())) {
				$('#i18n_forgotPasswordPhoneBtn').removeClass('disabled').attr("aria-disabled", "false");
				$i18n_forgotPasswordPhone.removeClass('error').attr("aria-invalid", "false");
			} else {
				$i18n_forgotPasswordPhone.addClass('error').attr("aria-invalid", "true");
				$('#i18n_forgotPasswordPhoneBtn').addClass('disabled').attr("aria-disabled", "true");
			}
		},

		onHide : function() {
		},
		
		onShow : function() {
			this.onRefresh();
		},

		onRefresh : function() {
			$('#i18n_forgotPasswordPhone').val('');
			$('#i18n_forgotPasswordPhoneBtn').addClass('disabled').attr("aria-disabled", "true");
		},
		
		onBack : function(event) {
			if(this.isLoading){
				this.isCanceled = true;
				this.application.unBlockUI();
			}
			this.application.gotoPage('loginPage');
			event.preventDefault();
		},

	};

	Pages.ForgotPwdPhonePage = MVC.Page.extend(methods);

})($, MVC);
