<?php
include_once('functions/shortcodes.php'); 
include_once('functions/nav-walkers.php'); 

function register_my_nav_menus(){
	register_nav_menus( array(
	    'primary' => __( 'Primary Navigation' ),
    ));
}
add_action('init', 'register_my_nav_menus');
?>