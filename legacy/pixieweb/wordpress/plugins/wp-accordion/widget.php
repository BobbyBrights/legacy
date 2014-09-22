<?php
/*
Plugin Name:  Home Accordion Widget - Ubuntu.ie
Plugin URI: http://www.ubuntu.ie
Description: This plugin takes 4 posts and displays large featured images in an accordion style widget.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.techfairytales.com
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("Accordion_Widget");' ) );


class Accordion_Widget extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'Accordion_Widget', 'description' => __( 'This plugin takes 4 posts and displays large featured images in an accordion style widget.') );
		parent::__construct('accordion_widget', __('Home Accordion Widget - Ubuntu.ie'), $widget_ops);
	}
	

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );
		echo $before_widget;
		$args = array("post__in" => explode(",", $instance['posts'])) ; // Replace this with array from get_option
		query_posts( $args );
			?>
			<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
			<?php $image=get_post_meta($post->ID, $key, true); ?>
			<li>
				<div class="hpanel">
					<!-- Image -->
					<div class="hpanelimage">
						<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
							<?php the_post_thumbnail('slider-image', array("title" => get_the_title()));?>
						</a>
					</div>
					<!-- Caption -->
					<div class="hpanelcaption captionfade">
						<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
							<?php echo substr(get_the_excerpt(), 0,162); ?>
						</a>
					</div>
				</div>
			</li>
			<?php endwhile; endif; 
		wp_reset_query();
		echo $after_widget;
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['posts'] = strip_tags($new_instance['posts']);
		return $instance;
	}

	/** @see WP_Widget::form */
	function form( $instance ) {
		if ( $instance ) {
			$posts = esc_attr( $instance[ 'posts' ] );
		}
		else {
			$posts = __( '169,85', 'text_domain' );
		}
?>
		<p>
		<label for="<?php echo $this->get_field_id('posts'); ?>"><?php _e('Post IDs:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('posts'); ?>" name="<?php echo $this->get_field_name('posts'); ?>" type="text" value="<?php echo $posts; ?>" />
		</p>


		<?php
	}

}

?>