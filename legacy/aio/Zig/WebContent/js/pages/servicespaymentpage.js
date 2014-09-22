(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.activeChooserInstance = null;
			this.paymentModel = new MVC.Model();
			this.paymentModel.set({
				amount : 0,
				name : '',
				cardType : '',
				cardNumber : '',
				securityCode : '',
				expirationDate : '',
				postalCode : '',
			});
			this.autopay = undefined;
			this.paymentProfileId = undefined;
			this.editionMode = true;

			this.useMonthInputType = self.application.model.isIos;
			
			// Set active state on navigation link and title
			self.application.setNavLinkActive('#myPlanPage');  

//			var $fastClickedElements = $("#servicesPaymentTermsCondition_1, #servicesPaymentTermsCondition_2, #servicesPaymentCancelButton, #servicesPaymentPayNowButton, #servicesPaymentPage .back-button");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};


			if(this.useMonthInputType) {
				this.$element.find(".cardExpirationDateControlWrapper").remove();
				this.application.formValidator.configureCardExpirationDate($("#servicesPaymentExpirationDateInput"), self._validate);
				$("#servicesPaymentExpirationDateInput").bind("change", function() {
					var $that = $(this);
					
					$that[$that.val() ? "removeClass" : "addClass"]("notValued");
				});
			}
			else {
				self.$element.find("input[type=month]").remove();
				var $servicesPaymentExpirationDateYear = $("#servicesPaymentExpirationDateYear"), currentYear = (new Date()).getFullYear(), htmlStr = "";
				
				for(var i = currentYear; i < currentYear + self.application.cardValidityYearNumber; i++) {
					htmlStr += '<option role="option">' + i.toString() + '</option>';
				}
				
				$servicesPaymentExpirationDateYear.append(htmlStr);
			}			
			$('#servicesPaymentNameInput')[0].oninput = $('#servicesPaymentTermsAndConditions')[0].onchange = function() {
				var $servicesPaymentTermsAndConditions = $('#servicesPaymentTermsAndConditions');
				$servicesPaymentTermsAndConditions.attr("aria-checked", $servicesPaymentTermsAndConditions[0].checked ? "true" : "false");
				
				// Activate or deactivate button
				self._validate();
			};
									
			$('#servicesPaymentPage').find('.query').tap(function() {
				self.application.displaySecurityCodeHelper($('#servicesPaymentCardType').val());
			});
			
			$('#servicesPaymentPayNowButton').tap(function() {
				if (!$(this).hasClass('disabled')){
					self._onSubmit();
				}
			});
			
			$('#servicesPaymentTermsAndConditions').click('change', function(){
				$(this).attr("aria-checked", this.checked ? "true" : "false");
			});
			
			$('#servicesPaymentTermsAndConditions + span').tap(function(){
				var servicesPaymentTermsAndConditions = document.getElementById("servicesPaymentTermsAndConditions");
				var $servicesPaymentTermsAndConditions = $(servicesPaymentTermsAndConditions);

				if(servicesPaymentTermsAndConditions) {
					servicesPaymentTermsAndConditions.checked = !servicesPaymentTermsAndConditions.checked;
					$servicesPaymentTermsAndConditions.attr("aria-checked", servicesPaymentTermsAndConditions.checked ? "true" : "false");
					self._validate();
				}
			});

			// Validator on card number
			var checkCardNumberFct = function() {
				var $servicesPaymentCardType = $('#servicesPaymentCardType');
				var $servicesPaymentCardNumberInput = $('#servicesPaymentCardNumberInput');
				
				var checkCardNumber = $servicesPaymentCardType.val() == 'AE' && $servicesPaymentCardNumberInput.val().length == 15 ||
				$servicesPaymentCardType.val() != 'AE' && $servicesPaymentCardNumberInput.val().length == 16;
				
				if($servicesPaymentCardNumberInput.val() != "" && !self.application.formValidator.digits($servicesPaymentCardNumberInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $servicesPaymentCardNumberInput.val().replace(reg, "");
					$servicesPaymentCardNumberInput.val(newValue);
				} else if($servicesPaymentCardNumberInput.val() != "" && (!self.application.formValidator.cardNumber($servicesPaymentCardNumberInput.val()) || !checkCardNumber)){
					$servicesPaymentCardNumberInput.addClass('error').attr("aria-invalid", "true");
				} else
					$servicesPaymentCardNumberInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			// validator on security code
			var checkSecurityCodeFct = function(){
				var $servicesPaymentCardType = $('#servicesPaymentCardType');
				var $servicesPaymentSecurityCodeInput = $('#servicesPaymentSecurityCodeInput');
				
				var checkSecurityCode = $servicesPaymentCardType.val() == 'AE' && $servicesPaymentSecurityCodeInput.val().length == 4 ||
				$servicesPaymentCardType.val() != 'AE' && $servicesPaymentSecurityCodeInput.val().length == 3;
				
				if($servicesPaymentSecurityCodeInput.val() != "" && !self.application.formValidator.digits($servicesPaymentSecurityCodeInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $servicesPaymentSecurityCodeInput.val().replace(reg, "");
					$servicesPaymentSecurityCodeInput.val(newValue);
				} else if($servicesPaymentSecurityCodeInput.val() != "" && !checkSecurityCode){
					$servicesPaymentSecurityCodeInput.addClass('error').attr("aria-invalid", "true");
				} else
					$servicesPaymentSecurityCodeInput.removeClass('error').attr("aria-invalid", "false");
				
				self._validate();
			};
			$('#servicesPaymentCardNumberInput')[0].oninput = function(){
				checkCardNumberFct();
			};
			$('#servicesPaymentExpirationDateMonth').change(function(){
				var $that = $(this), now = moment();				
				
				if($that.val()) {
					if(this.value < (now.month() + 1) && $('#servicesPaymentExpirationDateYear').val() <= now.year()) {
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
			$('#servicesPaymentExpirationDateYear').change(function(){
				var $that = $(this), $servicesPaymentExpirationDateMonth = $("#servicesPaymentExpirationDateMonth"), now = moment();				
				
				if($that.val()) {
					if($servicesPaymentExpirationDateMonth.val() < (now.month() + 1) && $that.val() <= now.year()) {
						$servicesPaymentExpirationDateMonth.attr("aria-invalid", "true").addClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$servicesPaymentExpirationDateMonth.prev(".select-label").attr("aria-invalid", "true").addClass("error");
						}
					}
					else {
						$servicesPaymentExpirationDateMonth.attr("aria-invalid", "false").removeClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$servicesPaymentExpirationDateMonth.prev(".select-label").attr("aria-invalid", "false").removeClass("error");
						}
					}
				}

				self._validate();
			});
			$('#servicesPaymentExpirationDateYear, #servicesPaymentExpirationDateMonth').change(function() {
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
			$('#servicesPaymentCardType').change(function(){
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
			$('#servicesPaymentSecurityCodeInput')[0].oninput = function(){
				checkSecurityCodeFct();
			};
			// validator in postal code
			$('#servicesPaymentPostalCodeInput')[0].oninput = function(){
				var $servicesPaymentPostalCodeInput = $('#servicesPaymentPostalCodeInput');
				
				if($servicesPaymentPostalCodeInput.val() != "" && !self.application.formValidator.digits($servicesPaymentPostalCodeInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $servicesPaymentPostalCodeInput.val().replace(reg, "");
					$servicesPaymentPostalCodeInput.val(newValue);
				} else if($servicesPaymentPostalCodeInput.val() != "" && !self.application.formValidator.postalCode($servicesPaymentPostalCodeInput.val())){
					$servicesPaymentPostalCodeInput.addClass('error').attr("aria-invalid", "true");
				} else
					$servicesPaymentPostalCodeInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			
			$('#servicesPaymentCardTypeArrow').tap(function(){
				if(self.application.model.isAndroid) {
					$('#servicesPaymentCardType').show();
					window.setTimeout(function() {
						application.showDropdown($('#servicesPaymentCardType')[0]);
					}, 50);
				}
				else {
					$('#servicesPaymentCardType').focus();
				}
			});
			
			this.$element.find('.ap').bind('focus', function() {
				if(!self.editionMode){
					self.editionMode = true;
					$('#servicesPaymentNameInput').val('');
					$('#servicesPaymentCardNumberInput').val('');
					if(self.useMonthInputType) {
						$('#servicesPaymentExpirationDateInput').val('').addClass("notValued").removeClass("error");
					}
					else {
						$("#servicesPaymentExpirationDateMonth").val('').addClass("notValued").trigger("change");
						$("#servicesPaymentExpirationDateYear").val('').addClass("notValued").trigger("change");
					}							 
					$('#servicesPaymentSecurityCodeInput').val('');
					$('#servicesPaymentCardType').val('').trigger("change");
					$('#servicesPaymentPostalCodeInput').val('');
//					$('#servicesPaymentPostalCodeInput').prop('disabled', false);
					$('#servicesPaymentPage').find('input.error, select.error').removeClass('error').attr("aria-invalid", "false");
				}
			});
			
			var $servicesPaymentAmountInput = $('#servicesPaymentAmountInput');
			$servicesPaymentAmountInput.after('<span style="display:none;" id="payMyServicesAmountText" aria-hidden="true"></span>');
			$servicesPaymentAmountInput.attr("aria-labelledby", "payMyServicesAmountText");

			this.$element.find('.ap').bind('blur', function() {
				var name = $('#servicesPaymentNameInput').val();
				var type = $('#servicesPaymentCardType').val();
				var num = $('#servicesPaymentCardNumberInput').val();
				var secCode = $('#servicesPaymentSecurityCodeInput').val();
				var date;
				if(self.useMonthInputType) {
					date = $('#servicesPaymentExpirationDateInput').val();
				}
				else {
					date = $('#servicesPaymentExpirationDateMonth').val() + $('#servicesPaymentExpirationDateYear').val();
				}
				var zipCode = $('#servicesPaymentPostalCodeInput').val();

				if(self.autopay && name == "" && type == "" && num == "" && secCode == "" && date == "" && zipCode == "") {
					self.editionMode = false;
					if(self.autopay){
						$('#servicesPaymentNameInput').val(self.autopay.cardName);
						var expDate = moment(self.autopay.cardExpirationDate, "MMYY");
						if(self.useMonthInputType) {
							$('#servicesPaymentExpirationDateInput').val(expDate.format("YYYY-MM")).trigger("change");
						}
						else {
							$('#servicesPaymentExpirationDateYear').val(expDate.format("YYYY")).removeClass("notValued").trigger("change");
							$('#servicesPaymentExpirationDateMonth').val(expDate.format("MM")).removeClass("notValued").trigger("change");
						}
						$('#servicesPaymentCardType').val(self.autopay.cardType).trigger("change");
						$('#servicesPaymentCardNumberInput').val(self.application.maskCCNumberForInput(self.autopay.cardNumber));
//						$('#servicesPaymentPostalCodeInput').prop('disabled', true);
						$('#servicesPaymentPostalCodeInput').val(self.autopay.postalCode);
					}
				}
			});

			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage('myPlanPage', {fromBack : true});
			});
			
			$('#servicesPaymentTermsCondition_2').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/terms_mobileview');
				}
				return false;
			});
			
			if(!self.application.model.isWinPhone && !self.application.android_le) {
				self.application.setupLabelledDropdown($("#servicesPaymentCardType, #servicesPaymentExpirationDateMonth, #servicesPaymentExpirationDateYear"));
			}

			self.application.initKeyboardListeners(this.$element.find('.vb'));
			
			// Bad behavior when an input is focused
			// $(window).bind('resize',this.layout.bind(this));
		},

		onShow : function(options) {
			$('#footer').removeClass('fixfix').attr("aria-hidden", "false");
			if(!options || !options.fromBack ){
				this.paymentModel.set({
					amount : 0,
					name : '',
					cardType : '',
					cardNumber : '',
					securityCode : '',
					expirationDate : '',
					postalCode : '',
				});
				$('#servicesPaymentNameInput').val(null);
				$('#servicesPaymentCardNumberInput').val(null);
				$('#servicesPaymentCardType').val(null).trigger("change");
				$('#servicesPaymentSecurityCodeInput').val(null);
				if(this.useMonthInputType) {
					$('#servicesPaymentExpirationDateInput').val(null).addClass("notValued").removeClass("error");
				}
				else {
					$("#servicesPaymentExpirationDateMonth").val(null).addClass("notValued").trigger("change");
					$("#servicesPaymentExpirationDateYear").val(null).addClass("notValued").trigger("change");
				}	
				$('#servicesPaymentPostalCodeInput').val(null);
				$('#servicesPaymentTermsAndConditions').attr('checked', false).attr("aria-checked", "false");
				
				this.summary = options.summary;
			}
			if(options && options.transactionInfos){
				this.transactionInfos = options.transactionInfos
			}
			this._validate();
			this.fetch();
			window.setTimeout(this.layout.bind(this), 100);
		},

		onHide : function(){
			$('#footer').removeClass('fixfix').attr("aria-hidden", "false");
		},
		/**
		 * Fetch the data from the remote server
		 */
		fetch : function() {
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function(){
				self.application.unBlockUI();
			};
			self.application.connector.getServicePaymentAutoPay(done, done);
		},
		
		_onShowScroller : function(html, valueText, inst){
			this.activeChooserInstance = inst;
		},
		
		_onCloseScroller : function(html, valueText, inst){
			this.activeChooserInstance = null;
		},
		
		_onChangeScroller : function(){
			if(this.editionMode) return;
			this.editionMode = true;
			$('#servicesPaymentNameInput').val('');
			$('#servicesPaymentCardNumberInput').val('');
			if(this.useMonthInputType) {
				$('#servicesPaymentExpirationDateInput').val('').addClass("notValued").removeClass("error");
			}
			else {
				$("#servicesPaymentExpirationDateMonth").val('').addClass("notValued").trigger("change");
				$("#servicesPaymentExpirationDateYear").val('').addClass("notValued").trigger("change");
			}
			$('#servicesPaymentSecurityCodeInput').val('');
			$('#servicesPaymentCardType').val('').trigger("change");
			$('#servicesPaymentPostalCodeInput').val('');
//			$('#servicesPaymentPostalCodeInput').prop('disabled', false);
			$('#servicesPaymentPage').find('input.error, select.error').removeClass('error').attr("aria-invalid", "false");
		},
		
		onBack : function(event) {
			if(event)
				event.preventDefault();
			if(this.activeChooserInstance != null){
				this.activeChooserInstance.hide().attr("aria-hidden", "true");
				return;
			}
			if($('#securityCode')[0]){
				this.application.hideSecurityCodeHelper();
				return;
			}
			this.application.gotoPage('myPlanPage', {fromBack : true});
		},
		
		_onSubmit : function(){
			var json = this.model.attr, self = this; 
			
			this.paymentModel.set({
				amount : json.immediatePayment.totalAmount,
				name : $('#servicesPaymentNameInput').val(),
				cardType : $('#servicesPaymentCardType').val(),
				cardNumber : $('#servicesPaymentCardNumberInput').val(),
				securityCode : $('#servicesPaymentSecurityCodeInput').val(),
				expirationDate : (function() {
					if(self.useMonthInputType) {
						return moment($('#servicesPaymentExpirationDateInput').val(), "YYYY-MM").format("MM/YY");
					}
					else {
						return moment($('#servicesPaymentExpirationDateYear').val() + "-" + $('#servicesPaymentExpirationDateMonth').val(), "YYYY-MM").format("MM/YY");
					}
				})(),
				postalCode : $('#servicesPaymentPostalCodeInput').val(),
			});
//			self.paymentProfileId = "dqlfhqdf";
			var options = {};
			if(!self.editionMode && self.paymentProfileId)
				options.paymentProfileId = self.paymentProfileId;
			options.payment = self.paymentModel.attr;
			options.summary = self.summary;
			
			if(this.transactionInfos)
				options.transactionInfos = this.transactionInfos;
			self.application.gotoPage('manageServicesConfirmationPage', options);
		},
		
		_validate : function(){
			var self = this;
			var $servicesPaymentNameInput = $('#servicesPaymentNameInput');
			var $servicesPaymentCardType = $('#servicesPaymentCardType');
			var $servicesPaymentCardNumberInput = $('#servicesPaymentCardNumberInput');
			var $servicesPaymentSecurityCodeInput = $('#servicesPaymentSecurityCodeInput');
			var expirationDateInput = (function() {
				if(self.useMonthInputType) {
					return $("#servicesPaymentExpirationDateInput").val();
				}
				else {
					return $("#servicesPaymentExpirationDateYear").val() + "-" + $("#servicesPaymentExpirationDateMonth").val(); 
				}
			})();
			var $servicesPaymentPostalCodeInput = $('#servicesPaymentPostalCodeInput');
			var $servicesPaymentTermsAndConditions = $('#servicesPaymentTermsAndConditions');
			
			var	checkName = $servicesPaymentNameInput.val() != "" && self.application.formValidator.cardName($servicesPaymentNameInput.val()),
			checkCardNumber = !self.editionMode ? true : $servicesPaymentCardNumberInput.val() != "" && 
					self.application.formValidator.cardNumber($servicesPaymentCardNumberInput.val()) &&
					(
						$servicesPaymentCardType.val() == 'AE' && $servicesPaymentCardNumberInput.val().length == 15 ||
						$servicesPaymentCardType.val() != 'AE' && $servicesPaymentCardNumberInput.val().length == 16
					),
			checkSecurityCode = $servicesPaymentSecurityCodeInput.val() != "" && 
				self.application.formValidator.cardSecurityCode($servicesPaymentSecurityCodeInput.val()) &&
				(
					$servicesPaymentCardType.val() == 'AE' && $servicesPaymentSecurityCodeInput.val().length == 4 ||
					$servicesPaymentCardType.val() != 'AE' && $servicesPaymentSecurityCodeInput.val().length == 3
				)
				,
			checkExpiration = expirationDateInput != "" && self.application.formValidator.cardExpirationDate(expirationDateInput),
			checkPostalCode = !self.editionMode ? true : $servicesPaymentPostalCodeInput.val() != "" && self.application.formValidator.postalCode($servicesPaymentPostalCodeInput.val()),
			checkTermsActivated = $servicesPaymentTermsAndConditions.val() != "" &&  $servicesPaymentTermsAndConditions.is(':checked'),
			checkCardType = $servicesPaymentCardType.val() != "";
			
			if (checkName && checkCardNumber && checkSecurityCode && checkExpiration && checkPostalCode && checkTermsActivated && checkCardType) {
				$('#servicesPaymentPayNowButton').removeClass('disabled').attr("aria-disabled", "false");
			} else {
				$('#servicesPaymentPayNowButton').addClass('disabled').attr("aria-disabled", "true");
			}
		},
		
		layout : function() {
			/*
			var firstItem = $('#servicesPaymentPage form .list-container .list-item:not(.wp7)')[0];
			$(firstItem).css('margin', '0');
			
			var divToResize = $('#servicesPaymentPage').find('.sub-page');
			divToResize.css('padding-top', '0px');
			divToResize.css('margin-top', '-5px');
			divToResize.height('auto');

			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#servicesPaymentPage').find('.page-bottom-margin').height();
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + (3*freeSpace)/4;

			divToResize.css('padding-top', parseInt(freeSpace/4/2) +'px');
			divToResize.css('margin-top', parseInt(freeSpace/4/2) +'px');
			divToResize.css('min-height', parseInt(newSubPageHeight) + 'px');

			var secondItem = $('#servicesPaymentPage form .list-container .list-item:not(.wp7)')[1];
			var secondItemMarginTop = $(secondItem).css('margin-top');
			$(firstItem).css('margin-top', secondItemMarginTop);*/
		},
		
		onRefresh : function() {
			var json = this.model.attr, self = this;
			var $servicesPaymentAmountInput = $('#servicesPaymentAmountInput');
			if (json.immediatePayment && json.immediatePayment.totalAmount) {
				$('#servicesPaymentOwe').html(self.application.displayPrice(json.immediatePayment.totalAmount));
				$('#servicesPaymentCredit').html(self.application.displayPrice(json.arBalance));
				$servicesPaymentAmountInput.val(json.immediatePayment.totalAmount).addClass('dollar');
				$("#payMyServicesAmountText").text(json.immediatePayment.totalAmount.toString() + " dollar" + (json.immediatePayment.totalAmount > 1 ? "s" : ""));
			} else {
				$('#servicesPaymentCredit').parent().hide().attr("aria-hidden", "true");
				$servicesPaymentAmountInput.val('').removeClass('dollar');
			}

			// Get autopay infos
			if(json.autopay && json.autopay.autoPayExists) {
				self.autopay = json.autopay;
				self.paymentProfileId = json.autopay.paymentProfileId;
				self.editionMode = false;
				
				$('#servicesPaymentNameInput').val(self.autopay.cardName);
				var expDate = moment(self.autopay.cardExpirationDate, "MMYY");
				if(self.useMonthInputType) {
					$('#servicesPaymentExpirationDateInput').val(expDate.format("YYYY-MM")).trigger("change");
				}
				else {
					$('#servicesPaymentExpirationDateYear').val(expDate.format("YYYY")).removeClass("notValued").trigger("change");
					$('#servicesPaymentExpirationDateMonth').val(expDate.format("MM")).removeClass("notValued").trigger("change");
				}
				$('#servicesPaymentCardType').val(self.autopay.cardType).trigger("change");
//				$('#servicesPaymentPostalCodeInput').prop('disabled', true);
				$('#servicesPaymentCardNumberInput').val(self.application.maskCCNumberForInput(self.autopay.cardNumber));
				$('#servicesPaymentPostalCodeInput').val(self.autopay.postalCode);
			} else {
				self.autopay = undefined;
				self.paymentProfileId = undefined;
				self.editionMode = true;

				$('#servicesPaymentNameInput').val('');
				$('#servicesPaymentCardNumberInput').val('');
				if(self.useMonthInputType) {
					$('#servicesPaymentExpirationDateInput').val('').addClass("notValued").removeClass("error");
				}
				else {
					$("#servicesPaymentExpirationDateMonth").val('').addClass("notValued").trigger("change");
					$("#servicesPaymentExpirationDateYear").val('').addClass("notValued").trigger("change");
				}
				$('#servicesPaymentCardType').val('').trigger("change");
				$('#servicesPaymentSecurityCodeInput').val('');
//				$('#servicesPaymentPostalCodeInput').prop('disabled', false);
				$('#servicesPaymentPostalCodeInput').val('');
			}
			window.setTimeout(this.layout.bind(this), 100);
		}
	};

	Pages.ServicesPaymentPage = MVC.Page.extend(methods);

})($, MVC);