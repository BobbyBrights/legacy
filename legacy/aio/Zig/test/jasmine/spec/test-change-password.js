var PINCheckResponse = $.parseJSON('{"status":"success"}');

describe("Change Profile Password", function() {
	goToHomePage();
	
	it('Transition from home to more page is working', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	waits(1000);

	it('Transition from more to change password is working', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/verifypin',
			responseTime : 500,
			contentType : 'text/json',
			responseText : JSON.stringify(PINCheckResponse)
		});
		
		runs(function() {
			$("#i18n_changeProfPwLink").triggerHandler('tap');
		});
	});
	
	waits(1000);
	
	it("Enter the PIN code", function() {
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#pinPage')).toBeVisible();
			$("#pinCode").val("0000").triggerHandler("keyup");
		});
	});
	
	waits(1000);
	
	it('Username is correctly displayed', function() {
		runs(function() {
			expect($('#pinPage')).toBeHidden();
			expect($('#changePwdPage')).toBeVisible();
			expect($('#i18n_changePasswordText').html()).toContain("alpha");
		});
	});
	
	waits(1000);
	
	it('Next button is disabled when one or more inputs is empty', function() {
		// Input are empty
		$('#i18n_changePasswordCurrentPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('').triggerHandler('input');

		callPhantom({cmd : 'capture', name:'changePwd-page'});
		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});

		// Only current pwd
		$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});

		// Only New pwd
		$('#i18n_changePasswordCurrentPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});

		// Only Renew pwd
		$('#i18n_changePasswordCurrentPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});

		// Temp pwd & New pwd
		$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('').triggerHandler('input');

		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});

		// Temp pwd & Renew pwd
		$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});

		// New pwd & Renew pwd
		$('#i18n_changePasswordCurrentPwd').val('').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('NewPwd123').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('NewPwd123').triggerHandler('input');

		expect($('#i18n_changePasswordBtn')).toHaveClass('disabled');
		expect($('#i18n_changePasswordBtn')).toHaveAttr('aria-disabled', 'true');
		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#changePwdPage')).toBeVisible();
		});
	});

	describe('Password policy', function() {
		it('Password does not match', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordPwd').val('NewPwd1').triggerHandler('input');
			$('#i18n_changePasswordRePwd').val('NewPwd2').triggerHandler('input');

			$("#i18n_changePasswordBtn").triggerHandler('tap');
			callPhantom({cmd : 'capture', name:'changePwd-pwdError'});

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('Passwords do not match!');
			});
		});

		it('Password equals to temp pwd', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordRePwd').val('TempPwd123').triggerHandler('input');

			$("#i18n_changePasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('You cannot use your temporary password as new password!');
			});
		});

		it('Password length <8', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordPwd').val('New1').triggerHandler('input');
			$('#i18n_changePasswordRePwd').val('New1').triggerHandler('input');

			$("#i18n_changePasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should be at least 8 characters long');
			});
		});

		it('Password length >20', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordPwd').val('VeryLongNewPassword1234567890').triggerHandler('input');
			$('#i18n_changePasswordRePwd').val('VeryLongNewPassword1234567890').triggerHandler('input');

			$("#i18n_changePasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should be at least 8 characters long');
			});
		});

		it('No digit in password', function() {
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');

			$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordPwd').val('newpassword').triggerHandler('input');
			$('#i18n_changePasswordRePwd').val('newpassword').triggerHandler('input');

			$("#i18n_changePasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toContain('Your password should contain at least one number');
			});
		});

		it('No lowercase in password', function() {
			if ($('#zAlert').is(':visible'))

			$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
			$('#i18n_changePasswordPwd').val('NEWPASSWORD1').triggerHandler('input');
			$('#i18n_changePasswordRePwd').val('NEWPASSWORD1').triggerHandler('input');

			$("#i18n_changePasswordBtn").triggerHandler('tap');

			waits(500);

			runs(function() {
				expect($('#zAlert #zContent').html()).toMatch('Your password should contain at least one lower case letter');
			});
		});
	});

	it('When password are good, change it', function() {
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

		$('#i18n_changePasswordCurrentPwd').val('TempPwd123').triggerHandler('input');
		$('#i18n_changePasswordPwd').val('newpassword1').triggerHandler('input');
		$('#i18n_changePasswordRePwd').val('newpassword1').triggerHandler('input');

		$("#i18n_changePasswordBtn").triggerHandler('tap');

		waits(2000);

		runs(function() {
			callPhantom({cmd : 'capture', name:'changePwd-confirm'});
			expect($('#changePwdPage')).toBeHidden();
			expect($('#changePwdConfirmationPage')).toBeVisible();
		});
	});

	it('Back to more page', function() {
		$("#changePwdConfirmationButton").triggerHandler('tap');
		
		waits(2000);
		
		runs(function() {
			expect($('#changePwdConfirmationPage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});
	
});

