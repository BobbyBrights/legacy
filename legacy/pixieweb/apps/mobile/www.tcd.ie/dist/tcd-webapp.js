/*! Tcd Webapp - v0.1.0 - 2013-07-24
* Copyright (c) 2013 Stephen McElhinney; Licensed MIT */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return I("flexWrap")},s.flexboxlegacy=function(){return I("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));
var debug = false;
var site = {
	news_url: '/frameworks/view/json/4', 
	search_url: 'http://search.tcd.ie/search?q=##QUERY##&entqr=0&ud=1&&output=xml_no_dtd&oe=UTF-8&ie=ISO-8859-1&client=default_frontend&proxystylesheet=default_frontend&site=default_collection',
	weather_url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20location%3D%22EIXX0014%22&format=json',
	youtube_url: 'http://gdata.youtube.com/feeds/api/playlists/PL55XqDjybyL8GObgACKJvBJFHcF-vmDVQ?max-results=25&alt=json',
	icon_set: 'white'
}; 

var gcal_config = {
	'calendar_url': 		'em7l64tch1h8rev0j9omrh0vvg@group.calendar.google.com', 
	'application_name': 	'tcd-calendar', 
	'number_items':			10,
	'tcd_center':			'53.343577,-6.256'
};

var footer = [
	{
		'text': 'Home', 
		'link': '#main_page_grid',
		'icon': 'grid'
	},
	{
		'text': 'PeopleFinder', 
		'link': '#peoplefinder_page',
		'icon': 'grid'
	},
	{
		'text': 'Maps', 
		'link': '#maps_page',
		'icon': 'star'
	},
	{
		'text': 'About', 
		'link': '#about_page',
		'icon': 'grid'
	}
	
];

var slide_menu = {
	"profile": "Trinity College Dublin",
	"icon": "img/tcd-logo.png",
	"links": [
		{
			"heading": "Main Menu", 
			"items" : [
				{
					'text': 'College Maps', 
					'link': '#maps_page',
					'prefix': 'maps'
				},
				{
					'text': 'PeopleFinder', 
					'link': '#peoplefinder_page',
					'prefix': 'peoplefinder'
				},
				
				{
					'text': 'Library Search', 
					'link': '#library_page',
					'prefix': 'library'
				},
				
							
				{
					'text': 'News', 
					'link': '#news_page',
					'prefix': 'news'
				},
				
				{
					'text': 'Events', 
					'link': '#calendar_page',
					'prefix': 'events'
				},			
				
				{
					'text': 'Youtube', 
					'link': '#youtube_page',
					'prefix': 'youtube'
				}			
				
			]
		}
	]
}




var calendar_loaded = false;
var errors_with_load = false;

function resize_iframes(){
  $('iframe').each(function(){
  	  var $t = $(this).parent();
  	  $(this).attr("width", $t.width()).attr("height", $t.height());
  });
}
function get_rss_as_json(uri, callback, callback_if_failed){	
	var jqxhr = $.get(uri, function() {
	  //alert("success");
	})
	.done(function(data) { 
		callback(data);
	})
	.fail(function() {  
		console.log("Failed");
	})
	.always(function() { 

	});
}

function process_news(data){
	var $data = xml_to_json(data);	
	var $rss = $data.rss;
	//console.log($rss);
	
	var $ul = $(document.createElement("ul"))
		.attr("data-role", "listview")
		.attr("data-inset", "true")
		.addClass("latest-news");
		
	$ul.append(
		$(document.createElement("li"))
			.attr("data-role", "list-divider")
			.append($rss['channel']['title']['#text'])
	)
	
	var $count = 0; 
	for(var i in $rss.channel.item){
		if($count < 3){
			var $item = $rss.channel.item[i];
			$(document.createElement("li"))
				.append(
					$(document.createElement("a"))
						.attr("href", "http:" + $item['link']['#text'])
						//.attr("rel", "external")
						.addClass("mobile-content-only")
						.append(
							$(document.createElement("img"))
								.attr("src", $item['media:thumbnail']['@attributes']['url'])
						)
						.append(
							$(document.createElement("h3")).append($item['title']['#text'])
						)
						.append(
							$(document.createElement("p")).append($item['content:encoded']['#text'])
						)
				).appendTo($ul);
				$count++;
		}
	}
	
	$('#main_page div[data-role=content]:first').append($ul);
	$('ul.latest-news').listview();
}

function process_announcements(data){
	var $data = xml_to_json(data);	
	var $rss = $data.rss;
	//console.log($rss);
	
	var $ul = $(document.createElement("ul"))
		.attr("data-role", "listview")
		.attr("data-inset", "true")
		.attr("data-theme", "d")
		.attr("data-divider-theme", "e")
		.addClass("announcements");
		
	$ul.append(
		$(document.createElement("li"))
			.attr("data-role", "list-divider")
			.append($rss['channel']['title']['#text'])
	)
	
	
	for(var i in $rss.channel.item){
		var $item = $rss.channel.item[i];
		$(document.createElement("li"))
			.append(
				$(document.createElement("a"))
					.attr("href", $item['link']['#text'])
					//
					
					.attr("rel", "external")
					.append(
						$(document.createElement("h3")).append($item['title']['#text'])
					)
					.append(
						//<p class="ui-li-aside"><strong>6:24</strong>PM</p>
						$(document.createElement("p"))
							.append($item['pubDate']['#text'])						
					)
			).appendTo($ul);
	}
	
	$('#main_page div[data-role=content]:first').append($ul);
	$('ul.announcements').listview();
	
/*

            <!-- New Home Layout -->
			<ul data-role="listview" data-inset="true" class="latest-news" data-theme="d" data-divider-theme="e">
				<li data-role="list-divider">Announcements<span class="ui-li-count">3</span></li>
				<li>
					<a href="index.html">
						<h3>Announcement 1</h3>
					</a>
				</li>
				<li>
					<a href="index.html">
						<h3>Announcement 2</h3>
					</a>
				</li>
				<li>
					<a href="index.html">
						<h3>Announcement 3</h3>
					</a>
				</li>
			</ul>
*/
}

function position_found(data){
	//console.log(data);
}

function query_calendar(cfg, callback_success, callback_fail) {
	var service = new google.gdata.calendar.CalendarService(cfg.application_name);
	var query = new google.gdata.calendar.CalendarEventQuery(return_calendar_address(cfg.calendar_url));	
	query.setOrderBy('starttime');
	query.setSortOrder('ascending');
	query.setFutureEvents(true);
	query.setSingleEvents(true);
	query.setMaxResults(cfg.number_items);
	service.getEventsFeed(query, callback_success, callback_fail);
}

function return_calendar_address(a){
	return 'https://www.google.com/calendar/feeds/' + a + '/public/full'; 
}

function calendar_init() {
	// init the Google data JS client library with an error handler
	google.gdata.client.init(handle_error);
	if(!errors_with_load){
		calendar_loaded = true;
	}
}


function show_menu (e){ 
	var $btn = $(this);						
	var $menu = slide_menu.links[0];

	$('#dropdown-menu').remove();
	
	var $u = $(document.createElement("ul")).attr("id", "dropdown-menu")
		.attr("data-role", "listview")
		.attr("data-theme", "e");
		//.attr("data-inset", "true");
	var $items = [];
	$items.push({
		text: $menu.heading,
		divider: true
	})
	for(var i in $menu.items){
		var $item = $menu.items[i];
		$items.push($item)
	}
	
	var $l = {
		id: 'dropdown-menu',
		items: $items,
		theme: 'a', 
		transition: 'fade'
	};			
	$btn.after($(list_view($l)));
	$('#dropdown-menu').listview();		
	
	// Needed to add this to handle the fact that jQuery mobile doesnt process transitions for links to the current page. 
	$('#dropdown-menu').find('a').live('click', function(e){
		if($(this).attr("href").replace("#", "") == $.mobile.activePage.attr("id")){
			cleanup_dropdown_menu();
		}
	});		
	
	return false;
}

function cleanup_dropdown_menu(){
	$('#dropdown-menu').remove();
	$('#show_menu').removeClass('shown');
}

function handle_error(e) {
	errors_with_load = true;
	console.log(e);
}


function do_sliding_menu(slide_menu){
	$('#slidemenu').remove();
	var $s = $(document.createElement("div")).attr("id", "slidemenu"); 
	$(document.createElement("div")).attr("id", "profile")
		.append($(document.createElement("img")).attr("src", slide_menu.icon))
		.append($(document.createElement("div")).append("<strong>" + slide_menu.profile + "</strong>").addClass("profile_info"))
		.appendTo($s);		
	for(var i in slide_menu.links){
		var $group = slide_menu.links[i];
		var $h = $group.heading;
		$(document.createElement("h3")).append($h).appendTo($s);
		var $list = $(document.createElement("ul"));
		for (var j in $group.items){
			var $l = $group.items[j];
			$(document.createElement("li"))
				.append($(document.createElement("a")).attr("href", $l.link)
					.append($(document.createElement("img")).attr("src", $l.icon))
						.append($l.text)
				)
				.appendTo($list);
		}
		$list.appendTo($s);
		
	}
	$s.prependTo($('body'));
}

function list_view ($options){
	var $defaults = {
		theme: 'c',
		link_theme: this.theme,
		items: [], 
		grouped: true,
		transition: 'none'
	}
	$options = $.extend({}, $defaults, $options); 	
	
	var $list = $(document.createElement('ul'))
		.attr('id', $options.id)
		.attr('data-theme', $options.theme)
		.attr('data-role', 'listview'); 
	
	if($options.grouped){
		$list.attr('data-inset', true);
	}
	
	for(var i in $options.items){
		var item = $options.items[i];
		
		// <li><img src="img/icon-sets/glyphish/37-suitcase.png" alt="Department" class="ui-li-icon">Department: '+data.dept+'</li>
		var li = $(document.createElement('li'));
		if(typeof item.divider !== 'undefined' && item.divider == true){
			li.attr("data-role", "list-divider").append(item.text);
		} else {
			if(typeof item.link !== 'undefined'){
				li.append($(document.createElement("a"))
					.attr('href', item.link)
					.attr('data-theme', $options.link_theme)
					.attr('data-transition', $options.transition)
					.append(
						typeof item.icon !== 'undefined' ? (
							$(document.createElement("img"))
								.attr('src', item.icon)
								.addClass('ui-li-icon').after(item.text)
						) : item.text
					)
				)	 
			} else {
				li.append(
					typeof item.icon !== 'undefined' ? (
						$(document.createElement("img"))
							.attr('src', item.icon)
							.addClass('ui-li-icon').after(item.text)
					) : item.text
				)
			}
		}	
		li.appendTo($list);
	}
	
	return $list;	
}

function page_element($options){
	var $defaults = {
		id: 'single-page-' + Math.floor((Math.random()*100)+1), // Generate random page id.
		theme: 'c',
		addBackButton: true,
		heading: 'Page heading',
		content: 'Page content', 
		_class: 'single-page'
		
	}
	
	$options = $.extend({}, $defaults, $options); 
	
	var $page = $(document.createElement('div'))
		.attr('id', $options.id)
		.attr('data-role', 'page')
		.attr('data-theme', $options.theme)
		.attr('data-add-back-btn', true).
		addClass($options._class);
		
	var $header = $(document.createElement('div'))
		.attr('data-role', 'header')
		.attr('data-position', 'fixed')
		.attr('data-tap-toggle', false)
		.attr('data-update-page-padding', false).append(
			$(document.createElement('h1')).append($options.heading)
		);

	var $content = $(document.createElement('div'))
		.attr('data-role', 'content').append($options.content);
		
	var $footer = footer_element();
	
	return $page
		.append($header)
		.append($content)
		.append($footer);
		
}

function urldecode (str) {
  return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}	


function _email(decoded_string){
	return decoded_string.substr(("&#109;&#097;&#105;&#108;&#116;&#111;&#058;").length, decoded_string.length);
}

function search_element(){

/*

<div data-role="fieldcontain">
    <label for="search-2">Search Input:</label>
    <input type="search" name="search-2" id="search-2" value="" />
</div>

*/	var $s = $(document.createElement('div'))
		.attr('id', 'search')
		.attr('data-role', 'fieldcontain');
				
	var $l = $(document.createElement('label'))
		.attr('for', 'search-box')
		.append('Search Input: ');
		
	var $i = $(document.createElement('input'))
		.attr('type', 'search')
		.attr('name', 'search-box')
		.attr('id', 'search-box')
		.attr('placeholder', 'Random search text. Configure this in ');

	return $s.append($l).append($i);	
}

function footer_element(){

	var $footer = $(document.createElement('div'))
		.attr('id', 'footer')
		.attr('data-role', 'footer')
		.attr('data-position', 'fixed')
		.addClass('nav-footer ui-footer-duplicate');
	
	
		
	var $navbar = $(document.createElement('div'))
		.attr('data-role', 'navbar')
		.attr('data-theme', 'e');
	
	var $buttons = $(document.createElement('ul'));
	
	for(var i in footer){
		var $b = footer[i];
		$buttons.append(
			$(document.createElement('li')).append(
				$(document.createElement('a')).attr('data-icon', $b.icon).attr('href', $b.link).attr('data-theme', 'b').append(
					$b.text
				)
			)
		);
	}
	
	// Add link to web site
	var $notific = $(document.createElement('div'))
		.addClass('notification').append("<a href=\"//www.tcd.ie/\" data-ajax=\"false\">Click here to visit full site.</a>");	
	return $footer.append($notific).append($navbar.append($buttons));	
	
}

String.prototype.basicMatch = function( str )
{
  return this.toLowerCase().indexOf(str.toLowerCase()) > -1;
}


/**
 * Adds a leading zero to a single-digit number.  Used for displaying dates.
 */
function padNumber(num) {
  if (num <= 9) {
    return "0" + num;
  }
  return num;
}

function get_date($a , $b){
	var dateString = padNumber($b.getDate()) + "/" + padNumber($b.getMonth() + 1) + "/2013"; // Not really worried about the next century, as we will all have been replaced with robots who code efficiently from the outset. 
	if (!$a.isDateOnly()) {
		dateString += " at " + $b.getHours() + ":" + padNumber($b.getMinutes());
	}	
	return dateString;
}

function get_summary($d){
	return (typeof $d !== 'undefined' || $d.trim() == '') ? ( $d.length < 55 ? $d : $d.substr(0, 55) + " ... " ) : "No content specified.";
}

String.prototype.stripHtml = function(){
	return this.replace(/<br\/?>/,' ').replace(/<\/p><p>/,' ').replace(/<(?:.|\n)*?>/gm, '');
}

// Changes XML to JSON - courtest of davidwalsh.name
function xml_to_json(xml) {
  
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xml_to_json(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xml_to_json(item));
      }
    }
  }
  return obj;
};



