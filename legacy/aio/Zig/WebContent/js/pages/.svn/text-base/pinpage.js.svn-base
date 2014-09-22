(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	
	var methods = {
				
		setApplication : function(application){
			this.application = application;
		},

		onInit : function() {
			var self = this;
			
			self.$element.find(".back-button").click(function(e) {
				e.preventDefault();
				
				self.application.gotoPage(self.fromPage, {fromBack: true});
			});
		},

		onShow : function(options) {
			var self = this;
			
			if(options) {
				this.fromPage = options.fromPage;
			}
			
			$("#pinCode").unbind("keyup").bind("keyup", function(e) {
				var $pinCode = $(this);
				
				if(this.value && this.value.length == 4) {
					application.blockUI('Checking<span aria-hidden="true"> ...</span>');
					
					self.application.connector.checkPin(this.value, options.pinSuccessCb, function(json) {
						if(options && options.pinErrorCb) {
							options.pinErrorCb(json);
						}
						$pinCode.val("");
					});
				}
			}).val("").focus();
		},
		
		onHide : function() {
			
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			var self = this;
			event.preventDefault();
			self.application.gotoPage(this.fromPage, {
				fromBack : true
			});
		}
	};

	Pages.pinPage = MVC.Page.extend(methods);
})($, MVC);
