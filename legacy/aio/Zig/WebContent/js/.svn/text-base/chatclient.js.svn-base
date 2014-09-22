(function($) {

	var defaultOptions = {sessionTimeOut : 120, poolTime : 10};

	/*
	 * Utility Method to parse a query string.
	 * E.g errocode=100&querynumber=0 will return {errorcode : 100, querynumber : 0}
	 */
	var ParseQuery = function(queryString){
		var query = {};
		var params = queryString.split('&');
        for (var j = 0; j < params.length; j++) {
        	var pair = params[j].split('=');
        	query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return query;
	};
	
	var ChatClient = function(options) {
		var _options = $.extend(defaultOptions, options);
		this._init(_options);
	};
	
	/**
	 * Chat Client Object.
	 * 
	 * Usage : 
	 * 1) Create an instance using the ChatSessionFactory.openChatSession(..)
	 * 2) get the chat client via the success callback.
	 * 3) bind a listener to the chat object
	 * 4) call connect()
	 * 5) Wait until the connectAccept event is raised
	 * 6) Write to the chat using API sendText()
	 * 7) Listen to server message using the listener
	 * 
	 */
	ChatClient.prototype = {

			_init : function(options) {
				this.aid = options.aid;
				this.userId = options.userid;
				this.sessionId = options.sessionid;
				this.sessiontoken = options.sessiontoken;
				this.chatserver = options.chatserver;
				
				this.connectionIsOpened = false;
				
				//A numeric value used to uniquely identify the request, incremented after each request
				this.sequenceNumber = 0;
				//interval ID for the pool task
				this.intervalId;
				this.poolTime = options.poolTime ;

				this._listeners = [];
				this._contexts = [];
				this._isPooling = false;
				this._commandBuffer = [];
			},
			
			/**
			 * The CONNECT command is the first command that the client sends to the chat server. Any other command sent 
			 * to the server before the CONNECT command is not processed. This command establishes the customer as a 
             * user of the Live Help On Demand system. 
			 */
			connect : function() {
				var self = this;
				this._uSendCommand('CONNECT',{ai : this.aid, userid : this.userId , sessiontoken : this.sessiontoken}, {
					 success : function (){
						//start the pooling, start with short interval in order to have the accept faster.
						 if(self.connectionIsOpened){
								return;
							}
					    self.intervalId = window.setInterval(function(){
					    	if(!self._isPooling){
					    		self._sendCommand();
					    	}
					    }, 1000);
					 },
					 error : function (errorcode){
						 self._trigger("connect_error", { errorCode : errorcode});
					 },
				});
				
			},
			
			/**
			 * Set the pool speed.
			 * @param speed 'fast', 'normal', 'long'
			 */
			setSpeed : function(speed) {
				var self =this;
				if(!this.connectionIsOpened){
					return;
				}
				this.poolTime = 8;
				if('fast' === speed){
					this.poolTime = 1;
				} else if('long' === speed){
					this.poolTime = 16;
				}
				clearInterval(this.intervalId);
				this.intervalId = window.setInterval(function(){
			    	if(!self._isPooling){
			    		self._sendCommand();
			    	}
			    }, this.poolTime * 1000);
			},
			
			/**
			 * Terminates a chat session
			 */
			exit : function(callbacks) {
				clearInterval(this.intervalId);
				if(!this.connectionIsOpened){
					return;
				}
				this._uSendCommand('EXIT',{},callbacks);
		    	this.connectionIsOpened = false;
			},
			
			/**
			 * Sends a text message to the agent.
			 */
			sendText : function(text,callbacks) {
				if(!this.connectionIsOpened){
					return;
				}
				var escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				this._uSendCommand('SENDTEXT',{text : escaped},callbacks);
			},
			
			/** 
			 * Indicates that user has started typing a message
			 * @param sneakPreview text being typed by the customer
			 */
		    startTyping : function(sneakPreview) {
		    	if(!this.connectionIsOpened){
					return;
				}
		    	var args = (sneakPreview)?{text : sneakPreview}:{};
		    	this._uSendCommand('CUSTOMERTYPINGSTART',args);
		    },
		    
		    /** 
			 * Indicates the customer has stopped typing a message
			 */
		    endTyping : function() {
		    	if(!this.connectionIsOpened){
					return;
				}
		    	this._uSendCommand('CUSTOMERTYPINGEND',{});
		    },
		    
		    
		    /*
			 * Binds a callback to this model The callback signature is
			 * callback(type,model) where type is a string and model the current
			 * model.
			 */
			bind : function(callback, context) {
				if (typeof context === "undefined") {
					context = null;
				}
				this._listeners.push(callback);
				this._contexts.push(context);
			},

			/* Unbind a listener to this model */
			unbind : function(callback) {
				if(callback){
					var index = this._listeners.indexOf(callback);
					this._listeners.splice(index, 1);
					this._contexts.splice(index, 1);
				} else {
					this._listeners = [];
					this._contexts = [];
				}
			},

			
		    /* Commands received from the server*/
		    
		    /** Indicates that the client is connected to the chat server */
		    _onConnectAccept : function(){
		    	var self = this;
				this.connectionIsOpened = true;
				clearInterval(this.intervalId);
				this.intervalId = window.setInterval(function(){
			    	if(!self._isPooling){
			    		self._sendCommand();
			    	}
			    }, this.poolTime * 1000);
		    	this._trigger("connectAccept");
		    },
		    
		    
		    /** Indicates that the agent has dismissed the customer*/
		    _onDismiss : function(){
		    	clearInterval(this.intervalId);
		    	this.connectionIsOpened = false;
		    	this._trigger("dismiss");
		    },
		    
		    /** Sends a text message to the customer */
		    _onSendText : function(sourceId, text){
		    	var decodedText =  Url.decode(text);
		    	if(sourceId === this.userId){
		    		//ignore
		    		return;
		    	}
		    	this._trigger("sendText", {sourceId : sourceId , text : decodedText});
		    },
		    
		    /** Indicates the agent has started typing a message */
		    _onAgentStartTyping : function(){
		    	this._trigger("agentStartTyping", {});
		    },
		    /** Indicates the agent has ended typing a message */
		    _onAgentEndTyping : function(){
		    	this._trigger("agentEndTyping", {});
		    },
		    /** Indicates that the agent has pushed a URL to the customer client */
		    _onPushUrl : function(url){
		    	this._trigger("pushURL", {url : url});
		    },
		    
		    /** Called when the Chat Server has return an error**/
		    _onServerError : function(errorCode){
		    	//what to do in this case?
		    	//stop the pooling?
		    	if(errorCode == 100) {
		    		this.connectionIsOpened = false;
		    	}
		    	if(errorCode < 107) {
			    	clearInterval(this.intervalId);
		    	}
		    	this._trigger("ServerError", {errorcode : errorCode});
		    	
		    },
		    
		    /** Called when connection has dropped **/
		    _onNetworkError : function(textStatus) {
		    	this._trigger("NetworkError", {errorCode : textStatus});
		    },
		    
		    /** Called when a request succeeds **/
		    _onSuccess : function(textStatus) {
		    	this._trigger("Success", {errorCode : textStatus});
		    },
		    
		    /* privates */
		    _uSendCommand : function(command, params,callbacks) {
		    	if(this._isPooling){
		    		//Add the user command to the buffer
		    		this._commandBuffer.push({command : command, params : params, callbacks : callbacks});
		    	} else {
		    		this._sendCommand(command, params, callbacks);
		    	}
		    },
		    
		    _sendCommand : function(command, params,callbacks) {
		    	var self = this;
		    	this.sequenceNumber++;
		    	var data;
		    	if(command instanceof Array){
		    		//format manually the data
		    		data = "";
		    		for(var i = 0, j =command.length;i<j;i++){
		    			data+=$.param($.extend({ command : command[i].command}, command[i].params));
		    			if(i+1<j){
		    				data+="\r\n";
		    			}
		    		}
		    		var comCallbacks = {};
		    		comCallbacks.success = function(){
		    			for(var i = 0, j =command.length;i<j;i++){
		    				if(command[i].callbacks && command[i].callbacks.success){
		    					command[i].callbacks.success();
		    				}
		    			}
		    		};
		    		comCallbacks.error = function(err){
		    			for(var i = 0, j =command.length;i<j;i++){
		    				if(command[i].callbacks && command[i].callbacks.error){
		    					command[i].callbacks.error(err);
		    				}
		    			}
		    		};
		    		callbacks = comCallbacks;
		    	} else {
		    		data = command?$.extend({ command : command}, params):{};
		    	}
		    	this._isPooling = true;
		    	$.ajax({
					type : 'POST',
					url : 'https://'  + this.chatserver + '/' + this.sequenceNumber +'/' + this.sessionId +'/CustomerAPIv2',
					data : data,
					timeout : 12000
				}).done(function(data, textStatus, jqXHR) {
					//parse the response to see if there is a command to execute
					var commands = data.split('\r\n');
					// get the error code
					if(commands.length === 0) {
						return; // can this happened ?
					}
					if(commands[0].indexOf('errorcode') === -1) {
						return; // can this happened ?
					}
					var errObject = ParseQuery(commands[0]);
					var errorCode = errObject.errorcode;
					if( errorCode == 0) {
						for (var i = 1; i < commands.length; i++) {
					        var query =  ParseQuery(commands[i]);
					        self._executeCommand(query);
					    }
						if(callbacks && typeof callbacks.success === 'function'){
							try {
								callbacks.success();
							} catch (err) {
								console.log(err);
							}
				    	} 
						
					} else {
						if(callbacks && typeof callbacks.error === 'function'){
							try {
				    		 callbacks.error(errorCode);
							} catch (err) {
								console.log(err);
							}
				    	} else {
				    		self._onServerError(errorCode);
				    	}
					}
		    		self._onSuccess(data);
				}).fail(function(jqXHR, textStatus, errorThrown) {
					if(callbacks && typeof callbacks.error === 'function'){
						try {
							callbacks.error(textStatus);
						} catch (err) {
							console.log(err);
						}
			    	} else {
			    		self._onNetworkError(textStatus);
			    	}
				}).always(function(jqXHR, textStatus, errorThrown) {
					self._isPooling = false;
					//Check if the command buffer is not empty
					if(self._commandBuffer.length >0){
						var arr = self._commandBuffer.slice(0);
						self._commandBuffer = [];
						self._sendCommand(arr, params, callbacks);
					}
				});
		    },
		    
		    _executeCommand : function(query) {
		    	if(!query && !query.command) {
		    		return;
		    	}
		    	if("CONNECTACCEPT" === query.command) {
		    		this._onConnectAccept();
		    	} else if("DISMISS" === query.command) {
		    		this._onDismiss();
		    	} else if("SENDTEXT" === query.command) {
		    		this._onSendText(query.sourceid, query.text);
			    } else if("AGENTTYPINGSTART" === query.command) {
			    	this._onAgentStartTyping();
				} else if("AGENTTYPINGEND" === query.command) {
					this._onAgentEndTyping();
				} else if("PUSHURL" === query.command) {
					this._onPushUrl(query.url);
				}
		    },
		    
			_trigger : function(type,event) {
				for ( var i = 0, j = this._listeners.length; i < j; i++) {
					if (typeof this._listeners[i] === "string") {
						this._contexts[i][this._listeners[i]].apply(this._contexts[i], [ type, event ]);
					} else {
						this._listeners[i].apply(this._contexts[i], [ type, event ]);
					}
				}
			},
		    
	};
	
	//TODO remove aid : 8029
	var ChatSessionFactory = function(aid){
		this.aid = aid;
	};
	
	var adminServerURL = "https://admin.instantservice.com/CustomerAPIv2";
	var allowedExtraParams = ['fname','lname','phone','email','language'];
	ChatSessionFactory.prototype = {
			/**
			 * Will contact the oracle admin server in order to open a new chat session
			 * @param departmentId The queue id, numeric value.
			 * @param callbacks {success : function(chatClient){}, error : function(errorCode){}}
			 */
			openChatSession : function(departmentId,info,callbacks){
				var self = this;
				var data = { ai : this.aid, di : departmentId, optionaldata : info.userName, optionaldata1 : info.accountId };

				for(props in info){
					if($.inArray(props,allowedExtraParams)!=-1){
						data[props] = info[props];
					}
				}
				
				
				$.ajax({
					type : 'POST',
					url : adminServerURL,
					data : data,
				})
				.done(function(data, textStatus, jqXHR) {
					// the server returns text contentType
					var vars = {aid : self.aid },pairs = data.split('&');
				    for (var i = 0; i < pairs.length; i++) {
				        var pair = pairs[i].split('=');
				        vars[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
				    }
				    if(vars.errorcode == 0){
				    	//success
				    	var chatClient = new ChatClient(vars);
				    	if(callbacks && typeof callbacks.success === 'function'){
				    		 callbacks.success(chatClient);
				    	} else {
				    		throw new Error('Missing success callback');
				    	}
				    } else {
				    	//oracleErrorCodes = { 0 : "SUCCESS", 1 : 'UNKNOWN_ERROR', 2 : 'API_DISABLED', 3 : 'UNAUTHORIZED_IP', 4 : 'QUEUE_CLOSED', 101 : 'BAD_ACCOUNTID', 102 : 'BAD_DEPTID ' };
				    	if(callbacks && typeof callbacks.error === 'function'){
				    		 callbacks.error(vars.errorcode);
				    	} else {
				    		throw new Error(vars.errorcode);
				    	}
				    }
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					if(callbacks && typeof callbacks.error === 'function'){
			    		 callbacks.error('network',textStatus, errorThrown);
			    	} else {
			    		throw new Error(textStatus);
			    	}
				});
				
			}
	};
	
	//Utility
	var Url = {
			 
			// public method for url encoding
			encode : function (string) {
				return escape(this._utf8_encode(string));
			},
		 
			// public method for url decoding
			decode : function (string) {
				return string.replace(/\+/g," ");
			},
		 
			// private method for UTF-8 encoding
			_utf8_encode : function (string) {
				string = string.replace(/\r\n/g,"\n");
				var utftext = "";
		 
				for (var n = 0; n < string.length; n++) {
		 
					var c = string.charCodeAt(n);
		 
					if (c < 128) {
						utftext += String.fromCharCode(c);
					}
					else if((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					}
					else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
		 
				}
		 
				return utftext;
			},
		 
			// private method for UTF-8 decoding
		}
	/*put object in global scope*/
	window.ChatSessionFactory = ChatSessionFactory;
	
})($);