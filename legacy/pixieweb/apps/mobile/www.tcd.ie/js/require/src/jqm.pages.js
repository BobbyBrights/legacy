function init() {
	console.log("Mobileinit called");
	
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
	$('a.mobile-content-only').on('click', function(e){				
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


function create_main_page(event){
	//$('#main_page div[data-role=content]:first').prepend(search_element());
	console.log("Starting main page");
	get_rss_as_json("http://www.tcd.ie/assets/feeds/news.rss", process_news);
	get_rss_as_json("http://www.tcd.ie/assets/feeds/announcements.rss", process_announcements);
}

function create_grid_page(event){
	var $target = $('div.dashboard:first');
	var $count = 0;
	// Nuke it! 
	$target.empty();
	var $items = slide_menu.links[0].items; 
	// Skip the first one, it's just the home link
	$items.splice(0,1);
	
	for(var i in $items){
		
		var $item = $items[i];
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
	$('#search-form').on('submit', do_site_search);
	
}

function create_youtube_page(event){
	var $target = $('#youtube_page div[data-role=content]');
	// Nuke it! 
	$target.empty();
	var $u = $(document.createElement("ul")).attr("data-role", "listview").attr("id", "yt-vid");
	// Add a list header
	$(document.createElement('li')).attr("data-role", "list-divider")
	  	.append("Latest Videos")
	  	.attr("data-theme", "d")
	  	.appendTo($u);
	  	
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




function create_maps_page(event) {
	// Some other params
	if (navigator.geolocation)	{
    	navigator.geolocation.getCurrentPosition(position_found);
    } 

	$(document).delegate('#maps_control', 'keyup', function() {
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
				
				var url = site.maps.url + $q;
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
									var $name = typeof r.az_name !== 'undefined' && r.az_name != null ? r.az_name : r.name; 
									console.log($name);
									
									var $a = $(document.createElement('a')).attr("href", "#map-info-" + i).append($name.replace("\\", "")).attr('data-transition', 'slide');
									$a.appendTo($l);
									$l.appendTo($s);
									
									$a.on('click', function(){
										// Now for the dynamic page.
										// <div data-role="page" id="${id}" data-theme="c" data-add-back-btn="true">
										var $page_options = {
											id: 'map-info-' + i,
											heading: $name.replace("\\", "")
										}
										
										
										var $map_page_content = $(document.createElement("div")); 
										var $map = $(document.createElement("div"))
											.attr('id', 'map-panel-' + i).addClass('_gmap').attr('data-geoloc', r.lat + "," + r.lng);
										
										var $info_content = {
											items: [
												{
													text: 'Name: ' + r.az_name + " - " + r.name
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
									
									$(document).delegate('#map-info-' + i, 'pageshow', function(){
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


function create_news_page_rss(event) {	
	//
	if(navigator.onLine){
		$.mobile.showPageLoadingMsg();	
		var jqxhr = $.ajax(site.rss.news.url).done(function(data){
			var $rss = xml_to_json(data);
			$('#news_items').remove();
			console.log($rss);
			
			$news =  $rss.rss.channel.item;
			
			var $list = $(document.createElement("ul")).attr("data-role", "listview").attr("data-theme", "d").attr("data-divider-theme", "d").attr("id", "news_items");
			$list.append("<li data-role=\"list-divider\">Trinity College News: " + new Date().format('mmm dd, yyyy h:mm TT') + "<span class=\"ui-li-count\">" + $news.length + " news items.</span></li>");
			
			var $num_items = site.rss.news.items;
			
			for(var i in $news){
				// Build list items first.
				if(i < $num_items){
					var $item = $news[i];
					
					var $li = $(document.createElement("li"));
					var $a = $(document.createElement("a")).attr("href", "#news-" + i); 
					
					$a.attr("data-transition", "slide");
					
					
					//$a.append($(document.createElement("img")).attr("src", $item.media[':thumbnail']['@attributes']['url']));
					$a.append($(document.createElement("h3")).append($item['content:encoded']['#text']));
					$a.append($(document.createElement("p")).append($item.pubDate['#text']));
					
					
					$a.appendTo($li);
					$li.appendTo($list);
					
					(function($i, $idx){
						var $page_options = {
								heading: 'Latest news', 
								id: "news-" + $idx,
								theme: 'd'
							}
							
						// Build content 
						var $pf_page_content = $(document.createElement("div"));
						//$pf_page_content.append($(document.createElement("h2")).append($i['content:encoded']['#text']));
						$pf_page_content.append($(document.createElement("div")).attr("id", "news-content" + i));
						
						//$pf_page_content.append($(document.createElement("div")).attr("id", $i['link']['#text']).append($i['link']['#text']));
						//$pf_page_content.append($i.content);
			
			
						$page_options.content = $pf_page_content;
						var $page = page_element($page_options);
						$page.appendTo($('body'));
						
						// And load the content into the page
						var $content_holder = $("#news-content" + i);
						var $link = $i['link']['#text'].replace("//www.tcd.ie", "");
						console.log($link);
						
						$content_holder.load($link + ' div.article:first');
						
					}($item, i))
				
				}				
			}
			
			$('#news_page').find('div.ui-content:first').append($list);
			$('#news_page').trigger('create');		
			
						
		}).fail(function() {
			load_news();
		}).always(function() {
			$.mobile.hidePageLoadingMsg();
		}); 
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
					
					//console.log($p);
					
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
						//console.log($page);
						
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
		      
		      var $li = $(document.createElement('li'))
			  		.append($(document.createElement('a')).attr("href", "#calendar-" + i)
			  			.attr("data-transition", "slide") // need a click handler here. 
			  			.append($(document.createElement('h3')).append($title))
			  			.append($(document.createElement('p')).append(get_summary($content)))
			  			.append($(document.createElement('p')).addClass("ui-li-aside").append(get_date($startDateTime , $startJSDate)))
			  		);
			  
			  $ul.append($li);
			 
			  
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
		
		$ul.appendTo($('#calendar_page div[data-role=content]:first'));
		
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


function show_loading_message_news() {

}

function show_loading_message_calendar() {

}
