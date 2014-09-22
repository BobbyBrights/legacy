describe("Signup Flow", function() {
	checkEULA();

	it('Sign up button is enabled on login page', function() {
		expect($('#loginPage')).toBeVisible();
		expect($('#i18n_loginSignUpBtn')).not.toHaveClass('disabled');
		expect($('#i18n_loginSignUpBtn')).not.toHaveAttr('aria-disabled', 'true');

		$.mockjaxClear();
		$.mockjax({
			url : '*/rest/register',
			responseTime : 1000,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});

		$("#i18n_loginSignUpBtn").triggerHandler('tap');

		waits(2000);

		runs(function() {
			expect($('#loginPage')).toBeHidden();
			expect($('#signUpPage')).toBeVisible();
		});
	});

	it('Next button is disabled when one or more field is empty', function() {
		// Empty
		$('#i18n_signupUsername').val('');
		$('#i18n_signupPhoneNumber').val('');

		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});

		// Only username
		$('#i18n_signupUsername').val('Bob').triggerHandler('input');
		$('#i18n_signupPhoneNumber').val('').triggerHandler('input');

		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_loginBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});

		// Only phone number
		$('#i18n_signupUsername').val('').triggerHandler('input');
		$('#i18n_signupPhoneNumber').val('9876543210').triggerHandler('input');

		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});
	});

	it('Next button is disabled when a bad phone number is filled up', function() {
		// Less than 10 digits
		$('#i18n_signupUsername').val('Bob').triggerHandler('input');
		$('#i18n_signupPhoneNumber').val('987').triggerHandler('input');

		callPhantom({cmd : 'capture', name:'signup-badPhone'});
		expect($('#i18n_signupPhoneNumber')).toHaveClass('error');
		expect($('#i18n_signupPhoneNumber')).toHaveAttr('aria-invalid', 'true');
		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});

		// Number starts by 0
		$('#i18n_signupPhoneNumber').val('0123456789').triggerHandler('input');

		expect($('#i18n_signupPhoneNumber')).toHaveClass('error');
		expect($('#i18n_signupPhoneNumber')).toHaveAttr('aria-invalid', 'true');
		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});

		// Number starts by 1
		$('#i18n_signupPhoneNumber').val('1123456789').triggerHandler('input');

		expect($('#i18n_signupPhoneNumber')).toHaveClass('error');
		expect($('#i18n_signupPhoneNumber')).toHaveAttr('aria-invalid', 'true');
		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});

		// Letters not allowed
		$('#i18n_signupPhoneNumber').val('BadPhoneNumber').triggerHandler('input');

		expect($('#i18n_signUpBtn')).toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#signUpPage')).toBeVisible();
		});
	});

	it('Next button is enabled when a input are correctly filled up', function() {
		$('#i18n_signupUsername').val('Bob').triggerHandler('input');
		$('#i18n_signupPhoneNumber').val('9876543210').triggerHandler('input');

		expect($('#i18n_signUpBtn')).not.toHaveClass('disabled');
		expect($('#i18n_signUpBtn')).not.toHaveAttr('aria-disabled', 'true');
		$("#i18n_signUpBtn").triggerHandler('tap');

		waits(2000);
		$.mockjaxClear();
		$.mockjax({
			url : '*/register',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{ "status" : "success"}'
		});

		runs(function() {
			expect($('#signUpPage')).toBeHidden();
			expect($('#setPwdPage')).toBeVisible();
		});
	});

	it('Next button is disabled when one or more inputs is empty', function() {
		// Input are empty
		$('#i18n_setPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('').triggerHandler('input');

		callPhantom({cmd : 'capture', name:'signup-setPwdScreen'});
		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});

		// Only Temp pwd
		$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});

		// Only New pwd
		$('#i18n_setPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');


		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});

		// Only Renew pwd
		$('#i18n_setPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});

		// Temp pwd & New pwd
		$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});

		// Temp pwd & Renew pwd
		$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});

		// New pwd & Renew pwd
		$('#i18n_setPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_setPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_setPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#setPwdPage')).toBeVisible();
		});
	});

	describe('Password policy', function() {
		it('Password does not match', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordPwd').val('NewPwd1').triggerHandler('input');
			$('#i18n_setPasswordRePwd').val('NewPwd2').triggerHandler('input');

			$("#i18n_setPasswordBtn").triggerHandler('tap');
			callPhantom({cmd : 'capture', name:'signup-errorMessage'});

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('Passwords do not match!');
			});
		});

		it('Password equals to temp pwd', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordRePwd').val('TempPwd123').triggerHandler('input');

			$("#i18n_setPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('You cannot use your temporary password as new password!');
			});
		});

		it('Password length <8', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordPwd').val('New1').triggerHandler('input');
			$('#i18n_setPasswordRePwd').val('New1').triggerHandler('input');

			$("#i18n_setPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should be at least 8 characters long');
			});
		});

		it('Password length >20', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordPwd').val('VeryLongNewPassword1234567890').triggerHandler('input');
			$('#i18n_setPasswordRePwd').val('VeryLongNewPassword1234567890').triggerHandler('input');

			$("#i18n_setPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should be at least 8 characters long');
			});
		});

		it('No digit in password', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordPwd').val('newpassword').triggerHandler('input');
			$('#i18n_setPasswordRePwd').val('newpassword').triggerHandler('input');

			$("#i18n_setPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should contain at least one number');
			});
		});

		it('No lowercase in password', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_setPasswordPwd').val('NEWPASSWORD1').triggerHandler('input');
			$('#i18n_setPasswordRePwd').val('NEWPASSWORD1').triggerHandler('input');

			$("#i18n_setPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('Your password should contain at least one lower case letter');
			});
		});
	});

	var homeMockResponse = {
		status : "success",
		ctn : "(123) 222-7845",
		accountId : "123456789012",
		accountName : "alpha",
		accountStatus : "Active",
		billCycleDate : "05/04/2013 21:27:13",
		accountBalance : "10.00",
		amountDueToday : "45.00",
		planName : "Trailblazer",
		planMRC : "55.00",
		subscriberId : "55512345",
		anniversaryDate : "01/12/2013 00:00:00",
		nextBillDueDays : "8",
		subscribers: [
	     	{ctn : "1111111753",
	 		subscriberId : "63822842051",
	 		totalMRC : "80",
	 		planMRC : "70",
	 		services : "20",
	 		discount : "10"}
	 	],
	 	pinSecurity: "1",
	 	totalMRC: "90"
	};

	it('When password are good, go to home page', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/change/userpassword',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success","sessionToken":"2e1b7404"}'
		});
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(homeMockResponse)
		});
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status" : "success","autoPayExist" : false}'
		});

		if ($('#zAlert').is(':visible'))
			$("#zAlert .bright").triggerHandler('tap');

		$('#i18n_setPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_setPasswordPwd').val('newpassword1').triggerHandler('input');
		$('#i18n_setPasswordRePwd').val('newpassword1').triggerHandler('input');

		$("#i18n_setPasswordBtn").triggerHandler('tap');

		waits(2000);

		runs(function() {
			expect($('#setPwdPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});

});