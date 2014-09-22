(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {

			this.isLoading = false;
			this.isCanceled = false;
			this.jqXHR = null;
			
			var self = this, sub = function() {
				if (!$('#i18n_forgotPasswordQuestionBtn').hasClass('disabled')) {
					var answer = $('#i18n_forgotPasswordQuestionAnswer').val();
					var phoneNum = self.application.connector.sessionModel.get('phoneNumber');
					var success = function() {
						// Go to set password page
						if(!self.isCanceled) {
							self.isLoading = false;
							self.application.gotoPage('resetPwdPage');
							self.application.unBlockUI();
						}
					};
					var done = function() {
						self.isLoading = false;
						self.application.unBlockUI();
					};
					self.application.blockUI('Loading <span aria-hidden="true">...</span>');
					self.isLoading = true;
					self.isCanceled = false;
					self.jqXHR = self.application.connector.validateSecurityQuestion(phoneNum, answer, success, done);
				}
				return false;
			};

//			var $fastClickedElements = $("#i18n_forgotPasswordPhoneBtnSbmt, #i18n_forgotPasswordPhoneCancelBtn, #i18n_forgotPasswordPhoneBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_forgotPasswordQuestionBtn').tap(function(){
				$('#forgotPwdQuestionPageForm').submit();
				return false;
			});
			$('#forgotPwdQuestionPageForm').submit(sub);

			$('#i18n_forgotPasswordQuestionAnswer')[0].oninput = function() {
				// Activate or deactivate button
				if ($('#i18n_forgotPasswordQuestionAnswer').val() != "") {
					$('#i18n_forgotPasswordQuestionBtn').removeClass('disabled').attr("aria-disabled", "false");
				} else {
					$('#i18n_forgotPasswordQuestionBtn').addClass('disabled').attr("aria-disabled", "true");
				}
			};
		},

		onHide : function() {
		},
		
		onShow : function() {
			$('#forgotPasswordQuestion').text("");
			$('#i18n_forgotPasswordQuestionAnswer').text("");
			$('#i18n_forgotPasswordQuestionBtn').addClass('disabled').attr("aria-disabled", "true");
			this.onRefresh();
		},

		onRefresh : function() {
			if (!this.isVisible)
				return;

			var phoneNum = this.application.connector.sessionModel.get('phoneNumber');
			// Set phone number
			$('#forgotPasswordQuestionPhone').text(phoneNum);
			$('#forgotPasswordQuestion').text(this.model.get('securityQuestion'));
			// Clear answer input
			$('#i18n_forgotPasswordQuestionAnswer').val('');
		},


		onBack : function(event) {
			if(this.isLoading){
				this.isCanceled = true;
				this.application.unBlockUI();
				this._abortRequest();
				
			}
			this.application.gotoPage('loginPage');
			event.preventDefault();
		},
		
		
		_abortRequest : function() {
			try {
				if(this.jqXHR)
					this.jqXHR.abort();
			} catch(err) {
				console.log('fail to abort',err);
			}
			this.jqXHR = null;
		}
	};

	Pages.ForgotPwdQuestionPage = MVC.Page.extend(methods);

})($, MVC);
