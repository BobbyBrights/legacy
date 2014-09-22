<?php

/* 	'before_widget' => '<li class="span'. (12 / intval( count_sidebar_widgets('modules', false) ) ).'">', */
$args = array(
	'name'          => __( 'Slider', 'synalysis.com' ),
	'id'            => 'home-slider',
	'description'   => 'Carousel slider for homepage content. NB: DONT PUT ANYTHING BUT SLIDER ITEMS HERE.',
    'class'         => '',
	'before_widget' => '',
	'after_widget'  => '',
	'before_title'  => '',
	'after_title'   => '' ); 

register_sidebar( $args ); 

?>