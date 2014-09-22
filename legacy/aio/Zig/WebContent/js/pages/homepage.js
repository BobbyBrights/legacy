(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = false;

			this.innerPage = this.$element.find('.innerPage');
//			new FastClick(this.innerPage[0]);
			
			$('#homeMaxLogo').tap(function(){
				self.application.gotoPage('morePage',{navLink : '#morePage', fromPage : 'homePage'});
			});
			
			$('#i18n_autoPayLearnMore').tap(function(){
//				self.application.gotoPage('learnMorePage',{navLink : '#homePage', fromPage : 'homePage'});
				if(typeof deviceapis !== "undefined"){
					deviceapis.open('http://www.aiowireless.com/support/payments/auto-pay');
				}
			});
			
			$('#i18n_homeLogOutButton').tap(function(){
//				self.application.connector.sessionModel.clear();
				self.application.connector.logout();
				return false;
			});
			
			$('#i18n_homeSetupAutoPayButton').tap(function(){
				if($(this).attr('data-state') === 'deactivated') {
					self .application.gotoPage('manageAutopayPage',{fromPage : 'homePage'});
				} else {
					self .application.gotoPage('desactivateAutopayPage',{fromPage : 'homePage'});
				}
			});
			this.currentJqxhr = null;
			
			$(window).bind('resize',this.layout.bind(this));
			window.setTimeout(this.layout.bind(this), 100);
		},

		onShow : function(options) {
			this.application.setNavLinkActive('#homePage');
			this.fetch(options);
			this.onRefresh();
		},
		
		onHide : function() {
			if(this.currentJqxhr) {
				this.application.unBlockUI();
				this.currentJqxhr.abort();
			}
		},
		
		/**
		 * Fetch the data from the remote server
		 */
		fetch : function(options) {
			var self = this;
		
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function(){
				self.isLoading = false;
				self.application.unBlockUI();
				self.currentJqxhr = null;
			};
			var homeSuccess = function(){
				self.currentJqxhr = self.application.connector.getHomeAutoPay(done,done, "HOME");
			};
			this.isLoading = true;
			
			if(options && (options.fromPage == "loginPage" || options.fromPage == "resetPwdPage")) {
				homeSuccess();
			}
			else {
				self.currentJqxhr = this.application.connector.getHome(homeSuccess,done, "HOME");
			}
			
			$(window).bind('resize',this.layout.bind(this));
		},
		
		layout : function() {
			var divToResize = $('#homePage').find('.sub-page');
			divToResize.css('margin-top', '0px');
			divToResize.css('padding-top', '0px');
			divToResize.height('auto');
			var divButton = $('div.homeSetupAutoPayButtonContainer');
			divButton.css('margin-top', '0px');
			
			var statusBarHeight = this.application.isWP7 ? this.application.wp7StatusBarHeight : 0;
			
			var heightOfSubPage = divToResize.height();
			var freeSpace = jQuery(window).height() + statusBarHeight - divToResize.offset().top - heightOfSubPage - $('#homePage').find('.page-bottom-margin').height();
			if(freeSpace < this.application.minFreeSpaceValue) freeSpace = this.application.minFreeSpaceValue;
			var newSubPageHeight = heightOfSubPage + 3*(freeSpace/4);
			
			var newPaddingTop = newSubPageHeight - $("div.two-column-grid").height() - divButton.height();
			if(newPaddingTop<0)
				newPaddingTop = 0;

			divToResize.css('padding-top', parseInt(newPaddingTop/3) +'px');
			divButton.css('margin-top', parseInt(newPaddingTop/3) +'px');
			divToResize.css('margin-top', parseInt(freeSpace/4) +'px');
			divToResize.height(parseInt(newSubPageHeight - (newPaddingTop/3)) + 'px');
		},

		_extendReducePlan : function($title) {
			var openCurrent = $title.hasClass('reduced')? true:false;

			$('#i18n_yourLineMessage div').show();
			$.each($('#yourLines .title'), function(id, item){
				$(item).removeClass('extended');
				$(item).addClass('reduced');
				$(item).attr("aria-expanded", "false");
				$(item).next().hide().attr("aria-hidden", "true");
			});
			
			if (openCurrent) {
				$title.removeClass('reduced');
				$title.addClass('extended');
				$title.attr("aria-expanded", "true");
				if($title.find('span').length >= 1){
					console.log($('#i18n_yourLineMessage div.'+$title.find('span').attr('class')));
					$('#i18n_yourLineMessage div.'+$title.find('span').attr('class')).hide();
				}
				$title.next().show().attr("aria-hidden", "false");
			}
		},
		
		onRefresh : function() {
			if (!this.isVisible)
				return;
			
			window.setTimeout(this.layout.bind(this), 100);
			
			var json = this.model.attr, self = this;
			
			// Fill home screen
			$('span.headerAccount').html(json.accountId);
			
			if(json.subscribers.length > 1){
				// If multi subscribers
				$('.header .right .i18n_headerPhone').hide();
				// Define the active line number
				var activeAccount = (function(){
					var cpt = 0;
					$.each(json.subscribers, function(i, item){
						if(item.status != 'pendingActivation') cpt++;
					});
					return cpt;
				})();
				$('.header .right .headerPhone').html(activeAccount + $.i18n._('HEADER_ACCOUNTS'));
			}
			else{
				// Else only one user
				$('.header .right .i18n_headerPhone').show();
				$('span.headerPhone').html(self.application.displayPhoneNumber(json.subscribers[0].ctn));

				if(json.subscribers[0].isTablet)
					$('span.i18n_headerPhone').html($.i18n._('HEADER_TABLET')).attr("data-i18n", "HEADER_TABLET");
			}
			
			if(json.accountStatus == "Hot Lined"){
				self.application.gotoPage('payMyBillPage', {summary : self.model.attr});
			} else {
				// TODO i18n for Hi
				if(json.subscribers.length > 1)
					$('#homePage').find('.hi').html("Hi!");
				else
					$('#homePage').find('.hi').html("Hi " + json.accountName + "!");
				
				var daysLeft = json.nextBillDueDays;
				var daysText = Math.abs(daysLeft) < 2 ? "Day Left" : "Days Left";
				var nextRefuel = moment(json.billCycleDate,["MM/DD/YYYY HH:mm:ss","MM/DD/YYYY","X"]);
	
				$('#daysLeft').html(daysLeft);
				$('#i18n_daysLeft').html(daysText);
				
				$('#refuelDate').html(nextRefuel.format("MMMM Do"));
	
				$('#i18n_monthlyTotalText').html($.i18n._('HOME_MONTHLY_TOTAL') + self.application.displayPrice(parseFloat(json.totalMRC).toFixed(2)));
				var $iowe = $('#iOwe'); 
				var $mycredit = $('#myCredit'); 
				$iowe.html(self.application.displayPrice(json.amountDueToday));
				$mycredit.html(self.application.displayPrice(json.accountBalance));
				
				// Set 'Your lines' bloc
				if(json.subscribers.length > 1)
					$('#i18n_yourLineTitle').text($.i18n._('HOME_YOUR_LINES') + "s (" + json.subscribers.length + ")");
				else
					$('#i18n_yourLineTitle').text($.i18n._('HOME_YOUR_LINES')).attr("data-i18n", "HOME_YOUR_LINES");
				
				$('#yourLines').empty();
				$('#i18n_yourLineMessage').empty().hide();
				// Display the list of line
				$.each(json.subscribers, function(id, item){
					var smartType = item.isTablet? 'Tablet':'Phone';
					var status = (item.status == 'pendingActivation')? '<span class="pending"> - Pending</span>':(item.status == 'voluntarySuspend')? '<span class="stolen"> - Lost/Stolen</span>':'';
					var itemTitle = $('<div id="phone_'+ id +'" class="title reduced" role="button" aria-expanded="false">'+ smartType +' '+ self.application.displayPhoneNumber(item.ctn) + status +'</div>');
					$('#yourLines').append(itemTitle);

					var itemDesc;
					if(item.status == 'pendingActivation'){
						// Status pending
						itemDesc = $('<div class="phone-desc text medium" style="display: none" aria-hidden="true"></div>');
						$(itemDesc).append('<div class="not-activated" data-i18n="HOME_NOT_ACTIVATED">'+ $.i18n._('HOME_NOT_ACTIVATED') +"</div>");
						$(itemDesc).append('<div data-i18n="HOME_NOT_ACTIVATED_MSG">'+ $.i18n._('HOME_NOT_ACTIVATED_MSG') +"</div>");
						$('#i18n_yourLineMessage').append('<div class="pending" data-i18n="HOME_PENDING_MSG">'+ $.i18n._('HOME_PENDING_MSG') +'</div>').show();
					} else if(item.status == 'voluntarySuspend'){
						// Status Lost / Stolen
						itemDesc = $('<div class="phone-desc text medium" style="display: none" aria-hidden="true"></div>');
						$(itemDesc).append('<div class="line-message" data-i18n="HOME_SUSPENDED">'+ $.i18n._('HOME_SUSPENDED') +"</div>");
						$(itemDesc).append('<div data-i18n="HOME_SUSPENDED_MSG">'+ $.i18n._('HOME_SUSPENDED_MSG') +"</div>");
						$('#i18n_yourLineMessage').append('<div class="stolen" data-i18n="HOME_SUSPENDED">'+ $.i18n._('HOME_SUSPENDED') +'</div>').show();
					} else {
						// Status active 
						itemDesc = $('<ul class="phone-desc text medium" style="display: none" aria-hidden="true"></ul>');
						var plan = $('<li class="node">View Plan Details</li>').tap(function(){
							self.application.connector.sessionModel.set({currentLine: item.ctn});
							self.application.gotoPage('myPlanPage');
						});
						$(itemDesc).append(plan);
						var usage = $('<li class="node">View Usage Details</li>').tap(function(){
							self.application.connector.sessionModel.set({currentLine: item.ctn});
							self.application.gotoPage('usagePage');
						});
						$(itemDesc).append(usage);
						if(!item.isTablet){
							var voicemail = $('<li class="node">Reset Voicemail Password</li>').tap(function(){
								self.application.connector.sessionModel.set({currentLine: item.ctn});
								self.application.gotoPage('resetVoiceMailPwdPage');
							});
							$(itemDesc).append(voicemail);
						}
					}
					$('#yourLines').append(itemDesc);
					
					var $id = $('#phone_' + id); 
					$id.tap(function() {
						// extend the current selected
						self._extendReducePlan($id);
					});
				});
				
				// CATO fix : Talkback is not able to read "zero dollar" ...
				if(self.application.model.isAndroid) {
					if(parseFloat(json.amountDueToday) == 0) {
						$iowe.attr("aria-labelledby", "zeroDollar");
					}
					else {
						$iowe.removeAttr("aria-labelledby");
					}
					if(parseFloat(json.accountBalance) == 0) {
						$mycredit.attr("aria-labelledby", "zeroDollar");
					}
					else {
						$mycredit.removeAttr("aria-labelledby");
					}
				}
			}
		},
		
		onBack : function(event) {
			var self = this;
			event.preventDefault();
			if(this.isLoading){
				//cannot cancel this
				return;
			}
			//popup to logout
			if(typeof deviceapis !== "undefined"){
				deviceapis.application.confirm("Confirm","Are you sure you want to logout?","Cancel","Ok",function(){}, function(){self.application.connector.logout();});
			} else {
				 //[@if DEV] only for debug
				if(window.confirm("Are you sure you want to logout?")){
					self.application.connector.logout();
				};
				//[@endif]
			}
		},

	};

	Pages.HomePage = MVC.Page.extend(methods);

})($, MVC);
