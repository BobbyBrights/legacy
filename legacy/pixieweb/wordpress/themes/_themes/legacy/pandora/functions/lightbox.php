<?php

//wp_enqueue_style('pretty_photo_lightbox', get_template_directory_uri() . '/jquery/lightbox/prettyPhoto.css');
//wp_enqueue_script('pretty_photo_lightbox', get_template_directory_uri() . '/jquery/lightbox/jquery.prettyPhoto.js');

function pandora_lightbox_switch_on(){
?><script type="text/javascript">  
	jQuery(document).ready(function($) {
	   jQuery("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.gif'], a[href$='.png']").prettyPhoto({
		animationSpeed: 'normal', /* fast/slow/normal */
		padding: 40, /* padding for each side of the picture */
			opacity: 0.35, /* Value betwee 0 and 1 */
		showTitle: true /* true/false */			
		});
})
</script><?php
}
?>