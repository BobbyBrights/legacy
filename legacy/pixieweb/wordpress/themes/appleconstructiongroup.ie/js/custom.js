/*--------gallery--------*/
jQuery(document).ready(function(){
    jQuery(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({
        animation_speed:'normal',
        theme:'light_square',
        slideshow:8000, 
        autoplay_slideshow: true
    });
    
    jQuery('div.gallery-id-25 dl:eq(6)').remove();
    
});
/*--------DDsmoothmenu Initialization--------*/
ddsmoothmenu.init({
    mainmenuid: "menu", //menu DIV id
    orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
    classname: 'ddsmoothmenu', //class added to menu's outer DIV
    //customtheme: ["#1c5a80", "#18374a"],
    contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
});
//Contact validate
jQuery(document).ready(function(){
    //jQuery("#contactForm").validate();
    
    
});
//Flexslider
jQuery(window).load(function() {
    jQuery('.flexslider').flexslider();
});