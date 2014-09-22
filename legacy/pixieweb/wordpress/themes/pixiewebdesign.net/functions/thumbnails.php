<?php

if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 280, 210, true ); // Normal post thumbnails
	add_image_size( 'portfolio-slider-image', 1500, 550, true); // Permalink thumbnail size 
}

?>