function init() {
	resize_iframes();
	$.fx.interval = 500;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
    
    // Loading message
	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";
	
	google.setOnLoadCallback(calendar_init);

	// External link handlers
	$('a.mobile-content-only').live('click', function(e){				
		e.preventDefault();
		e.stopImmediatePropagation();
		// Cleanup
		$('#_ajax').remove();
		$('div[id*=single-page-]').remove();
		var $a = $(this).attr("href");
		
		var $p = $(document.createElement('div')).attr('id', '_ajax').appendTo($('body'));
		$p.load($a + ' #main-content');
		
		var $page_options = {
			theme: 'a',
			heading: 'External content', 
			content: $p
		}
		
		var $page = page_element($page_options).appendTo($('body'));
		$.mobile.changePage( $page );		
		return false;
	});  
	
	$('#show_menu').live('click', show_menu);
	
	// Some other params
	if (navigator.geolocation)	{
    	navigator.geolocation.getCurrentPosition(position_found);
    } 
}

function create_carousel_page(event){
	console.log("Slider page called");
}


function create_main_page(event){
	//$('#main_page div[data-role=content]:first').prepend(search_element());
	get_rss_as_json("http://www.tcd.ie/assets/feeds/news.rss", process_news);
	get_rss_as_json("http://www.tcd.ie/assets/feeds/announcements.rss", process_announcements);
	

	
}

