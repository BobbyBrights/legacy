(function($) {

	// the alert is a global object
	var popupModalId = "zAlert";
	window.zAlerts = {

		defaultOptions : {
			orientation : 'horizontal',
			buttons: [
			     {label: 'Ok', callback: function() {}}
			]
		},

		alert : function(title, message, options) {
			var self = this;
			this.options = $.extend({},self.defaultOptions,options);
			if(document.activeElement){
				document.activeElement.blur();
			}
			$("input").blur();
			
			//remove any existing popup
			window.zAlerts._clean();

			//create the overlay screen. (should prevent all touch events)
			window.zAlerts._createOverlay();
			window.zAlerts._createPopup();
			$('#zHeader').html(title || 'info');
			$('#zContent').html(message || '');
			
			window.zAlerts._layout();
			$(window).bind('scroll.zAlerts',window.zAlerts._layout);
			
			var $popupModalElement = $('#' +popupModalId); 
			
			$popupModalElement.css('visibility', 'visible').attr("aria-hidden", "false");

//			var $fastClickedElements = $popupModalElement.find('.button');
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$popupModalElement.focus();
		},
		_createOverlay : function() {
			var $blc = $('<div id="' + popupModalId + '" class="zalert-overlay" role="alertdialog" aria-describedby="zContent" style="visibility: hidden; position: absolute; z-index: 9000; width: 100%; padding: 0; margin:0; top: 0; left: 0; height: '+ $(document).height() +'px;" aria-hidden="true"></div>');
			if($.browser.msie)
				$blc.addClass('msie');

			var events = 'touchmove.zAlerts';
			$blc.bind(events, function(event) {
				event.preventDefault();
			});
			
			$(window).on('resize.zAlerts',function(){
				$blc.css('height', $(document).height());
			});
			//$('body').append($blc);
			$('#alertWrapper').attr("aria-hidden", "false").append($blc);
			$("div.page, #footer").attr("aria-hidden", "true");
		},
		_createPopup : function() {
			var buttons, button, i, self = this;
			
			buttons = $("<div class='zalert-buttonbar twob'></div>");
			
			if(self.options.buttons.length > 2) {
				self.options.orientation = "vertical";
			}
			if(self.options.orientation == "horizontal" && self.options.buttons.length > 0 && self.options.buttons.length <= 2) {
				self.options.buttons[0].cssClass = "bright";
				if(self.options.buttons[1]) {
					self.options.buttons[1].cssClass = "bleft";
				}
			}
			else {
				self.options.buttons[self.options.buttons.length - 1].cssClass = "bleft";
			}
			
			for(i = 0; i < this.options.buttons.length; i++) {
				self._createButton(buttons, this.options.buttons[i]);
			}

			var $container = $("<div id='zPopup' class='zalert-popup "+ self.options.orientation +"' style='z-index: 9001; position: relative;'><h1 id='zHeader' class='zalert-header'></h1><div id='zContent' class='zalert-content'></div></div>");
			
			$container.append(buttons);
			
			$('#' +popupModalId).append($container);
		},
		_createButton : function(container, button) {
			var self = this;
			
			container[self.options.orientation == "horizontal" ? "prepend" : "append"]($("<a class='button"+ (button.cssClass ? " " + button.cssClass : "") +"' role='button'>"+ button.label +"</a>").tap(function(e) {
				if(button.callback) {
					try {
						button.callback(e);
					} catch(err){}
				}
				window.zAlerts._clean();
				return false;
			}));
		},
		_clean : function() {
			//Todo call any callbacks ? manage a stack ?
			$(window).off('resize.zAlerts');
			$(window).unbind('scroll.zAlerts',window.zAlerts._layout);
			$('#' +popupModalId).unbind(".zAlerts").remove();
			var $footer = $("#footer");
			if($footer.is(":visible")) {
				$footer.attr("aria-hidden", "false");
			}
			var $alertWrapper = $("#alertWrapper");
			if($alertWrapper.is(":empty")) {
				$alertWrapper.attr("aria-hidden", "true");
				$(application.currentPage).attr("aria-hidden", "false");
			}
			else {
				$alertWrapper.attr("aria-hidden", "false");
			}
		},
		_layout : function() {
			var top = 100 /* $(window).height()/4 - $('#zPopup').outerHeight(true)/2 + $(window).scrollTop()*/;
			$('#zPopup').css('top',top+'px');
		},
		
		isActivePopup : function(){
			return $('#' +popupModalId).length > 0;
		}
	};

})($);
