<?php
// Used for creating slides in FSS
add_action( 'widgets_init', create_function( '', 'register_widget( "static_fss_slide" );' ) );
add_action( 'widgets_init', create_function( '', 'register_widget( "dynamic_fss_slide" );' ) );


class Dynamic_FSS_Slide extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		parent::__construct(
	 		'dynamic_fss_slide', // Base ID
			'FSS Slide (Dynamic)', // Name
			array( 'description' => __( 'A widget used in conjunction with FSS to display slides with info from post data', 'text_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	 
	public function widget( $args, $instance ) {
		extract( $args );
		$p = get_post($instance['post_id']);
		$orientation = !empty($instance['orientation']) ? $instance['orientation'] : 'vertical';
		$slice1_rot = !empty($instance['slice1_rot']) ? $instance['slice1_rot'] : -5;
		$slice2_rot = !empty($instance['slice2_rot']) ? $instance['slice2_rot'] : 25;
		$slice1_scl = !empty($instance['slice1_scl']) ? $instance['slice1_scl'] : -5;
		$slice2_scl = !empty($instance['slice2_scl']) ? $instance['slice2_scl'] : 25;
?>

      <div class="sl-slide" data-orientation="<?php echo $orientation; ?>" data-slice1-rotation="<?php echo $slice1_rot; ?>" data-slice2-rotation="<?php echo $slice2_rot; ?>" data-slice1-scale="<?php echo $slice1_scl; ?>" data-slice2-scale="<?php echo $slice2_scl; ?>">
        <div class="sl-slide-inner">
          <div class="container">
          <h2><?php echo $p->post_title; ?></h2>
          <p class="excerpt"><?php echo $p->post_excerpt; ?></p>
          <p class="carousel-btn"><a href="<?php echo get_permalink( $p->ID); ?>" class="btn">Learn more</a></p>
          </div>
        </div>
      </div>
<?php
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['post_id'] = $new_instance['post_id'];
		return $instance;
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
	
		if ( isset( $instance[ 'post_id' ] ) ) {
			$selected = $instance[ 'post_id' ];
		}
		$q = new WP_Query(array(
			'post_type' => array('portfolio', 'blog', 'post')
		));


		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'post_id' ); ?>"><?php _e( 'Post:' ); ?></label> 
		<select class="widefat" id="<?php echo $this->get_field_id( 'post_id' ); ?>" name="<?php echo $this->get_field_name( 'post_id' ); ?>">
			<?php foreach($q->posts as $k => $v ): ?>
				<option value="<?php echo $v->ID; ?>" <?php echo ($selected == $v->ID ? 'selected' : ''); ?>><?php echo $v->post_title; ?></option>
			<?php endforeach; ?>
		</select>
		</p>
		
<?php


//vomit($q->posts);
	}

} // class 


class Static_FSS_Slide extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		parent::__construct(
	 		'static_fss_slide', // Base ID
			'FSS Slide (Static)', // Name
			array( 'description' => __( 'A widget used in conjunction with FSS to display static slides', 'text_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	 
	public function widget( $args, $instance ) {
		extract( $args );
		$title = apply_filters( 'widget_title', $instance['title'] );
		$copy = apply_filters( 'widget_title', $instance['copy'] ); 
		$link = $instance['link'];
		
		$orientation = !empty($instance['orientation']) ? $instance['orientation'] : 'vertical';
		$slice1_rot = !empty($instance['slice1_rot']) ? $instance['slice1_rot'] : -5;
		$slice2_rot = !empty($instance['slice2_rot']) ? $instance['slice2_rot'] : 25;
		$slice1_scl = !empty($instance['slice1_scl']) ? $instance['slice1_scl'] : -5;
		$slice2_scl = !empty($instance['slice2_scl']) ? $instance['slice2_scl'] : 25;
?>

      <div class="sl-slide" data-orientation="<?php echo $orientation; ?>" data-slice1-rotation="<?php echo $slice1_rot; ?>" data-slice2-rotation="<?php echo $slice2_rot; ?>" data-slice1-scale="<?php echo $slice1_scl; ?>" data-slice2-scale="<?php echo $slice2_scl; ?>">
        <div class="sl-slide-inner">
          <div class="container">
          <h2><?php echo $title; ?></h2>
          <p class="excerpt"><?php echo $copy; ?></p>
          <p class="carousel-btn"><a href="<?php echo $link; ?>" class="btn">Learn more</a></p>
          </div>
        </div>
      </div>
<?php
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['copy'] = $new_instance['copy'];
		$instance['orientation'] = $new_instance['orientation'];
		$instance['link'] = $new_instance['link'];
		
		// Animation
		$instance['slice1_rot'] = $new_instance['slice1_rot'];
		$instance['slice2_rot'] = $new_instance['slice2_rot'];
		$instance['slice1_scl'] = $new_instance['slice1_scl'];
		$instance['slice2_scl'] = $new_instance['slice2_scl'];

		return $instance;
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
	
		if ( isset( $instance[ 'title' ] ) ) {
			$title = $instance[ 'title' ];
		}

		if ( isset( $instance[ 'copy' ] ) ) {
			$copy = $instance[ 'copy' ];
		}

		if ( isset( $instance[ 'link' ] ) ) {
			$link = $instance[ 'link' ];
		}

		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
		<label for="<?php echo $this->get_field_id( 'copy' ); ?>"><?php _e( 'Copy:' ); ?></label> 
		<textarea class="widefat" rows="16" id="<?php echo $this->get_field_id( 'copy' ); ?>" name="<?php echo $this->get_field_name( 'copy' ); ?>"><?php echo esc_attr( $copy ); ?></textarea>
		</p>
		<p>
		<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Link:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" type="text" value="<?php echo esc_attr( $link ); ?>" />
		</p>
		<?php 
	}

} // class 