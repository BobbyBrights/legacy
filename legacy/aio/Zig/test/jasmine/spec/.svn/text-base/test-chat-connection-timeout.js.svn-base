describe("Chat - Connection Timeout", function() {
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

	it('Connect chat - user send message', function() {
		$.mockjaxClear();
		var step = 0;
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
			responseTime : 0,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
				} else  {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#i18n_chatInput')).not.toHaveProp('disabled');
			expect($('#i18n_chatInput')).not.toHaveAttr('aria-disabled', 'true');
			expect($('#i18n_chatSendButton')).not.toHaveClass('disabled');
			expect($('#i18n_chatSendButton')).not.toHaveAttr('aria-disabled', 'true');
		});
	});
	
	waits(1000);
	
	it('The user has send a message', function() {
		$('#i18n_chatInput').val('Hi, my phone is not working !').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		waits(500);
		runs(function(){
			expect($('#chatContent .messages li:last-child')).toHaveClass('customer');
			expect($('#chatContent .messages li:last-child').html()).toContain('alpha');
			expect($('#chatContent .messages li:last-child').html()).toContain('Hi, my phone is not working !');
		});
	});
	
	it('Waiting for more than 30s, no message expected', function() {
		waits(1000 * 30);

		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name:'chat2-noMessage'});
		});
	});
	
	it('Agent has answered', function() {
		$.mockjaxClear();
		var step = 0;
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
				} else  {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});
		
		waits(10000);
		
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#chatContent .messages li:last-child').html()).toContain('Hello what can I do for you?');
		});
	});	
	
	it('Waiting for more than 30s, message expected', function() {
		waits(1000 * 30);
		
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Your chat session will end if you don\'t send a message in 1 minute');
			callPhantom({cmd : 'capture', name:'chat3-messageOneMin'});

			$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	waits(1000 * 65);
	
	it('Timeout - chat is closed', function() {
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			callPhantom({cmd : 'capture', name:'chat4-messageKillChat'});

			$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	waits(1000);
	
	it('Chat disconnected', function() {
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert')).not.toExist();			
		});
	});
	
	waits(500);
	
	it('Confirm button is in default state', function() {
		expect($('#morePageChatBtn')).not.toHaveClass('plume');
		expect($('#morePageChatBtn > div').html()).toMatch('Aio Chat');
		callPhantom({cmd : 'capture', name:'chat5-defaultButton'});
	});

	waits(1000);

	it('Connect chat - agent send a message', function() {
		$.mockjaxClear();
		var step = 0;
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
			responseTime : 0,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
				} else  {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#i18n_chatInput')).not.toHaveProp('disabled');
			expect($('#i18n_chatInput')).not.toHaveAttr('aria-disabled', 'true');
			expect($('#i18n_chatSendButton')).not.toHaveClass('disabled');
			expect($('#i18n_chatSendButton')).not.toHaveAttr('aria-disabled', 'true');
		});
	});
	
	it('Wait message about dismiss', function() {
		waits(1000 * 30); // wait more than 30s 
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Your chat session will end if you don\'t send a message in 1 minute');
			callPhantom({cmd : 'capture', name:'chat6-message'});

			$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	it('The user has send a message', function() {
		$('#i18n_chatInput').val('Hi, my phone is not working !').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		waits(500);
		runs(function(){
			expect($('#chatContent .messages li:last-child')).toHaveClass('customer');
			expect($('#chatContent .messages li:last-child').html()).toContain('alpha');
			expect($('#chatContent .messages li:last-child').html()).toContain('Hi, my phone is not working !');
		});
	});
	
	it('Waiting for more than 30s', function() {
		waits(1000 * 30);

		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name:'chat7-noMessage'});
		});
	});

	
	it('Agent has answered', function() {
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
			responseText : '{"status" : "success","sessionToken" : "2924169f"}'
		});
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(homeMockResponse)
		});
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status" : "success","autoPayExist" : false}'
		});
		var step = 0;
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=SENDTEXT&sourceid=9456879&text=Can+you+try+to+restart+your+device?';
				} else  {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});
		
		waits(10000);
		
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#chatContent .messages li:last-child').html()).toContain('Can you try to restart your device?');
		});
	});

	
	waits(1000);
	
	it('Go to homePage', function() {
		application.gotoPage('homePage');
	
		waits(1000);
	
		runs(function() {
			expect($('#supportChatPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	
	it('Wait message on another page', function() {
		waits(1000 * 90); 
		runs(function() {
			expect($('#supportChatPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name:'chat8-noMessage'});
		});
	});
	
	it('Back to more page', function() {
		application.gotoPage('morePage');
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
		});
	});
	
	it('Back to chat page', function() {
		waits(1000);
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Your chat has timed out.');
			callPhantom({cmd : 'capture', name:'chat9-timeOut'});
			
			$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	it('Disconnected of chat', function() {
		waits(1000);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			callPhantom({cmd : 'capture', name:'chat10-disconnected'});
		});
	});
});