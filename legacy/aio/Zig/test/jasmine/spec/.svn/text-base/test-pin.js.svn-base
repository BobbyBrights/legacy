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
					this.responseText = '{"status": "failure", "messages":[{"code":"8001","severity":"error"}]}';
					PINAttempt = 0;
				}
				else {
					this.responseText = '{"status": "failure", "messages":[{"code":"8000","severity":"error"}]}';
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
	
	it('Error message is showing when a bad PIN is entered', function() {
		runs(function() {
			$("#pinCode").val("1234").trigger("keyup");
		});
			
		waits(1000);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Error");
			expect($("#zContent").text()).toEqual("Bad PIN !");
			
			$("#zAlert").find(".button").trigger("tap");
			
			expect($("#zAlert")).not.toExist();
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
	
	goToHomePage(true);
	
	it('Application logs out automatically when the max number of PIN tries has been reached', function() {
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
				
				PINAttempt++;

				if(data.PIN == "0000") {
					this.responseText =  '{"status": "success"}';
					PINAttempt = 0;
				}
				else if(PINAttempt == 5) {
					this.responseText = '{"status": "failure", "messages":[{"code":"8001","severity":"error"}]}';
					PINAttempt = 0;
				}
				else {
					this.responseText = '{"status": "failure", "messages":[{"code":"8000","severity":"error"}]}';
				}
			}
		});
		
		waits(1000);
	    
		application.gotoPage('manageAutopayPage');
	    
	    waits(1000);
		
	    PINAttempt = 0;
		
		waits(1000);
		
		runs(function() {
			$("#pinCode").val("0001").trigger("keyup");
		});
	    
		waits(500);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Error");
			expect($("#zContent").text()).toEqual("Bad PIN !");
			$("#zAlert").find(".button").trigger("tap");
		});
			
		waits(500);
		
		runs(function() {
			$("#pinCode").val("0001").trigger("keyup");
		});
	    
		waits(500);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Error");
			expect($("#zContent").text()).toEqual("Bad PIN !");
			$("#zAlert").find(".button").trigger("tap");
		});
			
		waits(500);
		
		runs(function() {
			$("#pinCode").val("0001").trigger("keyup");
		});
	    
		waits(500);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Error");
			expect($("#zContent").text()).toEqual("Bad PIN !");
			$("#zAlert").find(".button").trigger("tap");
		});
			
		waits(500);
		
		runs(function() {
			$("#pinCode").val("0001").trigger("keyup");
		});
	    
		waits(500);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Error");
			expect($("#zContent").text()).toEqual("Bad PIN !");
			$("#zAlert").find(".button").trigger("tap");
		});
			
		waits(500);
		
		runs(function() {
			$("#pinCode").val("0001").trigger("keyup");
		});
	    
		waits(500);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Error");
			expect($("#zContent").text()).toEqual("Sorry… looks like you don't remember your PIN. Bye Bye !");
			$("#zAlert").find(".button").trigger("tap");
		});
			
		waits(1000);
		
		runs(function() {
			expect($('#pinPage')).toBeHidden();
			expect($('#loginPage')).toBeVisible();
			$("#i18n_homeLogOutButton").trigger("tap");
		});
		
		waits(1000);
	});
	
	goToHomePage(true);
	
	it('API server error management check', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/rest/authentication/verifypin',
			responseTime : 250,
			status : 500,
			contentType : 'text/json',
			response : function(settings){
				var data = JSON.parse(settings.data);
				
				PINAttempt++;

				if(data.PIN == "0000") {
					this.responseText =  '{"status": "success"}';
					PINAttempt = 0;
				}
				else if(PINAttempt == 5) {
					this.responseText = '{"status": "failure", "messages":[{"code":"8001","severity":"error"}]}';
					PINAttempt = 0;
				}
				else {
					this.responseText = '{"status": "failure", "messages":[{"code":"8000","severity":"error"}]}';
				}
			}
		});
		
		waits(1000);
	    
		application.gotoPage('manageAutopayPage');
	    
	    waits(1000);
		
	    PINAttempt = 0;
		
		waits(1000);
		
		runs(function() {
			$("#pinCode").val("0001").trigger("keyup");
		});
	    
		waits(500);
		
		runs(function() {
			expect($("#zAlert")).toExist();
			expect($("#zHeader").text()).toEqual("Internal Server Error");
			expect($("#zContent").text()).toEqual("Sorry, something wents wrong.");
			$("#zAlert").find(".button").trigger("tap");
		});
	});
});