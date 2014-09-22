<?php

/* 	'before_widget' => '<li class="span'. (12 / intval( count_sidebar_widgets('modules', false) ) ).'">', */
$args = array(
	'name'          => __( 'Slider', 'mysterio' ),
	'id'            => 'slider',
	'description'   => 'Carousel slider for homepage content',
    'class'         => '',
	'before_widget' => '',
	'after_widget'  => '',
	'before_title'  => '',
	'after_title'   => '' ); 

register_sidebar( $args ); 

// Home modules
$args['name'] = __('Home Modules', 'mysterio');
$args['id'] = 'modules';
$args['before_widget'] = '';
$args['after_widget'] = '';

register_sidebar( $args ); 

// Sidebar right
$args['name'] = __('Page Sidebar Right', 'mysterio');
$args['id'] = 'page_sidebar_right';

//register_sidebar( $args ); 

function count_sidebar_widgets( $sidebar_id, $echo = true ) {
    $the_sidebars = wp_get_sidebars_widgets();
    if( !isset( $the_sidebars[$sidebar_id] ) ): return 0; endif;
    return count( $the_sidebars[$sidebar_id] );
}


?>