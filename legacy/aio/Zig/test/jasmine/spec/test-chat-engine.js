describe("Chat - Engine Tests", function() {
	
	var OpenChatResponse = {
			errorcode : 0,
			userid : "200520414",
			sessionid : "2005204142211967318818826202168135179025322277108196",
			sessiontoken : "C9220089566C262A201E88838FF70BADA6E8C98087A7E25640C6CEF1D3A68DD00000013EACBA03AE",
			chatserver : "c-rnr-cs22.instantservice.com"
	};
				
	var chatFactory = new ChatSessionFactory(11);
	var chatClient;
	
	it('Test Open Chat Session Success', function() {


		waits(500);
		$.mockjaxClear();
		$.mockjax({
			url : 'https://admin.instantservice.com/CustomerAPIv2',
			responseTime : 250,
			contentType : 'text/json',
			responseText : $.param(OpenChatResponse)
		});
		
		var info = {};
		info.userName =  "Me";
		info.accountId =  "00001122";
		
		chatFactory.openChatSession(12, info, { success : function(c){
			chatClient = c;
		}});
		
		waits(500);
		
		runs(function() {
			expect(chatClient).toBeDefined();
		});
	});
	
	
	it('Test Connect', function() {

		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 250,
			contentType : 'text/plain',
			responseText : 'errorcode=0\r\ncommand=CONNECTACCEPT'
		});
		
		
		var eventConnectRaised = false;
		chatClient.bind(function(event){
			if(event == 'connectAccept'){
				eventConnectRaised = true;
				$.mockjax({
					url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
					responseTime : 250,
					contentType : 'text/plain',
					responseText : 'errorcode=0'
				});
			}
		});
		chatClient.poolTime = 1;
		chatClient.connect();
		
		waits(500);
		
		runs(function() {
			expect(chatClient.connectionIsOpened).toBe(true);
			expect(eventConnectRaised).toBe(true);
			
			
		});
	});
	
	it('Test Pooling', function() {
		
		spyOn(chatClient, '_sendCommand').andCallThrough();
		waits(1000 *4);
			
		runs(function() {
			expect(chatClient._sendCommand.calls.length ).toBe(3);
		});
	
	});
	
	it('Test Pooling in queue', function() {
		
		$.mockjaxClear();
		//now try with real slow request, and check that _sendCommand is not called until the last has returned
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 5000,
			contentType : 'text/plain',
			responseText : 'errorcode=0'
		});
//		var nbCalls = chatClient._sendCommand.calls.length ;
		spyOn(chatClient, '_sendCommand').andCallThrough();
		waits(1000 *4);
		
		runs(function() {
			expect(chatClient._sendCommand.calls.length ).toBe(1);
			chatClient.exit();
			
		});
		
		waits(1000);
		
		runs(function() {
			//nop
		});
	});
	
	
	it('Test Buffering commands', function() {
		chatClient.connectionIsOpened = true;
		chatClient._isPooling = false;
		chatClient._commandBuffer = [];
		
		// long request delay
		$.mockjax({
			url : '*/2005204142211967318818826202168135179025322277108196/CustomerAPIv2',
			responseTime : 5000,
			contentType : 'text/plain',
			responseText : 'errorcode=0'
		});
		
		//this one is launched immediatly
		chatClient.sendText('First text');
		
		waits(200);
		
		var data;
		runs(function() {
			chatClient.startTyping();
			chatClient.sendText('Buffered Message 1');
			chatClient.endTyping();
			chatClient.startTyping();
			chatClient.sendText('Buffered Message 2');
			chatClient.endTyping();
			$(document).ajaxSend(function(event, jqxhr, settings) {
				  console.log(settings);
				  data  = settings.data;
			});
//			spyOn($, 'ajax').andCallFake(function(options) {
//				data  = options.data;
//				return $.ajax(options);
//			});
		});
		
		waits(6000);
		runs(function() {
			var commands = data.split("\r\n");
			expect(commands.length).toBe(6);
			expect(commands[0]).toBe("command=CUSTOMERTYPINGSTART");
			expect(commands[1]).toBe("command=SENDTEXT&text=Buffered+Message+1");
		});
	});
});