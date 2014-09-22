!function ($) {
	$(function(){
	
  $('#full-width-slider').royalSlider({
    arrowsNav: true,
    loop: true,
    keyboardNavEnabled: true,
    controlsInside: false,
    imageScaleMode: 'fill',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 350,
    controlNavigation: 'bullets',
    thumbsFitInViewport: false,
    navigateByClick: true,
    startSlideId: 0,
    autoPlay: true,
    transitionType:'move',
    globalCaption: false,
    deeplinking: {
      enabled: true,
      change: false
    },
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
    imgWidth: 1920,
    imgHeight: 550
  });
  
		
	});
	
	// Add a search option to the main nav
	$('#menu-primary-nav').append("<li class='search'><input type='text' placeholder='Search..'/></li>");
	
	$('.overlay-menu').css({'width': $("#primary-nav").width()}); 
	
	
	// Activate the drop down menus
	$('a.main-menu-link').on('click', function(e){	
		if($(this).next("div.overlay-menu").size() > 0){
			$('#overlay-placeholder').empty();
			$('a.main-menu-link').parent().removeClass("active-menu-item");
		
			if($(this).parent().hasClass("active-menu-item")){ // current menu activated, do nothing
				return false;
			}
			console.log('Has overlay');	
			// Activate the overlay.
			$(this).parent().addClass("active-menu-item");
			$(this).next("div.overlay-menu").clone().appendTo('#overlay-placeholder');
			
			$('#overlay-placeholder').slideDown('fast');
			
			// Enable links in overlays.
			$('#overlay-placeholder img').on('click', function(e){
				console.log("Clicked", $(this).parent().find('a').attr("href"));
				if($(this).parent().find('a').attr("href") !== null && typeof $(this).parent().find('a').attr("href") !== 'undefined'){
					location.href = $(this).parent().find('a').attr("href");
				}
			});


			
			return false;
		}
		return true;
	});
	
}(window.jQuery)