function create_grid_page(event){
	var $target = $('div.dashboard:first');
	var $count = 0;
	// Nuke it! 
	$target.empty();
	
	for(var i in slide_menu.links[0].items){
		var $item = slide_menu.links[0].items[i];
		var $class = (i % 3 == 0 ? 'ui-block-a' : (i % 3 == 1 ? 'ui-block-b' : 'ui-block-c'));
		$target.append(
			$(document.createElement("div")).addClass($class).append(
				$(document.createElement("a"))
					.attr("href", $item.link)
					.attr("data-transition", "fade")
					.addClass("icon-dash item-" + $item.prefix)
					.append(
						$(document.createElement("img")).attr('src', 'img/icon-sets/new/' + site.icon_set + '/' + $item.prefix + '.png').attr('width', '52')
					)
					.append("<span>" + $item.text + "</span>")
			)
		);
	}
	
	// Site Search Button
	$('#search-form').live('submit', do_site_search);
	
}

function create_youtube_page(event){
	var $target = $('#youtube_page div[data-role=content]');
	// Nuke it! 
	$target.empty();
	var $u = $(document.createElement("ul")).attr("data-role", "listview").attr("data-inset", "true").attr("id", "yt-vid");
	
	var jqxhr = $.ajax(site.youtube_url).done(function(data){
			var entries = data.feed.entry;
			//console.log(entries);
			for(var i in entries){
				var entry = entries[i];	
				//console.log(entry);
				
				$(document.createElement("li")).append(
					$(document.createElement("a")).attr("href", entry.link[0].href).attr("data-ajax", "false").append(
						$(document.createElement("img")).attr("src", entry.media$group.media$thumbnail[1].url)
					).append(
						$(document.createElement("h2")).append(entry.content.$t)
					).append(
						$(document.createElement("p")).append(entry.published.$t)
					)
				).appendTo($u);
			}
			$('#youtube_page div[data-role=content]').append($u);
			$('#yt-vid').listview();
			// Recreate the page
			$('#youtube_page').trigger('create').page({ domCache: true });	
		}).fail(function() {
	
		}).always(function() {
	
		}); 

}

