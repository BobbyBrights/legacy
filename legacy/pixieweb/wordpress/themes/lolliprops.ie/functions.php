<?php
include_once('functions/nav-walkers.php');
include_once('functions/post-types.php');

function register_my_nav_menus(){
	register_nav_menus( array(
	    'primary' => __( 'Primary Navigation' ),
    ));
}
add_action('init', 'register_my_nav_menus');

//
add_theme_support( 'post-thumbnails', array( 'post', 'page', 'blog', 'prop') ); // Add it for posts
add_image_size( 'prop-thumb', 120, 120, true ); // Hard Crop Mode - for use on category page
add_image_size( 'prop-large-image', 350, 250 ); // Soft Crop Mode - for use on overview page
add_image_size( 'prop-tall', 590, 9999 ); // Unlimited Height Mode


//add_image_size( 'prop-image', 150, 150, true ); //(cropped)

// Customise admin menu
function remove_menus () {
	global $menu;
	$restricted = array(
		//__('Dashboard'), 
		__('Posts'), 
		//__('Media'), 
		__('Links'), 
		//__('Pages'), 
		//__('Appearance'), 
		__('Tools'), 
		//__('Users'), 
		__('Settings'), 
		__('Comments'), 
		__('Plugins')
	);
	end ($menu);
	while (prev($menu)){
		$value = explode(' ',$menu[key($menu)][0]);
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted) && !is_admin()){unset($menu[key($menu)]);}
	}
}
add_action('admin_menu', 'remove_menus');
?>