<?php
/*
Plugin Name:  Latest Post By Post Type
Plugin URI: http://press.three.ie
Description: This plugin will show latest posts by post type.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.three.ie
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("Latest_Post_By_Post_Type");' ) );


class Latest_Post_By_Post_Type extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'Latest_Post_By_Post_Type', 'description' => __( 'This widget shows the latest post by post type.') );
		parent::__construct('latest_post_by_post_type', __('Latest Post By Post Type'), $widget_ops);
	}

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );
		$title = apply_filters( 'widget_title', $instance['title'] );
		$post_type = $instance['post_type'];
		$link_text = $instance['link_text'];

		echo $before_widget;
		if ( $title )
			echo $before_title . $title . $after_title;

		query_posts( array(
				'post_type' => $post_type,
				'showposts' => 1 )
		);
		
		if ( have_posts() ) : while ( have_posts() ) : the_post(); 
			$content = substr(get_the_content(), 0, 100);
			the_title('<h4>','</h4>');
			the_excerpt();
			?><a href="<?php the_permalink(); ?>" class="btn_Select" title="<?php the_title_attribute(); ?>"><span><?php echo $link_text; ?></span><strong>&gt;</strong></a><?php
			endwhile; else:
			_e('Sorry, no posts matched your criteria.');
		endif;
		
		wp_reset_query();

		echo $after_widget;
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['post_type'] = strip_tags($new_instance['post_type']);
		$instance['link_text'] = strip_tags($new_instance['link_text']);
		return $instance;
	}

	/** @see WP_Widget::form */
	function form( $instance ) {
		if ( $instance ) {
			$title = esc_attr( $instance[ 'title' ] );
			$post_type = esc_attr( $instance[ 'post_type' ] );
			$link_text = esc_attr( $instance[ 'link_text' ] );
		}
		else {
			$title = __( 'New title', 'text_domain' );
			$post_type = __( '&lt;post_type&gt;', 'text_domain' );
			$link_text = __( 'Find out more', 'text_domain' );
		}
?>
		<p>
		<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
		</p>

		<p>
		<label for="<?php echo $this->get_field_id('post_type'); ?>"><?php _e('Post Type:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('post_type'); ?>" name="<?php echo $this->get_field_name('post_type'); ?>" type="text" value="<?php echo $post_type; ?>" />
		</p>

		<p>
		<label for="<?php echo $this->get_field_id('link_text'); ?>"><?php _e('Link Text:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('link_text'); ?>" name="<?php echo $this->get_field_name('link_text'); ?>" type="text" value="<?php echo $link_text; ?>" />
		</p>


		<?php
	}

}

?>