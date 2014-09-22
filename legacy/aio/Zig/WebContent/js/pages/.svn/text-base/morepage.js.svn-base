(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var queueClosedMessage = '';
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			// Set active state on navigation link and title
			self.application.setNavLinkActive('#morePage');
			this.innerPage = this.$element.find('.innerPage');
//			new FastClick(this.innerPage[0]);
			
			var callbacks = {success : function(chatClient){
				self.application.unBlockUI();
				self.application.gotoPage('supportChatPage', {chat : chatClient});
			}, error : function(errorCode){
				self.application.unBlockUI();
				
				var callMethod = function() {
					if (typeof deviceapis !== "undefined") {
						// TODO What is the correct number to call ?
						deviceapis.deviceinteraction.call("18552462461");
					}
				};
				
				switch(errorCode){
					case '2':
					case '3':
					case '4':
					case '101' : 
					case '102' : 
						self.application.showMsg($.i18n._('CHAT_GENERIC_ERROR_MESSAGE'), $.i18n._('CHAT_GENERIC_ERROR_MESSAGE_TITLE'), {orientation: "vertical", buttons: [{label: "Ok", callback: function() {}}, {label: "Call AIO support", callback: callMethod}]});
						break;
					case 'network':
						self.application.showMsg($.i18n._('NETWORK_ERROR_MESSAGE'), $.i18n._('NETWORK_ERROR_TITLE'));
						break;
					default : self.application.showMsg($.i18n._('CHAT_ORACLE_UNKNOWN_ERROR'), "error");
				}
			}};
			
			var successGetAccount = function(aid, errorMessage, chatSessionTimer, timeBeforeChatSessionExpires){
				var chat = new ChatSessionFactory(aid);
				if( self.application.aid == undefined )
					self.application.aid = aid;
				if(errorMessage){
					self.queueClosedMessage = errorMessage;
					self.application.timeLimitDisconnect = chatSessionTimer;
					if(chatSessionTimer - timeBeforeChatSessionExpires > 0)
						self.application.timeLimitMessage = chatSessionTimer - timeBeforeChatSessionExpires;
				}
				var info = {};
				info.userName =  self.application.connector.homeModel.get('accountName');
				info.accountId =  self.application.connector.homeModel.get('accountId');
				info.phone =  self.application.connector.homeModel.get('ctn');
				
				//sanjay's trick
				try{
					if(info.userName.indexOf(' ')!=-1){
						info.fname = info.userName.substr(0,info.userName.indexOf(' ')); // "72"
						info.lname = info.userName.substr(info.userName.indexOf(' ')+1);
					} else {
						info.fname = info.userName;
					}
					if(self.application.connector.myProfileModel.get('email')){
						info.email = self.application.connector.myProfileModel.get('email');
					}
				} catch (e) {
					//nothing
				}
				chat.openChatSession(self.application.connector.configuration.queueIdentifier, info, callbacks);
			};
			var errorGetAccount = function(){
				self.isLoading = false;
				self.application.unBlockUI();
			};

			$('#morePageChatBtn').tap(function() {
				self.application.blockUI("Connecting");
				if( self.application.aid == undefined )
					self.application.connector.getAccountId(successGetAccount,errorGetAccount);
				else if( !self.application.isChatSessionOpen )
					successGetAccount(self.application.aid);
				else
					self.application.gotoPage('supportChatPage');
			});

			$('#morePageCallBtn').tap(function() {
				if (typeof deviceapis !== "undefined") {
					// TODO What is the correct number to call ?
					deviceapis.deviceinteraction.call("18552462461");
				}
			});

			$('#morePageSupportBtn').tap(function() {
//				self.application.gotoPage('supportPage');
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/support');
				}
			});
			
			$('#morePageProfileBtn').tap(function() {
				self.application.gotoPage('myProfilePage');
			});
			
			$('#i18n_resetVmPwLink').tap(function() {
				self.application.gotoPage('resetVoiceMailPwdPage');
			});			
			
			$('#aboutUsFaqsPageLink').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/faqs-myaio_mobileview');
				}
			});
			
			$('#aboutUsPrivacyPageLink').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/privacy_mobileview');
				}
			});
			$('#aboutUsTandCPageLink').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/terms_mobileview');
				}
			});
			$('#eulaPageLink').tap(function() {
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/myaio-eula');
				}
			});
		},

		onShow : function() {
			this.application.setNavLinkActive('#morePage');
			if(this.application.isChatSessionOpen) {
				$('#morePageChatBtn').addClass('plume');
				$('#morePageChatBtn > div').text('Return to Chat');
			} else {
				$('#morePageChatBtn').removeClass('plume');
				$('#morePageChatBtn > div').text('Aio Chat');
			}
			
			self.application.unBlockUI();
		},

		onRefresh : function() {
			self.application.unBlockUI();
		},

		onBack : function() {
			if(this.isLoading) {
				//ignore
				return;
			}
			this.application.gotoPage('homePage');
		}

	};

	Pages.MorePage = MVC.Page.extend(methods);

})($, MVC);