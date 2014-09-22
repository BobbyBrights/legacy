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
				if (!$('#i18n_signUpBtn').hasClass('disabled')) {
					var username = $('#i18n_signupUsername').val();
					var phoneNumber = $('#i18n_signupPhoneNumber').val();

					// TODO: Validate form
					// before ajax call
					self.model.set({
						username : username
					}, true);
					
					var success = function() {
						// Go to set password page
						if(!self.isCanceled) {
							self.isLoading = false;
							// Go to set password page
							self.application.gotoPage('setPwdPage');
							self.application.unBlockUI();
						}
					};
					var error = function() {
						self.isLoading = false;
						self.application.unBlockUI();
					};
					self.isLoading = true;
					self.isCanceled = false;
					self.jqXHR = self.application.connector.selfRegistration(username, phoneNumber,success,error);
				}
				return false;
			};
			
//			var $fastClickedElements = $("#i18n_signUpCancelBtn, #i18n_signUpBtn");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_signUpBtn').tap(function(){
				$('#signUpPageForm').submit();
				return false;
			});
			$('#signUpPageForm').submit(sub);

			$('#i18n_signupUsername')[0].oninput = function(){
				self._validate();
			};
			
			var checkPhoneNumberFct = function(elt) {
				if($(elt).val() != "" && !self.application.formValidator.digits($(elt).val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $(elt).val().replace(reg, "");
					$(elt).val(newValue);
				} else if($(elt).val() != "" && !self.application.formValidator.phoneNumber($(elt).val())){
					$(elt).addClass('error').attr("aria-invalid", "true");
				} else
					$(elt).removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			$('#i18n_signupPhoneNumber')[0].oninput = function() {
				checkPhoneNumberFct(this);
			};
			$('#i18n_signupPhoneNumber').blur(function(){
				checkPhoneNumberFct(this);
			});
		},

		onShow : function() {
			this.onRefresh();
		},

		onRefresh : function() {
			$('#i18n_signupUsername').val('');
			$('#i18n_signupPhoneNumber').val('');
			$('#i18n_signUpBtn').addClass('disabled').attr("aria-disabled", "true");

			// Hide inline error message
			$("#signUpInlineError").hide().attr("aria-hidden", "true");
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
		
		_validate : function(){
			// Activate or deactivate button
			if ($('#i18n_signupUsername').val() != "" && $('#i18n_signupPhoneNumber').val() != "" && this.application.formValidator.phoneNumber($('#i18n_signupPhoneNumber').val())) {
				$('#i18n_signUpBtn').removeClass('disabled').attr("aria-disabled", "false");
			} else {
				$('#i18n_signUpBtn').addClass('disabled').attr("aria-disabled", "true");
			}
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

	Pages.SignUpPage = MVC.Page.extend(methods);

})($, MVC);
