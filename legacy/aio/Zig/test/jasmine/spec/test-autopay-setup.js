describe("Autopay - Setup Flow", function() {
	goToHomePage();
	
	it('Transition from home to autopay is working', function() {
		expect($('#i18n_homeSetupAutoPayButton').attr('data-state')).toBe("deactivated");
		$("#i18n_homeSetupAutoPayButton").triggerHandler('tap');
	});
	
	waits(1000);
	
	it("PIN form", function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/authentication/verifypin',
			responseTime : 500,
			contentType : 'text/json',
			responseText : '{"status": "success"}'
		});

		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#pinPage')).toBeVisible();
			$("#pinCode").val("0000").triggerHandler("keyup");
		});
	});
	
	waits(1000);
	
	describe("Test Auto Pay form", function() {
		
		it('Confirm button is disabled when form is empty', function() {
			expect($('#loginPage')).toBeHidden();
			expect($('#manageAutopayPage')).toBeVisible();
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
		});
		
		it('Confirm button is aria-disabled when form is empty', function() {
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
		});
		
		it('Set only name and check form OK', function() {
			$('#manageAutopayNameInput').val('John Doe').triggerHandler('input');
			waits(100);
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'name-ok'});
		});
		
		it('Set card type', function() {
			$('#manageAutopayCardType').val('AE').triggerHandler('change');
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'type-ok'});
		});
		
		it('Card number validation', function() {
			$('#manageAutopayCardNumberInput').val('123456').triggerHandler('input');
			waits(100);
			
			expect($('#manageAutopayCardNumberInput')).toHaveClass('error');
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'card-error'});
			waits(100);
			
			$('#manageAutopayCardNumberInput').val('123456789789754').triggerHandler('input');
			waits(100);
			
			expect($('#manageAutopayCardNumberInput')).not.toHaveClass('error');
			callPhantom({cmd : 'capture', name:'card-ok'});
		});

		it('Form is still invalid', function() {
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
		});
		
		it('Security code validation', function() {
			$('#manageAutopaySecurityCodeInput').val('1').triggerHandler('input');
			waits(100);
			callPhantom({cmd : 'capture', name:'code-error'});
			
			expect($('#manageAutopaySecurityCodeInput')).toHaveClass('error');
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
			waits(100);
			
			$('#manageAutopaySecurityCodeInput').val('1234').triggerHandler('input');
			waits(100);
			expect($('#manageAutopaySecurityCodeInput')).not.toHaveClass('error');

			callPhantom({cmd : 'capture', name:'code-ok'});
		});
		
		it('Form is still invalid', function() {
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
		});
		
		
		it('Expiration date validation', function() {
			if(application.model.isIos) {
				$('#manageAutopayExpirationDateInput').val('2015-09').triggerHandler('input');
			} else {
				$('#manageAutopayExpirationDateYear').val('2015').triggerHandler('input');
				$('#manageAutopayExpirationDateMonth').val('09').triggerHandler('input');
			}
		});
		
		it('Form is still invalid', function() {
			expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
			expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
		});
		
		it('Set postal code', function() {
			$('#manageAutopayPostalCodeInput').val('1234').triggerHandler('input');
			waits(600);
			runs(function() {
				expect($('#manageAutopayPostalCodeInput')).toHaveClass('error');
				expect($('#manageAutopayConfirmButton')).toHaveClass('disabled');
				expect($('#manageAutopayConfirmButton')).toHaveAttr('aria-disabled', 'true');
				$('#manageAutopayPostalCodeInput').val('12345').triggerHandler('input');
				waits(600);
				runs(function() {
					expect($('#manageAutopayPostalCodeInput')).not.toHaveClass('error');
				});
			});
		});
		
		waits(600);
		
		it('Set checkbox ', function() {
			$("#manageAutopayTermsAndConditions").prop("checked", "true");
			$("#manageAutopayTermsCondition_1").triggerHandler('tap');
			$("#manageAutopayTermsAndConditions").triggerHandler('blur');
			$("#manageAutopayTermsAndConditions").triggerHandler('change');
		});
		it('Form should be valid', function() {
			waits(600);
			runs(function() {
				callPhantom({cmd : 'capture', name:'full_form'});
				expect($('#manageAutopayConfirmButton')).not.toHaveClass('disabled');
				expect($('#manageAutopayConfirmButton')).not.toHaveAttr('aria-disabled', 'true');
			});
		});
	});
});