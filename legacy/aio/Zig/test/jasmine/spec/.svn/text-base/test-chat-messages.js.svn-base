describe("Chat - Messages", function() {
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
	});

	waits(1000);

	it('Starting chat session', function() {
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
					this.responseText = 'errorcode=0\r\ncommand=AGENTTYPINGSTART';
					break;
				case 2:
					this.responseText =  'errorcode=0\r\ncommand=AGENTTYPINGEND';
					break;
				case 3:
					this.responseText =  'errorcode=0\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
					break;
				case 4:
					this.responseText =  'errorcode=0\r\ncommand=PUSHURL&url=http%3a%2f%2faiowireless.com%2fsupport';
					break;
				case 5:
					this.responseText =  'errorcode=0';
					break;
				case 6:
					this.responseTime = 4000;
					break;
				case 7:
					this.status = 500;
					break;
				/*case 8:
					this.responseText =  'errorcode=0\r\ncommand=SENDTEXT&sourceid=0&text=Thank+you+for+using+Live+Help.++You+may+now+close+this+window.\r\ncommand=DISMISS';
					break;*/
				default:
					this.responseText =  'errorcode=0';
					break;
				}
				step++;
			}
		});
		
		$("#morePageChatBtn").triggerHandler('tap');
		$("#i18n_chatSendButton").triggerHandler('tap');
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#chatContent .messages li:last-child')).toHaveClass('welcome');
			expect($('#chatContent .messages li:last-child').html()).toContain('Welcome to Aio Chat');
			expect($('#i18n_chatInput')).toHaveProp('disabled');
			expect($('#i18n_chatInput')).toHaveAttr('aria-disabled', 'true');
			expect($('#i18n_chatSendButton')).toHaveClass('disabled');
			expect($('#i18n_chatSendButton')).toHaveAttr('aria-disabled', 'true');
			expect($('#zAlert')).not.toExist();
		});
	});

	waits(11000);

	it('The agent is typing a message', function() {
		expect($('#chatContent .messages li:last-child')).toHaveClass('system');
		expect($('#chatContent .messages li:last-child').html()).toContain('Aio Advocate is typing...');
		expect($('#i18n_chatInput')).toHaveProp('disabled');
		expect($('#i18n_chatInput')).toHaveAttr('aria-disabled', 'true');
		expect($('#i18n_chatSendButton')).toHaveClass('disabled');
		expect($('#i18n_chatSendButton')).toHaveAttr('aria-disabled', 'true');
	});

	waits(10000);
	
	it('The agent finnished to type a message', function() {
		expect($('#chatContent .messages li:last-child')).toHaveClass('system');
	});
	
	waits(10000);
	
	it('The agent has sent a message', function() {
		expect($('#chatContent .messages li:last-child')).toHaveClass('agent');
		expect($('#chatContent .messages li:last-child').html()).toContain('Hello what can I do for you?');
		expect($('#i18n_chatInput')).not.toHaveProp('disabled');
		expect($('#i18n_chatInput')).not.toHaveAttr('aria-disabled', 'true');
		expect($('#i18n_chatSendButton')).not.toHaveClass('disabled');
		expect($('#i18n_chatSendButton')).not.toHaveAttr('aria-disabled', 'true');
	});
	
	waits(10000);
	
	it('The agent has pushed a url', function() {
		expect($('#chatContent .messages li:last-child')).toHaveClass('agent');
		expect($('#chatContent .messages li:last-child a').html()).toContain('http://');
		expect($('#i18n_chatInput')).not.toHaveProp('disabled');
		expect($('#i18n_chatSendButton')).not.toHaveClass('disabled');
	});
	
	waits(500);
	
	it('The user has sent a message', function() {
		$('#i18n_chatInput').val('Hi, my phone is not working !').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		waits(500);
		runs(function(){
			expect($('#chatContent .messages li:last-child')).toHaveClass('customer');
			expect($('#chatContent .messages li:last-child').html()).toContain('alpha');
			expect($('#chatContent .messages li:last-child').html()).toContain('Hi, my phone is not working !');
		});
	});
	
	waits(500);
	
	it('The user has sent a message (but taking long time)', function() {
		$('#i18n_chatInput').val('It is painful').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		waits(3000);
		runs(function(){
			expect($('#chatContent .messages li:last-child')).toHaveClass('sending');
		});
	});
	
	waits(500);
	
	it('The user has send a message (failed)', function() {
		$('#i18n_chatInput').val('I want another one !').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		waits(500);
		runs(function(){
			expect($('#chatContent .messages li:last-child')).toHaveClass('failed');
			expect($('#chatContent .messages li:last-child').html()).toContain('I want another one !');
			callPhantom({cmd : 'capture', name:'chat-session'});
		});
	});
	
	waits(500);
	
	it('The user try to send an empty message', function() {
		$('#i18n_chatInput').val('').triggerHandler('keyup');
		$('#i18n_chatSendButton').triggerHandler('tap');
		waits(500);
		runs(function(){
			expect($('#zAlert')).toExist();
			expect($('#zAlert #zContent').html()).toContain('It looks like you didn\'t enter a message. Please type your message and submit it again.');
			callPhantom({cmd : 'capture', name:'empty-message'});
		});
	});
});
