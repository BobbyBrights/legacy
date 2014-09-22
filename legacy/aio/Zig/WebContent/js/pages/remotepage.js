(function($, MVC) {
	var Pages = window.Pages = window.Pages || {};
	 function stripScripts(s) {
		    var div = document.createElement('div');
		    div.innerHTML = s;
		    var scripts = div.getElementsByTagName('script');
		    var i = scripts.length;
		    while (i--) {
		      scripts[i].parentNode.removeChild(scripts[i]);
		    }
		    return div.innerHTML;
		  }
	var methods = {
			
		initialize : function(application,url, backPage){
			this.application = application;
			this.url = url;
			this.backPage = backPage;
			this.isLoading = false;
		},
				

		loadPage : function(){
			var that = this;
			this.remoteContent.html("");
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			
			$.ajax({
					url: this.url,
					type: "get",
					dataType: "html",
					cache : false,
					success: function( html, textStatus, xhr ) {
						var all = $( "<div></div>" );
						all.get(0).innerHTML = stripScripts(html);
						all.find('[onclick]').removeAttr('onclick').unbind('click')
						that.remoteContent.html(all.find('.body'));
						that.isLoading = false;
						that.application.unBlockUI();
					},
					error: function( xhr, textStatus, errorThrown ) {
						that.remoteContent.html("Not Found");
						that.isLoading = false;
						that.application.unBlockUI();
					}});
		},
		
		onInit : function() {
			var that = this;
			that.remoteContent = this.$element.find('.remote');
			that.$element.find(".back-button").click(function(e) {
				e.preventDefault();
				that.application.gotoPage(that.backPage, {fromBack: true});
			});
		},

		onShow : function(options) {
			if(options) {
				this.fromPage = options.fromPage;
			}
			this.loadPage();
		},
		
		onHide : function() {
			
		},

		onRefresh : function() {
			if (!this.isVisible) {
				return;
			}
		},
		
		onBack : function(event) {
			event.preventDefault();
			this.application.gotoPage(this.backPage, {
				fromBack : true
			});
		}
	};

	Pages.remotePage = MVC.Page.extend(methods);
})($, MVC);
