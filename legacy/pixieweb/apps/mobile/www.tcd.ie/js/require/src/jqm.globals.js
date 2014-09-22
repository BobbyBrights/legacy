var news_loaded = false;
var footer = [
	{
		'text': 'Test', 
		'link': '#main_page',
		'icon': 'grid'
	},
	{
		'text': 'Events', 
		'link': '#events_page',
		'icon': 'gear'
	},
	{
		'text': 'Alerts', 
		'link': '#alerts_page',
		'icon': 'star'
	},
	{
		'text': 'My TCD', 
		'link': '#my_tcd_page',
		'icon': 'grid'
	}
];


$(document).bind('mobileinit', function () {
    $.mobile.allowCrossDomainPages = true;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    //$.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultHomeScroll = 0;
    // Loading message
	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";
  
});

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

	console.log($options.content);
	var $content = $(document.createElement('div'))
		.attr('data-role', 'content').append($options.content);
		
	var $footer = footer_element();
	
	return $page
		.append($header)
		.append($content)
		.append($footer);
		
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
	
	return $footer.append($navbar.append($buttons));	
}

// Loading messages
$(document).delegate('div[data-role=page][id=news_page]', 'pageshow', function() {
	if(!news_loaded){
	 	$.mobile.loading( 'show', {
			text: 'Loading news..',
			textVisible: true,
			theme: 'a',
			html: ""
		});
		news_loaded = true;
	}
});

$(document).bind('pageinit', function(e){
	//console.log("Init script called");
	$('a.mobile-content-only').live('click', function(e){	
			
		e.preventDefault();
		e.stopImmediatePropagation();
		// Cleanup
		$('#_ajax').remove();
		$('div[id*=single-page-]').remove();

		var $p = $(document.createElement('div')).attr('id', '_ajax').appendTo($('body'));
		$p.load($(this).attr("href") + ' #main-content');
		var $page_options = {
			theme: 'a',
			heading: 'External content', 
			content: $p
		}
		
		var $page = page_element($page_options).appendTo($('body')).trigger('create');
		$.mobile.changePage( $page );
		
		return false;
	});
});

$(document).bind('pagebeforecreate', function(e){
	$(e.target).append(footer_element());
});

$(document).bind('pagecreate', function(e){
	//onsole.log($('#footer').size());
});

	

