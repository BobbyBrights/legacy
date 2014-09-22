/*Utility to enable tap event for touch UI (inspired from google FastButton)*/
(function($, window) {

	
	/* Utility for touch UI detection */
	var isTouchSupported = 'ontouchstart' in window.document, pointerStart = isTouchSupported ? 'touchstart' : 'mousedown',
	pointerMove = isTouchSupported ? 'touchmove' : 'mousemove', pointerend = isTouchSupported ? 'touchend' : 'mouseup';

	
	var Tap = function(element, handler) {
		this.element = element;
		this.$element = $(element);
//		this.handler = handler;
		this.$element.bind('tap',handler);
		this.init();
	};
	
	/*Utility to enable tap event for touch UI (inspired from google FastButton)*/
	var clickbuster = {
		coordinates : []
	};

	clickbuster.preventGhostClick = function(x, y) {
		clickbuster.coordinates.push(x, y);
		window.setTimeout(clickbuster.pop, 2500);
	};

	clickbuster.pop = function() {
		clickbuster.coordinates.splice(0, 2);
	};

	/* Block all propagation if the event is detected as a ghost */
	clickbuster.onClick = function(event) {
		for ( var i = 0; i < clickbuster.coordinates.length; i += 2) {
			var x = clickbuster.coordinates[i];
			var y = clickbuster.coordinates[i + 1];
			if (Math.abs(event.clientX - x) < 25
					&& Math.abs(event.clientY - y) < 25) {
				event.stopPropagation();
				event.preventDefault();
			}
		}
	};
	
	/* Handle IE's specific event handling */
	var attachEvent = function(elt, eventName, eventHandler, useCapture) {
		if(elt.addEventListener) {
			useCapture = useCapture || false;
			elt.addEventListener(eventName, eventHandler, useCapture); 
		}
		else if(elt.attachEvent) {
			elt.attachEvent('on'+eventName, eventHandler);
		}
	};

	/* Register click in capture mode on the document */
	attachEvent(document, 'click', clickbuster.onClick, true);

	Tap.prototype = {

		init : function() {
			attachEvent(this.element, pointerStart, this, false);
			attachEvent(this.element, 'click', this, false);
		},

		handleEvent : function(event) {
			var eType = event.type;
			if (pointerStart === eType) {
				this.onTouchStart(event);
			} else if (pointerMove === eType) {
				this.onTouchMove(event);
			} else if (pointerend === eType) {
				this.onTouchEnd(event);
			} else if ('click' === eType) {
				this.onClick(event);
			}
		},

		onTouchStart : function(event) {
			event.stopPropagation();
			attachEvent(this.element, pointerend, this, false);
			attachEvent(document.body, pointerMove, this, false);

			this.startX = (isTouchSupported)?event.touches[0].clientX:event.clientX;
			this.startY = (isTouchSupported)?event.touches[0].clientY:event.clientY;
			this.$element.addClass('tap-pressed');
		},

		onTouchMove : function(event) {
			var x = (isTouchSupported)?event.touches[0].clientX:event.clientX;
			var y = (isTouchSupported)?event.touches[0].clientY:event.clientY;
			if (Math.abs(x - this.startX) > 10
					|| Math.abs(y - this.startY) > 10) {
				this.reset();
			}
		},

		onTouchEnd : function(event) {
			event.stopPropagation();
			this.reset();
//			this.handler.apply(this.element,new Array (event));
			this.$element.trigger('tap');
			clickbuster.preventGhostClick(this.startX, this.startY);
		},

		onClick : function(event) {
			event.stopPropagation();
			this.reset();
//			this.handler.apply(this.element,new Array (event));
//			this.$element.trigger('tap');
		},

		reset : function() {
			this.element.removeEventListener(pointerend, this, false);
			document.body.removeEventListener(pointerMove, this, true);
			this.$element.removeClass('tap-pressed');
		}

	};// Tap prototype end

	if ($.fn) {
		$.fn.tap = function(callback) {
			return this.each(function() {
				$.data(this, "plugin_Tap",new Tap(this, callback));
			});
		};
		
		$.fn.untap = function(callback) {
			return this.each(function() {
				var tapInstance = $.data(this, "plugin_Tap");
				if(tapInstance){
					this.removeEventListener(pointerStart, tapInstance, false);
					this.removeEventListener('click', tapInstance, false);
					tapInstance.$element.unbind('tap');
				}
			});
		};
	}
	// ---- END of tap -----

})($, window);
