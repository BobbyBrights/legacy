describe("Chat - ChatInfoAPI Logout Login", function() {
	goToHomePage();

	it('Transition from home to more page is working', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	var chatInfoWasCalled = false;
	var step = 0;
	it('First Call to Chat', function() {		

		
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 250,
			contentType : 'text/json',
			response : function() {
				chatInfoWasCalled = true;
				this.responseText = '{"status":"success","accountId":"8029","chatSessionTimer":"90","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"60"}';
			} 
		});

		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0&userid=200520414&sessionid=2005204142211967318818826202168135179025322277108196&sessiontoken=C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE&chatserver=c-rnr-cs22.instantservice.com'
		});
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText :  'errorcode=0',
			response : function() {
				if(step ==0){
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
				}
				step = 1;
			} 
		});
		$.mockjax({
			url : '*/logout',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
		});

	});
	
	it('AMSS Chat info is called the first time', function() {		
		expect(chatInfoWasCalled).toBe(true);
		
		//quit chat
		$("#i18n_chatEndButton").triggerHandler('tap');
		waits(500);
		$("#zAlert .bright").triggerHandler('tap');
		waits(500);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
		});
		
	});
	
	it('AMSS Chat info is not called the second time', function() {		
		chatInfoWasCalled = false;
		step = 0;
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect(chatInfoWasCalled).toBe(false);
			$("#i18n_chatEndButton").triggerHandler('tap');
		});
		
		waits(200);
		runs(function(){
			$("#zAlert .bright").triggerHandler('tap');
		});
		
	});
	
	it('Go back to home', function() {		
		$($(".ui-nav")[0]).triggerHandler('tap');
		waits(1500);
		runs(function(){
			expect($('#homePage')).toBeVisible();
		});
	});
		
	it('Logout', function() {
		$("#i18n_homeLogOutButton").triggerHandler('tap');
		waits(2000);
		runs(function(){
			expect($('#loginPage')).toBeVisible();
			expect($('#homePage')).toBeHidden();
		});
		
	});
	
	goToHomePage();

	it('Go back to more page', function() {

		$.mockjax({
			url : '*/chatInfo',
			responseTime : 250,
			contentType : 'text/json',
			response : function() {
				chatInfoWasCalled = true;
				this.responseText = '{"status":"success","accountId":"8029","chatSessionTimer":"90","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"60"}';
			} 
		});

		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0&userid=200520414&sessionid=2005204142211967318818826202168135179025322277108196&sessiontoken=C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE&chatserver=c-rnr-cs22.instantservice.com'
		});
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText :  'errorcode=0',
			response : function() {
				if(step ==0){
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
				}
				step = 1;
			} 
		});
		
		application.gotoPage('morePage');
		waits(1500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});
	
	it('AMSS Chat info is called again', function() {		
		chatInfoWasCalled = false;
		step = 0;
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(4000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect(chatInfoWasCalled).toBe(true);
			$("#i18n_chatEndButton").triggerHandler('tap');
		});
		waits(500);
		runs(function() {
			$("#zAlert .bright").triggerHandler('tap');
		});
		
		
	});

	
});

