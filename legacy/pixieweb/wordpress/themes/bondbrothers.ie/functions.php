<?php
/* Bondbrothers.ie functions file */
include_once('functions/shortcodes.php'); 
include_once('functions/walker.php');
include_once('functions/posttypes.php');
include_once('functions/sidebars.php');

function register_my_nav_menus(){
	register_nav_menus( array(
	    'primary' => __( 'Primary Navigation' ),
	    'social' => __( 'Social Navigation' ),
	    'footer' => __( 'Footer Navigation' ),
    ));
}

add_action('init', 'register_my_nav_menus');
/*    

	<script src="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/js/jquery.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/js/bootstrap.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/royalslider/jquery.easing-1.3.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/royalslider/jquery.royalslider.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/bondbrothers.js"></script>

*/
function bondbros_scripts() {
	wp_enqueue_script( 'angular', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js', array('jquery'), '1.0.7', true );
	wp_enqueue_script( 'bootstrap.min', get_template_directory_uri() . '/flatstrap/assets/js/bootstrap.min.js', array('jquery'), '1.0.0', true );
	wp_enqueue_script( 'jquery-easing', get_template_directory_uri() . '/js/royalslider/jquery.easing-1.3.js', array('jquery'), '1.0.0', true );
	wp_enqueue_script( 'royalslider', get_template_directory_uri() . '/js/royalslider/jquery.royalslider.min.js', array('jquery', 'jquery-easing'), '1.0.0', true );
	wp_enqueue_script( 'bondbrothers', get_template_directory_uri() . '/js/bondbrothers.js', array('jquery'), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'bondbros_scripts' );

// Custom meta box.  
add_action( 'add_meta_boxes', 	'overlay_meta_box_add' ); 
add_action( 'save_post', 		'overlay_meta_box_save' ); 

function overlay_meta_box_save( $post_id )  
{  
    // Bail if we're doing an auto save  
    if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return; 
     
    // if our nonce isn't there, or we can't verify it, bail 
    if( !isset( $_POST['meta_box_nonce'] ) || !wp_verify_nonce( $_POST['meta_box_nonce'], 'my_meta_box_nonce' ) ) return; 
     
    // if our current user can't edit this post, bail  
    if( !current_user_can( 'edit_post' ) ) return;  
             
    if( isset( $_POST['my_meta_box_select'] ) ) :
    	if($_POST['my_meta_box_select'] == 0) : 
    		delete_post_meta($post_id, 'my_meta_box_select');
    	else:
        	update_post_meta( $post_id, 'my_meta_box_select', esc_attr( $_POST['my_meta_box_select'] ) );  
        endif;
    endif;
 }

function overlay_meta_box_add()  
{  
    add_meta_box( 'overlay-content-meta-box', 'Dropdown Content', 'overlay_meta_box_cb', 'page', 'side', 'default' );  
}  

function overlay_meta_box_cb( $post )
{
	$values = get_post_custom( $post->ID );

	$selected = isset( $values['my_meta_box_select'] ) ? esc_attr( $values['my_meta_box_select'][0] ) : Ó;
	
	$args = array( 'post_type' => 'custom-content');
	$myposts = get_posts( $args );
	wp_nonce_field( 'my_meta_box_nonce', 'meta_box_nonce' );
	
	echo '<p><label for="my_meta_box_select">Content</label><br/><select name="my_meta_box_select" id="my_meta_box_select"><option value="0">None</option>'; 
	
	foreach ( $myposts as $post ) : setup_postdata( $post ); 
		echo "<option value='".$post->ID."' ".selected( $selected, $post->ID ).">".$post->post_name."</option>";
	endforeach; 
	echo '</select></p>' ;
	wp_reset_postdata();

} ?>