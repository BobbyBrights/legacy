(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	
	var methods = {
		setApplication : function(application){
			this.application = application;
		},

		onInit : function() {
			var self = this;
			self.contextualBack = 'homePage';
			
			self.$element.find(".back-button").tap(function(e) {
				self.application.gotoPage(self.contextualBack);
			});
			
			this.$element.find(".innerPage").hide().attr("aria-hidden", "true");
		},

		onShow : function(options) {
			var successCb, failureCb;
			
			if(options && options.fromPage) {
				this.contextualBack = options.fromPage; 
			}
			
			if(this.application.isCurrentAccountMultiLine()) {
				this.$element.find(".information").show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".information").hide().attr("aria-hidden", "true");
			}
			
			
			successCb = function() {
				var i, j, html = "", account, jsonObj, json;
				
				json = this.application.connector.billDetailsModel.attr;
				
				for(i = 0; i < json.subscriberDetails.length; i++) {
					account = json.subscriberDetails[i];
					
					html += '<h4 class="page-subtitle" role="heading" aria-level="2">'+(account.isTablet ? 'Tablet' : 'Phone')+' '+this.application.displayPhoneNumber(account.ctn)+'</h4>';
					
					if(account.plan || account.addedServices) {
						html += '<table class="large subscriberDetails">';
						
						if(account.plan) {
							html += '<tr>'
										+'<td>'+account.plan.name+'</td>'
										+'<td>'+this.application.displayPrice(account.plan.amount)+'</td>'
										+'<td class="helpColumn"></td>'
									+'</tr>';
						}
						
						if(account.addedServices) {
							for(j = 0; j < account.addedServices.length; j++) {
								
								jsonObj = account.addedServices[j];
							
								html += '<tr>'
											+'<td>'+jsonObj.name+' (monthly)</td>'
											+'<td>'+this.application.displayPrice(jsonObj.amount)+'</td>'
											+'<td class="helpColumn"></td>'
										+'</tr>';
							}
						}
						
						if(account.discounts) {
							for(j = 0; j < account.discounts.length; j++) {
								
								jsonObj = account.discounts[j];
							
								html += '<tr>'
											+'<td>'+jsonObj.name+'</td>'
											+'<td>- '+this.application.displayPrice(jsonObj.amount)+'</td>'
											+'<td class="helpColumn"><span class="query" role="button" aria-label="Help"></span></td>'
										+'</tr>';
							}
						}
						
						html += '</table>';
					}
				}
				
				if(json.adjustments) {
					html += '<h4 class="page-subtitle" role="heading" aria-level="2">Adjustment</h4>'
							+'<table class="large adjustments">';

					for(i = 0; i < json.adjustments.length; i++) {
						
						jsonObj = json.adjustments[i];
					
						html += '<tr>'
									+'<td>'+jsonObj.name+'</td>'
									+'<td>'+this.application.displayPrice(jsonObj.amount)+'</td>'
									+'<td class="helpColumn"><span class="query" role="button" aria-label="Help"></span></td>'
								+'</tr>';
					}
					
					html += '</table>';
				}
				
				if(json.credits) {
					html += '<h4 class="page-subtitle" role="heading" aria-level="2">Credit</h4>'
							+'<table class="large credits">';
					
					for(i = 0; i < json.credits.length; i++) {
						
						jsonObj = json.credits[i];
						
						html += '<tr>'
									+'<td>'+jsonObj.name+'</td>'
									+'<td>- '+this.application.displayPrice(jsonObj.amount)+'</td>'
									+'<td class="helpColumn"><span class="query" role="button" aria-label="Help"></span></td>'
								+'</tr>';
					}
					
					html += '</table>';
				}
				
				this.$element.find(".generatedContent").html(html);
				$("#billDetailsTotalOwed").html(this.application.displayPrice(json.totalOwed));
				this.$element.find(".innerPage").show().attr("aria-hidden", "false");
				this.application.unBlockUI();
			};
			
			failureCb = function() {
				this.$element.find(".innerPage").show().attr("aria-hidden", "false");
				this.application.unBlockUI();
			};
			
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			this.application.connector.getBillDetails(successCb.bind(this), failureCb.bind(this));
		},
		
		onHide : function() {
			this.$element.find(".generatedContent").empty();
			$("#billDetailsTotalOwed").empty();
			this.$element.find(".innerPage").hide().attr("aria-hidden", "true");
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			event.preventDefault();
			this.application.gotoPage(this.contextualBack, {
				fromBack : true
			});
		}
	};

	Pages.BillDetailsPage = MVC.Page.extend(methods);
})($, MVC);