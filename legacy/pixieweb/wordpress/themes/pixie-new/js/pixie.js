!function ($) {
    $(function(){
      window.prettyPrint && prettyPrint(); 
      
      // Console
      // console.log("Loaded");
      // Append an icon to all external links 
      $('a[href^=http]').each(function(){
      	  var $m = $(this).attr('href').match(/pixieweb|px/g); 
      	  var $sl = typeof $m  !== 'undefined' && $m != null;
      	  if(!$sl){
	      	$(this).append(" <i class='icon-external-link'></i>");
	      }
      }); 
      
/*       $('#services').foggy(); */

  $('#full-width-slider').royalSlider({
    arrowsNav: true,
    loop: false,
    keyboardNavEnabled: true,
    controlsInside: false,
    imageScaleMode: 'none',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 350,
    controlNavigation: 'bullets',
    thumbsFitInViewport: true,
    navigateByClick: true,
    startSlideId: 0,
    autoPlay: true,
    transitionType:'move',
    globalCaption: true,
    deeplinking: {
      enabled: true,
      change: false
    },
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
    imgWidth: 1400,
    imgHeight: 680
  });
  
  var $container = $('section#portfolio');
      
    })
}(window.jQuery)