function create_campusm_page(event){
	var $target = $('div.dashboard-campusm:first');
	// Nuke it! 
	$target.empty();

	$els = new Array();
	
	for(var i in slide_menu.links[0].items){
		var $item = slide_menu.links[0].items[i];
		var $class = (i % 2 == 0 ? 'ui-block-a' : 'ui-block-b');
		
		$els[$els.length] = $(document.createElement("div")).addClass($class).append(
				$(document.createElement("a"))
					.attr("href", $item.link)
					.attr("data-transition", "fade")
					.append(
						$(document.createElement("img"))
							.attr("src", $item.icon)
							.addClass("img_icon")
					)
					.append("<span>" + $item.text + "</span>")
			);
	}
	$count = $els.length - 1; // index counter.
	
	for(var i in $els){
		var $s = $($els[i]); 
		if(i == $count || i == $count - 1){
			$s.addClass("last");
		}
		$target.append($s);
	}
}

function show_loading_message_news() {

}

function show_loading_message_calendar() {

}

function create_maps_page(event) {
	
	// Show a map containing TCD centre point
	var map = $('#_ini_map').gmap({
		'center': gcal_config.tcd_center, 
		'zoom': 16, 
		'disableDefaultUI': true
	});		
	
	google.maps.event.trigger(map, 'resize');													
	
	$("#maps_control").live('keyup', function(e){ // Who needs Custom plugins!! Did this myself :)
		$('#_ini_map').hide();
		$(this).doTimeout( 'typing', 1000, function(){ // Sensible default of half a second before searching. Prevents lots of continous searching
			var $q = $(this).val();
			if($q.length > 2){
				// Valid term
				$('#suggestions').remove();
				$('div[data-role=page][id*=map-info-]').remove();
				
				//$('#suggestions') = $();
				//$('div[data-role=page][id*=map-info-]') = $();			
				$.mobile.loading( 'show', {
					text: 'Searching Maps',
					textVisible: true,
					theme: 'a',
					html: ""
				});
				
				var url = '/webdesign-projects/stephen/mobile-2/stubs/maps.php?query=' + $q;
				// For testing 
				//url = '/webdesign-projects/stephen/mobile/stubs/maps.js';
				// Query the service 
				var jqxhr = $.ajax(url, function() {
					})
					.done(function(data) { 
						data = JSON.parse(data);
						//console.log(data);
						if(data.length > 0 && !debug){
							var $s = $(document.createElement('ul')).attr('id', 'suggestions').attr('data-inset', 'true');							
							for (var i in data){
								var r = data[i];	
								(function(i, r, $q, $s){
									var $l = $(document.createElement('li')); 
									var $a = $(document.createElement('a')).attr("href", "#map-info-" + i).append(r.name.replace("\\", "")).attr('data-transition', 'slide');
									$a.appendTo($l);
									$l.appendTo($s);
									
									$a.live('click', function(){
										// Now for the dynamic page.
										// <div data-role="page" id="${id}" data-theme="c" data-add-back-btn="true">
										var $page_options = {
											id: 'map-info-' + i,
											heading: r.name.replace("\\", "")
										}
										
										
										var $map_page_content = $(document.createElement("div")); 
										var $map = $(document.createElement("div"))
											.attr('id', 'map-panel-' + i).addClass('_gmap').attr('data-geoloc', r.lat + "," + r.lng);
										
										var $info_content = {
											items: [
												{
													text: 'Name: ' + r.name,
												},
												{
													text: 'Description: ' + r.description,
												},
												{
													text: 'Opening Hours: ' + r.opening_hours.stripHtml(),
												},
												{
													text: 'Accessibility: ' + r.accessibility,
												}
											]
										};
										
										
										var $info = $(list_view($info_content));									
										$page_options.content = $map_page_content.append($map).append($info);
										
										var $page = page_element($page_options);
										$page.appendTo($('body')); 											
									}); 
									
									$('#map-info-' + i).live('pageshow', function(){
										var $m = $(this).find('div._gmap').data("geoloc"); 
										$(this).find('div._gmap').gmap({
											'center': $m, 
											'zoom': 15, 
											'disableDefaultUI': true, 
											'callback': function() {	
												var self = this;	
												self.addMarker({'position': this.get('map').getCenter() });
												}
										});
									});															
								})(i, r, $q, $s);
								
							}
							
							// Show results divider
							$(document.createElement('li'))
								.attr("data-role", "list-divider")
								.text($s.children().size() + " result"+($s.children().size() !== 1 ? "s" : "")+".")
								.prependTo($s);
							
							// Append the list to the page
							$('#maps_page div[data-role=content]:first').append($s);
							$('#suggestions').listview();
							
							// Recreate the page
							$('#maps_page').trigger('create');
							
							
						}
					})
					.fail(function(e) {  
						//console.log('Failed', e);
						// Normally caused by malformed JSON
					})
					.always(function(e) { 
						$.mobile.loading( 'hide' );	
					});
			}		
		});
	});
	
}

