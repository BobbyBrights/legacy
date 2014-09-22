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
add_theme_support( 'post-thumbnails', array( 'post', 'page', 'blog') ); // Add it for posts
set_post_thumbnail_size( 50, 150); // For blog posts


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
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
	}
}
add_action('admin_menu', 'remove_menus');
?>