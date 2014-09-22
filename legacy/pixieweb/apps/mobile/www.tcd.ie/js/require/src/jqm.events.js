$(document).on('mobileinit', init);
$(document).bind('pagebeforecreate', function(e){
	$(e.target).append(footer_element());
	var $i = $(e.target).attr("id");
	switch($i){
		case 'main_page_grid':
			create_grid_page(e);
			break;
		case 'news_page':
			create_news_page_rss(e);
			break;
		case 'maps_page':
			create_maps_page(e);
			break;
		case 'calendar_page':
			create_calendar_page(e);
			break;
		case 'weather_page':
			create_weather_page(e);
			break;
		case 'youtube_page':
			create_youtube_page(e);
			break;

		default:
			break;
	}
	add_menus($i, e);
	
});

var news_loaded = false;
var events_loaded = false;
// Loading messages for events
$(document).delegate('div[data-role=page][id=calendar_page]', 'pageshow', show_loading_message_calendar);
// Peoplefinder Search Button
$(document).delegate('#pf-search-btn', 'click', do_peoplefinder_search);
// Fixes annoying Gmaps bug which causes map tiles to behave erratically. 
$(document).delegate('#maps_page', 'pageshow', function(e){
	console.log("Before show called");
	// Show a map containing TCD centre point
	var map = $('#_ini_map').gmap({
		'center': gcal_config.tcd_center, 
		'zoom': 16, 
		'disableDefaultUI': true
	});		
	google.maps.event.trigger(map, 'resize');	
});


