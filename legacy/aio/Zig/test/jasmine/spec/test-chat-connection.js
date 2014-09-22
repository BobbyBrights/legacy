describe("Chat - Connection", function() {
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

	it('Confirm button is in default state', function() {
		expect($('#morePageChatBtn')).not.toHaveClass('plume');
		expect($('#morePageChatBtn > div').html()).toMatch('Aio Chat');
		callPhantom({cmd : 'capture', name:'chat1-defaultButton'});
	});

	waits(1000);

	it('Setup : connect chat failed - accountId not correct', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"failure","messages":[{"code":"0000","severity":"error"}]}'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(1000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toMatch('Sorry… looks like we\'re having technical difficulties.  Please try again later.');
			callPhantom({cmd : 'capture', name:'chat2-errorAccountId'});
		});
		
	});
	
	waits(1000);
	
	it('Setup : connect chat failed - Session expired', function() {
		if ($('#zAlert').is(':visible'))
			$("#zAlert .bright").triggerHandler('tap');

		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status":"failure","messages":[{"code":"7000","severity":"error"}]}'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(1000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toMatch('Looks like you\'ve been logged out due to inactivity. Please log in again.');
			callPhantom({cmd : 'capture', name:'chat3-errorSessionExpired'});
			
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});

	});
	
	waits(1000);
	
	goToHomePage();
	
	waits(1000);
	
	it('Setup : Connect to oracle failed - Bad account id', function() {

		application.gotoPage('morePage');
		
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
			contentType : 'text/json',
			responseText : 'errorcode=101'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(3000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toContain('Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).');
			callPhantom({cmd : 'capture', name:'chat4-errorOracleAccountId'});
		});

	});
	
	waits(1000);
	
	it('Setup : Connect to oracle failed - Bad department', function() {
		
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
			contentType : 'text/json',
			responseText : 'errorcode=102'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(3000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toContain('Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).');
			callPhantom({cmd : 'capture', name:'chat5-errorOracleDepartment'});
		});

	});
	
	waits(1000);
	
	it('Setup : Connect to oracle failed - API disabled', function() {
		if ($('#zAlert').is(':visible'))
			$("#zAlert .bright").triggerHandler('tap');

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
			contentType : 'text/json',
			responseText : 'errorcode=2'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(3000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toContain('Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).');
			callPhantom({cmd : 'capture', name:'chat6-errorOracleDisabled'});
		});

	});
	
	waits(1000);
	
	it('Setup : Connect to oracle failed - Unauthorized IP', function() {
		if ($('#zAlert').is(':visible'))
			$("#zAlert .bright").triggerHandler('tap');

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
			contentType : 'text/json',
			responseText : 'errorcode=3'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(3000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toContain('Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).');
			callPhantom({cmd : 'capture', name:'chat7-errorOracleUnauthorized'});
		});

	});
	
	waits(1000);
	
	it('Setup : Connect to oracle failed - Queue closed', function() {
		if ($('#zAlert').is(':visible'))
			$("#zAlert .bright").triggerHandler('tap');

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
			contentType : 'text/json',
			responseText : 'errorcode=4'
		});
		$.mockjax({
			url : '*/logout',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(3000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert #zContent').html()).toContain('Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).');
			callPhantom({cmd : 'capture', name:'chat8-errorOracleClosed'});
			
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	waits(1000);
	
	it('Come back to login page', function() {
		application.gotoPage('homePage');
		
		waits(500);
		
		$('#i18n_homeLogOutButton').triggerHandler('tap');

		waits(5000);
		
		runs(function(){
			expect($('#loginPage')).toBeVisible();
		});
	});
	
});

