describe("EULA", function() {

		
	it("EULA Page should be visible", function() {
		expect($('#eulaDisclamerPage')).toBeVisible();
	});

	describe("Accept Eula", function() {

		it("Accept Should be disabled", function() {
			expect($('#i18n_eulaAcceptButton')).toHaveClass('disabled');
			expect($('#i18n_eulaAcceptButton')).toHaveAttr('aria-disabled', 'true');
		});
		
		callPhantom({cmd : 'capture', name:'eula-disabled'});
		it("Accept Should be enabled",
				function() {
					$("#eulaChekBox").prop("checked", "true").triggerHandler('tap');

					runs(function() {
						expect($('#i18n_eulaAcceptButton')).not.toHaveClass('disabled');
						expect($('#i18n_eulaAcceptButton')).not.toHaveAttr('aria-disabled', 'true');
					});
				});


		callPhantom({cmd : 'capture', name:'eula-enabled'});
		
		it("Login Page Should be displayed", function() {
			$("#i18n_eulaAcceptButton").triggerHandler('tap');

			waits(1000);

			runs(function() {
				expect($('#loginPage')).toBeVisible();
				expect($('#eulaDisclamerPage')).toBeHidden();
			});
		});

	});
});
