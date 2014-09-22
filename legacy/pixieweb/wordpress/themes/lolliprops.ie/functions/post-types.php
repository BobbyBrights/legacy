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
	
	// Props	
	unset($args['label']);
	unset($args['singular_label']);
	$args['label'] = __('Props'); 
	$args['singular_label'] = __('Prop'); 
    register_post_type( 'prop' , $args );
    register_taxonomy("prop-category", 
    	array("prop"), 
    	array(
    		"hierarchical" => true, 
    		"label" => "Prop Categories", 
    		"singular_label" => "Prop Category", 
    		"rewrite" => true
    	)
    );

	// Testimonials - dont forget you've unset $args['supports'] here. Add it back in again if you need it. 
	unset($args['label']);
	unset($args['singular_label']);
	unset($args['supports']);
	$args['label'] = __('Testimonials'); 
	$args['singular_label'] = __('Testimonial');
    register_post_type( 'testimonial' , $args );
    
}


?>