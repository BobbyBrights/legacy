describe("Chat - Server Error", function() {
	var chatConnection = function(){
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
						this.responseText = 'errorcode=0\r\ncommand=CONNECTACCEPT\r\ncommand=AGENTTYPINGSTART\r\ncommand=AGENTTYPINGEND\r\ncommand=SENDTEXT&sourceid=9456879&text=Hello+what+can+I+do+for+you?';
						break;
					default:
						this.responseText = 'errorcode=0';
						break;
					}
					step++;
				}
			});
			
			$("#morePageChatBtn").triggerHandler('tap');
			waits(2000);
			runs(function() {
				expect($('#morePage')).toBeHidden();
				expect($('#supportChatPage')).toBeVisible();
				expect($('#chatContent .messages li:first-child')).toHaveClass('welcome');
				expect($('#chatContent .messages li:first-child').html()).toContain('Welcome to Aio Chat');
				expect($('#chatContent .messages li:last-child')).toHaveClass('agent');
				expect($('#chatContent .messages li:last-child').html()).toContain('Hello what can I do for you?');
			});
		});
	};
	
	
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
		expect($('#morePageChatBtn > div').html()).toContain('Aio Chat');
	});

	waits(1000);
	
	var errorTestFct = function(stepsTest){
		chatConnection();

		waits(500);
		
		it('Request with bad ' + stepsTest.message, function() {
			var step = 0;
			$.mockjaxClear();
			$.mockjax({
				url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
				responseTime : 0,
				contentType : 'text/plain',
				response : function(settings){
					if(step == 0) {
						this.responseText = 'errorcode=' + stepsTest.errorCode;
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
				expect($('#zAlert')).toExist();
				expect($('#zAlert #zContent').html()).toContain(stepsTest.alert);
				callPhantom({cmd : 'capture', name: stepsTest.screenshot});
			});
		});

		if(stepsTest.errorCode == '104'){
			it('Check timeout disabled', function() {
				waits(1000 * 40);
				runs(function() {
					expect($('#morePage')).toBeHidden();
					expect($('#supportChatPage')).toBeVisible();
					expect($('#zAlert')).toExist();
					expect($('#zAlert #zContent').html()).toContain(stepsTest.alert);
					callPhantom({cmd : 'capture', name: 'chat5b-timeout'});
				});
			});
		}

		if(stepsTest.errorCode != '107'){
			it('Back to more page', function() {
				if ($('#zAlert').is(':visible'))
					$("#zAlert .bright").triggerHandler('tap');

				waits(1000);
				
				runs(function() {
					expect($('#morePage')).toBeVisible();
					expect($('#supportChatPage')).toBeHidden();
				});
			});
		} else {
			it('Stay on chat room', function() {
				if ($('#zAlert').is(':visible'))
					$("#zAlert .bleft").triggerHandler('tap');

				waits(1000);
				
				runs(function() {
					expect($('#morePage')).toBeHidden();
					expect($('#supportChatPage')).toBeVisible();
				});
			});			
		}
	};
	
	errorTestFct({errorCode : '100', message : 'SessionID', alert: 'Your chat session has expired.', screenshot : 'chat1-sessionID'});
	errorTestFct({errorCode : '101', message : 'AccountID', alert: 'Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).', screenshot : 'chat2-accountID'});
	errorTestFct({errorCode : '102', message : 'DepartmentID', alert: 'Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).', screenshot : 'chat3-deptID'});
	errorTestFct({errorCode : '103', message : 'Command', alert: 'Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).', screenshot : 'chat4-command'});
	errorTestFct({errorCode : '104', message : 'UserID', alert: 'Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).', screenshot : 'chat5-userID'});
	errorTestFct({errorCode : '105', message : 'SessionToken', alert: 'Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).', screenshot : 'chat6-sessionToken'});
	errorTestFct({errorCode : '106', message : 'RoomID', alert: 'Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don\'t want you to have to wait.\n\nPlease check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).', screenshot : 'chat7-roomID'});
	errorTestFct({errorCode : '107', message : 'text', alert: 'We couldn\'t send your message. Please retype and submit it again.', screenshot : 'chat8-text'});
});