describe('"PIN authentication" page', function() {
	
	var PINAttempt = 0;
    
	// go to the home page
	goToHomePage(true);
	
	// it(s)
	it('PIN form is showing when trying to access a PIN secured page', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/rest/authentication/logout',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status": "success"}' 
		});
		$.mockjax({
			url : '*/rest/authentication/verifypin',
			responseTime : 250,
			contentType : 'text/json',
			response : function(settings){
				var data = JSON.parse(settings.data);
				
				if(data.PIN == "0000") {
					this.responseText =  '{"status": "success"}';
					PINAttempt = 0;
				}
				else if(PINAttempt == 5) {
					this.responseText = '{"status": "failure", "messages":[{"code":"0012","severity":"error"}]}';
					PINAttempt = 0;
				}
				else {
					this.responseText = '{"status": "failure"}';
					PINAttempt++;
				}
			}
		});
		
	    application.gotoPage('manageAutopayPage');
		waits(1000);
		
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#pinPage')).toBeVisible();
		});
	});
	
	it('Destination page is reached when the right pin is entered', function() {
		runs(function() {
			$("#pinCode").val("0000").trigger("keyup");
		});
			
		waits(1000);
		
		runs(function() {
			expect($('#pinPage')).toBeHidden();
			expect($('#manageAutopayPage')).toBeVisible();
			$("#i18n_homeLogOutButton").trigger("tap");
		});
		
		waits(1000);
	});
	
	it("Application isn't asking for PIN authentication as it has been already done", function() {
		runs(function() {
		    application.gotoPage('morePage');
		});
		
		waits(1000);

		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#manageAutopayPage')).toBeHidden();
		    application.gotoPage('manageAutopayPage');
		});
		
		waits(1000);

		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#manageAutopayPage')).toBeVisible();
		});
	});
});