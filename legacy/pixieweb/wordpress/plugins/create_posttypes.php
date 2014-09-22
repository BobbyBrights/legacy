<?php
/**
 * @package CreatePostTypes
 * @version 1.0
 */
/*
Plugin Name: Create Post Types
Plugin URI: http://wordpress.org/#
Description: Create arbitrary post types - used for displaying different post types on different parent pages.
Author: Stephen McElhinney
Version: 1.0
Author URI: http://www.three.ie/
*/

add_action( 'init', 'create_post_types' );
function create_post_types() {
	$args = array(
		'label' => __('Press Releases'),
		'singular_label' => __('Press Releases'),
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'post',
		'supports' => array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail'),
		'add_new' => __( 'Add New' ),
		'add_new_item' => __( 'Add New Info' ),
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
		'taxonomies' => array( 'post_tag', 'category')
	);

	register_post_type( 'press_releases' , $args );
	
	$args['label'] = __('Blog Posts');
	$args['singular_label'] = __('Blog Posts');
	
	register_post_type( 'blog' , $args );

}

?>