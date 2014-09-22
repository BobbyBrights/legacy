<?php
/*
Plugin Name:  Category Listing Widget
Plugin URI: http://www.three.ie
Description: This plugin will show a list of top level categories with child pages.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.three.ie
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("Category_Listing");' ) );


class Category_Listing extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'Category_Listing', 'description' => __( 'This plugin will show a list of top level categories with child pages.') );
		parent::__construct('category_listing', __('Category Listings'), $widget_ops);
	}

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );
		$category_id = $instance['category_id'];

		echo $before_widget;
		 
?>
		<?php echo "<h2>" . get_cat_name($category_id) . "</h2>";?>
		<ul>
<?php
		global $post;
		$args = array('category' => $category_id, "numberposts" => -1, "orderby" => "title", "order" => "ASC");
		$myposts = get_posts( $args );
		foreach( $myposts as $post ) : setup_postdata($post); ?>
	<li><a href="<?php the_permalink(); ?>" class="post-"><?php the_title(); ?></a></li>
<?php endforeach; ?>
</ul>
<?php
		wp_reset_query();

		echo $after_widget;
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['category_id'] = strip_tags($new_instance['category_id']);
		return $instance;
	}

	/** @see WP_Widget::form */
	function form( $instance ) {
		if ( $instance ) {
			$category_id = esc_attr( $instance[ 'category_id' ] );
		}
		else {
			$category_id = __( 'Category ID', 'text_domain' );
		}
?>
		<p>
		<label for="<?php echo $this->get_field_id('category_id'); ?>"><?php _e('Category ID:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('category_id'); ?>" name="<?php echo $this->get_field_name('category_id'); ?>" type="text" value="<?php echo $category_id; ?>" />
		</p>


		<?php
	}

}

?>