function create_news_page(event) {	
	//
	if(navigator.onLine){
		$.mobile.showPageLoadingMsg();	
		var jqxhr = $.ajax(site.news_url).done(function(data){
			save_news_to_localstorage(data, load_news);
		}).fail(function() {
			load_news();
		}).always(function() {
			$.mobile.hidePageLoadingMsg();
		}); 
	} else {
		load_news();
	}
}

function create_weather_page(event) {
	if(navigator.onLine){		
		var jqxhr = $.ajax({url: site.weather_url, dataType: 'json'}).done(function(data){

			save_weather_to_localstorage(data);
			load_weather();		
		}).fail(function() {
			load_weather();
		}).always(function() {}); 
	} else {
		//console.log("Loading weather from local storage");
		load_weather();
	}
}

function save_weather_to_localstorage($json){
	//console.log($json);
	localStorage.setItem("latest_weather", JSON.stringify( $json ));
}

function save_news_to_localstorage($json, $callback){
	localStorage.setItem("latest_news", $json);
	$callback();
}

function load_weather(){
	if(typeof localStorage.getItem("latest_weather") !== 'undefined' && localStorage.getItem("latest_weather") != null){
		var $weather = localStorage.getItem("latest_weather");
		$weather = $.parseJSON($weather);

		var $w = $weather.query.results.channel;				
		$('#weather_page div[data-role=content]').append("<h3>" + $w.title + "</h3>");
		$('#weather_page div[data-role=content]').append($w.item.description);
	} else {
		//console.log("No offline weather report available");		
	}
	
	$('#weather_page').trigger('create');
}

function load_news(){
	$('#news_items').remove();
	var $news = JSON.parse(localStorage.getItem("latest_news"));

	var $list = $(document.createElement("ul")).attr("data-role", "listview").attr("data-theme", "d").attr("data-divider-theme", "d").attr("id", "news_items");
	$list.append("<li data-role=\"list-divider\">" + new Date().format('mmm dd, yyyy h:mm TT') + "<span class=\"ui-li-count\">" + $news.length + " news items.</span></li>");
	for(var i in $news){
		// Build list items first.
		var $item = $news[i];
		var $li = $(document.createElement("li"));
		var $a = $(document.createElement("a")).attr("href", "#news-" + $item.id); 
		$a.attr("data-transition", "slide");
		$a.append($(document.createElement("img")).attr("src", $item.thumbnail));
		$a.append($(document.createElement("h3")).append($item.headline));
		$a.append($(document.createElement("p")).append($item.summary.substring(0, 100) + " ..." ));
		
		
		$a.appendTo($li);
		$li.appendTo($list);
		
		(function($i){
			var $page_options = {
					heading: $i.headline, 
					id: "news-" + $i.id,
					theme: 'd'
				}
				
			// Build content 
			var $pf_page_content = $(document.createElement("div"));
			$pf_page_content.append($(document.createElement("h2")).append($i.headline));
			$pf_page_content.append($i.content);


			$page_options.content = $pf_page_content;
			var $page = page_element($page_options);
			$page.appendTo($('body'));
		}($item))
		
		
	}
	
	$('#news_page').find('div.ui-content:first').append($list);
	$('#news_page').trigger('create');
		
}

function do_peoplefinder_search(e){
	//console.log('Search clicked');
	// Fairly destructive, but needs must!
	$('#suggestions').remove();
	$('div[data-role=page][id*=people-]').remove();
	
	if($('#search-pf').val() != ''){
		
		if($('#search-pf').val().length < 5){
			alert('Query too short');
			return;
		}
		$.mobile.loading( 'show', {
			text: 'Searching Peoplefinder, please wait..',
			textVisible: true,
			theme: 'a',
			html: ""
		});

		var jqxhr = $.get("/assets/php/tcd-search/1/proxies/people.php",  
			{ query: $('#search-pf').val() 
				
			}).done(function(data) {   
				var $s = $(document.createElement('ul')).attr('id', 'suggestions').attr('data-inset', 'true');
				$(document.createElement('li')).attr("data-role", "list-divider").text(data.length + " results.").appendTo($s);
				//console.log(data);
				for(var i in data){
					var $p = data[i];
					var $l = $(document.createElement('li')); 
					var $a = $(document.createElement('a')).attr("href", "#people-" + i).append($p.name).attr('data-transition', 'slide');
					$a.appendTo($l);
					$s.append($l);
					
					// Build a page for each, and add it to the DOM. 
					(function($data, $idx){
						// Set up page options.
						var $page_options = {
							heading: $data.name, 
							id: "people-" + $idx,
							link_theme: 'b',
							theme: 'b'
						}
						
						// Build content 
						var $pf_page_content = $(document.createElement("div"))
							.append("<h2>" + $data.name + "</h2>");
							
						var $details = [];
						if(typeof $data.dept !== 'undefined'){
							$details.push({
								icon: 'img/icon-sets/glyphish/37-suitcase.png',
								text: 'Department: ' + $data.dept
							})
						}
						
						if(typeof $data.email !== 'undefined' && $data.email !== ''){
							$details.push({
								icon: 'img/icon-sets/glyphish/18-enveloper.png',
								text: 'Email: ' + _email($data.email),
								link: $("<div/>").html($data.email).text()
							})
						}
							
						if(typeof $data.number !== 'undefined' && $data.number !== ''){
							if($data.number.length == 4){
								var phone = "+3531896" + $data.number.trim();
								$details.push({
									icon: 'img/icon-sets/glyphish/31-ipod.png',
									text: 'Call: ' + phone,
									link: 'tel:' + phone
								});
								
							} else if($data.number.indexOf("/") > -1) { // Person has two numbers, like Dave!
								var numbers = $data.number.split("/");
								for(var i in numbers){
									var phone = numbers[i].trim();
									if(phone.length == 4){ // For internal numbers
										phone = "+3531896" + phone;
									}
									$details.push({
										icon: 'img/icon-sets/glyphish/31-ipod.png',
										text: 'Call: ' + phone,
										link: 'tel:' + phone
									});
									
								}
							}
							
						}						
						$pf_page_content.append(
							$(list_view({ 
								items: $details
							}))
						);
						$page_options.content = $pf_page_content;
						var $page = page_element($page_options);
						$page.appendTo($('body'));
						
						
					}($p, i));
				}

				$('#peoplefinder_page div[data-role=content]:first').append($s);
				$('#suggestions').listview();
				$('#peoplefinder_page').trigger('create');
				
			})
			.fail(function(data) {  //console.log(data); 
			})
			.always(function(data) {  
				$.mobile.loading( 'hide' );

			});
	}
				
}

