describe("Change VM Password", function() {
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

	it('Transition from more to change vm password is working', function() {
		$("#i18n_resetVmPwLink").triggerHandler('tap');
		waits(500);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#resetVoiceMailPwdPage')).toBeVisible();
		});
	});
	
	waits(1000);
	
	it('Continue button is already active', function() {
		runs(function() {
			var $elt = $($('#resetVoiceMailPwdPage .button-bar a')[1]);
			
			callPhantom({cmd : 'capture', name:'changeVmPwd-page'});
			expect($elt).not.toHaveClass("disabled");
			expect($elt).not.toHaveAttr("aria-disabled", "true");
		});
	});
	
	waits(1000);
	
	it('Validate the change of password', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/profile/change/vmpassword',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		
		$($("#resetVoiceMailPwdPage .button-bar a")[1]).triggerHandler('tap');

		waits(2000);
		runs(function() {
			callPhantom({cmd : 'capture', name:'changeVmPwd-confirm'});
			expect($('#resetVoiceMailPwdPage')).toBeHidden();
			expect($('#resetVoiceMailPwdConfirmationPage')).toBeVisible();
		});
	});

	it('Back to more page', function() {
		$($("#resetVoiceMailPwdConfirmationPage .button-bar a")[0]).triggerHandler('tap');
		
		waits(2000);
		
		runs(function() {
			expect($('#resetVoiceMailPwdConfirmationPage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});
	
});

