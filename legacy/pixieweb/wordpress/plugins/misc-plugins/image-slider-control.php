<?php
/*
Plugin Name:  Image Slider Control
Plugin URI: http://www.techfairytales.com
Description: Control for displaying an unordered list of elements, with links to posts, to display in a slider control. The image reference used will be the featured image.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.techfairytales.com
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("Slider_Control");' ) );


class Slider_Control extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'Slider_Control', 'description' => __( 'Control for displaying an unordered list of elements, with links to posts, to display in a slider control. The image reference used will be the featured image.') );
		parent::__construct('image-slider-control', __('Slider Control'), $widget_ops);
	}
	
	

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );
		echo $before_widget;
		
		$args = array("meta_key" => "show_in_slider", "meta_value" => "true");	
		query_posts( $args );
		// The Loop
		while ( have_posts() ) : the_post();
			if ( has_post_thumbnail() ) {
				?><a href="<?php the_permalink();?>"><?php the_post_thumbnail('slider-image', array("title" => get_the_title()));?></a><?php 
			}
		endwhile;

		// Reset Query
		wp_reset_query();
		echo $after_widget;
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		return $instance;
	}

	/** @see WP_Widget::form */
	function form( $instance ) {
	
	}

}

?>