function create_calendar_page(event) {
	var t = $(this);
	if(!errors_with_load){
		query_calendar(gcal_config, function(data){
		  var $e = data.feed.getEntries();
		  // We have entries. Lets build a list. 
		  var $ul = $(document.createElement('ul'))
		  	.attr('id', 'events_view')
		  	.attr('data-inset', 'true')
		  	.attr("data-role", "listview")
		  	.attr("data-theme","d")
		  	.attr("data-divider-theme", "d");
		  
		  // Add a list header
		  // <li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
		  $(document.createElement('li')).attr("data-role", "list-divider")
		  	//.append("Latest Events <span class='ui-li-count'>"+$e.length+"</span>")
		  	.append("Latest Events")
		  	.appendTo($ul);
		  
		  for(var i in $e){
		  	
			  $entry = $e[i];
			  
			  var $title = $entry.getTitle().getText();
			  var $content = $entry.getContent().$t; 
			  
			  var $startDateTime = null;
			  var $startJSDate = null;
			  var $times = $entry.getTimes();
			  if ($times.length > 0) {
		      	$startDateTime = $times[0].getStartTime();
		      	$startJSDate = $startDateTime.getDate();
		      }
		      
			  $ul.append(
			  	$(document.createElement('li'))
			  		.append($(document.createElement('a')).attr("href", "#calendar-" + i)
			  			.attr("data-transition", "slide") // need a click handler here. 
			  			.append($(document.createElement('h3')).append($title))
			  			.append($(document.createElement('p')).append(get_summary($content)))
			  			.append($(document.createElement('p')).addClass("ui-li-aside").append(get_date($startDateTime , $startJSDate)))
			  		)
			  );
			  
			// Build a page for each, and add it to the DOM. 
			(function($title, $content, $idx, $date){
				// Set up page options.
				var $page_options = {
					heading: $title, 
					id: "calendar-" + $idx,
					link_theme: 'b',
					theme: 'b'
				}
				
				// Build content 
				var $_page_content = $(document.createElement("div"))
					.append("<h2>" + $title + "</h2>");
					
				var $details = [];

				$details.push({
					icon: 'img/icon-sets/glyphish/37-suitcase.png',
					text: 'When: ' + $date
				});
				$details.push({
					text: $content
				});
								
				$_page_content.append(
					$(list_view({ 
						items: $details,
						transition: 'slide'
					}))
				);
				
				$_page_content.append(
					$(document.createElement('a'))
						.attr("href", $entry.getLinks()[0].href)
						.attr("data-role", "button")
						.attr("data-icon", "grid")
						.attr("data-theme", "b")
						.append("View in Google Calendar"));
						
				$page_options.content = $_page_content;
				var $page = page_element($page_options);
				$page.appendTo($('body'));
				events_loaded = true;
			}($title, $content, i, get_date($startDateTime , $startJSDate)));
			  
		  }
		var $b = $(document.createElement('a'))
						.attr("href", "https://www.google.com/calendar/render?cid=" + gcal_config.calendar_url)
						.attr("data-role", "button")
						.attr("data-icon", "grid")
						.attr("data-theme", "b")
						.attr("data-ajax", false)
						.append("View all items Google Calendar");
						
		t.find('div[data-role=content]:first').append($ul).append($b);
		
		$('#events_view').listview();
		t.trigger('create');
		$.mobile.loading( 'hide' );
		}, handle_error);	
	} else {
		
		//console.log("There was a problem loading the calendar info");
	}
}

function do_site_search(event){
	event.preventDefault();
	var $q = $(event.target).parent().find("input:first").val();
	if($q.trim() != ''){
		var $s = site.search_url.replace('##QUERY##', $q.trim());
		location.href = $s;
	}
	return false;
	
}

// Application init
$(window).resize(function() {
	//resize_iframes();
});
$(document).on('pageinit', function(){
	//resize_iframes();
});

$(document).bind('mobileinit', init);
$(document).bind('pagebeforecreate', function(e){
	//do_sliding_menu(slide_menu);
	// Default implementation
	var $_slideshow_options = { 
		imageScaleMode: 'fit',
		
	}; 
	/*
		arrowsNav: true,
		autoScaleSliderWidth: 320,
		arrowsNavAutoHide: false,
		fadeinLoadedSlide: false,
		controlNavigationSpacing: 0,
		controlNavigation: 'bullets',
		imageScaleMode: 'fill',
		imageAlignCenter:true,
		blockLoop: true,
		loop: true,
		numImagesToPreload: 6,
		transitionType: 'fade',
		keyboardNavEnabled: true,
		block: {
			delay: 400
		},
		autoPlay: {
			enabled: true,
			delay: 3500
		}
	};
	*/
	
	$('.slider_default').each(function(a,b){
		var a = $.extend({}, $_slideshow_options, $(this).data());
		//console.log(a);
		$(this).royalSlider(a);
	});
	
	$(e.target).append(footer_element());
});
$(document).bind('pagebeforeshow', function(e){
	// Tidy up dropdown menu settings.
	cleanup_dropdown_menu();	
	// Slidemenu
	$(e.target).find('a[data-slidemenu=#slidemenu]:gt(0)').remove();
});
var news_loaded = false;
var events_loaded = false;
// Loading messages for events
$(document).delegate('div[data-role=page][id=calendar_page]', 'pageshow', show_loading_message_calendar);

