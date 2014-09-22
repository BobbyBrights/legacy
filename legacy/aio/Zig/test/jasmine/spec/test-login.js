describe("Login Page", function() {
	checkEULA();	

	it('Sign in Button is disabled if login and password fields are empty', function() {
		$('#i18n_loginUsername').val('');
		$('#i18n_loginPwd').val('');

		expect($('#i18n_loginBtn')).toHaveClass('disabled');
		expect($('#i18n_loginBtn')).toHaveAttr('aria-disabled', 'true');

		$("#i18n_loginBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#loginPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'login-1'});
		});
	});

	it('Sign in Button is disabled if login field are empty', function() {

		$('#i18n_loginUsername').val('').triggerHandler('input');
		$('#i18n_loginPwd').val('toto').triggerHandler('input');

		expect($('#i18n_loginBtn')).toHaveClass('disabled');
		expect($('#i18n_loginBtn')).toHaveAttr('aria-disabled', 'true');

		$("#i18n_loginBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#loginPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'login-2'});
		});
	});

	it('Sign in Button is disabled if pwd field are empty', function() {

		$('#i18n_loginUsername').val('me').triggerHandler('input');
		$('#i18n_loginPwd').val('').triggerHandler('input');

		expect($('#i18n_loginBtn')).toHaveClass('disabled');
		expect($('#i18n_loginBtn')).toHaveAttr('aria-disabled', 'true');

		$("#i18n_loginBtn").triggerHandler('tap');

		waits(500);

		runs(function() {
			expect($('#loginPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'login-3'});
		});
	});
	
	it('Sign in Button is enabled if both fields are not empty', function() {

		$('#i18n_loginUsername').val('me').triggerHandler('input');
		$('#i18n_loginPwd').val('pass').triggerHandler('input');

		waits(500);

		runs(function() {
			expect($('#i18n_loginBtn')).not.toHaveClass('disabled');
			expect($('#i18n_loginBtn')).not.toHaveAttr('aria-disabled', 'true');
			callPhantom({cmd : 'capture', name:'login-4'});
		});
	});

	it('Login failed when bad username or password', function() {
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
			responseText : '{"status":"failure","messages":[{"code":"1000","severity":"Error"}]}'
		});
		
		$('#i18n_loginUsername').val('me-badpass').triggerHandler('input');
		$('#i18n_loginPwd').val('badpass').triggerHandler('input');
		$("#i18n_loginBtn").triggerHandler('tap');
		
		waits(1000);
		
		runs(function() {
			expect($('#loginInlineError')).toBeVisible();
			callPhantom({cmd : 'capture', name:'login-error-1'});
		});
	});
	
	it('Login failed when account is locked', function() {
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
			responseText : '{"status":"failure","messages":[{"code":"1001","severity":"Error"}]}'
		});
		
		$('#i18n_loginUsername').val('me-locked').triggerHandler('input');
		$('#i18n_loginPwd').val('locked').triggerHandler('input');
		$("#i18n_loginBtn").triggerHandler('tap');
		
		waits(1000);
		
		runs(function() {
			expect($('#lockedlineError')).toBeVisible();
			callPhantom({cmd : 'capture', name:'login-error-2'});
		});
	});
	
	it('Login failed when account is disabled', function() {
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
			responseText : '{"status":"failure","messages":[{"code":"1002","severity":"Error"}]}'
		});
		
		$('#i18n_loginUsername').val('me-locked').triggerHandler('input');
		$('#i18n_loginPwd').val('locked').triggerHandler('input');
		$("#i18n_loginBtn").triggerHandler('tap');
		
		waits(1000);
		
		runs(function() {
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert #zContent').html()).toMatch('Sorry… looks like there’s an issue with your account.  Give us a call at 1-855-246-2461…to straighten this out.');
			callPhantom({cmd : 'capture', name:'login-error-3'});
		});
	});
});