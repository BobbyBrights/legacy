<?php

add_action( 'init', 'create_post_types' );
function create_post_types() {
        $args = array(
                'label' => __('News Items'),
                'singular_label' => __('News Items'),
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

        register_post_type( 'news_item' , $args );
		
		
        $args['label'] = __('Player Profiles');
        $args['singular_label'] = __('Player Profiles');

        register_post_type( 'player_profile' , $args );
        
        $args['label'] = __('Fixtures');
        $args['singular_label'] = __('Fixtures');

        register_post_type( 'fixture' , $args );
              
        $args['label'] = __('Gallery Posts');
        $args['singular_label'] = __('Gallery Posts');

        register_post_type( 'gallery posts' , $args );
		
}

// This is for the REST API - a specific hook is called to populate post JSON with post metadata

add_filter('json_api_encode', 'my_encode_metadata');

function my_encode_metadata($response) {
  if (isset($response['posts'])) {
    foreach ($response['posts'] as $post) {
      my_add_metadata($post); // Add metadata to each post
    }
  } else if (isset($response['post'])) {
    my_add_metadata($response['post']); // Add a metadata property
  }
  return $response;
}

function my_add_metadata(&$post) {
  $post->metadata = get_post_custom($post->id);
}

?>
