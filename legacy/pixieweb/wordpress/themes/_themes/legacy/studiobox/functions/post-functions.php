<?php
/**
 * @package WordPress
 * @subpackage StudioBox_extended
 */
 
add_action( 'after_setup_theme', 'init_post_functions' );

function init_post_functions(){
	// This theme styles the visual editor with editor-style.css to match the theme style.
	add_editor_style();

	// This theme uses post thumbnails
	add_theme_support( 'post-thumbnails' );

	// Add default posts and comments RSS feed links to head
	add_theme_support( 'automatic-feed-links' );

	// This theme allows users to set a custom background
	add_custom_background();
	define( 'HEADER_IMAGE_WIDTH',  1102  );
	define( 'HEADER_IMAGE_HEIGHT', 350  );
	
	set_post_thumbnail_size( HEADER_IMAGE_WIDTH, HEADER_IMAGE_HEIGHT, true );
	
	// Added by Stephen - to enable slider based images.
	add_image_size( 'slider-image', 786, 200, true); // Permalink thumbnail size 
}
?>