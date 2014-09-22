<?php
$slider_count = 0; 
// Used for creating slides in FSS
add_action( 'widgets_init', create_function( '', 'register_widget( "slider_item" );' ) );

class Slider_Item extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		parent::__construct(
	 		'slider_item', // Base ID
			'Slider Item', // Name
			array( 'description' => __( 'A widget for adding slides to a homepage carousel', 'text_domain' ), ) // Args
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
		global $slider_count;		
		extract( $args );
		
		$slider_count++; 
		
		$heading = apply_filters( 'widget_title', $instance['heading'] );
		$excerpt = apply_filters( 'widget_title', $instance['excerpt'] );
		$button_text = apply_filters( 'widget_title', $instance['button_text'] ); 
		
		$link = $instance['link'];
		$image = $instance['image'];
		$image_resp = $instance['image_resp'];
		
		//var_dump($slider_count);		
	?>
		
      <div class="item<?php echo $slider_count == 1 ? ' active' : ''; ?>">
          <img src="<?php echo $image; ?>" alt="<?php echo $heading; ?>" data-main="<?php echo $image; ?>" data-resp="<?php echo $image_resp; ?>">
          <div class="container">
            <div class="carousel-caption">
              <h1><?php echo $heading; ?></h1>
              <p class="lead"><?php echo $excerpt; ?></p>
              <a class="btn btn-large btn-primary" href="<?php echo $link; ?>"><?php echo $button_text; ?></a>
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
		$instance['heading'] = strip_tags( $new_instance['heading'] );
		$instance['excerpt'] = $new_instance['excerpt'];
		$instance['image'] = $new_instance['image'];
		$instance['image_resp'] = $new_instance['image_resp'];
		$instance['button_text'] = $new_instance['button_text'];
		$instance['link'] = $new_instance['link'];
		var_dump($instance);
		
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
	
		if ( isset( $instance[ 'heading' ] ) ) {
			$heading = $instance[ 'heading' ];
		}
		
		if ( isset( $instance[ 'excerpt' ] ) ) {
			$excerpt = $instance[ 'excerpt' ];
		}

		if ( isset( $instance[ 'image' ] ) ) {
			$image = $instance[ 'image' ];
		}
		
		if ( isset( $instance[ 'image_resp' ] ) ) {
			$image_resp = $instance[ 'image_resp' ];
		}
		
		if ( isset( $instance[ 'button_text' ] ) ) {
			$button_text = $instance[ 'button_text' ];
		}
		
		if ( isset( $instance[ 'link' ] ) ) {
			$link = $instance[ 'link' ];
		}
		
		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'heading' ); ?>"><?php _e( 'Heading:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'heading' ); ?>" name="<?php echo $this->get_field_name( 'heading' ); ?>" type="text" value="<?php echo esc_attr( $heading ); ?>" />
		</p>
		
		<p>
		<label for="<?php echo $this->get_field_id( 'excerpt' ); ?>"><?php _e( 'Excerpt:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'excerpt' ); ?>" name="<?php echo $this->get_field_name( 'excerpt' ); ?>" type="text" value="<?php echo esc_attr( $excerpt ); ?>" />
		</p>
		
		<p>
		<label for="<?php echo $this->get_field_id( 'image' ); ?>"><?php _e( 'Image:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'image' ); ?>" name="<?php echo $this->get_field_name( 'image' ); ?>" type="text" value="<?php echo esc_attr( $image ); ?>" />
		</p>

		<p>
		<label for="<?php echo $this->get_field_id( 'image_resp' ); ?>"><?php _e( 'Image Resp:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'image_resp' ); ?>" name="<?php echo $this->get_field_name( 'image_resp' ); ?>" type="text" value="<?php echo esc_attr( $image_resp ); ?>" />
		</p>

		
		<p>
		<label for="<?php echo $this->get_field_id( 'button_text' ); ?>"><?php _e( 'Button Text:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" type="text" value="<?php echo esc_attr( $button_text ); ?>" />
		</p>
		
		<p>
		<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Link:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" type="text" value="<?php echo esc_attr( $link ); ?>" />
		</p>
		
		
		
		<?php 
	}

} // class 