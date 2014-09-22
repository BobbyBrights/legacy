describe("Chat - Overlay Login Page", function() {
	
	it('Login for the first time (Chat overlay displayed)', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/version',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{ "status" : "success", "version" : "0.01"}'
				
		});
		$.mockjax({
			url : '*/authentication/login',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status" : "success","sessionToken" : "2924169f"}'
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
		$.mockjax({
			url : '*/authentication/logout',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		
		$('#i18n_loginUsername').val('alpha').triggerHandler('input');
		$('#i18n_loginPwd').val('pass').triggerHandler('input');
		$("#i18n_loginBtn").triggerHandler('tap');

		waits(1000);

		runs(function(){
			// the overlay for chat page is visible
			expect($('#supportChatOverlayPage')).not.toBeHidden();
			expect($('#homePage')).toBeHidden();
			callPhantom({cmd : 'capture', name:'login-chat-overlay'});
			$("#imgOverlay").triggerHandler('tap');
		});

		waits(1000);
		runs(function(){
			expect($('#homePage')).toBeVisible();
			$("#i18n_homeLogOutButton").triggerHandler('tap');
		});
	});

	waits(5000);
	goToHomePage();
});