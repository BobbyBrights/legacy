<?php
$pandora_options = pandora_get_options();

//for non-installed and for theme preview or not-changed theme
if (!isset($pandora_options['pan_slider_number'])){
	$pandora_options = pandora_preview_options();
}

function pandora_preview_options(){
	$pandora_preview_settings = array(
		'pan_slider_number' => 5,
		'pan_new_post' => 0, 
		'pan_normal_post' => 2, 
		'pan_old_post' => 6, 
		'pan_archive_post' => 2, 
		'pan_loginlogo_url' => get_template_directory_uri() . '/images/pandora-logo.png', 
		'pan_smile_url' => get_template_directory_uri() . '/images/pandora-logo2.png', 
		'pan_custom_favicon' => get_template_directory_uri() .'/images/favicon.ico', 
		'pan_page_style' => 1,
		'pan_footer_text' => '', 
		'pan_tracking_code' => '', 
		'pan_skin_name' => ''		
	);
	return $pandora_preview_settings;
}

//register the admin page
add_action('admin_menu', 'pandora_admin_core');
function pandora_admin_core(){
	add_theme_page("Theme", "Pandora Options :)", 'edit_theme_options', 'pandora', "pandora_options_operator");
}

//this function is lead the changing
function pandora_options_operator(){	
	if (isset($_REQUEST['save'])){
		if (empty($_POST) || !wp_verify_nonce($_POST['pandora_nonces'],'pandora_nonce_validator')){
		   _e('Sorry, your nonce did not verify.','pandora');
		   exit;
		}
		else{
			if ( !empty($_POST) && check_admin_referer('pandora_nonce_validator','pandora_nonces') ){
				pandora_options_validator();
				update_option('pandora_settings', pandora_save_options());
				
				//refresh global variables
				global $pandora_options;
				$pandora_options = pandora_get_options();
			}
		}
	}
	
	//admin GUI
	pandora_admin_main_form();
}
//validating
function pandora_options_validator(){
	$_REQUEST['pan_slider_number'] = pandora_i_want_to_be_number($_REQUEST['pan_slider_number'], "0-9", 5, 20);
	$_REQUEST['pan_news'] = pandora_i_want_to_be_number($_REQUEST['pan_news'], "0-9", 0, 50);
	$_REQUEST['pan_normals'] = pandora_i_want_to_be_number($_REQUEST['pan_normals'], "0-9", 0, 50);
	$_REQUEST['pan_olds'] = pandora_i_want_to_be_number($_REQUEST['pan_olds'], "0-9", 0, 50);
	$_REQUEST['pan_archives'] = pandora_i_want_to_be_number($_REQUEST['pan_archives'], "0-9", 0, 50);
	$_REQUEST['pan_login_logo'] = esc_url_raw($_REQUEST['pan_login_logo'], 'http');
		$_REQUEST['pan_login_logo'] = str_replace("'", '', $_REQUEST['pan_login_logo']);
	$_REQUEST['pan_smile'] = esc_url_raw($_REQUEST['pan_smile'], 'http');
		$_REQUEST['pan_smile'] = str_replace("'", '', $_REQUEST['pan_smile']);
	$_REQUEST['pan_favicon'] = esc_url_raw($_REQUEST['pan_favicon'], 'http');
		$_REQUEST['pan_favicon'] = str_replace("'", '', $_REQUEST['pan_favicon']);
	$_REQUEST['pan_page'] = pandora_i_want_to_be_number($_REQUEST['pan_page'], "0-2", 1, 2);
	$_REQUEST['pan_copyright'] = balanceTags($_REQUEST['pan_copyright']);
	$_REQUEST['pan_stats'] = balanceTags($_REQUEST['pan_stats']);
	$_REQUEST['pan_skinner'] = esc_attr($_REQUEST['pan_skinner']);
}

