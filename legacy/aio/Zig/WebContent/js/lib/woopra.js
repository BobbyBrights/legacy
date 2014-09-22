/*! wpt - v3.0.1 - 2013-07-23\n* Copyright (c) 2013 Billy Vong <billy@woopra.com>; Licensed  */(function(t,i){"use strict";var e,n,o,a={},s=[],r=!0,c=!0;a.CONSTANTS={VERSION:11,ENDPOINT:"//www.woopra.com/track/"},a.extend=function(t,i){for(var e in i)t[e]=i[e]},a.readCookie=function(e){var n,o,a;return""===e?"":(n=""+i.cookie,o=n.indexOf(e),-1===o?"":(a=n.indexOf(";",o),-1===a&&(a=n.length),t.unescape(n.substring(o+e.length+1,a))))},a.setCookie=function(t,e,n,o,a){var s=[];s.push(t+"="+e),s.push("expires="+n),s.push("path="+a),s.push("domain=."+o),i.cookie=s.join("; ")},a.getCampaignData=function(){for(var t,i,e=a.getUrlParams(),n={},o=["source","medium","content","campaign","term"],s=0;o.length>s;s++)t=o[s],i=e["utm_"+t]||e["woo_"+t],i!==void 0&&(n["campaign_"+("campaign"===t?"name":t)]=i);return n},a.getUrlParams=function(){var i={};return t.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(t,e,n){i[e]=decodeURIComponent(n.split("+").join(" "))}),i},a.buildUrlParams=function(t,i){var e,n=i||"",o=[];if(t===void 0)return t;for(e in t)o.push(n+encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return o.join("&")},a.randomString=function(){var t,i,e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",n="";for(t=0;12>t;t++)i=Math.floor(Math.random()*e.length),n+=e.substring(i,i+1);return n},a.loadScript=function(t,e){var n,o,s=i.createElement("script");s.type="text/javascript",s.src=t,s.async=!0,e&&"function"==typeof e&&(o=e),s.onreadystatechange!==void 0?s.onreadystatechange=function(){(4===this.readyState||"complete"===this.readyState||"loaded"===this.readyState)&&(o&&o(),a.removeScript(s))}:s.onload=function(){o&&o(),a.removeScript(s)},n=i.getElementsByTagName("script")[0],n.parentNode.insertBefore(s,n)},a.removeScript=function(t){t.parentNode.removeChild(t)},a.getHost=function(){return t.location.host.replace("www.","")},a.endsWith=function(t,i){return-1!==t.indexOf(i,t.length-i.length)},a.sleep=function(t){for(var i=new Date,e=new Date;t>e-i;)e=new Date},e=a._on=function(t,i){s[t]||(s[t]=[]),s[t].push(i)},a._fire=function(t){var i;if(s[t])for(i=0;s[t].length>i;i++)s[t][i].apply(this,Array.prototype.slice.call(arguments,1))},a.attachEvent=function(i,e,n){var o,a,s;t.document.attachEvent!==void 0?(o="attachEvent",a="on"+e):(o="addEventListener",a=e,s=!1),i[o](a,n,s)},a.attachEvent(i,"mousedown",function(i){var e,s,h,p;for(a._fire("mousemove",i,new Date),e=i.srcElement||i.target;e!==void 0&&null!==e&&(!e.tagName||"a"!==e.tagName.toLowerCase());)e=e.parentNode;e!==void 0&&null!==e&&(s=e,h=s.pathname.match(/(?:doc|dmg|eps|jpg|jpeg|png|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3|mp4|m4v)($|\&)/),p=!1,r&&h&&0>(""+s.href).indexOf("woopra-ns.com")&&(a._fire("download",s.href),a.sleep(n)),c&&!h&&s.hostname!==t.location.host&&-1===s.hostname.indexOf("javascript")&&""!==s.hostname&&(a._fire("outgoing",s.href),a.sleep(o)))}),a.attachEvent(i,"mousemove",function(t){a._fire("mousemove",t,new Date)}),a.attachEvent(i,"keydown",function(){a._fire("keydown")});var h=function(i){this.visitorData={},this.sessionData={},this.options={},this.instanceName=i,this.idle=0,this.cookie="",this.last_activity=new Date,this._loaded=!1,this.version=a.CONSTANTS.VERSION,i&&""!==i&&(t[i]=this)};if(h.prototype={init:function(){this._setOptions(),this._processQueue("config"),this._setupCookie(),this._bindEvents(),this._loaded=!0,this._processQueue()},_setOptions:function(){var t=new Date;t.setDate(t.getDate()+365),this.config({domain:a.getHost(),cookie_name:"wooTracker",cookie_domain:null,cookie_path:"/",cookie_expire:t,ping:!0,ping_interval:12e3,idle_timeout:3e5,idle_threshold:1e4,download_pause:200,outgoing_pause:400,download_tracking:!0,outgoing_tracking:!0,ignore_query_url:!0})},_processQueue:function(i){var e,n,o,a=t._w[this.instanceName];if(a&&a._e)for(o=a._e,e=0;o.length>e;e++)n=o[e],void 0===n||!this[n[0]]||void 0!==i&&i!==n[0]||this[n[0]].apply(this,Array.prototype.slice.call(n,1))},_setupCookie:function(){this.cookie=a.readCookie(this.config("cookie_name")),this.cookie&&this.cookie.length>0||(this.cookie=a.randomString()),null===this.config("cookie_domain")&&(a.endsWith(t.location.host,"."+this.config("domain"))?this.config("cookie_domain",this.config("domain")):this.config("cookie_domain",a.getHost())),a.setCookie(this.config("cookie_name"),this.cookie,this.config("cookie_exp"),this.config("cookie_domain"),this.config("cookie_path"))},_bindEvents:function(){var t=this;e("mousemove",function(){t.moved.apply(t,arguments)}),e("keydown",function(){t.typed.apply(t,arguments)}),e("download",function(){t.downloaded.apply(t,arguments)}),e("outgoing",function(){t.outgoing.apply(t,arguments)})},_dataSetter:function(t,i,e){var n;if(i===void 0)return t;if(e===void 0){if("string"==typeof i)return t[i];if("object"==typeof i)for(n in i)t[n]=i[n]}else t[i]=e;return this},_push:function(t){var i,e,n,o,s=t||{},r=this.config("protocol"),c=r&&""!==r?r+":":"",h=c+a.CONSTANTS.ENDPOINT+s.endpoint+"/",p="ra="+a.randomString(),u=[["visitorData","cv_"],["eventData","ce_"],["sessionData","cs_"]],l=[];l.push(p),l.push(a.buildUrlParams(this.getOptionParams()));for(o in u)n=u[o],s[n[0]]&&l.push(a.buildUrlParams(s[n[0]],n[1]));i="?"+l.join("&"),e=h+i,a.loadScript(e,s.callback)},config:function(t,i){var e=this._dataSetter(this.options,t,i);return e===this&&(6e3>this.options.ping_interval?this.options.ping_interval=6e3:this.options.ping_interval>6e4&&(this.options.ping_interval=6e4),c=c&&this.options.outgoing_tracking,o=o||this.options.outgoing_pause,r=r&&this.options.download_tracking,n=n||this.options.download_pause),e},visit:function(t,i){return this._dataSetter(this.sessionData,t,i)},identify:function(t,i){return this._dataSetter(this.visitorData,t,i)},call:function(t){this[t]&&"function"==typeof this[t]&&this[t].apply(this,Array.prototype.slice.call(arguments,1))},track:function(t,i){var e,n={},o=arguments[arguments.length-1];a.extend(n,a.getCampaignData()),"function"==typeof o&&(e=o),t===void 0||t===e?(n.name="pv",n.url=this.getPageUrl(),n.title=this.getPageTitle()):i===void 0||i===e?("string"==typeof t&&(n.name=t),"object"==typeof t&&this._dataSetter(n,t)):(n.name=t,this._dataSetter(n,i)),this._push({endpoint:"ce",visitorData:this.visitorData,sessionData:this.sessionData,eventData:n,callback:e}),this.startPing()},startPing:function(){var i=this;this.pingInterval===void 0&&(this.pingInterval=t.setInterval(function(){i.ping()},this.config("ping_interval")))},stopPing:function(){this.pingInterval!==void 0&&(t.clearInterval(this.pingInterval),delete this.pingInterval)},ping:function(){var t;return this.config("ping")&&this.idle<this.config("idle_timeout")?this._push({endpoint:"ping"}):this.stopPing(),t=new Date,t-this.last_activity>this.config("idle_threshold")&&(this.idle=t-this.last_activity),this},push:function(t){return this._push({endpoint:"identify",visitorData:this.visitorData,sessionData:this.sessionData,callback:t}),this},sleep:function(t){a.sleep(t)},moved:function(t,i){this.last_activity=i,this.idle=0},typed:function(){this.vs=2},downloaded:function(t){this.track("download",{url:t})},outgoing:function(t){this.track("outgoing",{url:t})},getPageUrl:function(){return this.options.ignore_query_url?t.location.pathname:t.location.pathname+t.location.search},getPageTitle:function(){return 0===i.getElementsByTagName("title").length?"":i.getElementsByTagName("title")[0].innerHTML},getOptionParams:function(){var e={alias:this.config("domain"),instance:this.instanceName,cookie:a.readCookie(this.config("cookie_name")),ka:this.config("keep_alive")||2*this.config("ping_interval"),meta:a.readCookie("wooMeta")||"",screen:t.screen.width+"x"+t.screen.height,language:t.navigator.browserLanguage||t.navigator.language||"",referer:i.referrer,idle:""+parseInt(this.idle/1e3,10),vs:"i"};return 2===this.vs?(e.vs="w",this.vs=0):0===this.idle&&(e.vs="r"),e},dispose:function(){this.stopPing(),t[this.instanceName]!==void 0&&delete t[this.instanceName]}},t._w!==void 0)for(var p in t._w){var u=new h(p);u.init(),void 0===typeof t.woopraTracker&&(t.woopraTracker=u)}t.WoopraTracker=h,t.WoopraLoadScript=a.loadScript,t.exports!==void 0&&(a.Tracker=h,t.exports.Woopra=a)})(window,document);