<?php

function add_and_remove_sidebars(){
	if ( function_exists('register_sidebar') ){
		// Unregsiter some of the TwentyTen sidebars
		unregister_sidebar( 'primary-widget-area' );
		unregister_sidebar( 'secondary-widget-area' );
		unregister_sidebar( 'first-footer-widget-area' );
		unregister_sidebar( 'second-footer-widget-area' );
		unregister_sidebar( 'third-footer-widget-area' );
		unregister_sidebar( 'fourth-footer-widget-area' );

	}
	
	register_sidebar(array('name'=>'Homepage Main Image',
			'before_widget' => '<div class="box_FreeHtml txtBox_cms">',
			'after_widget' => '</div>',
			'before_title' => '<h3>',
			'after_title' => '</h3>',
		));
	// Custom sidebar for display latest posts on homepage.
	register_sidebar( array(
			'name' => __( 'Latest Posts Widget Area', 'twentyten' ),
			'id' => 'latest-posts-widget-area',
			'description' => __( 'The latest posts widget area', 'twentyten' ),
			'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>',
		) );

	register_sidebar( array(
			'name' => __( 'Homepage Content Area', 'twentyten' ),
			'id' => 'homepage-content-area',
			'description' => __( 'The homepage content area', 'twentyten' ),
			'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>',
		) );

	register_sidebar( array(
			'name' => __( 'Right Sidebar', 'twentyten' ),
			'id' => 'right-sidebar',
			'description' => __( 'The right sidebar area', 'twentyten' ),
			'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>',
		) );
		
}

add_action( 'widgets_init', 'add_and_remove_sidebars', 11 );

function new_excerpt_more($more) {
	global $post;
	return '';
}

add_filter('excerpt_more', 'new_excerpt_more');

// Add all custom post types to the "Right Now" box on the Dashboard
add_action( 'right_now_content_table_end' , 'ucc_right_now_content_table_end' );

function ucc_right_now_content_table_end() {
  $args = array(
    'public' => true ,
    '_builtin' => false
  );
  $output = 'object';
  $operator = 'and';

  $post_types = get_post_types( $args , $output , $operator );

  foreach( $post_types as $post_type ) {
    $num_posts = wp_count_posts( $post_type->name );
    $num = number_format_i18n( $num_posts->publish );
    $text = _n( $post_type->labels->singular_name, $post_type->labels->name , intval( $num_posts->publish ) );
    if ( current_user_can( 'edit_posts' ) ) {
      $num = "<a href='edit.php?post_type=$post_type->name'>$num</a>";
      $text = "<a href='edit.php?post_type=$post_type->name'>$text</a>";
    }
    echo '<tr><td class="first b b-' . $post_type->name . '">' . $num . '</td>';
    echo '<td class="t ' . $post_type->name . '">' . $text . '</td></tr>';
  }

}

add_action( 'init', 'create_post_types' );
function create_post_types() {
	$args = array(
		'label' => __('Press Releases'),
		'has_archive' => true,
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

// Trying to fix some category based stuff for custom post types.

add_filter('pre_get_posts', 'query_post_type');
function query_post_type($query) {
  if(is_category() || is_tag()) {
    $post_type = get_query_var('post_type');
	if($post_type)
	    $post_type = $post_type;
	else
	    $post_type = array('post','press_releases','blog'); // replace cpt to your custom post type
    $query->set('post_type',$post_type);
	return $query;
    }
}

if ( ! function_exists( 'ucc_request_filter' ) ) {
function ucc_request_filter( $query ) {
	// Preview does not like having post_type set; feed is my personal preference.
	if ( empty( $query['preview'] ) && empty( $query['feed'] ) ) {
		$my_post_type = $query['post_type'];
		if ( empty( $my_post_type ) ) {
			$query['post_type'] = 'any';
		}
	}
	return $query;
} }
add_filter( 'request' , 'ucc_request_filter' );

function is_tree( $pid ) {      // $pid = The ID of the page we're looking for pages underneath
    global $post;               // load details about this page

    if ( is_page($pid) )
        return true;            // we're at the page or at a sub page

    $anc = get_post_ancestors( $post->ID );
    foreach ( $anc as $ancestor ) {
        if( is_page() && $ancestor == $pid ) {
            return true;
        }
    }

    return false;  // we arn't at the page, and the page is not an ancestor
}


function google_xml_sitemap_filter($posttypes)
{
    // to remove posttypes of a particular name
    foreach($posttypes as $key => $val)
    {
        if($val=='super_duper')
        {
            unset($posttypes[$key]);
        }
    }
 
    // to add posttypes e.g. page
    $posttypes[] = 'press_releases';
 
    return $posttypes;
}
 
add_filter('guar_sitemap_posttype_filter','google_xml_sitemap_filter',10,1);


?>