function pandora_i_want_to_be_number($number_in_string = '', $allowed_nums, $standard_value, $max){
	if ( preg_match( "/[^".$allowed_nums.".]/", $number_in_string ) ){
		$number_in_string = $standard_value;
	}
	else{
		$number_in_string = intval($number_in_string);
		if ($number_in_string > $max){
			$number_in_string = $max;
		}
	}
	return $number_in_string;
}

function pandora_save_options(){
	$pandora_admin_settings = array(
		'pan_slider_number' => $_REQUEST['pan_slider_number'],
		'pan_new_post' => $_REQUEST['pan_news'], 
		'pan_normal_post' => $_REQUEST['pan_normals'], 
		'pan_old_post' => $_REQUEST['pan_olds'], 
		'pan_archive_post' => $_REQUEST['pan_archives'], 
		'pan_loginlogo_url' => $_REQUEST['pan_login_logo'], 
		'pan_smile_url' => $_REQUEST['pan_smile'], 
		'pan_custom_favicon' => $_REQUEST['pan_favicon'], 
		'pan_page_style' => $_REQUEST['pan_page'],
		'pan_footer_text' => $_REQUEST['pan_copyright'], 
		'pan_tracking_code' => $_REQUEST['pan_stats'], 
		'pan_skin_name' => $_REQUEST['pan_skinner']		
	);
	return $pandora_admin_settings;
}

function pandora_get_options(){
	return get_option('pandora_settings');
}

