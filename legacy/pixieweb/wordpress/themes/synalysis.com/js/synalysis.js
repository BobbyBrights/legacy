(function($){
    $.fn.getStyleObject = function(){
        var dom = this.get(0);
        var style;
        var returns = {};
        if(window.getComputedStyle){
            var camelize = function(a,b){
                return b.toUpperCase();
            };
            style = window.getComputedStyle(dom, null);
            for(var i = 0, l = style.length; i < l; i++){
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            };
            return returns;
        };
        if(style = dom.currentStyle){
            for(var prop in style){
                returns[prop] = style[prop];
            };
            return returns;
        };
        return this.css();
    }
})(jQuery);

$(document).ready(function(e){
	console.log("App loading");
	
	$('#myCarousel').carousel()
	
	
	// Fix for dropdown menu not working
	$('header nav').meanmenu();


	// Arrow boxes - tabbed
	$('.spotlights a').on('click', function(e){
		e.preventDefault(); 
		activate_tab($(this));
		return false;
	}); 

	$('div.spotlights div.span4:first').addClass("arrow_box");
	$(window).on('resize', rewrite_images); 
	$(window).trigger('resize');
	
});


function rewrite_images(){
	// Some responsive stuff
	$('.carousel img').each(function(a, b){
		var src = $(this).attr("src");
		if($(this).css('marginTop') == '-1px'){		
			$(this).attr("src", $(this).attr("data-resp"));		
		} else {
			$(this).attr("src", $(this).attr("data-main"));		
		}
	});	
}
function activate_tab($sel){
	$('body').animate({ scrollTop : $("#_spot").offset().top - 165 }, 'slow');
	$('div.arrow_box').removeClass('arrow_box');
	$sel.parent().addClass('arrow_box');
	$('div.tab:visible').fadeOut('fast', function(){
		var $h = $sel.attr("href");
		$($h).fadeIn();
	});	
}

