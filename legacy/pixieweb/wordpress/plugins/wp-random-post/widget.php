<?php
/*
Plugin Name:  Random Post Display
Plugin URI: http://www.3broadband.ie
Description: This widget will select 3 random posts from a bank of posts. Used in conjunction with nivo slider to display a carousel.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.three.ie
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("MBB_Random_Post_Display");' ) );


class MBB_Random_Post_Display extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'MBB_Random_Post_Display', 'description' => __( 'This widget will select 3 random posts from a bank of posts. Used in conjunction with nivo slider to display a carousel.') );
		parent::__construct('mbb_random_post_display', __('Random Post Display'), $widget_ops);
	}

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );

		$post_array = array();

		for($i = 1; $i <= 3; $i++){
			// First, grab the options from the database for each position
			$a = explode(",", $instance['position_'.$i.'_posts']);
			// Then, take a random post ID from that array, and add it to the $post_array
			$idx = array_rand($a, 1);
			$post_array[] = $a[$idx];
		}
		
		$post_array = array_map("intval", $post_array);
		
		//var_dump(json_encode($post_array));

		echo '<div id="slider-wrap" class="two-thirds">' ;
		echo '	<div id="slider">' ;
	
		global $post;
		
		// And now.. The hard work.
		$args = array('post_type' => 'post', 'post__in' => $post_array, 'orderby' => 'none' );
		$p = get_posts( $args );
		$captions = array();
		$pos = 0;
		
		//var_dump($post);
		
		foreach( $p as $post ) : setup_postdata($post); 
			$captions[$pos] = '<h3><a href="'.get_permalink($post->ID).'">'.get_the_title($post->ID).'</a></h3>'. (!empty($post->post_excerpt) ? '<p>'.$post->post_excerpt.'</p>' : '');
			$t_arr = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumb-image' );
			error_log(json_encode($t_arr));			
			$thumb = $t_arr[0];
			// Put it all together!
			
			echo "<a href='".get_permalink($post->ID)."' title='".$post->post_title."'>";
			echo get_the_post_thumbnail($post->ID, 'slider-image', array("rel" => $thumb, "title" => "#caption".$pos, "alt" => $post->post_title));
			//echo "	<img width='500' height='250' src='".$main_image."' class='attachment-slider-image wp-post-image' alt='".$post->post_title."' title='#caption".$pos."' rel='".$thumb."' />";
			echo "</a>";
			
			// 
			$pos++;
		endforeach;
		
		echo '	</div>';
		wp_reset_postdata();
		
		foreach($captions as $key => $caption) :
			echo '<div id="caption'.$key.'" class="nivo-html-caption">';
			echo $caption;
			echo '</div>';
		endforeach;
		echo '</div>';

		
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {

		//error_log(json_encode($_REQUEST));
		$instance = $old_instance;
		$instance['position_1_posts'] = is_array($_REQUEST['position_1_posts']) ? strip_tags(implode(",", $_REQUEST['position_1_posts'])) : "";
		$instance['position_2_posts'] = is_array($_REQUEST['position_2_posts']) ? strip_tags(implode(",", $_REQUEST['position_2_posts'])) : "";
		$instance['position_3_posts'] = is_array($_REQUEST['position_3_posts']) ? strip_tags(implode(",", $_REQUEST['position_3_posts'])) : "";
		return $instance;
	}

	/** @see WP_Widget::form */
	function form( $instance ) {
		
		
		

		
		// Get all posts and save to array.
		$args = array('numberposts' => '-1', 'orderby' => 'post_title', 'order' => 'ASC');
		$p = get_posts( $args );
		//var_dump($p);

		for($i = 1; $i <= 3; $i++){
			$a = explode(",",$instance['position_'.$i.'_posts']); 
			//print_r($a);
			
			echo "<p>Position $i</p>";
			foreach( $p as $post ):
				//var_dump($post);
				echo "<input type='checkbox' name='position_" . $i . "_posts[]' value='".$post->ID."' ".( in_array($post->ID, $a) ? "checked" : "" )."/>&nbsp;&nbsp;" . $post->post_title . " (".$post->ID.")";
			//echo the_title();
			echo "<br/>";
			endforeach;
			echo "<br/><br/>";
		}

	}

}

?>