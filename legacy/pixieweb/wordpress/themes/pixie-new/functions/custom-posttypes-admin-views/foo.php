<?php
// Field Array
$prefix = 'foo_';
$foo_meta_fields = array(
	array(
		'label'=> 'Overview',
		'desc'	=> 'Text overview of the course',
		'id'	=> $prefix.'overview',
		'type'	=> 'textarea'
	)
);


// The Callback
function show_custom_meta_box_for_foo() {
	global $foo_meta_fields, $post;
	custom_meta_view($foo_meta_fields, "custom_meta_box_nonce_foo", wp_create_nonce(basename(__FILE__)), $post);
}

// Remove some metas
function remove_meta_boxes_foo() {
  remove_meta_box('postexcerpt', 'foo', 'normal');
  remove_meta_box('postcustom' , 'foo' , 'normal' ); //removes custom fields for page
  remove_meta_box('slugdiv', 'foo', 'normal' );
  remove_meta_box('postdiv', 'foo', 'normal' );
  remove_post_type_support('foo', 'editor');
  
}
add_action( 'admin_menu', 'remove_meta_boxes_foo' );

// Add the Meta Box  
function add_foo_desc_meta_box() {  
    add_meta_box(  
        'foo_description', // $id  
        'Foo Description', // $title   
        'show_custom_meta_box_for_foo', // $callback  
        'foo', // $page  
        'normal', // $context  
        'high'); // $priority  
}  
add_action('add_meta_boxes', 'add_foo_desc_meta_box'); 