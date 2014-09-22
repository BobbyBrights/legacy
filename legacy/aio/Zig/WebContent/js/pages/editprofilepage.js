(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			var StateList = {
					"AE" : "APO/FPO",
					"AL" : "Alabama",
					"AK" : "Alaska",
					"AZ" : "Arizona",
					"AR" : "Arkansas",
					"CA" : "California",
					"CO" : "Colorado",
					"CT" : "Connecticut",
					"DE" : "Delaware",
					"DC" : "District of Columbia",
					"FL" : "Florida",
					"GA" : "Georgia",
					"HI" : "Hawaii",
					"ID" : "Idaho",
					"IL" : "Illinois",
					"IN" : "Indiana",
					"IA" : "Iowa",
					"KS" : "Kansas",
					"KY" : "Kentucky",
					"LA" : "Louisiana",
					"ME" : "Maine",
					"MD" : "Maryland",
					"MA" : "Massachusetts",
					"MI" : "Michigan",
					"MN" : "Minnesota",
					"MS" : "Mississippi",
					"MO" : "Missouri",
					"MT" : "Montana",
					"NE" : "Nebraska",
					"NV" : "Nevada",
					"NH" : "New Hampshire",
					"NJ" : "New Jersey",
					"NM" : "New Mexico",
					"NY" : "New York",
					"NC" : "North Carolina",
					"ND" : "North Dakota",
					"OH" : "Ohio",
					"OK" : "Oklahoma",
					"OR" : "Oregon",
					"PA" : "Pennsylvania",
					"PR" : "Puerto Rico",
					"RI" : "Rhode Island",
					"SC" : "South Carolina",
					"SD" : "South Dakota",
					"TN" : "Tennessee",
					"TX" : "Texas",
					"UT" : "Utah",
					"VT" : "Vermont",
					"VI" : "Virgin Island",
					"VA" : "Virginia",
					"WA" : "Washington",
					"WV" : "West Virginia",
					"WI" : "Wisconsin",
					"WY" : "Wyoming"
			};
			
//			var $fastClickedElements = $("#editProfilePage .back-button, #i18n_editProfileButton, #i18n_editProfileCancelButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			
			var $stateSelect = $("#i18n_state");
			
			$stateSelect.empty();
			for(var id in StateList){
				$stateSelect.append($('<option/>').val(id).text(StateList[id]));
			}

			$('#i18n_adressType')[0].onchange = function(){
				self._displayInputs();
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

			$('#i18n_homePhoneNumber')[0].oninput = function(){
				checkPhoneNumberFct(this);
			};
			$('#i18n_homePhoneNumber').blur(function(){
				checkPhoneNumberFct(this);
			});
			$('#i18n_businessPhoneNumber')[0].oninput = function(){
				checkPhoneNumberFct(this);
			};
			$('#i18n_businessPhoneNumber').blur(function(){
				checkPhoneNumberFct(this);
			});
			$('#i18n_email')[0].oninput = function(){
				if($('#i18n_email').val() != "" && !self.application.formValidator.email($('#i18n_email').val())){
					$('#i18n_email').addClass('error').attr("aria-invalid", "true");
				} else {
					$('#i18n_email').removeClass('error').attr("aria-invalid", "false");;
				}
				self._validate();
			}; 
			$('#i18n_postalCode')[0].oninput = function(){
				if($('#i18n_postalCode').val() != "" && !self.application.formValidator.digits($('#i18n_postalCode').val())){
					var reg=new RegExp("\\D", "g");
					var newValue = $('#i18n_postalCode').val().replace(reg, "");
					$('#i18n_postalCode').val(newValue);
				}
				self._validate();
			};
			
			
			$('#editProfilePage input').blur(function() {
				// Activate or deactivate button
				self._validate();
			});
			 
			$('#i18n_streetAdress')[0].oninput = 
			$('#i18n_city')[0].oninput = 
			$('#i18n_poBoxNumber')[0].oninput =
			$('#i18n_ruralRoute')[0].oninput =
			$('#i18n_ruralBoxNumber')[0].oninput =
			$('#i18n_state')[0].onchange = function() {
				// Activate or deactivate button
				self._validate();
			};

			this.contextualBack = 'myProfilePage';
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage(self.contextualBack, {
					fromBack : true
				});
			});

			$('#i18n_editProfileButton').tap(function() {
				if (!$('#i18n_editProfileButton').hasClass('disabled')){
					self._onSubmit();
				}
			});
			
			self.application.initKeyboardListeners(this.$element.find('.vb'));
			
			// Bad behavior when an input is focused
			// $(window).bind('resize',this.layout.bind(this));
		},

		layout : function() {
			var divToResize = $('#editProfilePage').find('.sub-page');
			divToResize.css('margin-top', '0px');
			divToResize.css('padding-top', '0px');
			divToResize.height('auto');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#editProfilePage').find('.page-bottom-margin').height() - parseInt(divToResize.css('border-top-width'));
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + 3*(freeSpace/4) + 15; // +15 in case of rural route (one more field)

			divToResize.css('margin-top', parseInt(freeSpace/4/2) +'px');
			divToResize.css('padding-top', parseInt(freeSpace/4/2) +'px');
			divToResize.height(parseInt(newSubPageHeight) + 'px');
		},
				
		onShow : function(options) {
			// Set active state on navigation link and title
			self.application.setNavLinkActive('#morePage');
			
			window.setTimeout(this.layout.bind(this), 100);
			
			if(options)
				this.summary = options.summary;
			
			this._validate();
			this.fetch();
		},

		fetch : function() {
			if (!this.isVisible) {
				return;
			}
			var self = this;
			$('#i18n_homePhoneNumber').empty().val(self.summary.homePhoneNumber);
			$('#i18n_businessPhoneNumber').empty().val(self.summary.businessPhoneNumber);
			$('#i18n_email').empty().val(this.summary.email);
			$('#i18n_streetAdress').empty();
			$('#i18n_poBoxNumber').empty();
			$('#i18n_ruralRoute').empty();
			$('#i18n_ruralBoxNumber').empty();
			
			self.address = this.summary.address;

			$("#i18n_adressType option").filter(function() {
			    return $(this).val() == self.address.addressType; 
			}).attr('selected', true);
			
			this._displayInputs();
			
			if(this.summary.address.addressType == 'S'){
				$('#i18n_streetAdress').val(this.summary.address.streetAddress);
			} else if(this.summary.address.addressType == 'P'){
				$('#i18n_poBoxNumber').val(this.summary.address.poBoxNumber);
			} else if(this.summary.address.addressType == 'R'){
				$('#i18n_ruralRoute').val(this.summary.address.ruralRoute);
				$('#i18n_ruralBoxNumber').val(this.summary.address.ruralRouteBoxNumber);
			}
			$('#i18n_city').empty().val(this.summary.address.city);
			
			$("#i18n_state option").filter(function() {
			    return $(this).val() == self.address.state; 
			}).attr('selected', true);
			$('#i18n_postalCode').empty().val(this.summary.address.postalCode);

			this._validate();
		},
		
		onBack : function (event){
			event.preventDefault();
			if(this.isLoading) {
				this.application.unBlockUI();
				if(this.jqXHR && this.jqXHR.abort){
					this.jqXHR.abort();
				}
			}
			this.application.gotoPage(this.contextualBack);
		},

		_displayInputs : function(){
			$('#editProfilePage').find('.list-item').removeClass('hidden');
			switch($('#i18n_adressType').val()){
				case 'S' : 
					$('#poBoxNumberBloc').addClass('hidden'); 
					$('#ruralRouteBloc').addClass('hidden'); 
					$('#ruralBoxNumberBloc').addClass('hidden'); 
					break;
				case 'P' :
					$('#streetAddressBloc').addClass('hidden');
					$('#ruralRouteBloc').addClass('hidden'); 
					$('#ruralBoxNumberBloc').addClass('hidden'); 
					break;
				case 'R' :
					$('#streetAddressBloc').addClass('hidden');
					$('#poBoxNumberBloc').addClass('hidden'); 
					break;
			}
		},

		_validate : function(){
			var self = this;
			// Init form validator
			
			var checkStreetAddress = $('#i18n_streetAdress').val() != "" && self.application.formValidator.street($('#i18n_streetAdress').val()),
				checkHomePhoneNumber = $('#i18n_homePhoneNumber').val() == "" || $('#i18n_homePhoneNumber').val() != "" && self.application.formValidator.phoneNumber($('#i18n_homePhoneNumber').val()),
				checkBusinessPhoneNumber = $('#i18n_businessPhoneNumber').val() == "" || $('#i18n_businessPhoneNumber').val() != "" && self.application.formValidator.phoneNumber($('#i18n_businessPhoneNumber').val()),
				checkEmail = $('#i18n_email').val() != "" && self.application.formValidator.email($('#i18n_email').val()),
				checkPoBoxNumber = $('#i18n_poBoxNumber').val() != "" && self.application.formValidator.poBoxNumber($('#i18n_poBoxNumber').val()),
				checkRuralRoute = $('#i18n_ruralRoute').val() != "" && self.application.formValidator.ruralRoute($('#i18n_ruralRoute').val()),
				checkRuralBoxNumber = $('#i18n_ruralBoxNumber').val() != "" && self.application.formValidator.ruralBoxNumber($('#i18n_ruralBoxNumber').val()),
				checkCity = $('#i18n_city').val() != "" && self.application.formValidator.city($('#i18n_city').val()),
				checkState = $('#i18n_state').val() != "" && self.application.formValidator.city($('#i18n_state').val()),
				checkPostalCode = $('#i18n_postalCode').val() != "" && self.application.formValidator.postalCode($('#i18n_postalCode').val()),
				checkAddress = ($('#i18n_adressType').val() == 'S')? checkStreetAddress : (($('#i18n_adressType').val() == 'P')? checkPoBoxNumber : (($('#i18n_adressType').val() == 'R')? checkRuralRoute && checkRuralBoxNumber : false));
			
			if (checkHomePhoneNumber && checkBusinessPhoneNumber && checkEmail && checkAddress && checkCity && checkState && checkPostalCode) {
				$('#i18n_editProfileButton').removeClass('disabled').attr("aria-disabled", "false");
			} else {
				$('#i18n_editProfileButton').addClass('disabled').attr("aria-disabled", "true");
			}
		},
		
		_onSubmit : function(){
			var self = this;
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var error = function() {
				self.application.unBlockUI();
			};
			var done = function() {
				self.application.unBlockUI();
				self.application.gotoPage('myProfilePage', {fromPage : 'editMyProfilePage'});
			};
			var address = {
					addressType : $('#i18n_adressType').val(),
					postalCode : $('#i18n_postalCode').val(),
					city : $('#i18n_city').val(),
					state : $('#i18n_state').val()
			};

			switch($('#i18n_adressType').val()){
				case 'S' :
					address.streetAddress = $('#i18n_streetAdress').val(); 
					break;
				case 'P' :
					address.poBoxNumber = $('#i18n_poBoxNumber').val(); 
					break;
				case 'R' :
					address.ruralRoute = $('#i18n_ruralRoute').val(); 
					address.ruralRouteBoxNumber = $('#i18n_ruralBoxNumber').val(); 
					break;
			}
			
			this.profile = {
				homePhoneNumber : $('#i18n_homePhoneNumber').val(),
				businessPhoneNumber : $('#i18n_businessPhoneNumber').val(),
				email : $('#i18n_email').val(),
				address : address
				
			};
//			console.log(this.profile, $('#i18n_adressType').val(), $('#i18n_streetAdress').val());
			self.application.connector.setProfileInformation(this.profile, done, error);
		}
	};

	Pages.EditProfilePage = MVC.Page.extend(methods);

})($, MVC);