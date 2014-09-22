<?php
/**
 * @package CreatePostTypes
 * @version 1.0
 */
/*
Plugin Name: (Ubuntu) Create Post Types
Plugin URI: http://wordpress.org/#
Description: Create arbitrary post types - used for displaying different post types on different parent pages.
Author: Stephen McElhinney
Version: 1.0
Author URI: http://www.three.ie/
*/
add_action( 'init', 'publications_init' );
add_action( 'init', 'create_post_types' );

function create_post_types() {
	$args = array(
		'label' => __('Publications'),
		'singular_label' => __('Publications'),
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'post',
		'_builtin' => false, 
		'supports' => array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail'),
		'add_new' => __( 'Add New' ),
		'add_new_item' => __( 'Add New Info' ),
		'rewrite' => array( 'slug' => '', 'with_front' => false),
		'edit' => __( 'Edit' ),
		'edit_item' => __( 'Edit Info' ),
		'new_item' => __( 'New Info' ),
		'view' => __( 'View Info' ),
		'view_item' => __( 'View Info' ),
		'search_items' => __( 'Search Info Centre' ),
		'not_found' => __( 'No info found' ),
		'not_found_in_trash' => __( 'No info found in Trash' ),
		'parent' => __( 'Parent Info' ),
		'menu_position' =>__( 20 ),
		'taxonomies' => array( 'publications_category')
	);

	register_post_type( 'publications' , $args );
}

function publications_init() {
	// create a new taxonomy
	register_taxonomy(
		'publications_category',
		'publications',
		array(
			'label' => __( 'Categories' ),
			'sort' => true,
			'hierarchical' => true, 
			'args' => array( 'orderby' => 'term_order' ),
			'rewrite' => array( 'slug' => 'publications_categories' )
		)
	);
}


?>