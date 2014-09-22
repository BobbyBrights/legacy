!function ($) {
    $(function(){
      window.prettyPrint && prettyPrint(); 
      
      // Console
      // console.log("Loaded");
      // Append an icon to all external links 
      $('a[href^=http]').each(function(){
      	  var $m = $(this).attr('href').match(/pixiewebdesign/g); 
      	  var $sl = typeof $m  !== 'undefined' && $m != null;
      	  if(!$sl){
	      	$(this).append(" <i class='icon-external-link'></i>");
	      }
      }); 
      
/*       $('#services').foggy(); */
      
    })
}(window.jQuery)
