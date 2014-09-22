(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;

			this.isWP = this.application.isWP8 || this.application.isWP7;
			this.isLoading = false;
			this.isInLine = false;
			this.chatEngine = undefined;

			this.timerMessage = null;
			this.timerDisconnect = null;
			this.timerConnection = null;

			this.username = this.application.connector.homeModel.get('accountName');

//			var $fastClickedElements = $("#i18n_chatEndButton, #i18n_chatSendButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_chatEndButton').tap(function() {
				self._quitChat();
			});
			$('#i18n_chatSendButton').tap(function() {
				if(!$("#i18n_chatInput").prop("disabled") && $(this).hasClass("disabled") && $.trim($("#i18n_chatInput").val()) == "") {
					$('#i18n_chatInput').trigger("focus");
				}
				else {
					self.sendMessage($('#i18n_chatInput').val());
				}
			});

			$('#i18n_chatInput').bind('focus', function() {
				//self._stopTimer();

				if (!self.isWP) {
					$('#footer').hide().attr("aria-hidden", "true");
					$('#supportChatPage').find('.page-bottom-margin').hide().attr("aria-hidden", "true");
				}

				window.setTimeout(self.layout.bind(self), 100);
			});
			$('#i18n_chatInput').bind('blur', function(e) {
				e.preventDefault();
				//self._refreshTimer();

				window.setTimeout(function() {
					$('#footer').show().attr("aria-hidden", "false");
					$('#supportChatPage').find('.page-bottom-margin').show().attr("aria-hidden", "false");
					window.setTimeout(self.layout.bind(self), 100);
				}, 300);
			});
			$('#i18n_chatInput').keyup(function(e) {
				/*if($.trim(this.value) == "") {
					$('#i18n_chatSendButton').addClass("disabled").attr("aria-disabled", "true");
				}
				else {
					$('#i18n_chatSendButton').removeClass("disabled").attr("aria-disabled", "false");*/
					if (e.keyCode == 13) {
						var message = $(this).val();
						message = message.replace(/\r?\n|\r/g, "");
						$(this).val(message);
						self.sendMessage(message);
						e.preventDefault();
					}
				/*}*/
			});

			// iOS: resize event is triggered when we scroll, so we don't use it
			// Android: needed as the layout on focus is not enough
			if (!this.application.model.isIos)
				$(window).bind('resize', this.layout.bind(self));
		},

		onHide : function() {
			this.chatEngine.setSpeed('long');
		},

		onShow : function(options) {
			var self = this;
			
			// Initialize iscroll
			if (!this.chatScroller && !this.application.isWP7 && !this.application.android_le) {
				this.chatScroller = new iScroll('chatContent', {
					hScroll : false,
					hScrollbar : false,
					fadeScrollbar : true,
					hideScrollbar : true,
					scrollbarClass : 'chatScrollbar'
				});
			}

			this.onRefresh();

			if (options && options.chat) {
				this.chatEngine = options.chat;
				this.chatEngine.bind(this.filterCommands, this);
			}

			if (!this.application.isChatSessionOpen) {
				this.bufferMessagePopup = null;
				$('#i18n_chatInput').prop('disabled', true).attr("aria-disabled", "true");
				$('#i18n_chatSendButton').addClass('disabled').attr("aria-disabled", "true");

				$('#chatContent').find('ul').empty();
				this.connect();
			} else {
				this.application.unBlockUI();
				this.chatEngine.setSpeed('normal');
			}

			if (this.bufferMessagePopup) {
				if (this.bufferMessagePopup.options != undefined) {
					this.application.showMsg(this.bufferMessagePopup.msg, this.bufferMessagePopup.title, this.bufferMessagePopup.options);
				} else {
					this.application.showMsg(this.bufferMessagePopup.msg, this.bufferMessagePopup.title);
				}
				this.bufferMessagePopup = null;
			}
		},

		connect : function() {
			this.application.blockUI("Connecting");
			this.isLoading = true;

			// Connect to the chat server 
			this.chatEngine.connect();
		},

		layout : function() {
			var divToResize = $('#chatContent');
			var bottomMarginHeight = $('#supportChatPage').find('.page-bottom-margin').is(':visible') ? $('#supportChatPage').find('.page-bottom-margin').height() : 0;
			var divToResizeMarginHeight = parseInt($('#chatContent').css('margin-bottom'));

			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;

			var windowHeight = this.application.model.isIos ? window.innerHeight : jQuery(window).height() + statusBarHeight;
			// -4px for border...
			var newHeight = windowHeight - 4 - divToResize.offset().top - $('#chatInputLine').height() - bottomMarginHeight - divToResizeMarginHeight;
			newHeight = newHeight > 100 ? newHeight : 100;

			if (!this.application.android_le)
				divToResize.height(parseInt(newHeight) + 'px');
			else
				divToResize.css('min-height', parseInt(newHeight) + 'px');

			// On iOS phones, as webview is scrolled and not resized, we need to
			// scroll the content
			if (this.application.model.isIos) {
				window.scrollTo(0, (this.application.model.isTablet || this.application.model.isIPhone5) ? 0 : $('#supportChatPage').find('.i18n_headerAccount').offset().top);
			}

			this._refreshChat(true);
		},

		onRefresh : function() {
			window.setTimeout(this.layout.bind(this), 100);
		},

		onBack : function(event) {
			event.preventDefault();
			if (this.isLoading) {
				// cannot cancel this
				return;
			}
			this._quitChat();
		},

		/***********************************************************************
		 * ********************** PRIVATE
		 **********************************************************************/

		_connectionDroppedMessage : function() {
			var self = this;
			
			if (this.isVisible) {
				this.application.showMsg($.i18n._('CHAT_CONNECTION'), $.i18n._('CHAT_CONNECTION_TITLE'), {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]});
				this.bufferMessagePopup = null;
			} else {
				this.bufferMessagePopup = {
					title : $.i18n._('CHAT_CONNECTION_TITLE'),
					msg : $.i18n._('CHAT_CONNECTION'),
					options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]}
				};
			}
		},

		_quitChat : function() {
			var self= this;
			
			var options = {
				buttons: [{label: "Yes", callback: self.onQuit.bind(self)}, 
				          {label: "Back to Chat", callback: function() {}}]
			};
			
			self.application.showMsg($.i18n._('CHAT_QUIT'), $.i18n._('CHAT_QUIT_TITLE'), options);
		},

		_refreshChat : function(afterLayout) {
			var self = this;
			var scrollTimer = afterLayout ? 0 : 200;
			setTimeout(function() {
				if (self.chatScroller)
					self.chatScroller.refresh();

				var containerHeight = $('#chatContent').height();
				var contentHeight = $('#chatContent > ul').height();
				if (self.application.android_le)
					$(window).scrollTop($(window).height() + 2000);
				// +2000 to be sure to scroll at the bottom of the page...
				else if (contentHeight > containerHeight && self.application.isWP7)
					$('#chatContent').scrollTop($('#chatContent').find('ul').height());
				else if (contentHeight > containerHeight && self.chatScroller)
					self.chatScroller.scrollToElement('li:last-child', scrollTimer);
			}, 0);
		},

		/***********************************************************************
		 * ********************** DISCONNECT RULES
		 **********************************************************************/

		_disconnect : function() {
			var self = this;
			
			this._stopTimer();

			if (this.isVisible) {
				this.application.showMsg($.i18n._('CHAT_INACTIVE_END'), $.i18n._('CHAT_BYE'), {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]});
				this.bufferMessagePopup = null;
			} else {
				this.bufferMessagePopup = {
					title : $.i18n._('CHAT_BYE'),
					msg : $.i18n._('CHAT_INACTIVE_END'),
					options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]}
				};
			}
		},

		_disconnectMessage : function() {
			var chatTimeoutDelay = this.application.timeLimitDisconnect - this.application.timeLimitMessage;
			var chatTimeoutDelayMinutes = Math.floor(chatTimeoutDelay / 60);
			var chatTimeoutDelaySeconds = chatTimeoutDelay % 60;
			var timeUntilDisconnect = "";
			var chatTimeoutHumanizedMunites = chatTimeoutDelayMinutes + " " + $.i18n._('MINUTE' + (chatTimeoutDelayMinutes > 1 ? "S" : ""));
			var chatTimeoutHumanizedSeconds = chatTimeoutDelaySeconds + " " + $.i18n._('SECOND' + (chatTimeoutDelaySeconds > 1 ? "S" : ""));
			
			if(chatTimeoutDelayMinutes > 0 && chatTimeoutDelaySeconds > 0) {
				timeUntilDisconnect = chatTimeoutHumanizedMunites + (chatTimeoutDelaySeconds ? " " + $.i18n._('AND') + " " + chatTimeoutHumanizedSeconds : "");
			}
			else if(chatTimeoutDelayMinutes > 0 && chatTimeoutDelaySeconds == 0) {
				timeUntilDisconnect = chatTimeoutHumanizedMunites;
			}
			else if(chatTimeoutDelaySeconds > 0 && chatTimeoutDelayMinutes == 0) {
				timeUntilDisconnect = chatTimeoutHumanizedSeconds;
			}
			
			if (this.isVisible) {
				this.application.showMsg($.i18n._('CHAT_INACTIVE').replace('{0}', timeUntilDisconnect), $.i18n._('CHAT_HEADS_UP'));
				this.bufferMessagePopup = null;
			} else {
				this.bufferMessagePopup = {
					title : $.i18n._('CHAT_HEADS_UP'),
					msg : $.i18n._('CHAT_INACTIVE').replace('{0}', timeUntilDisconnect)
				};
			}
		},

		_stopInactivityTimer : function() {
			if (this.timerMessage != null)
				clearTimeout(this.timerMessage);
			if (this.timerDisconnect != null)
				clearTimeout(this.timerDisconnect);
		},

		_stopTimer : function() {
			this._stopInactivityTimer();
			if (this.timerConnection != null)
				clearTimeout(this.timerConnection);
		},

		_refreshTimer : function() {
			var self = this;
			this._stopInactivityTimer();
			this.timerMessage = setTimeout(this._disconnectMessage.bind(this), this.application.timeLimitMessage * 1000);
			this.timerDisconnect = setTimeout(this._disconnect.bind(this), this.application.timeLimitDisconnect * 1000);
		},

		/***********************************************************************
		 * ********************** SEND MESSAGE
		 **********************************************************************/

		sendMessage : function(message) {
			if (!$('#i18n_chatSendButton').hasClass('disabled')) {
				if(message === "") {
					this.application.showMsg($.i18n._('CHAT_ORACLE_EMPTY_MSG'), $.i18n._('CHAT_ORACLE_EMPTY_MSG_TITLE'));
				}
				else {
					// Clear the textarea
					$('#i18n_chatInput').val("");
					//$('#i18n_chatSendButton').addClass('disabled').attr("aria-disabled", "true");
	
					// Add the message
					var escapedText = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
					var li = $('<li/>').addClass('customer large').append("<span>" + this.username + ": </span>" + escapedText);
					$('#supportChatPage #chatContent ul').append(li);
					this._refreshChat(false);
	
					// Timer (2s) to set the message to "sending" status
					var sendingStatus = setTimeout(function() {
						li.addClass('sending');
					}, 2000);
	
					// Stop Timer (30s), waiting answer from operator
					this._stopTimer();
	
					this.chatEngine.sendText(escapedText, {
						success : function(chatClient) {
							// Clear timer and delete sending class
							window.clearTimeout(sendingStatus);
							li.removeClass('sending');
						},
						error : function(errorCode) {
							// Add failed class
							li.removeClass('sending').addClass('failed').append('<br/><em>(message not sent)</em>');
						}
					});
				}
			}
		},

		/***********************************************************************
		 * ********************** CHAT EVENT CALLBACKS
		 **********************************************************************/

		filterCommands : function(type, model) {
			var self = this;
			switch (type) {
				case "connectAccept":
					this.onConnect();
					break;
				case "dismiss":
					this.onDismiss();
					break;
				case "sendText":
					if (model.sourceId == 0) {
						this.onSystemMessageReceived(model.text);
					} else if (model.sourceId !== 1) {
						this.onAgentMessageReceived(model.text);
						if (this.isInLine)
							this.onChatReady();
						// Timer (30s) to disconnect user if he is inactive
						this._refreshTimer();
					}
					break;
				case "agentStartTyping":
					this.onSystemMessageReceived("Aio Advocate is typing...");
					break;
				case "agentEndTyping":
					this.onSystemMessageReceived("Your Aio advocate will be with you in a moment.");
					break;
				case "pushURL":
					// TODO
					this.onURLReceived(model.url);
					// Timer (30s) to disconnect user if he is inactive
					this._refreshTimer();
					break;
				case "NetworkError":
					if(self.timerConnection == null) {
						self.timerConnection = setTimeout(this._connectionDroppedMessage.bind(this), self.application.chatSessionExpirationDelay * 1000);
						self._stopInactivityTimer();
					}
					break;
				case "connect_error":
					self._stopTimer();
					
					if(self.isVisible) {
						self.application.showMsg($.i18n._('NETWORK_ERROR_MESSAGE'), $.i18n._('NETWORK_ERROR_TITLE'), {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]});
					}
					else {
						self.bufferMessagePopup = {
							title : $.i18n._('NETWORK_ERROR_TITLE'),
							msg : $.i18n._('NETWORK_ERROR_MESSAGE'),
							options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]}
						};
					}
					break;
				case "ServerError":
					switch(model.errorcode) {
						case '100':
							self._stopTimer();

							if(self.isVisible) {
								self.application.showMsg($.i18n._('CHAT_ORACLE_BAD_SESSIONID'), $.i18n._('CHAT_ORACLE_BAD_SESSIONID_TITLE'), {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]});
							}
							else {
								self.bufferMessagePopup = {
									title : $.i18n._('CHAT_ORACLE_BAD_SESSIONID_TITLE'),
									msg : $.i18n._('CHAT_ORACLE_BAD_SESSIONID'),
									options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]}
								};
							}
							break;
						case '107':
							if(self.isVisible) {
								self.application.showMsg($.i18n._('CHAT_ORACLE_BAD_TEXT'), $.i18n._('CHAT_ORACLE_BAD_TEXT_TITLE'));
							}
							else {
								self.bufferMessagePopup = {
									title : $.i18n._('CHAT_ORACLE_BAD_TEXT_TITLE'),
									msg : $.i18n._('CHAT_ORACLE_BAD_TEXT')
								};
							}
							break;
						default: 
							self._stopTimer();
						
							var callMethod = function() {
								if (typeof deviceapis !== "undefined") {
									// TODO What is the correct number to call ?
									deviceapis.deviceinteraction.call("18552462461");
								}
							};

							if(self.isVisible) {
								self.application.showMsg($.i18n._('CHAT_GENERIC_ERROR_MESSAGE'), $.i18n._('CHAT_GENERIC_ERROR_MESSAGE_TITLE'), {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}, {label: "Call AIO support", callback: callMethod}]});
							}
							else {
								self.bufferMessagePopup = {
									title : $.i18n._('CHAT_GENERIC_ERROR_MESSAGE_TITLE'),
									msg : $.i18n._('CHAT_GENERIC_ERROR_MESSAGE'),
									options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}, {label: "Call AIO support", callback: callMethod}]}
								};
							}
					}
					break;
				case "Success":
					if(this.timerConnection != null) {
						clearTimeout(this.timerConnection);
						this.timerConnection = null;
						// inactivity timers are restarted only if the last message was sent by the agent
						if($('#chatContent ul li:last').hasClass("agent large")) {
							this._refreshTimer();
						}
					}
					break;
				default:
					break;
			}
		},

		onError : function(message) {
			var self = this;
			
			this._stopTimer();

			$('#i18n_chatInput').prop('disabled', true).attr("aria-disabled", "true");
			$('#i18n_chatSendButton').addClass('disabled').attr("aria-disabled", "true");

			if (this.isVisible) {
				self.application.showMsg(message, "error", {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]});
			} else {
				this.bufferMessagePopup = {
					title : "error",
					msg : message,
					options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]}
				};
			}
		},

		onConnect : function() {
			this.isLoading = false;
			this.application.unBlockUI();

			this.isInLine = true;
			this.application.isChatSessionOpen = true;
			this.onGreetingMessageReceived("Welcome to Aio Chat");
		},

		onGreetingMessageReceived : function(message) {
			var li = $('<li/>').addClass('large welcome').append(message);
			$('#chatContent').find('ul').append(li);

			this._refreshChat(false);
		},

		onDismiss : function() {
			var self = this;
			
			this._stopTimer();

			$('#i18n_chatInput').prop('disabled', true).attr("aria-disabled", "true");
			$('#i18n_chatSendButton').addClass('disabled').attr("aria-disabled", "true");

			if (this.isVisible) {
				self.application.showMsg($.i18n._('CHAT_ADVOCATE_LEFT'), $.i18n._('CHAT_BYE'), {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]});
			} else {
				this.bufferMessagePopup = {
					title : $.i18n._('CHAT_BYE'),
					msg : $.i18n._('CHAT_ADVOCATE_LEFT'),
					options: {buttons: [{label: "Ok", callback: self.onQuit.bind(self)}]}
				};
			}
		},

		onQuit : function() {
			$('#i18n_chatInput').val('');
			$('#chatContent').find('ul').empty();
			this._stopTimer();
			this.chatEngine.unbind();

			this.chatEngine.exit({ error : function(){/*ignore errors*/}});
			this.application.isChatSessionOpen = false;
			this.application.gotoPage('morePage');
			if(this.chatScroller) {
				this.chatScroller.destroy();
				this.chatScroller = null;
			}
			this.bufferMessagePopup = null;
		},

		onChatReady : function() {
			this.isInLine = false;
			$('#i18n_chatInput').prop('disabled', false).attr("aria-disabled", "false");
			$('#i18n_chatSendButton').removeClass('disabled').attr("aria-disabled", "false");
		},

		onSystemMessageReceived : function(message) {
			$('#chatContent ul li.system').remove();
			if (message) {
				var li = $('<li/>').addClass('system medium').append(message);
				$('#chatContent ul').append(li);
			}

			this._refreshChat(false);
		},

		onURLReceived : function(url) {
			$('#chatContent ul li.system').remove();
			if (url) {
				var $a = $('<a href="#"/>').html(url).tap(function() {
					if (typeof deviceapis !== "undefined") {
						deviceapis.open(url);
					} else {
						open(url);
					}
					return false;
				});
				var li = $('<li/>').addClass('agent large').append($a);
				$('#chatContent').find('ul').append(li);
			}

			this._refreshChat(false);
		},

		onAgentMessageReceived : function(message) {
			$('#chatContent ul li.system').remove();

			var pointsIndex = message.indexOf(": ");
			if (pointsIndex !== -1)
				message = "<span>" + message.substr(0, pointsIndex + 2) + "</span>" + message.substr(pointsIndex + 2, message.length);

			var li = $('<li/>').addClass('agent large').append(message);
			li.find('a').each(function(index, element) {
				var url = element.href;
				// $(element).removeAttr('href');
				$(element).tap(function() {
					if (typeof deviceapis !== "undefined") {
						deviceapis.open(url);
					}
					return false;
				});
			});
			$('#chatContent').find('ul').append(li);

			this._refreshChat(false);
		}
	};

	Pages.supportChatPage = MVC.Page.extend(methods);

})($, MVC);
