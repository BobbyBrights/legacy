describe("Forgot Password Flow", function() {
	checkEULA();
	
	$.mockjaxClear();
	$.mockjax({
		url : '*/authentication',
		responseTime : 250,
		contentType : 'text/json',
		responseText : '{"status":"success","securityQuestion":"What is your dog\'s name?"}'
	});
	$.mockjax({
		url : '*/authentication/change',
		responseTime : 250,
		contentType : 'text/json',
		responseText : '{"status":"success","sessionToken":"25a8a7ed"}'
	});

	it('Forgot password button on login page', function() {
		expect($('#loginPage')).toBeVisible();

		$("#i18n_loginForgotPwdBtn").triggerHandler('tap');

		waits(2000);

		runs(function() {
			expect($('#loginPage')).toBeHidden();
			expect($('#forgotPwdPhonePage')).toBeVisible();
		});
	});

	it('Next button is disabled when phone number is empty', function() {
		$('#i18n_forgotPasswordPhone').val('').triggerHandler('input');

		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveClass('disabled');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordPhoneBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#forgotPwdPhonePage')).toBeVisible();
		});
	});

	it('Next button is disabled when a bad phone number is filled up', function() {
		// Less than 10 digits
		$('#i18n_forgotPasswordPhone').val('987').triggerHandler('input');

		callPhantom({cmd : 'capture', name:'forgotPwd-badPhone'});
		expect($('#i18n_forgotPasswordPhone')).toHaveClass('error');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveClass('disabled');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordPhoneBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#forgotPwdPhonePage')).toBeVisible();
		});

		// Number starts by 0
		$('#i18n_forgotPasswordPhone').val('0123456789').triggerHandler('input');

		expect($('#i18n_forgotPasswordPhone')).toHaveClass('error');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveClass('disabled');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordPhoneBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#forgotPwdPhonePage')).toBeVisible();
		});

		// Number starts by 1
		$('#i18n_forgotPasswordPhone').val('1123456789').triggerHandler('input');

		expect($('#i18n_forgotPasswordPhone')).toHaveClass('error');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveClass('disabled');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordPhoneBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#forgotPwdPhonePage')).toBeVisible();
		});

		// Letters not allowed
		$('#i18n_forgotPasswordPhone').val('BadPhoneNumber').triggerHandler('input');

		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveClass('disabled');
		expect($('#i18n_forgotPasswordPhoneBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordPhoneBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#forgotPwdPhonePage')).toBeVisible();
		});
	});

	it('Next button is enabled when a input is correctly filled up', function() {
		$('#i18n_forgotPasswordPhone').val('9876543210').triggerHandler('input');

		expect($('#i18n_forgotPasswordPhoneBtn')).not.toHaveClass('disabled');
		expect($('#i18n_forgotPasswordPhoneBtn')).not.toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordPhoneBtn").triggerHandler('tap');

		waits(2000);
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/securityquestion',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success","securityQuestion":"What is your dog\'s name?"}'
		});

		runs(function() {
			expect($('#forgotPwdPhonePage')).toBeHidden();
			expect($('#forgotPwdQuestionPage')).toBeVisible();
		});
	});

	it('Next button is disabled when answer is empty', function() {
		$('#i18n_forgotPasswordQuestionAnswer').val('').triggerHandler('input');

		callPhantom({cmd : 'capture', name:'forgotPwd-expectingAnswer'});
		expect($('#i18n_forgotPasswordQuestionBtn')).toHaveClass('disabled');
		expect($('#i18n_forgotPasswordQuestionBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordQuestionBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#forgotPwdQuestionPage')).toBeVisible();
		});
	});

	it('Next button is enabled when a answer is correctly filled up', function() {
		$('#i18n_forgotPasswordQuestionAnswer').val('Max').triggerHandler('input');

		expect($('#i18n_forgotPasswordQuestionBtn')).not.toHaveClass('disabled');
		expect($('#i18n_forgotPasswordQuestionBtn')).not.toHaveAttr('aria-disabled', 'true');
		$("#i18n_forgotPasswordQuestionBtn").triggerHandler('tap');

		waits(2000);
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/securityquestion/validate',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success","username":"Bobby"}'
		});

		runs(function() {
			expect($('#forgotPwdQuestionPage')).toBeHidden();
			expect($('#resetPwdPage')).toBeVisible();
		});
	});

	it('Next button is disabled when one or more inputs is empty', function() {
		// Input are empty
		$('#i18n_resetPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('').triggerHandler('input');

		callPhantom({cmd : 'capture', name:'forgotPwd-resetPwd'});
		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});

		// Only Temp pwd
		$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});

		// Only New pwd
		$('#i18n_resetPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});

		// Only Renew pwd
		$('#i18n_resetPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});

		// Temp pwd & New pwd
		$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});

		// Temp pwd & Renew pwd
		$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});

		// New pwd & Renew pwd
		$('#i18n_resetPasswordTmpPwd').val('').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_resetPasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_resetPasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#resetPwdPage')).toBeVisible();
		});
	});

	describe('Password policy', function() {
		it('Password does not match', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordPwd').val('NewPwd1').triggerHandler('input');
			$('#i18n_resetPasswordRePwd').val('NewPwd2').triggerHandler('input');

			$("#i18n_resetPasswordBtn").triggerHandler('tap');
			callPhantom({cmd : 'capture', name:'forgotPwd-pwdError'});

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('Passwords do not match!');
			});
		});

		it('Password equals to temp pwd', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordRePwd').val('TempPwd123').triggerHandler('input');

			$("#i18n_resetPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('You cannot use your temporary password as new password!');
			});
		});

		it('Password length <8', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordPwd').val('New1').triggerHandler('input');
			$('#i18n_resetPasswordRePwd').val('New1').triggerHandler('input');

			$("#i18n_resetPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should be at least 8 characters long');
			});
		});

		it('Password length >20', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordPwd').val('VeryLongNewPassword1234567890').triggerHandler('input');
			$('#i18n_resetPasswordRePwd').val('VeryLongNewPassword1234567890').triggerHandler('input');

			$("#i18n_resetPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should be at least 8 characters long');
			});
		});

		it('No digit in password', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordPwd').val('newpassword').triggerHandler('input');
			$('#i18n_resetPasswordRePwd').val('newpassword').triggerHandler('input');

			$("#i18n_resetPasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should contain at least one number');
			});
		});

		it('No lowercase in password', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_resetPasswordPwd').val('NEWPASSWORD1').triggerHandler('input');
			$('#i18n_resetPasswordRePwd').val('NEWPASSWORD1').triggerHandler('input');

			$("#i18n_resetPasswordBtn").triggerHandler('tap');

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

		$('#i18n_resetPasswordTmpPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_resetPasswordPwd').val('newpassword1').triggerHandler('input');
		$('#i18n_resetPasswordRePwd').val('newpassword1').triggerHandler('input');

		$("#i18n_resetPasswordBtn").triggerHandler('tap');

		waits(2000);

		runs(function() {
			expect($('#resetPwdPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});

});
