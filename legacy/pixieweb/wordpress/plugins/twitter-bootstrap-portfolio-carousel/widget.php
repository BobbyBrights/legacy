<?php
/*
Plugin Name:  Twitter Bootstrap Carousel
Plugin URI: http://www.pixiewebdesign.net
Description: This plugin displays a carousel (based on the Twitter Bootstrap carousel template) showing the featured images of post types (default portfolio).
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.pixiewebdesign.net
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("TwitterBootstrapCarousel");' ) );


class TwitterBootstrapCarousel extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'TwitterBootstrapCarousel', 'description' => __( 'This plugin displays a carousel (based on the Twitter Bootstrap carousel template) showing the featured images of post types (default portfolio).') );
		parent::__construct('tw_bootstrap_carousel', __('Twitter Bootstrap Carousel'), $widget_ops);
	}

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );

		$post_type = $instance['post_type'];
		$num_items = $instance['num_items'];

		query_posts( array(
				'post_type' => $post_type,
				'showposts' => $num_items )
		);
		
		if ( have_posts() ) : ?>
    <div id="myCarousel" class="carousel slide">
      <div class="carousel-inner">
<?php
			global $post;
			$count = 0; 
			while ( have_posts() ) : 
			the_post(); 
			//var_dump($post);
?>
    
        <div class="item <?php echo $count == 0 ? 'active' : ''; ?>">
          <?php 
          if ( has_post_thumbnail() ) {
          	the_post_thumbnail('portfolio-slider-image');
          }
          ?> 
          <div class="container">
            <div class="carousel-caption">
              <?php the_title( '<h1>', '</h1>' ); ?>
              <p class="lead"><?php the_excerpt(); ?></p>
              <a class="btn btn-large btn-primary" href="<?php the_permalink(); ?>">View project</a>
            </div>
          </div>
        </div>
     
<?php $count++; endwhile; ?>
      </div>
      <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>
    </div><!-- /.carousel -->
<?php

			else:
			_e('Sorry, no posts matched your criteria.');
		endif;		
		wp_reset_query();
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['post_type'] = strip_tags($new_instance['post_type']);
		$instance['num_items'] = strip_tags($new_instance['num_items']);
		return $instance;
	}

	/** @see WP_Widget::form */
	function form( $instance ) {
		if ( $instance ) {
			$post_type = esc_attr( $instance[ 'post_type' ] );
			$num_items = esc_attr( $instance[ 'num_items' ] );
		}
		else {
			$post_type = __( 'portfolio', 'text_domain' );
			$num_items = __( '5', 'text_domain' );
		}
?>
		<label for="<?php echo $this->get_field_id('post_type'); ?>"><?php _e('Post Type:'); ?>
		<input class="widefat" id="<?php echo $this->get_field_id('post_type'); ?>" name="<?php echo $this->get_field_name('post_type'); ?>" type="text" value="<?php echo $post_type; ?>" /></label>
		
		<label for="<?php echo $this->get_field_id('num_items'); ?>"><?php _e('Number of items:'); ?>
		<input class="widefat" id="<?php echo $this->get_field_id('num_items'); ?>" name="<?php echo $this->get_field_name('num_items'); ?>" type="text" value="<?php echo $num_items; ?>" /></label>
		<?php
	}

}

?>