// Main page load
$('#main_page').live('pagebeforecreate', create_main_page);
// News page load 
$('#news_page').live('pagebeforecreate', create_news_page);
// Maps page 
$('#maps_page').live('pageshow', create_maps_page);
// Maps page 
$('#main_page_slider').live('pageshow', create_carousel_page);
// Calendar page
$('#calendar_page').live('pagebeforecreate', create_calendar_page);
// Weather page
$('#weather_page').live('pagebeforecreate', create_weather_page);
// Grid page
$('#main_page_grid').live('pagebeforecreate', create_grid_page);
// Campus M page
$('#main_page_campusm').live('pagebeforecreate', create_campusm_page);
// Youtube page
$('#youtube_page').live('pagebeforecreate', create_youtube_page);
// Peoplefinder Search Button
$('#pf-search-btn').live('click', do_peoplefinder_search)



// Plugin stuff. 
$('#revert').live('click', function(e){
	$.removeCookie('redirect_to_new', { path: '/' });
	window.location.href = site.portal_home;
});

/*!
 * Add to Homescreen v2.0.7 ~ Copyright (c) 2013 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var addToHome = (function (w) {
	var nav = w.navigator,
		isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
		isIPad,
		isRetina,
		isSafari,
		isStandalone,
		OSVersion,
		startX = 0,
		startY = 0,
		lastVisit = 0,
		isExpired,
		isSessionActive,
		isReturningVisitor,
		balloon,
		overrideChecks,

		positionInterval,
		closeTimeout,

		options = {
			autostart: true,			// Automatically open the balloon
			returningVisitor: false,	// Show the balloon to returning visitors only (setting this to true is HIGHLY RECCOMENDED)
			animationIn: 'drop',		// drop || bubble || fade
			animationOut: 'fade',		// drop || bubble || fade
			startDelay: 2000,			// 2 seconds from page load before the balloon appears
			lifespan: 15000,			// 15 seconds before it is automatically destroyed
			bottomOffset: 14,			// Distance of the balloon from bottom
			expire: 0,					// Minutes to wait before showing the popup again (0 = always displayed)
			message: '',				// Customize your message or force a language ('' = automatic)
			touchIcon: false,			// Display the touch icon
			arrow: true,				// Display the balloon arrow
			hookOnLoad: true,			// Should we hook to onload event? (really advanced usage)
			closeButton: true,			// Let the user close the balloon
			iterations: 100				// Internal/debug use
		},

		intl = {
			ar:    '<span dir="rtl">قم بتثبيت هذا التطبيق على <span dir="ltr">%device:</span>انقر<span dir="ltr">%icon</span> ،<strong>ثم اضفه الى الشاشة الرئيسية.</strong></span>',
			ca_es: 'Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d\'inici</strong>.',
			cs_cz: 'Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.',
			da_dk: 'Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
			de_de: 'Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.',
			el_gr: 'Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.',
			en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
			es_es: 'Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.',
			fi_fi: 'Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.',
			fr_fr: 'Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l\'écran d\'accueil</strong>.',
			he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
			hr_hr: 'Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.',
			hu_hu: 'Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.',
			it_it: 'Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.',
			ja_jp: 'このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。',
			ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
			nb_no: 'Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>',
			nl_nl: 'Installeer deze webapp op uw %device: tik %icon en dan <strong>Voeg toe aan beginscherm</strong>.',
			pl_pl: 'Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.',
			pt_br: 'Instale este aplicativo em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.',
			pt_pt: 'Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.',
			ru_ru: 'Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.',
			sv_se: 'Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
			th_th: 'ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>',
			tr_tr: 'Bu uygulamayı %device\'a eklemek için %icon simgesine sonrasında <strong>Ana Ekrana Ekle</strong> düğmesine basın.',
			uk_ua: 'Встановіть цей веб сайт на Ваш %device: натисніть %icon, а потім <strong>На початковий екран</strong>.',
			zh_cn: '您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。',
			zh_tw: '您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。'
		};

	function init () {
		// Preliminary check, all further checks are performed on iDevices only
		if ( !isIDevice ) return;

		var now = Date.now(),
			i;

		// Merge local with global options
		if ( w.addToHomeConfig ) {
			for ( i in w.addToHomeConfig ) {
				options[i] = w.addToHomeConfig[i];
			}
		}
		if ( !options.autostart ) options.hookOnLoad = false;

		isIPad = (/ipad/gi).test(nav.platform);
		isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
		isSafari = (/Safari/i).test(nav.appVersion) && !(/CriOS/i).test(nav.appVersion);
		isStandalone = nav.standalone;
		OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
		OSVersion = OSVersion && OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;

		lastVisit = +w.localStorage.getItem('addToHome');

		isSessionActive = w.sessionStorage.getItem('addToHomeSession');
		isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28*24*60*60*1000 > now : true;

		if ( !lastVisit ) lastVisit = now;

		// If it is expired we need to reissue a new balloon
		isExpired = isReturningVisitor && lastVisit <= now;

		if ( options.hookOnLoad ) w.addEventListener('load', loaded, false);
		else if ( !options.hookOnLoad && options.autostart ) loaded();
	}

	function loaded () {
		w.removeEventListener('load', loaded, false);

		if ( !isReturningVisitor ) w.localStorage.setItem('addToHome', Date.now());
		else if ( options.expire && isExpired ) w.localStorage.setItem('addToHome', Date.now() + options.expire * 60000);

		if ( !overrideChecks && ( !isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor ) ) return;

		var touchIcon = '',
			platform = nav.platform.split(' ')[0],
			language = nav.language.replace('-', '_');

		balloon = document.createElement('div');
		balloon.id = 'addToHomeScreen';
		balloon.style.cssText += 'left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:' + (OSVersion < 5 ? 'absolute' : 'fixed');

		// Localize message
		if ( options.message in intl ) {		// You may force a language despite the user's locale
			language = options.message;
			options.message = '';
		}
		if ( options.message === '' ) {			// We look for a suitable language (defaulted to en_us)
			options.message = language in intl ? intl[language] : intl['en_us'];
		}

		if ( options.touchIcon ) {
			touchIcon = isRetina ?
				document.querySelector('head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon]') :
				document.querySelector('head link[rel^=apple-touch-icon][sizes="57x57"],head link[rel^=apple-touch-icon]');

			if ( touchIcon ) {
				touchIcon = '<span style="background-image:url(' + touchIcon.href + ')" class="addToHomeTouchIcon"></span>';
			}
		}

		balloon.className = (isIPad ? 'addToHomeIpad' : 'addToHomeIphone') + (touchIcon ? ' addToHomeWide' : '');
		balloon.innerHTML = touchIcon +
			options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') +
			(options.arrow ? '<span class="addToHomeArrow"></span>' : '') +
			(options.closeButton ? '<span class="addToHomeClose">\u00D7</span>' : '');

		document.body.appendChild(balloon);

		// Add the close action
		if ( options.closeButton ) balloon.addEventListener('click', clicked, false);

		if ( !isIPad && OSVersion >= 6 ) window.addEventListener('orientationchange', orientationCheck, false);

		setTimeout(show, options.startDelay);
	}

	function show () {
		var duration,
			iPadXShift = 208;

		// Set the initial position
		if ( isIPad ) {
			if ( OSVersion < 5 ) {
				startY = w.scrollY;
				startX = w.scrollX;
			} else if ( OSVersion < 6 ) {
				iPadXShift = 160;
			}

			balloon.style.top = startY + options.bottomOffset + 'px';
			balloon.style.left = startX + iPadXShift - Math.round(balloon.offsetWidth / 2) + 'px';

			switch ( options.animationIn ) {
				case 'drop':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.opacity = '0';
					balloon.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		} else {
			startY = w.innerHeight + w.scrollY;

			if ( OSVersion < 5 ) {
				startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
				balloon.style.left = startX + 'px';
				balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + 'px';
			} else {
				balloon.style.left = '50%';
				balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 ? 40 : 0 ) + 'px';
				balloon.style.bottom = options.bottomOffset + 'px';
			}

			switch (options.animationIn) {
				case 'drop':
					duration = '1s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + (balloon.offsetHeight + options.bottomOffset + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		}

		balloon.offsetHeight;	// repaint trick
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.opacity = '1';
		balloon.style.webkitTransform = 'translate3d(0,0,0)';
		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);

		closeTimeout = setTimeout(close, options.lifespan);
	}

	function manualShow (override) {
		if ( !isIDevice || balloon ) return;

		overrideChecks = override;
		loaded();
	}

	function close () {
		clearInterval( positionInterval );
		clearTimeout( closeTimeout );
		closeTimeout = null;

		// check if the popup is displayed and prevent errors
		if ( !balloon ) return;

		var posY = 0,
			posX = 0,
			opacity = '1',
			duration = '0';

		if ( options.closeButton ) balloon.removeEventListener('click', clicked, false);
		if ( !isIPad && OSVersion >= 6 ) window.removeEventListener('orientationchange', orientationCheck, false);

		if ( OSVersion < 5 ) {
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth)/2) - startX;
		}

		balloon.style.webkitTransitionProperty = '-webkit-transform,opacity';

		switch ( options.animationOut ) {
			case 'drop':
				if ( isIPad ) {
					duration = '0.4s';
					opacity = '0';
					posY += 50;
				} else {
					duration = '0.6s';
					posY += balloon.offsetHeight + options.bottomOffset + 50;
				}
				break;
			case 'bubble':
				if ( isIPad ) {
					duration = '0.8s';
					posY -= balloon.offsetHeight + options.bottomOffset + 50;
				} else {
					duration = '0.4s';
					opacity = '0';
					posY -= 50;
				}
				break;
			default:
				duration = '0.8s';
				opacity = '0';
		}

		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);
		balloon.style.opacity = opacity;
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}


	function clicked () {
		w.sessionStorage.setItem('addToHomeSession', '1');
		isSessionActive = true;
		close();
	}

	function transitionEnd () {
		balloon.removeEventListener('webkitTransitionEnd', transitionEnd, false);

		balloon.style.webkitTransitionProperty = '-webkit-transform';
		balloon.style.webkitTransitionDuration = '0.2s';

		// We reached the end!
		if ( !closeTimeout ) {
			balloon.parentNode.removeChild(balloon);
			balloon = null;
			return;
		}

		// On iOS 4 we start checking the element position
		if ( OSVersion < 5 && closeTimeout ) positionInterval = setInterval(setPosition, options.iterations);
	}

	function setPosition () {
		var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;

		// Screen didn't move
		if ( posY == matrix.m42 && posX == matrix.m41 ) return;

		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}

	// Clear local and session storages (this is useful primarily in development)
	function reset () {
		w.localStorage.removeItem('addToHome');
		w.sessionStorage.removeItem('addToHomeSession');
	}

	function orientationCheck () {
		balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 ? 40 : 0 ) + 'px';
	}

	// Bootstrap!
	init();

	return {
		show: manualShow,
		close: close,
		reset: reset
	};
})(window);
