var debug = false;
var site = {
	search_url: 'http://search.tcd.ie/search?q=##QUERY##&entqr=0&ud=1&&output=xml_no_dtd&oe=UTF-8&ie=ISO-8859-1&client=default_frontend&proxystylesheet=default_frontend&site=default_collection',
	weather_url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20location%3D%22EIXX0014%22&format=json',
	youtube_url: 'http://gdata.youtube.com/feeds/api/playlists/PL55XqDjybyL8GObgACKJvBJFHcF-vmDVQ?max-results=25&alt=json',
	icon_set: 'white',
	rss: {
		//news: 'http://www.tcd.ie/assets/feeds/news.rss',
		news: {
			url: '/webdesign-projects/preview/mobile/api/rss.php',
			items: 5	
		}
	},
	maps: {
		url: '/webdesign-projects/preview/mobile/api/maps/gmaps.php?query='
	}
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
		'icon': 'home'
	},
	{
		'text': 'PeopleFinder', 
		'link': '#peoplefinder_page',
		'icon': 'tcd-peoplefinder'
	},
	{
		'text': 'Maps', 
		'link': '#maps_page',
		'icon': 'tcd-maps'
	},
	{
		'text': 'About', 
		'link': '#about_page',
		'icon': 'info'
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
					'text': 'Home', 
					'link': '#main_page_grid',
					'prefix': 'home'
				},
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
					'text': 'Youtube EDU', 
					'link': '#youtube_page',
					'prefix': 'youtube'
				}			
				
			]
		}
	]
}



