describe("Chat - Connection Network Errors", function() {
	goToHomePage();

	it('Transition from home to more page is working', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	it('Setup : Connect to oracle failed - 404', function() {		

		
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"success","accountId":"8029","chatSessionTimer":"90","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"60"}'
		});
		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 250,
			status: 500,
			contentType : 'text/json',
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toMatch($.i18n._('NETWORK_ERROR_MESSAGE'));
			callPhantom({cmd : 'capture', name:'chat404'});
		});

		waits(500);
		runs(function() {
			$("#zAlert .bright").triggerHandler('tap');
		});
		waits(500);
		runs(function() {
			expect($('#zAlert')).not.toExist();
			expect($('#morePage')).toBeVisible();
		});
	});
	
	it('Setup : Connect to oracle failed - timout', function() {	

		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			isTimeout: true,
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(1000);
		runs(function() {
			$("#zAlert .bright").triggerHandler('tap');
		});
		waits(500);
		runs(function() {
			expect($('#zAlert')).not.toExist();
			expect($('#morePage')).toBeVisible();
		});
		
	});
	
	
});

