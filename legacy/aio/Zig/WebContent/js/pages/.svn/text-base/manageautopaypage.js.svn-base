(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	//TODO use the global formValidator object.
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this, sub = function() {
//				location.hash = "ns-manageAutopayPage";
				self.application.gotoPage('manageAutopayPage');
				return false;
			};
			
			//contextual back
			this.fromPage = null;
			this.activeChooserInstance = null;
			this.manageAutopayModel = new MVC.Model();
			this.manageAutopayModel.set({
				name : '',
				cardType : '',
				cardNumber : '',
				securityCode : '',
				expirationDate : '',
				postalCode : '',
			});
			
			this.useMonthInputType = self.application.model.isIos;
			
//			var $fastClickedElements = $("#manageAutopayTermsCondition_1, #manageAutopayTermsCondition_2, #manageAutopayCancelButton, #manageAutopayConfirmButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			if(this.useMonthInputType) {
				this.$element.find(".cardExpirationDateControlWrapper").remove();
				this.application.formValidator.configureCardExpirationDate($("#manageAutopayExpirationDateInput"), self._validate);
				$("#manageAutopayExpirationDateInput").bind("change", function() {
					var $that = $(this);
					
					$that[$that.val() ? "removeClass" : "addClass"]("notValued");
				});
			}
			else {
				self.$element.find("input[type=month]").remove();
				var $manageAutopayExpirationDateYear = $("#manageAutopayExpirationDateYear"), currentYear = (new Date()).getFullYear(), htmlStr = "";
				
				for(var i = currentYear; i < currentYear + self.application.cardValidityYearNumber; i++) {
					htmlStr += '<option role="option">' + i.toString() + '</option>';
				}
				
				$manageAutopayExpirationDateYear.append(htmlStr);
			}			
			$('#manageAutopayCardTypeArrow').tap(function(){
				if(self.application.model.isAndroid) {
					$('#manageAutopayCardType').show();
					window.setTimeout(function() {
						application.showDropdown($('#manageAutopayCardType')[0]);
					}, 50);
				}
				else {
					$('#manageAutopayCardType').focus();
				}
			});
			$('#manageAutopayTermsCondition_2').tap(function(){
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/terms_mobileview');
				}
				return false;
			});
			
			$('#manageAutopayNameInput')[0].oninput = 
				$('#manageAutopayTermsAndConditions')[0].onchange = function() {
				// Activate or deactivate button
				self._validate();
			};

			$('#manageAutopayTermsAndConditions').click('change',function() {
				$(this).attr("aria-checked", this.checked ? "true" : "false");
			});

			$('#manageAutopayTermsAndConditions + span').tap(function(){
				var manageAutopayTermsAndConditions = document.getElementById("manageAutopayTermsAndConditions");
				var $manageAutopayTermsAndConditions = $(manageAutopayTermsAndConditions);

				if(manageAutopayTermsAndConditions) {
					manageAutopayTermsAndConditions.checked = !manageAutopayTermsAndConditions.checked;
					$manageAutopayTermsAndConditions.attr("aria-checked", manageAutopayTermsAndConditions.checked ? "true" : "false");
					self._validate();
				}
			});

			$('#manageAutopayPage').find('.query').tap(function() {
				self.application.displaySecurityCodeHelper($('#manageAutopayCardType').val());
			});

			$('#manageAutopayMultilineSelect').change(function(){
				var $that = $(this);
				if($that.val()) {
					$that.removeClass("notValued");
				}
				else {
					$that.addClass("notValued");
				}
				self._validate();
			});
			$('#manageAutopayMultilineArrow').tap(function() {
				$('#manageAutopayMultilineSelect').show();
				window.setTimeout(function() {
					application.showDropdown($('#manageAutopayMultilineSelect')[0]);
				}, 50);
			});
			
			$('#manageAutopayConfirmButton').tap(function() {
				if (!$(this).hasClass('disabled')){
					self._onSubmit();
				}
			});
			$('#manageAutopayCancelButton').tap(function() {
				self.onBack();
			});

			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage('manageAutopayPage', {fromBack : true});
			});		

			// Validator on card number
			var checkCardNumberFct = function(){
				var $manageAutopayCardType = $('#manageAutopayCardType');
				var $manageAutopayCardNumberInput = $('#manageAutopayCardNumberInput');
				var checkCardNumber = $manageAutopayCardType.val() == 'AE' && $manageAutopayCardNumberInput.val().length == 15 ||
				$manageAutopayCardType.val() != 'AE' && $manageAutopayCardNumberInput.val().length == 16;
				
				if($manageAutopayCardNumberInput.val() != "" && !self.application.formValidator.digits($manageAutopayCardNumberInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $manageAutopayCardNumberInput.val().replace(reg, "");
					$manageAutopayCardNumberInput.val(newValue);
				} else if($manageAutopayCardNumberInput.val() != "" && (!self.application.formValidator.cardNumber($manageAutopayCardNumberInput.val()) || !checkCardNumber)){
					$manageAutopayCardNumberInput.addClass('error').attr("aria-invalid", "true");
				} else
					$manageAutopayCardNumberInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			// validator on security code
			var checkSecurityCodeFct = function(){
				var $manageAutopayCardType = $('#manageAutopayCardType');
				var $manageAutopaySecurityCodeInput = $('#manageAutopaySecurityCodeInput');
				var checkSecurityCode = $manageAutopayCardType.val() == 'AE' && $manageAutopaySecurityCodeInput.val().length == 4 ||
				$manageAutopayCardType.val() != 'AE' && $manageAutopaySecurityCodeInput.val().length == 3;
				
				if($manageAutopaySecurityCodeInput.val() != "" && !self.application.formValidator.digits($manageAutopaySecurityCodeInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $manageAutopaySecurityCodeInput.val().replace(reg, "");
					$manageAutopaySecurityCodeInput.val(newValue);
				} else if($manageAutopaySecurityCodeInput.val() != "" && !checkSecurityCode){
					$manageAutopaySecurityCodeInput.addClass('error').attr("aria-invalid", "true");
				} else
					$manageAutopaySecurityCodeInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			};
			$('#manageAutopayCardNumberInput')[0].oninput = function(){
				checkCardNumberFct();
			};
			$('#manageAutopayCardType').change(function(){
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
			$('#manageAutopayExpirationDateMonth').change(function(){
				var $that = $(this), now = moment();				
				
				if($that.val()) {
					if(this.value < (now.month() + 1) && $('#manageAutopayExpirationDateYear').val() <= now.year()) {
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
			$('#manageAutopayExpirationDateYear').change(function(){
				var $that = $(this), $manageAutopayExpirationDateMonth = $("#manageAutopayExpirationDateMonth"), now = moment();				
				
				if($that.val()) {
					if($manageAutopayExpirationDateMonth.val() < (now.month() + 1) && $that.val() <= now.year()) {
						$manageAutopayExpirationDateMonth.attr("aria-invalid", "true").addClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$manageAutopayExpirationDateMonth.prev(".select-label").attr("aria-invalid", "true").addClass("error");
						}
					}
					else {
						$manageAutopayExpirationDateMonth.attr("aria-invalid", "false").removeClass("error");
						if(!self.application.model.isWinPhone && !self.application.android_le) {
							$manageAutopayExpirationDateMonth.prev(".select-label").attr("aria-invalid", "false").removeClass("error");
						}
					}
				}

				self._validate();
			});
			$('#manageAutopayExpirationDateYear, #manageAutopayExpirationDateMonth').change(function() {
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
			$('#manageAutopaySecurityCodeInput')[0].oninput = function(){
				checkSecurityCodeFct();
			};
			// validator in postal code
			$('#manageAutopayPostalCodeInput')[0].oninput = function(){
				var $manageAutopayPostalCodeInput = $('#manageAutopayPostalCodeInput');
				
				if($manageAutopayPostalCodeInput.val() != "" && !self.application.formValidator.digits($manageAutopayPostalCodeInput.val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $manageAutopayPostalCodeInput.val().replace(reg, "");
					$manageAutopayPostalCodeInput.val(newValue);
				} else if($manageAutopayPostalCodeInput.val() != "" && !self.application.formValidator.postalCode($manageAutopayPostalCodeInput.val())){
					$manageAutopayPostalCodeInput.addClass('error').attr("aria-invalid", "true");
				} else
					$manageAutopayPostalCodeInput.removeClass('error').attr("aria-invalid", "false");
				self._validate();
			}; 
			
			if(!self.application.model.isWinPhone && !self.application.android_le) {
				self.application.setupLabelledDropdown($("#manageAutopayCardType, #manageAutopayExpirationDateMonth, #manageAutopayExpirationDateYear, #manageAutopayMultilineSelect"));
			}

			self.application.initKeyboardListeners(this.$element.find('.vb'));		},
		
		layout : function() {
			var firstItem = $('#manageAutopayPage form .list-container .list-item:not(.wp7)')[0];
			//$(firstItem).css('margin', '0');
			
			var divToResize = $('#manageAutopayPage').find('.sub-page');
			divToResize.css('padding-top', '0px');
			divToResize.css('margin-top', '0px');
			divToResize.height('auto');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#manageAutopayPage').find('.page-bottom-margin').height();
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + 3*(freeSpace/4);
			
			divToResize.css('padding-top', parseInt(freeSpace/4/2) +'px');
			divToResize.css('margin-top', parseInt(freeSpace/4) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');

			var secondItem = $('#payMyBillPage form .list-container .list-item:not(.wp7)')[1];
			var secondItemMarginTop = $(secondItem).css('margin-top');
			//$(firstItem).css('margin-top', secondItemMarginTop);
		},
						
		onRefresh : function() {
			this._validate();
			window.setTimeout(this.layout.bind(this), 100);
		},
		
		onHide : function(){
			$('#footer').removeClass('fixfix').attr("aria-hidden", "false");
		},

		
		onShow : function(options) {
			var self = this;
			var subscribers = self.application.homePage.model.attr.subscribers;
			
			$('#footer').removeClass('fixfix').attr("aria-hidden", "false");
			
			if(options && options.fromPage){
				self.fromPage = options.fromPage;
			} else {
				self.fromPage = "homePage";
			}
			if(!options || !options.fromBack ){
				self.manageAutopayModel.set({
					name : '',
					cardType : '',
					cardNumber : '',
					securityCode : '',
					expirationDate : '',
					postalCode : '',
				});
				$('#manageAutopayNameInput').val(null);
				$('#manageAutopayCardNumberInput').val(null);
				$('#manageAutopayCardType').val(null).trigger("change");
				$('#manageAutopaySecurityCodeInput').val(null);
				if(self.useMonthInputType) {
					$('#manageAutopayExpirationDateInput').val(null).addClass("notValued").removeClass("error");
				}
				else {
					$("#manageAutopayExpirationDateMonth").val(null).addClass("notValued").trigger("change");
					$("#manageAutopayExpirationDateYear").val(null).addClass("notValued").trigger("change");
				}
				$('#manageAutopayPostalCodeInput').val(null);
				$('#manageAutopayTermsAndConditions').attr('checked', false).attr("aria-checked", "false");
			}
			
			// Show / Hide the combobox of multiline account
			if(subscribers.length > 1){
				// empty the combobox before to populate it
				$.each($('#manageAutopayMultilineSelect option'), function(id, item){
					if(id > 0){
						$(item).remove();
					}
				});
				// Populate combobox
				$.each(subscribers, function(){
					if(this.status != 'pendingActivation')
						$('#manageAutopayMultilineSelect').append('<option role="option" value="'+this.ctn+'">'+ self.application.displayPhoneNumber(this.ctn) +'</option>');
				});

				// pre-selection : only one choice
				if($('#manageAutopayMultilineSelect option').length == 2){
					$('#manageAutopayMultilineSelect').val($('#manageAutopayMultilineSelect option').last().val()).trigger("change");
				}
				$("#manageAutopayPage .multiline").show();
			}
			self._validate();
			window.setTimeout(self.layout.bind(self), 100);
		},		
			
		_validate : function(){
			var self = this;
			var subscribers = self.application.homePage.model.attr.subscribers;
			// Init form validator
			
			var $manageAutopayNameInput = $('#manageAutopayNameInput');
			var $manageAutopayCardNumberInput = $('#manageAutopayCardNumberInput');
			var $manageAutopayCardType = $('#manageAutopayCardType');
			var $manageAutopaySecurityCodeInput = $('#manageAutopaySecurityCodeInput');
			var $multilineAccount = $('#manageAutopayMultilineSelect');
			var expirationDateInput = (function() {
				if(self.useMonthInputType) {
					return $("#manageAutopayExpirationDateInput").val();
				}
				else {
					return $("#manageAutopayExpirationDateYear").val() + "-" + $("#manageAutopayExpirationDateMonth").val(); 
				}
			})();
			var $manageAutopayPostalCodeInput = $('#manageAutopayPostalCodeInput');
			var $manageAutopayTermsAndConditions = $('#manageAutopayTermsAndConditions');
			
			var checkName = $manageAutopayNameInput.val() != "" && self.application.formValidator.cardName($manageAutopayNameInput.val()),
			checkCardNumber = $manageAutopayCardNumberInput.val() != "" && 
				self.application.formValidator.cardNumber($manageAutopayCardNumberInput.val()) &&
				(
					$manageAutopayCardType.val() == 'AE' && $manageAutopayCardNumberInput.val().length == 15 ||
					$manageAutopayCardType.val() != 'AE' && $manageAutopayCardNumberInput.val().length == 16
				),
			checkSecurityCode = $manageAutopaySecurityCodeInput.val() != "" && 
				self.application.formValidator.cardSecurityCode($manageAutopaySecurityCodeInput.val()) &&
				(
					$manageAutopayCardType.val() == 'AE' && $manageAutopaySecurityCodeInput.val().length == 4 ||
					$manageAutopayCardType.val() != 'AE' && $manageAutopaySecurityCodeInput.val().length == 3
				)
				,
			checkExpiration = expirationDateInput != "" && self.application.formValidator.cardExpirationDate(expirationDateInput),
			checkPostalCode = $manageAutopayPostalCodeInput.val() != "" && self.application.formValidator.postalCode($manageAutopayPostalCodeInput.val()),
			checkTermsActivated = $manageAutopayTermsAndConditions.val() != "" && $manageAutopayTermsAndConditions.is(':checked'),
			checkCardType = $manageAutopayCardType != "";
			checkAccount = (subscribers != undefined && subscribers.length>1)? $multilineAccount.val() != "" : true;

			if (checkName && checkCardNumber && checkSecurityCode && checkExpiration && checkPostalCode && checkTermsActivated && checkCardType && checkAccount) {
				$('#manageAutopayConfirmButton').removeClass('disabled').removeAttr("aria-disabled");
			} else {
				$('#manageAutopayConfirmButton').addClass('disabled').attr("aria-disabled", "true");
			}
		},		
		
		_onSubmit : function(){
			var self = this;
			var name = $('#manageAutopayNameInput').val(),
			cardType = $('#manageAutopayCardType').val(),
			cardNumber = $('#manageAutopayCardNumberInput').val(),
			securityCode = $('#manageAutopaySecurityCodeInput').val(),
			expirationDate = (function() {
					if(self.useMonthInputType) {
						return moment($('#manageAutopayExpirationDateInput').val(), "YYYY-MM").format("MM/YY");
					}
					else {
						return moment($('#manageAutopayExpirationDateYear').val() + "-" + $('#manageAutopayExpirationDateMonth').val(), "YYYY-MM").format("MM/YY");
					}
				})(),
			postalCode = $('#manageAutopayPostalCodeInput').val();
			
			this.manageAutopayModel.set({
				name : name,
				cardType : cardType,
				cardNumber : cardNumber,
				securityCode : securityCode,
				expirationDate : expirationDate,
				postalCode : postalCode,
				ctn : $('#manageAutopayMultilineSelect').val()
			});
							
			self.application.gotoPage('manageAutopayReviewPage', {summary: this.manageAutopayModel.attr, cancelPage : this.fromPage});	
		},
		


		_onShowScroller : function(html, valueText, inst){
			this.activeChooserInstance = inst;
		},
		
		_onCloseScroller : function(html, valueText, inst){
			this.activeChooserInstance = null;
		},
		

		onBack : function(event){
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
			this.application.gotoPage(this.fromPage, {fromBack : true});
		}
	};

	Pages.ManageAutopayPage = MVC.Page.extend(methods);

})($, MVC);
