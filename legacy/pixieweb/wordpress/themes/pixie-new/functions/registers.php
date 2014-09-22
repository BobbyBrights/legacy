<?php
//add_action('admin_menu', 				'pixie_admin');
//add_filter('custom_menu_order', 		'__custom_menu_order');
//add_filter('menu_order', 				'__custom_menu_order');
add_action('init', 						'register_scripts');

function __custom_menu_order($menu_ord) {
   if (!$menu_ord) return true;
	   return array(
	    'index.php', // this represents the dashboard link
	    'edit.php?post_type=page', // this is a custom post type menu
	    'edit.php?post_type=portfolio', // this is a custom post type menu
	    'edit.php?post_type=blog',
	    'edit.php?post_type=course',
	    'edit.php', // this is the default POST admin menu
	);
}

function pixie_admin(){
	global $menu;
    //$restricted = array(__('Dashboard'), __('Posts'), __('Media'), __('Links'), __('Pages'), __('Appearance'), __('Tools'), __('Users'), __('Settings'), __('Comments'), __('Plugins'));
    $restricted = array( __('Posts'), __('Comments'));
    end ($menu);
    while (prev($menu)){
        $value = explode(' ',$menu[key($menu)][0]);
        if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
    }
}

function register_scripts() {
	// Scripts
	// wp_register_script('jquery', 'http://code.jquery.com/jquery-1.9.1.min.js', array(), '1.0', true);
	wp_register_script('jquery-migrate', 'http://code.jquery.com/jquery-migrate-1.1.1.min.js', array('jquery'), '1.0', true);
	
	wp_register_script('modernizr', get_template_directory_uri() . '/js/modernizr.custom.66606.js', array(), '1.0', true);
	wp_register_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', array('jquery'), '1.0', true);
//	wp_register_script('angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js', array(), '1.0', true);	
//	wp_register_script('jquery-parallax', get_template_directory_uri() . '/js/jquery.parallax.js', array('jquery'), '1.0', true);	
	wp_register_script('google-prettify', get_template_directory_uri() . '/js/google.prettify.js', array(), '1.0', true);	
//	wp_register_script('foggy', get_template_directory_uri() . '/js/jquery.foggy.min.js', array('jquery'), '1.0', true);	
	wp_register_script('pixie', get_template_directory_uri() . '/js/pixie.js', array(), '1.0', true);	
	wp_register_script('royalslider', get_template_directory_uri() . '/js/jquery.royalslider.min.js', array('jquery'), '9.2', true);	
	wp_register_script('masonry', get_template_directory_uri() . '/js/masonry.pkgd.min.js', array('jquery'), '3.0.0', true);	


	// Load these ones by default
	wp_enqueue_script('jquery-migrate');
	wp_enqueue_script('bootstrap');
//	wp_enqueue_script('angular');
	wp_enqueue_script('modernizr');
//	wp_enqueue_script('jquery-parallax');
	wp_enqueue_script('google-prettify');
//	wp_enqueue_script('foggy');
	wp_enqueue_script('royalslider');
	wp_enqueue_script('masonry');
	wp_enqueue_script('pixie');

}

