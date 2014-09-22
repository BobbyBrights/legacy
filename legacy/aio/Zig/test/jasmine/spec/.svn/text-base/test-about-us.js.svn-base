describe('"About us" page', function() {
	
	// go to the home page
	goToHomePage(true);
	
	// it(s)
	it('Go to the "About us" page', function() {
		application.gotoPage('aboutUsPage');
		waits(1000);
		
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#aboutUsPage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'about-us'});
		});
	});
	
	it('Go to the "More" page using the back button', function() {
		$('#aboutUsPage .back-button').triggerHandler('tap');
		waits(1000);
		
		runs(function() {
			expect($('#aboutUsPage')).toBeHidden();
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
			callPhantom({cmd : 'capture', name:'more'});
		});
	});
});