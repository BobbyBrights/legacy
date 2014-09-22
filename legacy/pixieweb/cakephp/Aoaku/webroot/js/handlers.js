$(document).ready(function(){
	var $options = {
		onSelect: function (suggestion) {
	        //alert('You selected: ' + suggestion.value);
	    },
	    onSearchStart: function (query) {
		    //console.log(this, query);
	    },
	    onSearchComplete: function (query) {
		    //console.log(this, query);
	    }
	    
	}; 
	
	$('input[name=subject], input[name=area]').each(function(){
		var $s = $(this).attr("name");
		$(this).autocomplete(
			$.extend({}, $options,  {
		    	serviceUrl: '/aoaku/json/search/' + $s
		    })
	    );
	});
	
	// Submit handler for button
	$('#search_btn').on('click', function(e){
		e.preventDefault();
		if($('input[name=subject]').val() != '' && $('input[name=area]').val() != ''){
			$('#search').attr("action", '/aoaku/teach_me/' + slugify($('input[name=subject]').val()) + "/" + slugify($('input[name=area]').val())).submit();
		}
	}); 
	
	// Filtering
	$('ul.filters li label input').on('click', function(){
		var $li = $(this).parent().parent();
		$li.toggleClass("active");
		filter();
	});
	
	// Clear filters
	$('#clear_filters').on('click', function(){
		$('ul.filters li').removeClass('active');
		$('ul.filters').find('input[type=checkbox]').prop('checked', false);
		filter();
	});

	
});

function toggle_modal(show){
	$('#myModal').modal(show ? 'show' : 'hide');
}

function filter(){
	$('div.no-results').hide();
	var $s = $('ul.filters li.active').size(); 
	if ($s > 0){
		$('div.results').fadeOut("fast", function(){
			var $t = $(this);
			$t.children('div').hide();			
			console.log($('ul.filters li.active input[type=checkbox]').attr('id'));
			
			$.each($('ul.filters li.active'), function(){
				var c = $(this).find("input:first").attr("id");
				$('div.' + c).show();
				/*
								if($s > 0){
					$t.fadeIn();
				} else {
					$('div.notification.no-results').fadeIn('fast');
				}
				*/
				$t.fadeIn('fast', function(){
					var $s = $("div.people:visible").size();
					if($s < 0){
						$('div.no-results').show();
					}
				});

			});	
			
						
		});
	} else { // show all
		$('div.results div').show();
	}
}

function slugify(text) {
	text = text.trim();
	text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
	text = text.replace(/-/gi, "_");
	text = text.replace(/\s/gi, "_");
	return text.toLowerCase();
}
