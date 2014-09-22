describe("Chat - Navigate Away", function() {
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

	it('Transition from more to chat page is working', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","accountId":"8029","chatSessionTimer":"90","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"60"}'
		});
		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0&userid=200520414&sessionid=2005204142211967318818826202168135179025322277108196&sessiontoken=C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE&chatserver=c-rnr-cs22.instantservice.com'
		});
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			contentType : 'text/plain',
			response : function(settings){
				switch (step) {
				case 0:
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
					break;
				case 1:
					this.responseText =  'errorcode=0\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
					break;
				default:
					this.responseText =  'errorcode=0';
					break;
				}
				step++;
			}
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		waits(1000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
		});
	});

	waits(12000);
	
	it('Test Pooling in the chat', function() {
		var chatClient = application.supportChatPage.chatEngine;
		spyOn(chatClient, '_sendCommand').andCallThrough();
		waits(8000 * 4);
		runs(function() {
			expect(chatClient._sendCommand.calls.length).toBe(3);
		});
	});

	waits(500);

	it('Transition from chat to more page is working', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#supportChatPage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	waits(1000);
	
	it('Confirm button is in resume state', function() {
		expect($('#morePageChatBtn')).toHaveClass('plume');
		expect($('#morePageChatBtn > div').html()).toMatch('Return to Chat');
		callPhantom({cmd : 'capture', name:'chat2-resumeButton'});
	});
	
	waits(500);
	
	it('Test Pooling when away from the chat', function() {
		var chatClient = application.supportChatPage.chatEngine;
		spyOn(chatClient, '_sendCommand').andCallThrough();
		waits(16000 * 4);
		runs(function() {
			expect(chatClient._sendCommand.calls.length).toBe(4);
		});
	});


	waits(500);

	it('Resume chat', function() {
		$("#morePageChatBtn").triggerHandler('tap');
		waits(1000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
		});
	});
	
	waits(500);
	
	it('Test Pooling in the chat', function() {
		var chatClient = application.supportChatPage.chatEngine;
		spyOn(chatClient, '_sendCommand').andCallThrough();
		waits(8000 * 4);
		runs(function() {
			expect(chatClient._sendCommand.calls.length).toBe(4);
		});
	});

	waits(500);

	it('Exit chat', function() {
		$("#i18n_chatEndButton").triggerHandler('tap');
		$("#zAlert .bright").triggerHandler('tap');
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
		callPhantom({cmd : 'capture', name:'chat3-defaultButton'});
	});
});

