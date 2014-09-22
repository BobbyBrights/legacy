<?php
function _post_type_init() {
    $plugin_domain = 'shanemccafferty.com';

	$labels = array(
		'name'               => _x( 'Apps', 'post type general name', $plugin_domain ),
		'singular_name'      => _x( 'App', 'post type singular name', $plugin_domain ),
		'menu_name'          => _x( 'Apps', 'admin menu', $plugin_domain ),
		'name_admin_bar'     => _x( 'App', 'add new on admin bar', $plugin_domain ),
		'add_new'            => _x( 'Add New', 'book', $plugin_domain ),
		'add_new_item'       => __( 'Add New App', $plugin_domain ),
		'new_item'           => __( 'New App', $plugin_domain ),
		'edit_item'          => __( 'Edit App', $plugin_domain ),
		'view_item'          => __( 'View App', $plugin_domain ),
		'all_items'          => __( 'All Apps', $plugin_domain ),
		'search_items'       => __( 'Search Apps', $plugin_domain ),
		'parent_item_colon'  => __( 'Parent Apps:', $plugin_domain ),
		'not_found'          => __( 'No apps found.', $plugin_domain ),
		'not_found_in_trash' => __( 'No apps found in Trash.', $plugin_domain ),
	);


	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'app' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'thumbnail' )
	);

	register_post_type( 'app', $args );
}

add_action('init', '_post_type_init');