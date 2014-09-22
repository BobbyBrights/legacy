(function($) {
	var defaults = {
		swipeTimeThreshold : 250,
		swipeThreshold : 50,
		animationSpeed : 400,
		innerClickClass : ".ui-nav-inner",
	}, pluginName = "PivotControl";

	var isTouchSupported = 'ontouchstart' in window.document, startEvent = isTouchSupported ? 'touchstart'
			: 'mousedown', moveEvent = isTouchSupported ? 'touchmove'
			: 'mousemove', endEvent = isTouchSupported ? 'touchend' : 'mouseup';


	/**
	 * Widget constructor.
	 */
	var PivotControl = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, defaults, options);
		this.captureEvents = false;
		this._init();
	};

	PivotControl.prototype = {

		_init : function() {
			var self = this;
			this.$element.css('white-space', 'nowrap');
			this.$element.css('margin', '0');
			this.$element.css('position', 'relative');
			this.$element.css('overflow', 'visible');
			this.$element.children().each(function(index) {
				var $this = $(this);
				$this.css('width', '80%');
				$this.css('float', 'initial');
				$this.css('display', 'inline-block');
				$this.find(self.options.innerClickClass).click(function() {
					self.select(index);
				});
			});
			this._itemWidth = this.$element.children().eq(0).width();
			this.currentIndex = 0;
			this.nbItems = this.$element.children().length;

			this.$element.bind(startEvent, this._touchStart.bind(this));
			this.$element.bind(moveEvent, this._touchMove.bind(this));
			this.$element.bind(endEvent, this._touchEnd.bind(this));
			$(document).bind('switchRefuelPage', function(){self.select(2);});
			$(document).bind('switchMorePage', function(){self.select(4);});

			this.touchStartPoint = null;
			this.lastTouchPoint = null;
			this._isAnimating = false;
			this._isDraging = false;

			this._layout();
			this.select(0);
		},
		_layout : function() {

		},
		next : function() {
			var self = this;
			if (this._isAnimating) {
				// defensive code
				return;
			}
			;
			this.select(this.currentIndex + 1);
		},
		previous : function() {
			var self = this;
			if (this._isAnimating) {
				// defensive code
				return;
			}
			;
			this.select(this.currentIndex - 1);
		},
		
		/*Set the given index as active, no animation no event trigger*/
		setActive : function (index){
			if (index < 0) {
				return;
			}
			if (index >= this.nbItems) {
				return;
			}
			this.$element.children().removeClass('nav-selected');
			this.$element.children().eq(index).addClass('nav-selected');
			this.currentIndex = index;
			this._itemWidth = this.$element.children().eq(0).width();
			this.$element.css( 'left' , (-this.currentIndex * this._itemWidth) + 'px');
		},
		
		select : function(index) {
			var self = this, direction = "left";
			if(this.currentIndex == index) {
				//direct trigger 
				if(!this._isAnimating){
					self.$element.trigger({
						type : 'pivotAnimationEnd',
						index : index,
						direction : 'none'
					});
				}
				return;
			};
			if (this._isAnimating) {
				// defensive code
				return;
			}
			if (index < 0) {
				return;
				// index = 0;
			}
			if (index >= this.nbItems) {
				return;
				// index = this.nbItems -1;
			}

			this._isAnimating = true;
			direction = (this.currentIndex < index) ? 'left' : 'right';
			this.currentIndex = index;
			this._itemWidth = this.$element.children().eq(0).width();
			this.$element.animate({
				left : (-this.currentIndex * this._itemWidth) + 'px'
			}, this.options.animationSpeed, function() {
				self.$element.children().each(function(index) {
					if (index === self.currentIndex) {
						$(this).addClass('nav-selected');
					} else {
						$(this).removeClass('nav-selected');
					}
				});
				self._isAnimating = false;
				self.$element.trigger({
					type : 'pivotAnimationEnd',
					index : index,
					direction : direction
				});
				// TODO events ?
			});
			self.$element.trigger({
				type : 'pivotAnimationStart',
				index : index,
				direction : direction
			});
		},
		// Touch handling

		_touchStart : function(e) {
			if (this.captureEvents) {
				e.preventDefault();
			}
			this.captureEvents = false;
			this.ignoreEvents = false;

			// var touchEvent = e.originalEvent, touches = touchEvent.touches;
			this.touchStartPoint = this._getTouchPoint(e);
			this.lastTouchPoint = this.touchStartPoint;
			this.lastTouchTime = new Date();
			this._isDraging = true;
		},
		_touchMove : function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (this.touchStartPoint === null || !this._isDraging) {
				return;
			}
			var touchEndPoint = this._getTouchPoint(e), endTime = new Date(), diffTime = endTime
					- this.lastTouchTime, dist;
			dist = touchEndPoint['x'] - this.lastTouchPoint['x'];
			if (window.Math.abs(dist) >= this.options.swipeThreshold) {
				if (diffTime <= this.options.swipeTimeThreshold) {
					if (dist < 0) {
						this.next();
					} else {
						this.previous();
					}
					this.touchStartPoint = null;
					this._isDraging = false;
					return;
				}
			}
		},
		_touchEnd : function(e) {
			if (this.touchStartPoint === null || !this._isDraging) {
				return;
			}
			if (this.captureEvents) {
				e.preventDefault();
			}

			if (this.ignoreEvents) {
				return;
			}

			var touchEndPoint = this._getTouchPoint(e);

			var dist = 0, endTime = new Date(), diffTime;
			dist = touchEndPoint['x'] - this.lastTouchPoint['x'];
			diffTime = endTime - this.lastTouchTime;

			if (diffTime < this.options.swipeTimeThreshold) {
				if (dist < -this.options.swipeThreshold) {
					this.next();
				} else if (dist > this.options.swipeThreshold) {
					this.previous();
				}
			}
			this.touchStartPoint = null;
		},
		_getTouchPoint : function(e) {
			if (isTouchSupported) {
				var touchEvent = e.originalEvent, touches = (touchEvent.changedTouches) ? touchEvent.changedTouches
						: touchEvent.touches;

				return {
					x : touches[0].pageX,
					y : touches[0].pageY
				};
			} else {
				return {
					x : e.pageX,
					y : e.pageY
				};
			}
		}
	};
	// if jquery mobile add as plugin
	if ($.fn) {
		$.fn.PivotControl = function(method) {
			selfArgs = arguments;
			return this.each(function() {
				// prevent against multiple instantiations
				if (!$.data(this, "plugin_" + pluginName)) {
					var $el = $(this), options = {
						slideSpeed : $el.data("slidespeed"),
					};
					$.data(this, "plugin_" + pluginName, new PivotControl(this,
							$.extend(method, options)));
				} else if (method) {
					// exists
					// namespacing pattern
					var instance = $.data(this, "plugin_" + pluginName);
					if (instance[method]) {
						return instance[method].apply(instance,
								Array.prototype.slice.call(selfArgs, 1));
					} else {
						$.error('Method ' + method
								+ ' does not exist on jQuery.' + pluginName);
					}
				}
			});
		};
	}
})($);
