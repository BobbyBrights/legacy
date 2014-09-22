<?php
	// Wordpress 3.0 Features
	// This theme uses wp_nav_menu() in one location.
if (function_exists('register_nav_menus')) {
	register_nav_menus( array(
		'primary' => __( 'Primary Navigation', 'sbox' ),
	) );
}

function sbox_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'sbox_page_menu_args' );

//Enable Backgrounds
if (function_exists('add_custom_background')) {
	add_custom_background();
}

?>