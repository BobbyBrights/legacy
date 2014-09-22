/* Constants */
var calendar_loaded = false;
var errors_with_load = false;

function add_menus($i, e){
		// Add menus and handlers
	var $panel_id = "panel_" + $i;
	
	var $panel = $(document.createElement("div"))
		.attr("data-role", "panel")
		.attr("data-position", "left")
		.attr("data-display", "overlay")
		.attr("data-theme", "a")
		.attr("id", $panel_id);
	
	
	// List items
	
	var $menu =  $(document.createElement("ul"))
		.attr("data-role", "listview")
		.attr("data-theme", "a");
	
	for(var i in slide_menu.links[0].items){
		var $l = slide_menu.links[0].items[i];		
		var $li = $(document.createElement("li"));
		var $img = $(document.createElement("img"))
			.attr('src', 'img/icon-sets/new/white/' + $l.prefix + '.png')
			.attr('width', '16')
			.addClass("ui-li-icon");
		var $a = $(document.createElement("a"))
			.attr("href", $l.link);
			
		$a.append($img).append($l.text);
		$li.append($a);
		$menu.append($li);
	}
	
	$panel.append($menu);
	
	//<a href="#" data-icon="arrow-d" class="ui-btn-right" id="show_menu">Menu</a>
	var $link = $(document.createElement("a"))
		.attr("href", "#" + $panel_id)
		.addClass("ui-btn-right menu-button")
		.append("<hr /><hr /><hr />");
		
	$(e.target).find("div[data-role=header]").append($link);	
	$(e.target).append($panel);
}


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
				var $a = $(document.createElement("a"))
					.attr('href', item.link)
					.attr('data-theme', $options.link_theme)
					.attr('data-transition', $options.transition); 
				
				if(typeof item.icon !== 'undefined'){
					$a.append($(document.createElement("img"))
						.attr('src', item.icon)
						.addClass('ui-li-icon'));
				}
				$a.append(item.text);				
				li.append($a);
	 
			} else {
				if(typeof item.icon !== 'undefined'){
					li.append($(document.createElement("img"))
						.attr('src', item.icon)
						.addClass('ui-li-icon'));
				}
				li.append(item.text);
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


