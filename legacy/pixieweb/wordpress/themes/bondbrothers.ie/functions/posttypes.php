<?php
add_action('init', '_register_post_types');

function _register_post_types() {
	$supports = array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail' );
	$args = array(
		'public' => true, 
		'show_ui' => true, 
		'capability_type' => 'post', 
		'hierarchical' => false, 
		'rewrite' => true, 
		'supports' => $supports
	);
	
	// Blog entries
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
    
	// Custom Content	
	unset($args['label']);
	unset($args['singular_label']);
	$args['label'] = __('Custom Content'); 
	$args['singular_label'] = __('Custom Content'); 
    register_post_type( 'custom-content' , $args );

	// Testimonials	
	unset($args['label']);
	unset($args['singular_label']);
	$args['label'] = __('Testimonials'); 
	$args['singular_label'] = __('Testimonial'); 
    register_post_type( 'testimonial' , $args );
    
}


?>