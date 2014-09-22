<?php
add_action('admin_menu', 				'pixie_admin');
add_filter('custom_menu_order', 		'custom_menu_order');
add_filter('menu_order', 				'custom_menu_order');

add_action('init', 						'register_scripts');
add_action('init', 						'register_my_nav_menus');

// FSS Script for homepage. 
add_action('get_header', 				'add_fss_script');

function custom_menu_order($menu_ord) {
   if (!$menu_ord) return true;
	   return array(
	    'index.php', // this represents the dashboard link
	    'edit.php?post_type=page', // this is a custom post type menu
	    'edit.php?post_type=portfolio', // this is a custom post type menu
	    'edit.php?post_type=blog',
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
	wp_register_script('modernizr', get_template_directory_uri() . '/js/modernizr.custom.93232.js', false);
	wp_register_script('jquery', 'http://code.jquery.com/jquery-1.9.1.min.js', false);
	wp_register_script('jquery-migrate', 'http://code.jquery.com/jquery-migrate-1.1.1.min.js', array('jquery'));
	wp_register_script('fss-ba-cond', get_template_directory_uri() . '/contributed/fss/js/jquery.ba-cond.min.js', array(), '1.0', true);
	wp_register_script('fss', get_template_directory_uri() . '/contributed/fss/js/jquery.slitslider.js', array('jquery-migrate', 'modernizr', 'fss-ba-cond'), '1.0', true);
	wp_register_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', array('jquery-migrate'), '1.0', true);
	wp_register_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('jquery-migrate', 'fss'), '1.0', true);	
	wp_register_script('angular', get_template_directory_uri() . '/js/angular.min.js', array(), '1.0');	

	
	// Load these ones by default
	wp_enqueue_script('bootstrap');
	wp_enqueue_script('angular');

}

function register_my_nav_menus(){
	register_nav_menus( array(
	    'primary' => __( 'Primary Navigation' ),
    ));
}

function add_fss_script()
{
    if (is_front_page())
    {
        wp_enqueue_script('scripts'); // enqueue it to be added in the head section
        wp_register_style('fss-depen', get_template_directory_uri() . '/contributed/fss/css/style.css', array(), '1.0', 'all');
        wp_register_style('fss', get_template_directory_uri() . '/contributed/fss/css/custom.css', array('fss-depen'), '1.0', 'all');
        wp_enqueue_style( 'fss' ); // enqueue it to be added in the head section
    }
}
