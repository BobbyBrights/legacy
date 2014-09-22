(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = false;
			this.isBack = false;
			this.activeChooserInstance = null,
			this.paymentModel = new MVC.Model();
			this.paymentModel.set({
				amount : 0,
				name : '',
				cardType : '',
				cardNumber : '',
				securityCode : '',
				expirationDate : '',
				postalCode : '',
				autoPay : false
			});
			this.subscribers = [];
			this.autopay = undefined;
			this.paymentProfileId = undefined;
			this.editionMode = true; // false if prefilled, else true

			this.useMonthInputType = self.application.model.isIos;

			
//			var $fastClickedElements = $("#i18n_payMyBillPayNowButton, #i18n_payMyBillTransactionHistoryButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};


			if(this.useMonthInputType) {
				this.$element.find(".cardExpirationDateControlWrapper").remove();
				this.application.formValidator.configureCardExpirationDate($("#i18n_payMyBillExpirationDateInput"), self._validate);
				$("#i18n_payMyBillExpirationDateInput").bind("change", function() {
					var $that = $(this);
					
					$that[$that.val() ? "removeClass" : "addClass"]("notValued");
				});
			}
			else {
				self.$element.find("input[type=month]").remove();
				var $payMyBillExpirationDateYear = $("#payMyBillExpirationDateYear"), currentYear = (new Date()).getFullYear(), htmlStr = "";
				
				for(var i = currentYear; i < currentYear + self.application.cardValidityYearNumber; i++) {
					htmlStr += '<option role="option">' + i.toString() + '</option>';
				}
				
				$payMyBillExpirationDateYear.append(htmlStr);
			}
			// CATO fix : Talkback is not able to read "zero dollars" ...
			var $payMyBillAmountInput = $('#i18n_payMyBillAmountInput'); 
			$payMyBillAmountInput.after('<span style="display:none;" id="payMyBillAmountText" aria-hidden="true">'+$payMyBillAmountInput.val().toString()+' dollar' + (+$payMyBillAmountInput.val() > 1 ? "s" : "") +'</span>');
			$payMyBillAmountInput.attr("aria-labelledby", "payMyBillAmountText");
			$payMyBillAmountInput[0].oninput = function(){
				self._checkAmount();
				self._validate();
			};
			$payMyBillAmountInput.blur(function(){
				var amount = (Math.round(this.value*100)/100).toFixed(2);
				if(isNaN(amount))
					amount = 0;
				this.value = amount;
				$("#payMyBillAmountText").text(amount.toString() + " dollar" + (amount > 1 ? "s" : ""));
			});
			$('#payMyBillAutoPayCheckBox').change(function(){
				if(this.checked) {
					$(this).attr("aria-checked", "true");
					//$("#payMyBillReviewPage").addClass("pin-auth");
					//$("#payMyBillConfirmationPage").addClass("pin-auth");
					// Show / Hide the field for pin confirmation 
					if(self.model.attr && self.model.attr.pinSecurity == "1"){
						$('#payMyBillPage .pin-required').show();
						self._validate();
					}
					else {
						$('#payMyBillPage .pin-required').hide();
					}
					// Show / Hide the field for select the phone line (multiline case)
					if(self.model.attr && self.model.attr && self.model.attr.subscribers.length > 1){
						$('#payMyBillPage .multiline').show();
					}
				}
				else {
					$(this).attr("aria-checked", "false");
					//$("#payMyBillReviewPage").removeClass("pin-auth");
					//$("#payMyBillConfirmationPage").removeClass("pin-auth");
					$('#payMyBillPage .pin-required').hide();
					$('#payMyBillPage .multiline').hide();
				}
				self._validate();
			});
			$('#payMyBillAutoPayCheckBox + span').tap( function(){
				var payMyBillAutoPayCheckBox = document.getElementById("payMyBillAutoPayCheckBox");
				var $payMyBillAutoPayCheckBox = $(payMyBillAutoPayCheckBox);

				if(payMyBillAutoPayCheckBox) {
					payMyBillAutoPayCheckBox.checked = !payMyBillAutoPayCheckBox.checked;
					$payMyBillAutoPayCheckBox.attr("aria-checked", payMyBillAutoPayCheckBox.checked ? "true" : "false");
					self._validate();
				}
			});
			$('#termsAndConditions').bind('change', function(){
				$(this).attr("aria-checked", this.checked ? "true" : "false");
			});
			$('#termsAndConditions + span').tap( function(){
				var termsAndConditions = document.getElementById("termsAndConditions");
				var $termsAndConditions = $(termsAndConditions);

				if(termsAndConditions) {
					termsAndConditions.checked = !termsAndConditions.checked;
					$termsAndConditions.attr("aria-checked", termsAndConditions.checked ? "true" : "false");
					self._validate();
				}
			});
			$('#i18n_payMyBillTermsCondition_2').tap(function(evt){
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/terms_mobileview');
				}
				return false;
			});
			$('#i18n_payMyBillNameInput')[0].oninput = 
				$('#termsAndConditions')[0].onchange = function() {
				// Activate or deactivate button
				self._validate();
			};

			// Validator on card number
			var checkCardNumberFct = function(){
				var $i18n_payMyBillCardNumberInput = $('#i18n_payMyBillCardNumberInput');
				var $payMyBillCardType = $('#payMyBillCardType');
				var checkCardNumber = $payMyBillCardType.val() == 'AE' && $i18n_payMyBillCardNumberInput.val().length == 15 ||
				$payMyBillCardType.val() != 'AE' && $i18n_payMyBillCardNumberInput.val().length == 16;
				
				if($i18n_payMyBillCardNumberInput.val() != "" && !self.application.formValidator.digits($i18n_payMyBillCardNumberInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $i18n_payMyBillCardNumberInput.val().replace(reg, "");
					$i18n_payMyBillCardNumberInput.val(newValue);
				}
				else if($i18n_payMyBillCardNumberInput.val() != "" && (!self.application.formValidator.cardNumber($i18n_payMyBillCardNumberInput.val()) || !checkCardNumber)){
					$i18n_payMyBillCardNumberInput.addClass('error').attr("aria-invalid", "true");
				}
				else
					$i18n_payMyBillCardNumberInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			// validator on security code
			var checkSecurityCodeFct = function(){
				var $i18n_payMyBillSecurityCodeInput = $('#i18n_payMyBillSecurityCodeInput');
				var $payMyBillCardType = $('#payMyBillCardType');
				var checkSecurityCode = $payMyBillCardType.val() == 'AE' && $i18n_payMyBillSecurityCodeInput.val().length == 4 ||
				$payMyBillCardType.val() != 'AE' && $i18n_payMyBillSecurityCodeInput.val().length == 3;
				
				if($i18n_payMyBillSecurityCodeInput.val() != "" && !self.application.formValidator.digits($i18n_payMyBillSecurityCodeInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $i18n_payMyBillSecurityCodeInput.val().replace(reg, "");
					$i18n_payMyBillSecurityCodeInput.val(newValue);
				} else if($i18n_payMyBillSecurityCodeInput.val() != "" && !checkSecurityCode){
					$i18n_payMyBillSecurityCodeInput.addClass('error').attr("aria-invalid", "true");
				} else
					$i18n_payMyBillSecurityCodeInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			$('#payMyBillExpirationDateMonth').change(function(){
				var $that = $(this), now = moment();				
				
				if($that.val()) {
					if(this.value < (now.month() + 1) && $('#payMyBillExpirationDateYear').val() <= now.year()) {
						$that.attr("aria-invalid", "true").addClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$that.prev(".select-label").attr("aria-invalid", "true").addClass("error");
						}
					}
					else {
						$that.attr("aria-invalid", "false").removeClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$that.prev(".select-label").attr("aria-invalid", "false").removeClass("error");
						}
					}
				}
				
				self._validate();
			});
			$('#payMyBillExpirationDateYear').change(function(){
				var $that = $(this), $payMyBillExpirationDateMonth = $("#payMyBillExpirationDateMonth"), now = moment();				
				
				if($that.val()) {
					if($payMyBillExpirationDateMonth.val() < (now.month() + 1) && $that.val() <= now.year()) {
						$payMyBillExpirationDateMonth.attr("aria-invalid", "true").addClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$payMyBillExpirationDateMonth.prev(".select-label").attr("aria-invalid", "true").addClass("error");
						}
					}
					else {
						$payMyBillExpirationDateMonth.attr("aria-invalid", "false").removeClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$payMyBillExpirationDateMonth.prev(".select-label").attr("aria-invalid", "false").removeClass("error");
						}
					}
				}
				
				self._validate();
			});
			$('#payMyBillExpirationDateYear, #payMyBillExpirationDateMonth').change(function() {
				var $that = $(this);
				if($that.val()) {
					$that.removeClass("notValued");
					if(!self.application.model.isWinPhone && !self.application.android_le) {
						$that.prev(".select-label").removeClass("notValued");
					}
				}
				else {
					$that.addClass("notValued");
					if(!self.application.model.isWinPhone && !self.application.android_le) {
						$that.prev(".select-label").addClass("notValued");
					}
				}	
			});
			$('#payMyBillCardType').change(function(){
				checkCardNumberFct();
				checkSecurityCodeFct();
				
				var $that = $(this);
				if($that.val()) {
					$that.removeClass("notValued");
				}
				else {
					$that.addClass("notValued");
				}
			});
			$('#i18n_payMyBillCardNumberInput')[0].oninput  = function(){
				checkCardNumberFct();
			};
			$('#i18n_payMyBillSecurityCodeInput')[0].oninput = function(){
				checkSecurityCodeFct();
			};

			$('#i18n_payMyBillPinInput')[0].oninput  = function(){
				self._validate();
			};
			$('#payMyBillMultilineSelect').change(function(){
				var $that = $(this);
				if($that.val()) {
					$that.removeClass("notValued");
				}
				else {
					$that.addClass("notValued");
				}
				self._validate();
			});
			
			// validator on postal code
			var $i18n_payMyBillPostalCodeInput = $("#i18n_payMyBillPostalCodeInput");
			$i18n_payMyBillPostalCodeInput[0].oninput = function(){
				if($i18n_payMyBillPostalCodeInput.val() != "" && !self.application.formValidator.digits($i18n_payMyBillPostalCodeInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $i18n_payMyBillPostalCodeInput.val().replace(reg, "");
					$i18n_payMyBillPostalCodeInput.val(newValue);
				} else if($i18n_payMyBillPostalCodeInput.val() != "" && !self.application.formValidator.postalCode($i18n_payMyBillPostalCodeInput.val())){
					$i18n_payMyBillPostalCodeInput.addClass('error').attr("aria-invalid", "true");
				} else
					$i18n_payMyBillPostalCodeInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			$('#payMyBillCardTypeArrow').tap(function() {
//				if(self.application.model.isAndroid) {
					$('#payMyBillCardType').show();
					window.setTimeout(function() {
						application.showDropdown($('#payMyBillCardType')[0]);
					}, 50);
//				}
//				else {
//					$('#payMyBillCardType').focus();
//				}
			});
			
			if(!self.application.model.isWinPhone && !self.application.android_le) {
				self.application.setupLabelledDropdown($("#payMyBillCardType, #payMyBillExpirationDateMonth, #payMyBillExpirationDateYear, #payMyBillMultilineSelect"));
			}
			
			$('#payMyBillPage').find('.query').tap(function() {
				self.application.displaySecurityCodeHelper($('#payMyBillCardType').val());
			});
			
			$('#payMyBillMultilineArrow').tap(function() {
//				if(self.application.model.isAndroid) {
					$('#payMyBillMultilineSelect').show();
					window.setTimeout(function() {
						application.showDropdown($('#payMyBillMultilineSelect')[0]);
					}, 50);
//				}
//				else {
//					$('#payMyBillMultilineSelect').focus();
//				}
			});
			
			$('#i18n_payMyBillPayNowButton').tap(function() {
				if (!$(this).hasClass('disabled')){
					self._onSubmit();
				}
			});

			self.application.initKeyboardListeners(this.$element.find('.vb'));
		},

		onShow : function(options) {
			$('#footer').removeClass('fixfix').attr("aria-hidden", "false");
			/*
			if($('#payMyBillAutoPayCheckBox').is(":checked")) {
				$("#payMyBillReviewPage").addClass("pin-auth");
				$("#payMyBillConfirmationPage").addClass("pin-auth");
			}
			else {
				$("#payMyBillReviewPage").removeClass("pin-auth");
				$("#payMyBillConfirmationPage").removeClass("pin-auth");
			}
*/
			var self = this;
			this.homeModel = {};
			if(!options || !options.fromBack ){
				this.paymentModel.set({
					amount : 0,
					name : '',
					cardType : '',
					cardNumber : '',
					securityCode : '',
					expirationDate : '',
					postalCode : '',
					autoPay : false
				});

				$('#i18n_payMyBillAmountInput').val(null);
				$('#payMyBillAmountText').val("zero dollar");
				$('#i18n_payMyBillNameInput').val(null);
				$('#i18n_payMyBillCardNumberInput').val(null);
				$('#payMyBillCardType').val(null).trigger("change");
				$('#i18n_payMyBillSecurityCodeInput').val(null);
				if(self.useMonthInputType) {
					$('#i18n_payMyBillExpirationDateInput').val(null).addClass("notValued").removeClass("error");
				}
				else {
					$("#payMyBillExpirationDateMonth").val(null).addClass("notValued").trigger("change");
					$("#payMyBillExpirationDateYear").val(null).addClass("notValued").trigger("change");
				}
				$('#i18n_payMyBillPostalCodeInput').val(null);
				$('#payMyBillAutoPayCheckBox').attr('checked', false).attr("aria-checked", "false");
				$('#termsAndConditions').attr('checked', false).attr("aria-checked", "false");
				$('#payMyBillPage').find('input.error, select.error').removeClass('error').attr("aria-invalid", "false");
				$('#payMyBillMultilineSelect').val(null).trigger("change");
				$('#payMyBillPage .multiline').hide();
				$('#payMyBillPage .pin-required').hide();
				$('#i18n_payMyBillPinInput').val(null);
			}
			
			if(options && options.fromBack){
				self.isBack = true;
			} else {
				self.isBack = false;
				self._preFilled(options);
			}
			
			self.application.setNavLinkActive('#payMyBillPage');
			
			this._checkAmount();
			this._validate();
			this.fetch();
			window.setTimeout(this.layout.bind(this), 100);
		},
		
		_preFilled : function(options){
			var self = this;

			// Get autopay infos
			this.$element.find('.ap').unbind('focus.autopayfill').unbind('blur.autopayfill');

			if(options && options.summary && options.summary.autopay && options.summary.autopay.autoPayExists) {
				self.autopay = options.summary.autopay;
				self.paymentProfileId = options.summary.autopay.paymentProfileId;
				
				if(self.isBack && self.editionMode){
					self.editionMode = true;
					//Comes from back, but the autopay card was overriden, so keep former values and set edition mode to true
				} else {
					self.editionMode = false;
					$('#i18n_payMyBillNameInput').val(self.autopay.cardName);
					var expDate = moment(self.autopay.cardExpirationDate, "MMYY");
					if(self.useMonthInputType) {
						$('#i18n_payMyBillExpirationDateInput').val(expDate.format("YYYY-MM")).trigger("change");
					}
					else {
						$('#payMyBillExpirationDateYear').val(expDate.format("YYYY")).removeClass("notValued").trigger("change");
						$('#payMyBillExpirationDateMonth').val(expDate.format("MM")).removeClass("notValued").trigger("change");
					}
					$('#payMyBillCardType').val(self.autopay.cardType).trigger("change");
					$('#i18n_payMyBillPostalCodeInput').val(self.autopay.postalCode);
					$('#i18n_payMyBillCardNumberInput').val(self.application.maskCCNumberForInput(self.autopay.cardNumber));
				}
				
				this.$element.find('.ap').bind('focus.autopayfill', function() {
					self._onChangeScroller();
				});

				this.$element.find('.ap').bind('blur.autopayfill', function() {
					self._blurEditModeCheck();
				});
			} else {
				self.autopay = undefined;
				self.paymentProfileId = undefined;
				self.editionMode = true;

				$('#i18n_payMyBillNameInput').val("");
				$('#i18n_payMyBillCardNumberInput').val("");
				if(self.useMonthInputType) {
					$('#i18n_payMyBillExpirationDateInput').val("").addClass("notValued").removeClass("error");
				}
				else {
					$("#payMyBillExpirationDateMonth").val("").addClass("notValued").trigger("change");
					$("#payMyBillExpirationDateYear").val("").addClass("notValued").trigger("change");
				}
				$('#payMyBillCardType').val("").trigger("change");
				$('#i18n_payMyBillPostalCodeInput').val("");
				
				this.$element.find('.ap').unbind('focus.autopayfill').unbind('blur.autopayfill');
			}
		},
		
		onHide : function(){
			$('#footer').removeClass('fixfix').attr("aria-hidden", "false");
		},

		/**
		 * Fetch the data from the remote server
		 */
		fetch : function() {
			var self = this;
			this.$element.removeClass('failed_to_load');
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function() {
				self.isLoading = false;
				self.application.unBlockUI();
				/* TODO : defect #870 */
				if(self.model.attr && self.model.attr.autoPayDetails && self.model.attr.autoPayDetails.autoPayExists){
					var options = {};
					options.summary = {};
					options.summary.autopay = self.model.attr.autoPayDetails;
					self._preFilled(options);
				}
				
				// Show / Hide the combobox of multiline account
				if(self.model.attr && self.model.attr && self.model.attr.subscribers.length > 1){
					self.subscribers = self.model.attr.subscribers;

					// empty the combobox before to populate it
					$.each($('#payMyBillMultilineSelect option'), function(id, item){
						if(id > 0){
							$(item).remove();
						}
					});
					
					$.each(self.model.attr.subscribers, function(){
						if(this.status != 'pendingActivation')
							$('#payMyBillMultilineSelect').append('<option role="option" value="'+this.ctn+'">'+ self.application.displayPhoneNumber(this.ctn) +'</option>');
					});
					
					// pre-selection : only one choice
					if($('#payMyBillMultilineSelect option').length == 2){
						$('#payMyBillMultilineSelect').val($('#payMyBillMultilineSelect option').last().val()).trigger("change");
					}
				}
			};
			var homeSuccess = function(){
				this.currentJqxhr = self.application.connector.getHomeAutoPay(done,done, "REFUEL");
			};
			this._validate();
			this._checkAmount();
			self.isLoading = true;
			this.currentJqxhr = this.application.connector.getHome(homeSuccess,done, "REFUEL");
			window.setTimeout(this.layout.bind(this), 100);
		},
		
		_onSubmit : function(){
			var self = this;
			
			this.paymentModel.set({
				amount : $('#i18n_payMyBillAmountInput').val(),
				name : $('#i18n_payMyBillNameInput').val(),
				cardType : $('#payMyBillCardType').val(),
				cardNumber : $('#i18n_payMyBillCardNumberInput').val(),
				securityCode : $('#i18n_payMyBillSecurityCodeInput').val(),
				expirationDate : (function() {
					if(self.useMonthInputType) {
						return moment($('#i18n_payMyBillExpirationDateInput').val(), "YYYY-MM").format("MM/YY");
					}
					else {
						return moment($('#payMyBillExpirationDateYear').val() + "-" + $('#payMyBillExpirationDateMonth').val(), "YYYY-MM").format("MM/YY");
					}
				})(),
				postalCode : $('#i18n_payMyBillPostalCodeInput').val(),
				autoPay : $('#payMyBillAutoPayCheckBox').is(':checked'),
				pinCode : $('#i18n_payMyBillPinInput').val(),
				ctn : (function(){
					if(self.subscribers.length > 1){
						return $("#payMyBillMultilineSelect").val();
					} 
					else
						return self.model.attr.subscribers[0].ctn;
				})()
			});
			
			// Fill review page
			$('#i18n_payMyBillReviewAmountInput').val(this.paymentModel.get('amount'));
			$('#i18n_payMyBillReviewAmountToPayValue').html(self.application.displayPrice(this.paymentModel.get('amount')));
			$('#i18n_payMyBillReviewNameCardValue').html(this.paymentModel.get('name'));
			$('#i18n_payMyBillReviewCardNumberValue').html(self.application.maskCCNumber(this.paymentModel.get('cardNumber')));
			$('#i18n_payMyBillReviewExpirationCardValue').html(moment(this.paymentModel.get('expirationDate'), 'MM/YY').format("MM/YYYY"));


			// Fill confirmation page
			$('#payMyBillConfirmationName').text(this.paymentModel.get('name'));
			$('#payMyBillConfirmationCardNumber').text(self.application.maskCCNumber(this.paymentModel.get('cardNumber')));
			$('#payMyBillConfirmationExpirationDate').text(moment(this.paymentModel.get('expirationDate'), 'MM/YY').format("MM/YYYY"));
			
			var options = {};
			if(!this.editionMode && this.paymentProfileId)
				options.paymentProfileId = this.paymentProfileId;
			options.payment = this.paymentModel.attr;
			options.summary = this.homeModel;
			
			self.application.gotoPage('payMyBillReviewPage', options);
		},
		
		_checkAmount : function(){
			var $i18n_payMyBillAmountInput = $('#i18n_payMyBillAmountInput');
			
			if($i18n_payMyBillAmountInput.val() != '' && $i18n_payMyBillAmountInput.val().length < 8){
				$i18n_payMyBillAmountInput.addClass('dollar');
			} else {
				$i18n_payMyBillAmountInput.removeClass('dollar');
			}
		},
		
		_validate : function(){
			// Init form validator
			var self = this;

			var $payMyBillCardType = $('#payMyBillCardType');
			var cardNumber = $('#i18n_payMyBillCardNumberInput').val();
			var $i18n_payMyBillAmountInput = $('#i18n_payMyBillAmountInput');
			var $i18n_payMyBillSecurityCodeInput = $('#i18n_payMyBillSecurityCodeInput');
			var $i18n_payMyBillNameInput = $('#i18n_payMyBillNameInput');
			var $termsAndConditions = $('#termsAndConditions');
			var $autoPayCheckbox = $('#payMyBillAutoPayCheckBox');
			var expirationDateInput = (function() {
				if(self.useMonthInputType) {
					return $("#i18n_payMyBillExpirationDateInput").val();
				}
				else {
					return $("#payMyBillExpirationDateYear").val() + "-" + $("#payMyBillExpirationDateMonth").val(); 
				}
			})();
			var $i18n_payMyBillPostalCodeInput = $('#i18n_payMyBillPostalCodeInput');
			var $multilineAccount = $('#payMyBillMultilineSelect');
			var $pinSecurityInput = $('#i18n_payMyBillPinInput');
			
			var checkAmount = $i18n_payMyBillAmountInput.val() != "" && self.application.formValidator.price($i18n_payMyBillAmountInput.val()) && $i18n_payMyBillAmountInput.val() > 0,
			checkName = $i18n_payMyBillNameInput.val() != "" && self.application.formValidator.cardName($i18n_payMyBillNameInput.val()),
			checkCardNumber = (this.editionMode != undefined && !this.editionMode) ? true : cardNumber != "" &&  
											self.application.formValidator.cardNumber(cardNumber) && (
												$payMyBillCardType.val() == 'AE' && cardNumber.length == 15 ||
												$payMyBillCardType.val() != 'AE' && cardNumber.length == 16
											),
			checkSecurityCode = $i18n_payMyBillSecurityCodeInput.val() != "" && 
				self.application.formValidator.cardSecurityCode($i18n_payMyBillSecurityCodeInput.val()) &&
				(
					$payMyBillCardType.val() == 'AE' && $i18n_payMyBillSecurityCodeInput.val().length == 4 ||
					$payMyBillCardType.val() != 'AE' && $i18n_payMyBillSecurityCodeInput.val().length == 3
				)
				,
			checkExpiration = expirationDateInput != "" && self.application.formValidator.cardExpirationDate(expirationDateInput),
			checkPostalCode = (this.editionMode != undefined && !this.editionMode) ? true : $i18n_payMyBillPostalCodeInput.val() != "" && self.application.formValidator.postalCode($i18n_payMyBillPostalCodeInput.val()),
			checkTermsActivated = $termsAndConditions.val() != "" && $termsAndConditions.is(':checked'),
			checkCardType = $payMyBillCardType.val() != "";
			checkPinSecurity = ($autoPayCheckbox.val() != "" && $autoPayCheckbox.is(':checked') && 
					self.application.formValidator.cardSecurityCode($pinSecurityInput.val()) && 
					$pinSecurityInput.val().length == 4) 
					|| !$autoPayCheckbox.is(':checked');
			checkAccount = ($autoPayCheckbox.val() != "" && $autoPayCheckbox.is(':checked') && self.subscribers != undefined && self.subscribers.length>1)? $multilineAccount.val() != "" : true;
			
			if (checkAmount && checkName && checkCardNumber && checkSecurityCode && checkExpiration && checkPostalCode && checkTermsActivated && checkCardType && checkAccount && checkPinSecurity) {
				$('#i18n_payMyBillPayNowButton').removeClass('disabled').attr("aria-disabled", "false");
			} else {
				$('#i18n_payMyBillPayNowButton').addClass('disabled').attr("aria-disabled", "true");
			}
		},
		
		layout : function() {
			var firstItem = $('#payMyBillPage form .list-container .list-item:not(.wp7)')[0];
			//$(firstItem).css('margin', '0');
			
			
			var divToResize = $('#payMyBillPage').find('.sub-page');
			divToResize.css('padding-top', '0px');
//			divToResize.css('margin-top', '-5px');
			divToResize.height('auto');

			if(this.homeModel.accountStatus == "Hot Lined" )
				$('#payMyBillPage').find('.page-bottom-margin').addClass('hotlined-bottom');
			else
				$('#payMyBillPage').find('.page-bottom-margin').removeClass('hotlined-bottom');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = $(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#payMyBillPage').find('.page-bottom-margin').height();
			if(freeSpace < (this.application.minFreeSpaceValue + 60)) freeSpace = this.application.minFreeSpaceValue + 60;
			var newSubPageHeight = heightOfSubPage + (3*freeSpace)/4;

			divToResize.css('padding-top', parseInt(freeSpace/4/2) +'px');
//			divToResize.css('margin-top', parseInt(freeSpace/4/2) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');

			var secondItem = $('#payMyBillPage form .list-container .list-item:not(.wp7)')[1];
			var secondItemMarginTop = $(secondItem).css('margin-top');
			//$(firstItem).css('margin-top', secondItemMarginTop);
		},
		
		onRefresh : function() {
			if (!this.isVisible)
				return;
			var json = this.model.attr, self = this; 
			var $payMyBillPage = $("#payMyBillPage");
			var $payMyBillAmountInput = $("#i18n_payMyBillAmountInput");

			// hotlined cases
			this.homeModel = this.application.connector.homeModel.attr;
			
			if(this.homeModel.accountStatus == "Hot Lined" ){

				/*
				 * TODO : defect #870
				$payMyBillPage.find(".back-button").hide().attr("aria-hidden", "true");
				*/
				$payMyBillPage.find(".history").hide().attr("aria-hidden", "true");
				$payMyBillPage.find(".page-bottom-margin").hide().attr("aria-hidden", "true");
				/*
				 * TODO : defect #870
				$('#i18n_payMyBillPayNowButton').removeClass('inline-button').removeClass('button-right').addClass('large-button');
				*/
				$("#footer").hide().attr("aria-hidden", "true");
				$payMyBillPage.find(".spacer").hide().attr("aria-hidden", "true");
				var elt1 = $('<div/>').text('Your account is hotlined.');
				var elt2 = $('<div/>').text('Please pay now.');
				$payMyBillPage.find('.hotlined').html(elt1).append(elt2).show().attr("aria-hidden", "false");
			} else {
				/*
				 * TODO : defect #870
				$payMyBillPage.find(".back-button").show().attr("aria-hidden", "false");
				*/
				$payMyBillPage.find(".history").show().attr("aria-hidden", "false");
				$payMyBillPage.find(".page-bottom-margin").show().attr("aria-hidden", "false");
				/*
				 * TODO : defect #870
				$('#i18n_payMyBillPayNowButton').addClass('inline-button').addClass('button-right').removeClass('large-button');
				*/
				$("#footer").show().attr("aria-hidden", "false");
				$payMyBillPage.find(".spacer").show().attr("aria-hidden", "false");
				$payMyBillPage.find('.hotlined').hide().attr("aria-hidden", "true");
			}
			
			var $payMyBillOwe = $('#payMyBillOwe'); 
			var $payMyBillCredit = $('#payMyBillCredit');
			
			$payMyBillOwe.html(self.application.displayPrice(json.amountDueToday));
			if($payMyBillAmountInput.val() == "" || parseFloat($payMyBillAmountInput.val()) == 0){
				$payMyBillAmountInput.val(json.amountDueToday);
				$("#payMyBillAmountText").text(json.amountDueToday.toString() + " dollar" + (json.amountDueToday > 1 ? "s" : ""));
			}
			$payMyBillCredit.html(self.application.displayPrice(json.accountBalance));
			
			// CATO fix : Talkback is not able to read "zero dollars" ...
			if(self.application.model.isAndroid) {
				if($payMyBillAmountInput.val() <= 0) {
					$payMyBillOwe.attr("aria-labelledby", "zeroDollar");
				}
				else {
					$payMyBillOwe.removeAttr("aria-labelledby");
				}
				if(json.accountBalance <= 0) {
					$payMyBillCredit.attr("aria-labelledby", "zeroDollar");
				}
				else {
					$payMyBillCredit.removeAttr("aria-labelledby");
				}
			}
			
			self._checkAmount();
			window.setTimeout(this.layout.bind(this), 100);
		},

		_onShowScroller : function(html, valueText, inst){
			this.activeChooserInstance = inst;
		},
		
		_onCloseScroller : function(html, valueText, inst){
			this.activeChooserInstance = null;
		},
		
		_blurEditModeCheck : function(){
			var self = this;
			var name = $('#i18n_payMyBillNameInput').val();
			var type = $('#payMyBillCardType').val();
			var num = $('#i18n_payMyBillCardNumberInput').val();
			var secCode = $('#i18n_payMyBillSecurityCodeInput').val();
			var date;
			if(self.useMonthInputType) {
				date = $('#i18n_payMyBillExpirationDateInput').val();
			}
			else {
				date = $('#payMyBillExpirationDateMonth').val() + $('#payMyBillExpirationDateYear').val();
			}
			var zipCode = $('#i18n_payMyBillPostalCodeInput').val();
			var expDate = "";

			if(name == "" && type == "" && num == "" && secCode == "" && date == "" && zipCode == "") {
				if(this.autopay){
					this.editionMode = false;
					expDate = moment(this.autopay.cardExpirationDate, "MMYY");
					$('#i18n_payMyBillNameInput').val(this.autopay.cardName);
					if(self.useMonthInputType) {
						$('#i18n_payMyBillExpirationDateInput').val(expDate.format("YYYY-MM")).trigger("change");
					}
					else {
						$('#payMyBillExpirationDateYear').val(expDate.format("YYYY")).removeClass("notValued").trigger("change");
						$('#payMyBillExpirationDateMonth').val(expDate.format("MM")).removeClass("notValued").trigger("change");
					}
					$('#payMyBillCardType').val(this.autopay.cardType).trigger("change");
//					$('#i18n_payMyBillPostalCodeInput').prop('disabled', true);
					$('#i18n_payMyBillCardNumberInput').val(self.application.maskCCNumberForInput(this.autopay.cardNumber));
					$('#i18n_payMyBillPostalCodeInput').val(this.autopay.postalCode);
				}
			}
		},
		
		_onChangeScroller : function(){
			if(this.editionMode) return;
			this.editionMode = true;
			$('#i18n_payMyBillNameInput').val('');
			$('#payMyBillCardType').val('').trigger("change");
			$('#i18n_payMyBillCardNumberInput').val('');
			$('#i18n_payMyBillSecurityCodeInput').val('');
			if(this.useMonthInputType) {
				$('#i18n_payMyBillExpirationDateInput').val('').addClass("notValued").removeClass("error");
			}
			else {
				$("#payMyBillExpirationDateMonth").val('').addClass("notValued").trigger("change");
				$("#payMyBillExpirationDateYear").val('').addClass("notValued").trigger("change");
			}
			$('#i18n_payMyBillPostalCodeInput').val('');
			$('#i18n_payMyBillPostalCodeInput').prop('disabled', false).attr("aria-disabled", "false");
			$('#i18n_payMyBillPostalCodeInput input').removeClass('error').attr("aria-invalid", "false");
		},
		
		onBack : function(event){
			event.preventDefault();
			if(this.activeChooserInstance != null){
				this.activeChooserInstance.hide().attr("aria-hidden", "true");
				return;
			}
			if($('#securityCode')[0]){
				this.application.hideSecurityCodeHelper();
				return;
			}
			if(!this.isLoading){
				if(this.homeModel && this.homeModel.accountStatus && this.homeModel.accountStatus == "Hot Lined") {
					//do nothing
					event.preventDefault();
				} else {
					this.application.gotoPage('homePage');
				}
			}
		}
	};

	Pages.PayMyBillPage = MVC.Page.extend(methods);

})($, MVC);