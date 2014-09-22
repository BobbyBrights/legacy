describe("Chat - Network Error", function() {
	var chatConnection = function(){
		it('Starting chat session', function() {
			var step = 0;
			$.mockjaxClear();
			$.mockjax({
				url : '*/chatInfo',
				responseTime : 0,
				contentType : 'text/json',
				responseText : '{"status":"success","accountId":"8029","chatSessionTimer":"40","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"20"}'
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
				responseTime : 0,
				response : function(settings){
					switch (step) {
					case 0:
						this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT\r\ncommand=AGENTTYPINGSTART\r\ncommand=AGENTTYPINGEND\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
						break;
					default:
						this.responseText =  'errorcode=0';
						break;
					}
					step++;
				}
			});

			$("#morePageChatBtn").triggerHandler('tap');
			waits(500);
			runs(function() {
				application.supportChatPage.chatEngine.setSpeed("fast");
				expect($('#morePage')).toBeHidden();
				expect($('#supportChatPage')).toBeVisible();
			});
		});
	};
	
	goToHomePage();
	waits(500);
	
	it('Transition from home to more page is working', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	it('Confirm button is in default state', function() {
		expect($('#morePageChatBtn')).not.toHaveClass('plume');
		expect($('#morePageChatBtn > div').html()).toMatch('Aio Chat');
	});
	
	it('Starting chat session - network down', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","accountId":"8029","chatSessionTimer":"40","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"20"}'
		});
		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0&userid=200520414&sessionid=2005204142211967318818826202168135179025322277108196&sessiontoken=C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE&chatserver=c-rnr-cs22.instantservice.com',
			isTimeout: true
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		waits(500);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Please check your internet connection and try again.');
			callPhantom({cmd : 'capture', name: 'chat1-chatConnection'});
			
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	waits(1000);
	
	it('Network down during connection to chat', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","accountId":"8029","chatSessionTimer":"40","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"20"}'
		});
		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0&userid=200520414&sessionid=2005204142211967318818826202168135179025322277108196&sessiontoken=C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE&chatserver=c-rnr-cs22.instantservice.com'
		});
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 100,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
					this.isTimeout = true;
				} else {
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
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Please check your internet connection and try again.');
			callPhantom({cmd : 'capture', name: 'chat2-connectionNotAccepted'});
			
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
	});
	
	chatConnection();
	waits(1000);
	
	it('Network down during connection to chat after connect accept', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/chatInfo',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success","accountId":"8029","chatSessionTimer":"40","errorMsgVerbiage":"Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).","timeBeforeChatSessionExpires":"20"}'
		});
		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0&userid=200520414&sessionid=2005204142211967318818826202168135179025322277108196&sessiontoken=C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE&chatserver=c-rnr-cs22.instantservice.com'
		});
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 200,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
				} else if(step == 1) {
					this.responseText = 'errorcode=0\r\ncommand=AGENTTYPINGSTART';
					this.isTimeout = true;
				} else {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});

		waits(3000);
		
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name: 'chat3-agentTypingStart'});
		});
	});

	waits(1000);
	
	it('Network down during receiving message', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 1000,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=SENDTEXT&sourceid=9456879&text=Another+else?';
				} else  {
					this.responseText =  'errorcode=0';
					this.isTimeout = true;
				}
				step++;
			}
		});
		
		waits(3000);
		
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name: 'chat4-receive'});
		});
	});

	waits(1000);
	
	it('Network down during sending message', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 100,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
				} else if (step == 1){
					this.isTimeout = true;
				} else  {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});

		$('#i18n_chatInput').val('Hi, my phone is not working !').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		
		waits(4000);
		
		runs(function() {
			expect($('#chatContent .messages li:last-child')).toHaveClass('agent');
			expect($('#chatContent .messages li:last-child').html()).toContain('Hello what can I do for you?');
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name: 'chat6-sending'});
		});
	});
	
	waits(1000);

	it('Check timeout', function() {
		waits(20 * 1000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Your chat session will end if you don\'t send a message in 20 seconds.');
			callPhantom({cmd : 'capture', name: 'chat5-headsUp'});
			
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
		
		waits(22 * 1000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Your chat has timed out.');
			callPhantom({cmd : 'capture', name: 'chat5-timeout'});
			
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
	});

	chatConnection();
	waits(1000);
	
	it('Push many messages with network down', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 100,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.isTimeout = true;
				} else if(step == 1) {
					this.isTimeout = true;
				} else if(step == 2) {
					this.isTimeout = true;
				} else if(step == 3) {
					this.isTimeout = true;
				} else  {
					this.responseText =  'errorcode=0';
				}
				step++;
			}
		});
		
		$('#i18n_chatInput').val('Dammned, my connection is down').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');

		$('#i18n_chatInput').val('check connection').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');

		$('#i18n_chatInput').val("I'm sorry, i will be back ASAP").triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		
		waits(7000);
		
		runs(function() {
			expect($('#chatContent .messages li:last-child')).toHaveClass('customer');
			expect($('#chatContent .messages li:last-child').html()).toContain('alpha');
			expect($('#chatContent .messages li:last-child').html()).toContain("I'm sorry, i will be back ASAP");
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name: 'chat8-sending'});
		});
	});

	waits(1000);
	
	it('There is no timer conflict', function() {
		var step = 0;
		$.mockjaxClear();
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 100,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
				} else if (step > 0){
					this.isTimeout = true;
				}
				step++;
			}
		});
		
		waits(22 * 1000);
		
		runs(function() {
			expect($('#zAlert')).not.toExist();
		});
		
		waits(22 * 1000);
		
		runs(function() {
			expect($('#zAlert')).not.toExist();
		});
		
		waits(51 * 1000);
		
		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toMatch('Your connection dropped and your chat ended.');
			callPhantom({cmd : 'capture', name: 'chat9-connectionDropped'});
			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
	});

	chatConnection();
	waits(1000);

	it('Chat errors do not show out of support chat page', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 100,
			contentType : 'text/plain',
			isTimeout : true
		});

		application.gotoPage('morePage');
		waits(1000);
		
		runs(function() {
			$('#i18n_chatInput').val('Dammned, my connection is down again').triggerHandler('input');
			$('#i18n_chatSendButton').triggerHandler('tap');
		});
		
		waits(8100);
		
		runs(function() {
			expect($('#zAlert')).not.toBeVisible();
		});
	});
});