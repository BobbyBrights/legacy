<?php
function tranquil_sidebars(){
    register_sidebar(array(
		'id' => 'sidebar-1',
		'name' => 'Sidebar',
       'before_widget' => '',
       'after_widget' => '<br />',
 	 'before_title' => '<h2>',
       'after_title' => '</h2>',
    ));
}
 
add_action( 'widgets_init', 'tranquil_sidebars' );
    
 

if ( ! isset( $content_width ) )
	$content_width = 570;


add_theme_support('post-thumbnails');
set_post_thumbnail_size( 532, 355,true );
add_theme_support('automatic-feed-links');
add_theme_support( 'menus' );


require_once ( get_template_directory() . '/theme-options.php' );

function tranquil_menus(){
register_nav_menus(
	array(
		  'primary' => 'Header Menu',
		  'footer-menu' => 'Footer Menu'
	)
);
}
add_action( 'init', 'tranquil_menus');


