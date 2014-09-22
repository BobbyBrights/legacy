<?php
add_action('init', 'portfolio_register');
add_action('init', 'blog_register');

function portfolio_register() {
	$args = get_default_args();
	$args['label'] = __('Portfolio'); 
	$args['singular_label'] = __('Project'); 
	
	$args['labels'] = array(
		'add_new' => __('Add New Project')
	);
	
    register_post_type( 'portfolio' , $args );
    register_taxonomy("project-type", 
    	array("portfolio"), 
    	array(
    		"hierarchical" => true, 
    		"label" => "Project Types", 
    		"singular_label" => "Project Type", 
    		"rewrite" => true
    	)
    );
    register_taxonomy("keywords", 
    	array("portfolio"), 
    	array(
    		"hierarchical" => false, 
    		"label" => "Keywords", 
    		"singular_label" => "Keyword", 
    		"rewrite" => true
    	)
    );

}

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