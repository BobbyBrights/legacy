<?php
add_action('init', 'blog_register');

function blog_register() {
	$args = get_default_args();
	$args['label'] = __('Blog'); 
	$args['singular_label'] = __('Entry'); 
    register_post_type( 'blog' , $args );
    register_taxonomy("blog-taxonomy", 
    	array("blog"), 
    	array(
    		"hierarchical" => true, 
    		"label" => "Blog Categories", 
    		"singular_label" => "Blog Category", 
    		"rewrite" => true
    	)
    );
}

function get_default_args(){
	return array(
		'public' => true, 
		'show_ui' => true, 
		'capability_type' => 'post', 
		'hierarchical' => false, 
		'rewrite' => true, 
		'supports' => array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail' ) 
	);
}

?>