//this is the admin user interface
function pandora_admin_main_form(){
	global $pandora_siteurl, $pandora_options;
	$pandora_themename = "Pandora theme &copy;";
	
	?><div class="wrap-es">
		<form action="" method="post">
			<h2 id="backtotop"><?php echo $pandora_themename . " " . __(' Options', 'pandora'); ?></h2>
			<?php if (isset($_REQUEST['save'])) { ?> <div style="clear:both;height:10px;"></div> <div class="message-ok"><?php _e('Cool:) Options has been updated!','pandora') ?></div><?php } ?>						
			<div style="clear:both;height:10px;"></div> 
			<table class="table-options">
				<tr class="title-row clear-tr">
					<td class="title-desc">
					</td>
					<td class="options-input">
						<?php _e( '<h3>Hey, I\'m Pandora. Set up my properities^^</h3><p>I can more. I am WP3+ ready for Navi Menu Bar what you can setup <a href="','pandora') . $pandora_siteurl . _e('/wp-admin/nav-menus.php">this link</a>.<br />If you want to other styles on your site (Big Blog style, Portal sytle or Clan Page style), you can choose from these in this page.<br />You can choose from 4 Post List sytle (List view, Gallery view, Classic view, Featured view). If you wanna switch off all sidebars please find the Pages/Edit Page/Page Properity tab and choose the Page-1-Col option.<br />You can setup your copyright text and name of the site\'s sikenner and upload new logos, icons on this Pandora Page. Look up to <a href="http://belicza.com/" target="_blank">Belicza.com</a> for more info. It\'s so easy:)</p>', 'pandora' ) ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Number of the images in Slider:', 'pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_slider_number" id="pan_slider_number" type="text" value="<?php echo $pandora_options['pan_slider_number'] ?>" />
						<br />
						<?php _e( 'Featured image of the Post appears only if width of the Featured image is minimum 1000 pixels.', 'pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Newest Posts/Page:' , 'pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_news" id="pan_news" type="text" value="<?php echo $pandora_options['pan_new_post'] ?>" />
						<br />
						<?php _e( 'Number of the newest Posts on the Index page. It is display Featured view. It\'s so big.', 'pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Normal Posts/Page:' , 'pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_normals" id="pan_normals" type="text" value="<?php echo $pandora_options['pan_normal_post'] ?>" />
						<br />
						<?php _e( 'Number of the not new but not old Posts on the Index page. They have normal sizes (Classic view).', 'pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Old Posts/Page:' , 'pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_olds" id="pan_olds" type="text" value="<?php echo $pandora_options['pan_old_post'] ?>" />
						<br />
						<?php _e( 'Number of the old Posts on the Index page. Only Featured images titles and dates are displayed, it is look like a gallery.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Archive Posts/Page:','pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_archives" id="pan_archives" type="text" value="<?php echo $pandora_options['pan_archive_post'] ?>" />
						<br />
						<?php _e( 'Number of the oldest Posts on the Index page. Only titles and dates are displayed. It is look like an easy list.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Logo URL:','pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_login_logo" id="pan_login_logo" type="text" value="<?php echo $pandora_options['pan_loginlogo_url'] ?>" />
						<br />
						<?php _e( 'Enter Your Logo\'s URL instead Pandora logo on Login Panel.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Main Logo URL:','pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_smile" id="pan_smile" type="text" value="<?php echo $pandora_options['pan_smile_url'] ?>" />
						<br />
						<?php _e( 'Enter Your Logo\'s URL. It will appear on top of the index page instead the Pandora smile.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Favicon:','pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_favicon" id="pan_favicon" type="text" value="<?php echo $pandora_options['pan_custom_favicon'] ?>" />
						<br />
						<?php _e( 'Paste the full URL of Png/Gif image that will represent your website\'s favicon (16px x 16px).','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Only two columns - Big Blog style','pandora') ?>
					</td>
					<td class="options-input">
						<?php if ($pandora_options['pan_page_style'] == 0) {$checked = "checked=\"yes\""; } else { $checked = ""; } ?>
						<input type="radio" name="pan_page" id="pan_page" value="0" <?php echo $checked ?>/>
						<br />
						<?php _e( 'Mark this if you wanna only two columns on index (one for content and one for primary sidebar.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Three columns - Portal style','pandora') ?>
					</td>
					<td class="options-input">
						<?php if ($pandora_options['pan_page_style'] == 1) {$checked = "checked=\"yes\""; } else { $checked = ""; } ?>
						<input type="radio" name="pan_page" id="pan_page" value="1" <?php echo $checked ?>/>
						<br />
						<?php _e( 'This is the default style.<br />Three columns on index (one for content and two for primary and secondary sidebars on right side.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Three columns - Clan Page style','pandora') ?>
					</td>
					<td class="options-input">
						<?php if ($pandora_options['pan_page_style'] == 2) {$checked = "checked=\"yes\""; } else { $checked = ""; } ?>
						<input type="radio" name="pan_page" id="pan_page" value="2" <?php echo $checked ?>/>
						<br />
						<?php _e( 'Mark this if you wanna three columns on index (one for primary sidebar, one for content and one for secondary sidebar.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Footer copyright text:','pandora') ?>
					</td>
					<td class="options-input">
						<textarea name="pan_copyright" id="pan_copyright" cols="70" rows="4"><?php echo stripslashes($pandora_options['pan_footer_text']) ?></textarea>
						<br />
						<?php _e( 'Enter the text for your copyright license. It will be in the footer.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e( 'Google Analytics Code:','pandora') ?>
					</td>
					<td class="options-input">
						<textarea name="pan_stats" id="pan_stats" cols="70" rows="8"><?php echo stripslashes($pandora_options['pan_tracking_code']) ?></textarea>
						<br />
						<?php _e('You can paste your Google Analytics or other tracking code in this box. This will be automatically added to the footer.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
				<tr class="title-row">
					<td class="title-desc">
						<?php _e('Skinner name:','pandora') ?>
					</td>
					<td class="options-input">
						<input name="pan_skinner" id="pan_skinner" type="text" value="<?php echo stripslashes($pandora_options['pan_skin_name']) ?>" />
						<br />
						<?php _e('This theme created by belicza.com, but if you changed something, upload your logo, your images, your design then please enter your name or your site here.','pandora') ?>
					</td><!-- new fill ///////////////////////////////////////////////// -->
				</tr>
			</table>	
			<input name="save" type="submit" value="<?php _e('Save changes','pandora') ?>" />    
			<input type="hidden" name="action" value="save" />       <a href="#backtotop"><?php _e('Go to Top','pandora'); ?></a>
			<div style="clear:both;"></div>		
			<?php wp_nonce_field('pandora_nonce_validator','pandora_nonces'); ?>
		</form>
	</div><!-- end wrap-->
	<div style="clear:both;height:20px;"></div>
	<?php
}
 
function pandora_admin_add_init() {  
	$directory_file=get_template_directory_uri();  
	wp_enqueue_style("admin_style", $directory_file."/extendeds/admin/style.css", false, "1.0", "all");  
}
add_action('admin_init', 'pandora_admin_add_init'); 

function pandora_my_login_logo() {
	global $pandora_options;
	$logo = $pandora_options['pan_loginlogo_url'];
	echo '<style type="text/css">h1 a { background-image:url(';
	echo $logo;
	echo ') !important; }</style>';
}
add_action('login_head', 'pandora_my_login_logo');

function pandora_my_column_style() {
	global $pandora_options;
	$col_css;
	if ($pandora_options['pan_page_style'] == 1) {
		$col_css = "3-col-right.css";
	}
	elseif ($pandora_options['pan_page_style'] == 2) {
		$col_css = "3-col.css";
	}
	else {
		$col_css = "2-col.css";
	}
	$col_css = "/". $col_css;
	return $col_css;
}	
wp_enqueue_style('pandora_custom_styles', get_template_directory_uri() . pandora_my_column_style());

//called in functions/logo.php
function pandora_my_little_logo() {
	global $pandora_options;
	return $pandora_options['pan_smile_url'];
}

//called in footer.php
function pandora_my_job(){
	global $pandora_options;
	if ($pandora_options['pan_skin_name'] != '') {
		return _e( 'Skinned by ', 'pandora' ) . $pandora_options['pan_skin_name'];
	}
}

//called in footer.php
function pandora_my_copyright(){
	global $pandora_options;
	$kopi = "";
	if ($pandora_options['pan_footer_text'] != '') {
		$kopi = $pandora_options['pan_footer_text'];
	}
	else {
		$kopi = _e( 'Setup your copyright text in Admin Page/Pandora options', 'pandora' );
	} 
	?>
		<span id="user_licence"><?php echo $kopi ?><br /><?php echo pandora_my_job() ?></span><br />
		<span id="theme-link">
			<?php _e( 'Pandora theme &copy; is created by', 'pandora' ) ?>
			<a href="http://belicza.com/" title="belicza.com" rel="designer" target="_blank">belicza.com</a> &copy
			<?php _e( 'for <a href="http://wordpress.org/" target="_blank" rel="generator" title="WordPress">WordPress Engine</a> &copy.', 'pandora' ) ?>
			<a href="http://www.opensource.org/licenses/gpl-license.php" target="_blank"><?php _e( 'Licenced on ', 'pandora' ) ?>GPL</a>.
		</span>
	<?php
}

//called in footer.php
function pandora_web_statisctics(){
	global $pandora_options;
	return $pandora_options['pan_tracking_code'];
}

//called in header.php
function pandora_my_favicon(){
	global $pandora_options;
	return '<link rel="shortcut icon" href="'. $pandora_options['pan_custom_favicon'] .'" />';
}

//called in loop.php. it is set the number of displayed posts
function pandora_my_post_architecture(){
	global $pandora_options;
	$max[0] = $pandora_options['pan_new_post'];
	$max[1] = $pandora_options['pan_normal_post'];
	$max[2] = $pandora_options['pan_old_post'];
	$max[3] = $pandora_options['pan_archive_post'];
	return $max;
}

//called in functions/slider.php
function pandora_my_sliders_long(){
	global $pandora_options;
	return $pandora_options['pan_slider_number'];
}
?>