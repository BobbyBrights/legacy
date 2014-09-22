<?php
include_once('functions/nav-walkers.php');
include_once('functions/post-types.php');
include_once('functions/sidebars.php');
include_once('functions/widgets.php');

function register_my_nav_menus(){
	register_nav_menus( array(
	    'primary' => __( 'Primary Navigation' ),
	    'social_links' => __( 'Social Links' ),
    ));
}
add_action('init', 'register_my_nav_menus');

function count_sidebar_widgets( $sidebar_id, $echo = true ) {
    $the_sidebars = wp_get_sidebars_widgets();
    if( !isset( $the_sidebars[$sidebar_id] ) ): return 0; endif;
    return count( $the_sidebars[$sidebar_id] );
}

// Customise admin menu
function remove_menus () {
	global $menu;
	$restricted = array(
		//__('Dashboard'), 
		__('Posts'), 
		//__('Media'), 
		__('Links'), 
		__('Pages'), 
		//__('Appearance'), 
		__('Tools'), 
		//__('Users'), 
		__('Settings'), 
		__('Comments'), 
		__('Plugins')
	);
	end ($menu);
	while (prev($menu)){
		$value = explode(' ',$menu[key($menu)][0]);
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted) && !is_admin()){unset($menu[key($menu)]);}
	}
}
add_image_size( 'slider-image', 1500, 550, true); // Slider images
add_image_size( 'resp-slider-image', 320, 320, true); // Responsive Slider images
add_image_size( 'large-slider-image', 1920, 550, true); // Large slider images


add_filter('manage_upload_columns', 'sizes_column_register');
function sizes_column_register($columns) {
    $columns['dimensions'] = 'Image Sizes';
    return $columns;
}

add_action('manage_media_custom_column', 'size_column_display', 10, 2);
function size_column_display($column_name, $post_id) {
	global $_wp_additional_image_sizes;

	
    if( 'dimensions' != $column_name || !wp_attachment_is_image($post_id))
        return;
       
    foreach($_wp_additional_image_sizes as $i => $j):
    	list($url, $width, $height) = wp_get_attachment_image_src($post_id, $i);
		echo "<a href='{$url}'>{$width}&times;{$height}</a><br/>";
    endforeach; 
}


?>