describe("Logout Page", function() {
	goToHomePage();

	it('Session model properties are defined', function() {
		runs(function() {
			expect(application.connector.sessionModel.attr.token).not.toBeUndefined();
		});
	});

	waits(1000);

	it('Log out', function() {
		$.mockjax({
			url : '*/logout',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});

		$("#i18n_homeLogOutButton").triggerHandler("tap");
	});

	waits(1000);

	it('Session model properties are undefined', function() {
		runs(function() {
			expect(application.connector.sessionModel.attr.token).toBeUndefined();
		});
	});

	it('Login form is back in initial state', function() {
		runs(function() {
			expect(application.connector.sessionModel.attr.username).not.toBeUndefined();
			expect($("#i18n_loginUsername").val()).toContain(application.connector.sessionModel.attr.username);
			expect($("#i18n_loginPwd").val()).toContain('');
			expect($("#i18n_loginBtn")).toHaveClass("disabled");
			expect($("#i18n_loginBtn")).toHaveAttr('aria-disabled', 'true');
		});
	});
});