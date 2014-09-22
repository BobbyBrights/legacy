describe("Chat - Agent Left Conversation", function() {
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

	it('Connect chat', function() {
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
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
				} else if(step ==1) {
					this.responseText = 'errorcode=0\r\ncommand=AGENTTYPINGSTART';
				} else if(step ==2) {
					this.responseText =  'errorcode=0\r\ncommand=AGENTTYPINGEND';
				} else  {
					this.responseText =  'errorcode=0';
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
	
	waits(500);
	
	it('Agent left conversation', function() {

		$.mockjaxClear();
		var step = 0;
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText ='errorcode=0\r\ncommand=SENDTEXT&sourceid=0&text=You+are+currently+at+position+number+1+in+the+queue.\r\ncommand=SENDTEXT&sourceid=0&text=You+have+been+connected+to+Matthieu.\r\ncommand=AGENTTYPINGSTART\r\ncommand=AGENTTYPINGEND\r\ncommand=SENDTEXT&sourceid=189354506&text=Matthieu%3A+fgfsd\r\ncommand=SENDTEXT&sourceid=0&text=Thank+you+for+using+Live+Help.++You+may+now+close+this+window.\r\ncommand=DISMISS';
				}
				step++;
			}
		});

		waits(9000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert #zContent').html()).toMatch('Your Aio Advocate has left the chat.');
			callPhantom({cmd : 'capture', name:'chat1-agentLeft'});

			if ($('#zAlert').is(':visible'))
				$("#zAlert .bright").triggerHandler('tap');
		});
	});

	waits(1000);
	
	it('Check deconnection', function() {
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert')).not.toExist();
		});
	});

	it('Connect chat', function() {
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
		
		var step =0;
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			response : function(settings){
				if(step == 0) {
					this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT';
				} else if(step ==1) {
					this.responseText = 'errorcode=0\r\ncommand=AGENTTYPINGSTART';
				} else if(step ==2) {
					this.responseText =  'errorcode=0\r\ncommand=AGENTTYPINGEND';
				} else {
					this.responseText =  'errorcode=0';
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
	
	waits(1000);
	
	it('Go to homePage', function() {
		$.mockjaxClear();
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

		application.gotoPage('homePage');
	
		waits(1000);
	
		runs(function() {
			expect($('#supportChatPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
		
	waits(1000);
	
	it('Agent left conversation', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 0,
			contentType : 'text/plain',
			responseText : 'errorcode=0\r\ncommand=SENDTEXT&sourceid=0&text=Thank+you+for+using+Live+Help.++You+may+now+close+this+window.\r\ncommand=DISMISS'
		});

		waits(16000);
		runs(function() {
			expect($('#homePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert')).not.toExist();

			callPhantom({cmd : 'capture', name:'chat2-agentLeftOnHomePage'});
		});
	});
	
	waits(1000);
	
	it('Back to more page', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
			expect($('#morePageChatBtn')).toHaveClass('plume');
			expect($('#morePageChatBtn > div').html()).toMatch('Return to Chat');
			callPhantom({cmd : 'capture', name:'chat3-resumeButton'});
		});
	});

	waits(1000);
		
	it('Back to chat page', function() {
		$("#morePageChatBtn").triggerHandler('tap');
		
		waits(2000);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#supportChatPage')).toBeVisible();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert #zContent').html()).toMatch('Your Aio Advocate has left the chat.');
			callPhantom({cmd : 'capture', name:'chat4-agentLeftMessage'});
		});
	});
	
	waits(1000);
	
	it('Back to more page', function() {
		$("#zAlert .bright").triggerHandler('tap');

		waits(500);
		runs(function() {
			expect($('#morePage')).toBeVisible();
			expect($('#supportChatPage')).toBeHidden();
			expect($('#zAlert')).not.toExist();
			callPhantom({cmd : 'capture', name:'chat5-backMorePage'});
		});
	});
});

