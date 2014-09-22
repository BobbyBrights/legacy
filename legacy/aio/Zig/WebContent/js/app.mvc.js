/*
 * BASIC MVC FrameWork
 */
(function($, window) {

	if (!Function.prototype.bind) {
		Function.prototype.bind = function(obj) {
			var slice = [].slice, args = slice.call(arguments, 1), self = this, nop = function() {
			}, bound = function() {
				return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
			};

			nop.prototype = self.prototype;

			bound.prototype = new nop();

			return bound;
		};
	}

	/* Global namespace declaration */
	var MVC = window.MVC = {};

	/*
	 * Model Object Definition
	 */
	MVC.Model = function(attributes) {
		this.attr = $.extend({}, attributes);
		this._init();
	};

	MVC.Model.prototype = {

		_init : function() {
			this._listeners = [];
			this._contexts = [];
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
			var index = this._listeners.indexOf(callback);
			this._listeners.splice(index, 1);
			this._contexts.splice(index, 1);
		},

		/*
		 * Set some attributes to the object and fire a change event if silent
		 * is true. param : attributes is an object containing the attributes
		 * param : silent a boolean (default false)
		 */
		set : function(attributes, silent) {
			if (typeof silent === 'undefined') {
				silent = false;
			}
			$.extend(this.attr, attributes);
			if (!silent)
				this._trigger('change');
		},

		clear : function(silent) {
			this.attr = {};
			if (!silent)
				this._trigger('change');
		},

		/*
		 * Get the attribute 'name' of the current model. Or an object
		 * containing all the attributes if no name is specified.
		 */
		get : function(name) {
			if (typeof name === "undefined") {
				return $.extend({}, this.attr);
			} else {
				return this.attr[name];
			}
		},
		/* 
		 * Force to trigger an update to all listeners.
		 * Can be used when a 'deep' property is modified
		 */
		notifyAll : function(enventType) {
			this._trigger( (enventType)?eventType:'forced');
		},

		/* Privates */
		_trigger : function(type) {
			for ( var i = 0, j = this._listeners.length; i < j; i++) {
				if (typeof this._listeners[i] === "string") {
					this._contexts[i][this._listeners[i]].apply(this._contexts[i], [ type, this ]);
				} else {
					this._listeners[i].apply(this._contexts[i], [ type, this ]);
				}
			}
		},

	};

	/* Defines the VIEW of a page */
	MVC.Page = function($element, model) {
		this._init($element, model,Array.prototype.slice.call(arguments,2));
	};

	MVC.Page.prototype = {

		_init : function($element, model,extra) {
			this.$element = $element;
			this.model = model;
			this.$element.bind('pageshow', this._doShow.bind(this));
			this.$element.bind('pagehide', this._doHide.bind(this));
			this.$element.bind('zbackkey', this.onBack.bind(this));
			this._init = false;

			if (this.model)
				this.model.bind('_modelEvent', this);

			this.isVisible = false;
			this.initialize.apply(this,extra);
		},
		
		initialize : function() {
			
		},
		
		_modelEvent : function (type){
			if ('net_error' === type) {
				this.onNetworkError();
			} else /*if('change' === type)*/{
				this.onRefresh();
			}
		},

		/* to be overwritten by 'subobjects' */
		onShow : function(options) {
		},
		/* to be overwritten by 'subobjects' */
		onHide : function() {
		},
		/* to be overwritten by 'subobjects' */
		onInit : function() {
		},
		/* to be overwritten by 'subobjects' */
		onRefresh : function() {
		},
		/* to be overwritten by 'subobjects' */
		onNetworkError : function() {
		},
		/* to be overwritten by 'subobjects' */
		onJavascriptError : function() {
			application.connector.manageErrorCases([{code:'9999'}], this.$element.selector.replace('#', ''));
		},
		/* to be overwritten by 'subobjects' */
		onBack : function(event) {
			//by default do nothing;
		},

		/* PRIVATES */
		_doShow : function(event,options) {
			if (!this._init) {
				this._doInit();
			}
			this.isVisible = true;
			try{
				this.onShow(options);
			} catch(err){
				this.onJavascriptError();
			}
		},

		_doHide : function() {
			this.isVisible = false;
			this.onHide();
		},

		_doInit : function() {
			if (this._init) {
				return;
			}
			try{
				this.onInit();
			} catch(err){
				this.onJavascriptError();
			}
			this._init = true;
		},
	};

	MVC.Page.extend = function(protoProps) {
		var parent = this;
		var child = function() {
			parent.apply(this, arguments);
		};
		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		var Surrogate = function() {
			this.constructor = child;
		};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate;

		if (protoProps)
			$.extend(child.prototype, protoProps);
		return child;
	};

})($, window);
