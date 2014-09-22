function FormValidator() {
	var self = this;

	this.lastMessage = '';
	
	/* ****************** */
	/* SPECIFIC FUNCTIONS */
	/* ****************** */

	// Validate the username
	// 40 chars max
	this.username = function(value) {
		return self.maxLength(value, 40);
	};

	// Validate the password
	// See appendix B in IDD
	this.password = function(value) {
		this.lastMessage = '';
		var validPwd = true;

		// between 8 and 20 chars
		validPwd = self.rangeLength(value, 8, 20);
		if(!validPwd){
			this.lastMessage = 'Your password should be at least 8 characters long (and less than 20). Please retry.';
			return false;
		}
		
		// min 1 lower case
		validPwd = /[a-z]/.test(value);
		if(!validPwd){
			this.lastMessage = 'Your password should contain at least one lower case letter';
			return false;
		}

//		// min 1 upper case
//		validPwd = /[A-Z]/.test(value);
//		if(!validPwd){
//			this.lastMessage = 'Your password should contain at least one upper case letter';
//			return false;
//		}

		// min 1 digit
		validPwd = /[0-9]/.test(value);
		if(!validPwd){
			this.lastMessage = 'Your password should contain at least one number (0-9)';
			return false;
		}


		// min 0 non alphanumeric char
		// not in 5 previous pwd: checked server side

		return validPwd;
	};

	// Validate the phone number
	// 10 digits
	this.phoneNumber = function(value) {
		var firstChar = value.substring(0,1);
		return self.digits(value) && self.length(value, 10) && firstChar != '0' && firstChar != '1';
	};

	// Validate the email
	this.email = function(value) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(value) && self.maxLength(value, 100);
	};

	// Validate the street address
	// max 80 chars
	this.street = function(value) {
		return self.maxLength(value, 80);
	};

	// Validate the postal code
	// 5 digits
	this.postalCode = function(value) {
		return self.digits(value) && self.length(value, 5);
	};

	// Validate the city
	// max 26 chars
	this.city = function(value) {
		return self.maxLength(value, 26);
	};

	// Validate the PO box number
	// max 10 chars
	this.poBoxNumber = function(value) {
		return self.maxLength(value, 10);
	};

	// Validate the rural route
	// max 7 chars
	this.ruralRoute = function(value) {
		return self.maxLength(value, 7);
	};

	// Validate the rural box number
	// max 10 chars
	this.ruralBoxNumber = function(value) {
		return self.maxLength(value, 11);
	};

	// Validate the card number
	// between 12 and 19 digits
	this.cardNumber = function(value) {
		return self.digits(value) && self.rangeLength(value, 15, 16);
	};

	// Validate the card name
	// max 60 chars
	this.cardName = function(value) {
		return self.maxLength(value, 60);
	};

	// Validate the card expiration date
	// MM/YY
	this.cardExpirationDate = function(value) {
		var dateObj = moment(value, "MM/YY");
		if(!dateObj || !dateObj.isValid()) {
			dateObj = moment(value, "YYYY-MM");
		}
		
		return value!="" && dateObj.isValid() && dateObj.isAfter(moment().subtract('month', 1));
	};

	// Validate the card security code
	// max 4 chars
	this.cardSecurityCode = function(value) {
		return self.digits(value) && self.rangeLength(value, 3, 4);
	};

	// Validate the date
	// mm/dd/yyyy
	this.date = function(value) {
		return moment(value, "MM/DD/YYYY").isValid();
	};

	// Validate the value is a price (digits and dot)
	this.price = function(value) {
		return /^(\d+\.?){1,2}$/.test(value);
	};

	/* ***************** */
	/* GENERIC FUNCTIONS */
	/* ***************** */

	// Validate exact length
	this.length = function(value, length) {
		return value.length == length;
	};

	// Validate max length (less or equal)
	this.maxLength = function(value, maxLength) {
		return value.length <= maxLength;
	};

	// Validate min length (greater or equal)
	this.minLength = function(value, minLength) {
		return value.length >= minLength;
	};

	// Validate length in range (greater/less or equal)
	this.rangeLength = function(value, minLength, maxLength) {
		return self.minLength(value, minLength) && self.maxLength(value, maxLength);
	};

	// Validate the value is only digits
	this.digits = function(value) {
		return /^\d+$/.test(value);
	};

	
	this.configureCardExpirationDate = function($el,onValidate){
		$el.addClass('vb');
		$el.addClass('ap');
		if($el.attr("type") != "month") {
			$el[0].oninput = function(){
				var value = $el.val();
				if(value != "" && !/^\d+$/.test(value)){
					var reg=new RegExp("\\D", "g");
					var newValue = value.replace(reg, "");
					$el.val(newValue);
				}
			};
		}
		$el.bind('change', function(){
			var value = $el.val();
			if($el.attr("type") == "month") {
				if(self.cardExpirationDate(value)){
					$el.removeClass('error');
					$el.attr('aria-invalid', 'false');
				} else {
					$el.addClass('error');
					$el.attr('aria-invalid', 'true');
				}
			}
			else {
				if(value && value.length <4) {
					$el.addClass('error');
					$el.attr('aria-invalid', 'true');
				} else {
					var regexpNoSlash = /^(0[1-9]|1[0-2])([1-3][0-9])$/;
					if(value.match(regexpNoSlash)){
						//auto add slash
						value = value.slice(0, value.length-2) + "/" + value.slice(value.length-2);
						$el.val(value);
					}
					if(self.cardExpirationDate(value)){
						$el.removeClass('error');
						$el.attr('aria-invalid', 'false');
					} else {
						$el.addClass('error');
						$el.attr('aria-invalid', 'true');
					}
				}
			}
			onValidate();
		});
		$el.bind('input', function(){
			var value = $el.val();
			if(value!=null && self.cardExpirationDate(value)){
				$el.removeClass('error');
				$el.attr('aria-invalid', 'false');
			} else {
				$el.addClass('error');
				$el.attr('aria-invalid', 'true');
			};
		});
	};
};