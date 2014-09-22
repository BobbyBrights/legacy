// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)

	var $root = $('html, body');
	$('a').click(function() {
	    var href = $.attr(this, 'href');
	    
	    $root.animate({
	        scrollTop: $(href).offset().top
	    }, 500, function () {
	        window.location.hash = href;
	    });
	    return false;
	});
  })
  
  
}(window.jQuery)
