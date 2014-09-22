<?php 
remove_filter( 'the_content', 'wpautop' );
add_action('init', '_register_post_types');


function the_slug($echo=true){
  $slug = basename(get_permalink());
  do_action('before_slug', $slug);
  $slug = apply_filters('slug_filter', $slug);
  if( $echo ) echo $slug;
  do_action('after_slug', $slug);
  return $slug;
}


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

	// Testimonials	
	unset($args['label']);
	unset($args['singular_label']);
	$args['label'] = __('Client Stories'); 
	$args['singular_label'] = __('Client Story'); 
    register_post_type( 'client-stories' , $args );
    
}
function register_my_menu() {
  register_nav_menu('primary-nav',__( 'Primary Nav' ));
}
add_action( 'init', 'register_my_menu' );

// My Nav Walker
class _Simple_Walker extends Walker
{
    public function walk( $elements, $max_depth )
    {
        $list = array ();

        foreach ( $elements as $item )
            $list[] = "<a href='$item->url'>$item->title</a>";

        return join( "\n", $list );
    }
}

?>