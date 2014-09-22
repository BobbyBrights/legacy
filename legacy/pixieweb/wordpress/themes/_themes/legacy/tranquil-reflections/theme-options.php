<?php

add_action( 'admin_init', 'tranquil_theme_options_init' );
add_action( 'admin_menu', 'tranquil_theme_options_add_page' );

/**
 * Init plugin options to white list our options
 */
function tranquil_theme_options_init(){
	register_setting( 'tranquil_options', 'tranquil_theme_options', 'tranquil_theme_options_validate' );
}

/**
 * Load up the menu page
 */
function tranquil_theme_options_add_page() {
	add_theme_page( __( 'Theme Options', 'tranquiltheme' ), __( 'Theme Options', 'tranquiltheme' ), 'edit_theme_options', 'theme_options', 'tranquil_theme_options_do_page' );
}



/**
 * Create the options page
 */
function tranquil_theme_options_do_page() {
	global $select_options, $radio_options;

	if ( ! isset( $_REQUEST['settings-updated'] ) )
		$_REQUEST['settings-updated'] = false;

	?>
	<div class="wrap">
		<?php screen_icon(); echo "<h2>" . get_current_theme() . __( ' Theme Options', 'tranquiltheme' ) . "</h2>"; ?>

		<?php if ( false !== $_REQUEST['settings-updated'] ) : ?>
		<div class="updated fade"><p><strong><?php _e( 'Options saved', 'tranquiltheme' ); ?></strong></p></div>
		<?php endif; ?>

		<form method="post" action="options.php">
			<?php settings_fields( 'tranquil_options' ); ?>
			<?php $options = get_option( 'tranquil_theme_options' ); ?>

			<table class="form-table">

				<?php
				
				/**
				 * A tranquil twitter text input option
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Twitter', 'tranquiltheme' ); ?></th>
					<td>
						<input id="tranquil_theme_options[Twitter]" class="regular-text" type="text" name="tranquil_theme_options[Twitter]" value="<?php esc_attr_e( $options['Twitter'] ); ?>" />
						<label class="description" for="tranquil_theme_options[Twitter]"><?php _e( 'Enter your twitter URL e.g http://twitter.com/#!/liight_design', 'tranquiltheme' ); ?></label>
					</td>
				</tr>

				<?php
				
					/**
				 * A tranquil Facebook text input option
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Facebook', 'tranquiltheme' ); ?></th>
					<td>
						<input id="tranquil_theme_options[Facebook]" class="regular-text" type="text" name="tranquil_theme_options[Facebook]" value="<?php esc_attr_e( $options['Facebook'] ); ?>" />
						<label class="description" for="tranquil_theme_options[Facebook]"><?php _e( 'Enter your facebook URL e.g http://facebook.com/liight_design', 'tranquiltheme' ); ?></label>
					</td>
				</tr>

				<?php
				
				/**
				 * A tranquil textarea option
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'A little about yourself to go at the top of the sidebar', 'tranquiltheme' ); ?></th>
					<td>
						<textarea id="tranquil_theme_options[sidetop]" class="large-text" cols="50" rows="10" name="tranquil_theme_options[sidetop]"><?php echo esc_textarea( $options['sidetop'] ); ?></textarea>
						<label class="description" for="tranquil_theme_options[sidetop]"><?php _e( '', 'tranquiltheme' ); ?></label>
					</td>
				</tr>
			</table>

			<p class="submit">
				<input type="submit" class="button-primary" value="<?php _e( 'Save Options', 'tranquiltheme' ); ?>" />
				
			</p>
		</form>
	</div>
	<?php
}

/**
 * Sanitize and validate input. Accepts an array, return a sanitized array.
 */
function tranquil_theme_options_validate( $input ) {
	global $select_options;

	
	// Say our texarea option must be safe text with no HTML tags
	$input['sidetop'] = wp_filter_nohtml_kses( $input['sidetop'] );
	$input['Facebook'] = esc_url_raw( $input['Facebook'] );
    $input['Twitter'] = esc_url_raw( $input['Twitter'] );


 	return $input;
}

// adapted from http://planetozh.com/blog/2009/05/handling-plugins-options-in-wordpress-28-with-register_setting/