<?php
/*
Plugin Name:  (Ubuntu) All Posts By Category
Plugin URI: http://www.three.ie
Description: This plugin will show a list of top level categories with child pages.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.three.ie
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("All_Posts_By_Category");' ) );


class All_Posts_By_Category extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'All_Posts_By_Category', 'description' => __( 'This plugin will show a list of top level categories with child pages.') );
		parent::__construct('all_posts_by_cat', __('All Posts By Category'), $widget_ops);
	}

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );
		echo $before_widget;
		
		$a = array("orderby" => "id", "order" => "asc");
		
		$categories = get_categories( $a );
		foreach($categories as $category){
			echo $before_title;
			// var_dump($category);
			echo "<h2>" . $category->name . "</h2><ul>";
			global $post;
			$args = array('category' => $category->term_id, "numberposts" => -1, "orderby" => "title", "order" => "ASC");
			$myposts = get_posts( $args );
			foreach( $myposts as $post ) : setup_postdata($post);
				?><li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li><?php
			endforeach;	
			echo "</ul>";
			wp_reset_query();
			echo $after_title;
		}
		
		echo $after_widget;
	}


	/** @see WP_Widget::form */
	function form( $instance ) {
	
	}

}

?>