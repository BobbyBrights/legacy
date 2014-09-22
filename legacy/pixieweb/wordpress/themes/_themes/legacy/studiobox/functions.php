<?php
/**
 * @StudioBox Functions
 * 
 */
 


$functions_path = TEMPLATEPATH . '/functions/';
$includes_path = TEMPLATEPATH . '/includes/';
require_once ($functions_path . 'custom-functions.php');
require_once ($functions_path . 'metabox-function.php');
require_once ($functions_path . 'sidebar-function.php');
require_once ($functions_path . 'footer-function.php');
require_once ($functions_path . 'exclude-function.php');
require_once ($functions_path . 'wp-three.php');
require_once ($functions_path . 'post-functions.php');
?>
<?php
define('SBOX_JS', get_template_directory_uri() . '/js' );
function echoes_JS_scripts() {
	if(!is_admin()){
		wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', SBOX_JS . '/jquery-1.3.2.min.js', false, '' );
		wp_enqueue_script( 'colorbox', SBOX_JS . '/jquery.colorbox-min.js', array( 'jquery' ), '' );
		wp_enqueue_script( 'fade', SBOX_JS . '/fadeinout.js', array( 'jquery' ), '' );
		wp_enqueue_script( 'cufon', SBOX_JS . '/cufon-yui.js', array( 'jquery' ), '' );
		wp_enqueue_script( 'titillium', SBOX_JS . '/TitilliumText14L_300_600.font.js', array( 'jquery' ), '' );
		wp_enqueue_script( 'fontconfig', SBOX_JS . '/fontconfig.js', array( 'jquery' ), '' );
		wp_enqueue_script( 'dropdownmenu', SBOX_JS . '/ddsmoothmenu.js', array( 'jquery' ), '' );
		wp_enqueue_script( 'custom', SBOX_JS . '/common.js', array( 'jquery' ), '' );
	}
}     
add_action('init', 'echoes_JS_scripts');
?>
<?php

$themename = "StudioBox";
$shortname = "studiobox";

$categories = get_categories('hide_empty=0&orderby=name');
$wp_cats = array();
foreach ($categories as $category_list ) {
       $wp_cats[$category_list->cat_ID] = $category_list->cat_name;
}
array_unshift($wp_cats, "Choose a category");


$pcategories = get_categories('hide_empty=0&orderby=name');
$pwp_cats = array();
foreach ($pcategories as $pcategory_list ) {
	if ($pcategory_list->category_parent == 0) {
       $pwp_cats[$pcategory_list->cat_ID] = $pcategory_list->cat_name;
	}
}
array_unshift($wp_cats, "Choose a category");


$choice_categories = get_categories('hide_empty=0&orderby=name');
$choice_wp_cats = array();
foreach ($choice_categories as $choice_category_list ) {
       $choice_wp_cats[$choice_category_list->cat_ID] = $choice_category_list->cat_name;
}
array_unshift($choice_wp_cats, "Disabled");


$options = array (
	
array( "name" => "StudioBox General Settings",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "StudioBox skin",
		"desc" => "Choose a Skin for the StudioBox template.",
		"id" => $shortname."_skin",
		"type" => "select",
		"std" => "Classic theme",
		"options" => array("Classic theme", "Bright theme", "Dark theme", "Light - Blue", "Light - Red", "Light - Green", "Dark - Blue", "Dark - Red", "Dark - Green")),
		
	array(  "name" => "Custom Logo",
		"desc" => "Path to your logo image ( Best dimensions 368px x 73px ).",
		"id" => $shortname."_logo",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "Email for Contact Form Template",
		"desc" => "Email address for recieving contact form mail.",
		"id" => $shortname."_contactemail",
		"std" => "",
		"type" => "text"),
	
array( "type" => "close"),	
array(  "name" => "Categories and Page IDs",
	"type" => "section"),
array(  "type" => "open"),
		
	array(  "name" => "Portfolio Category",
		"desc" => "Select Portfolio Category (for tiled display) Top Level Categories Only",
		"id" => $shortname."_portfolio",
		"type" => "select",
		"options" => $pwp_cats,
		"std" => "Choose a category"),
		
	array(  "name" => "Gallery Category",
		"desc" => "Select Gallery Category (for slideshow display) Top Level Categories Only",
		"id" => $shortname."_gallery",
		"type" => "select",
		"options" => $pwp_cats,
		"std" => "Choose a category"),

	array(  "name" => "Blog Category",
		"desc" => "Select Blog Category. Top Level Categories Only",
		"id" => $shortname."_blog",
		"type" => "select",
		"options" => $pwp_cats,
		"std" => "Choose a category"),
		
	array(  "name" => "About Page ID",
		"desc" => "Enter About page ID. <br/>What is a <a href='http://en.support.wordpress.com/pages/8/' target='_blank'>Page ID</a>?",
		"id" => $shortname."_about_id",
		"std" => "2",
		"type" => "text"),

	array(  "name" => "Contact Page ID",
		"desc" => "Enter Contact page ID. <br/>What is a <a href='http://en.support.wordpress.com/pages/8/' target='_blank'>Page ID</a>?",
		"id" => $shortname."_contact_id",
		"std" => "",
		"type" => "text"),
		
array( "type" => "close"),	
array(  "name" => "Top Menu Navigation <small>Only for WP 2.x use. WP 3.0+ uses Menu under Appearance</small>",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "Enable Portfolio Dropdown menu",
		"desc" => "Enable Dropdown menu for Portfolio link. Only if subcategories exist",
		"id" => $shortname."_portdropdown",
		"type" => "select",
		"std" => "Enable",
		"options" => array("Enable", "Disable")),
		
	array(  "name" => "Enable Gallery Dropdown menu",
		"desc" => "Enable Dropdown menu for Gallery link. Only if subcategories exist",
		"id" => $shortname."_gallerydropdown",
		"type" => "select",
		"std" => "Enable",
		"options" => array("Enable", "Disable")),
		
	array(  "name" => "Populate all Categories to Menu",
		"desc" => "Populate all Categories to the menu",
		"id" => $shortname."_menucat",
		"type" => "select",
		"std" => "Disable",
		"options" => array("Disable", "Enable")),
		
	array(  "name" => "Exclude Categories from Menu",
		"desc" => "Exclude Categories from Populated list. Comma Seperated Category ID list eg. 12,34,23,57",
		"id" => $shortname."_excludemenucat",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "Populate all Pages to Menu",
		"desc" => "Populate all Pages to the menu",
		"id" => $shortname."_menupages",
		"type" => "select",
		"std" => "Disable",
		"options" => array("Disable", "Enable")),
		
	array(  "name" => "Exclude Pages from Menu",
		"desc" => "Exclude from Populated Pages. Comma Seperated Page ID list eg. 12,34,23,57",
		"id" => $shortname."_excludemenupages",
		"std" => "",
		"type" => "text"),
		
array( "type" => "close"),	
array(  "name" => "Featured Categories",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "StudioBox Featured Style",
		"desc" => "Choose how you want the featured displayed",
		"id" => $shortname."_featstyle",
		"type" => "select",
		"std" => "Accordion Slides",
		"options" => array("Accordion Slides", "Slider Scroll", "Slideshow Gallery")),

	array(  "name" => "Accordion Category",
		"desc" => "Select category for accordion.",
		"id" => $shortname."_accordionfeat",
		"type" => "select",
		"options" => $wp_cats,
		"std" => "Choose a category"),
		
	array(  "name" => "Slider Category",
		"desc" => "Select category for slider.",
		"id" => $shortname."_sliderfeat",
		"type" => "select",
		"options" => $wp_cats,
		"std" => "Choose a category"),
		
	array(  "name" => "Slideshow Category",
		"desc" => "Select category for slideshow.",
		"id" => $shortname."_slideshowfeat",
		"type" => "select",
		"options" => $wp_cats,
		"std" => "Choose a category"),


array( "type" => "close"),	
array(  "name" => "Mainpage Setup",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "A - Block1 Category",
		"desc" => "Bottom Left of Homepage.",
		"id" => $shortname."_category1",
		"type" => "select",
		"options" => $wp_cats,
		"std" => "Choose a category"),
		
	array(  "name" => "A - Block1 Category image",
		"desc" => "Path to your Category 1 image ( dimensions 300px x 138px ).",
		"id" => $shortname."_catimage1",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "A - Block1 Title (optional)",
		"desc" => "Display this text instead of Category name",
		"id" => $shortname."_cattitle1",
		"std" => "",
		"type" => "text"),

	array(  "name" => "B - Block2 Category",
		"desc" => "Bottom Mid of Homepage.",
		"id" => $shortname."_category2",
		"type" => "select",
		"options" => $wp_cats,
		"std" => "Choose a category"),

	array(  "name" => "B - Block2 Category image",
		"desc" => "Path to your Category 2 image ( dimensions 300px x 138px ).",
		"id" => $shortname."_catimage2",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "B - Block2 Title (optional)",
		"desc" => "Display this text instead of Category name",
		"id" => $shortname."_cattitle2",
		"std" => "",
		"type" => "text"),

	array(  "name" => "C - Block3 Category",
		"desc" => "Bottom Right of Homepage.",
		"id" => $shortname."_category3",
		"type" => "select",
		"options" => $wp_cats,
		"std" => "Choose a category"),
		
	array(  "name" => "C - Block3 Category image",
		"desc" => "Path to your Category 3 image ( dimensions 300px x 138px ).",
		"id" => $shortname."_catimage3",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "C - Block3 Title (optional)",
		"desc" => "Display this text instead of Category name",
		"id" => $shortname."_cattitle3",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "D - First Column Page",
		"desc" => "Page ID for first column. <br/>What is a <a href='http://en.support.wordpress.com/pages/8/' target='_blank'>Page ID</a>?",
		"id" => $shortname."_pageblock1",
		"std" => "",
		"type" => "text"),

	array(  "name" => "E - Second Column Page",
		"desc" => "Page ID for second column. <br/>What is a <a href='http://en.support.wordpress.com/pages/8/' target='_blank'>Page ID</a>?",
		"id" => $shortname."_pageblock2",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "F - Third Column Page",
		"desc" => "Page ID for third column. <br/>What is a <a href='http://en.support.wordpress.com/pages/8/' target='_blank'>Page ID</a>?",
		"id" => $shortname."_pageblock3",
		"std" => "",
		"type" => "text"),
		
array( "type" => "close"),	
array(  "name" => "Portfolio Settings",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "Portfolio items per page",
		"desc" => "Portfolio items per page",
		"id" => $shortname."_portfolioitems",
		"type" => "select",
		"std" => "9 Items *Default",
		"options" => array("9 Items *Default" , "6 Items" , "12 Items", "unlimited", "Recent plus unlimited" )),
	
	
array(  "type" => "close"),	
array(  "name" => "Sidebar Extras",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "A - Built-in Category list",
		"desc" => "Would you like to display bult-in Category list.",
		"id" => $shortname."_sidebarcatlist",
		"type" => "select",
		"std" => "Enable Category List",
		"options" => array("Enable Category List", "Disable Category List")),
		
	array(  "name" => "A - Exclude Categories",
		"desc" => "Exclude Categories From List. Enter ID's (separate by ',') e.g. 2,4,8",
		"id" => $shortname."_exclude_cat",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "B - Display Related posts",
		"desc" => "Would you like to display Related posts.",
		"id" => $shortname."_relatedposts",
		"type" => "select",
		"std" => "Enable Related Posts",
		"options" => array("Enable Related Posts", "Disable Related Posts" )),
		
	array(  "name" => "C - Display Popular posts in sidebar",
		"desc" => "Would you like to display Popular posts.",
		"id" => $shortname."_popular",
		"type" => "select",
		"std" => "Enable Popular Posts",
		"options" => array("Enable Popular Posts", "Disable Popular Posts" )),
		
	array(  "name" => "D - Sidebar Featured Category",
		"desc" => "Category ID for Sidebar Featured Category. Leave blank to disable",
		"id" => $shortname."_sidebarfeatured_id",
		"type" => "select",
		"options" => $choice_wp_cats,
		"std" => "Disabled"),
		
	array(  "name" => "D - Sidebar Featured Title",
		"desc" => "Title for your sidebar features image box",
		"id" => $shortname."_sidebarfeatured_title",
		"type" => "select",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "D - Sidebar Featured Style",
		"desc" => "Sidebar Featured Style.",
		"id" => $shortname."_sidebarfeatured_style",
		"type" => "select",
		"std" => "Most Recent from Category",
		"options" => array("Most Recent from Category", "Random from Category" )),
		

array(  "type" => "close"),	
array(  "name" => "Advertisement Settings (Sidebar)",
	"type" => "section"),
array(  "type" => "open"),

	array(  "name" => "Advertise Here Request Page ID",
		"desc" => "Page ID of Advertisement informations. <br/>What is a <a href='http://en.support.wordpress.com/pages/8/' target='_blank'>Page ID</a>?",
		"id" => $shortname."_adpage_id",
		"std" => "",
		"type" => "text"),

	array(  "name" => "A - Slot image",
		"desc" => "Enter image path of AD 125px X 125px",
		"id" => $shortname."_ad1_image",
		"std" => "",
		"type" => "text"),

	array(  "name" => "A  - Slot link",
		"desc" => "Enter Ad box tagert link",
		"id" => $shortname."_ad1_link",
		"std" => "#",
		"type" => "text"),
		
	array(  "name" => "B - Slot image",
		"desc" => "Enter image path of AD 125px X 125px",
		"id" => $shortname."_ad2_image",
		"std" => "",
		"type" => "text"),

	array(  "name" => "B - Slot link",
		"desc" => "Enter Ad box tagert link",
		"id" => $shortname."_ad2_link",
		"std" => "#",
		"type" => "text"),
		
	array(  "name" => "C - Slot image",
		"desc" => "Enter image path of AD 125px X 125px",
		"id" => $shortname."_ad3_image",
		"std" => "",
		"type" => "text"),

	array(  "name" => "C - Slot link",
		"desc" => "Enter Ad box tagert link",
		"id" => $shortname."_ad3_link",
		"std" => "#",
		"type" => "text"),
		
	array(  "name" => "D - Slot image",
		"desc" => "Enter image path of AD 125px X 125px",
		"id" => $shortname."_ad4_image",
		"std" => "",
		"type" => "text"),

	array(  "name" => "D - Slot link",
		"desc" => "Enter Ad box tagert link",
		"id" => $shortname."_ad4_link",
		"std" => "#",
		"type" => "text"),

	array(  "type" => "close"),	
	array(  "name" => "Footer",
		"type" => "section"),
	array(  "type" => "open"),
	
	array(  "name" => "About Thumbnail Column 3",
		"desc" => "Thumbnail for column 3.",
		"id" => $shortname."_footerthumb",
		"std" => "",
		"type" => "text"),
		
	array(  "name" => "Portfolio Thumbs Column 4",
		"desc" => "Select Category for Portfolio thumbnails.",
		"id" => $shortname."_footerportfolio",
		"type" => "select",
		"options" => $choice_wp_cats,
		"std" => "Disabled"),
		
	array(  "name" => "Additional Footer HTML",
		"desc" => "Enter your footer codes.",
		"id" => $shortname."_footercode",
		"std" => "",
		"type" => "textarea"),

array( "type" => "close")
 
);


function mytheme_add_admin() {
 
global $themename, $shortname, $options;
 
if ( isset($_GET['page']) && $_GET['page'] == basename(__FILE__) ) {
 
	if ( 'save' == $_REQUEST['action'] ) {
 
		foreach ($options as $value) {
		update_option( $value['id'], $_REQUEST[ $value['id'] ] ); }
 
foreach ($options as $value) {
	if( isset( $_REQUEST[ $value['id'] ] ) ) { update_option( $value['id'], $_REQUEST[ $value['id'] ]  ); } else { delete_option( $value['id'] ); } }
 
	header("Location: admin.php?page=functions.php&saved=true");
die;
 
} 
else if( 'reset' == $_REQUEST['action'] ) {
 
	foreach ($options as $value) {
		delete_option( $value['id'] ); }
 
	header("Location: admin.php?page=functions.php&reset=true");
die;
 
}
}

    if(function_exists(add_object_page))
    {
		$file_dir=get_bloginfo('template_directory');
		add_object_page($themename, $themename, 'administrator', basename(__FILE__), 'mytheme_admin',$file_dir."/functions/images/favicon.png");
	} else {
		$file_dir=get_bloginfo('template_directory');
		add_menu_page($themename, $themename, 'administrator', basename(__FILE__), 'mytheme_admin',$file_dir."/functions/images/favicon.png");
	}
	add_submenu_page(basename(__FILE__), $themename, 'Theme Options', 'administrator', basename(__FILE__),'mytheme_admin');
		
}

function mytheme_add_init() {

$file_dir=get_bloginfo('template_directory');
wp_enqueue_style("functions", $file_dir."/functions/css/style.css", false, "1.0", "all");
wp_enqueue_script("m_script", $file_dir."/functions/js/script.js", false, "1.0");

}

function mytheme_admin() {
 
global $themename, $shortname, $options;
$i=0;
 
if ( $_REQUEST['saved'] ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' settings saved.</strong></p></div>';
if ( $_REQUEST['reset'] ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' settings reset.</strong></p></div>';
 
?>

<?php $file_dir=get_bloginfo('template_directory'); ?>
<div class="wrap m_wrap">
<h2><img src='<?php echo $file_dir."/functions/images/bigicon.png"; ?>' alt="logo" /> <?php echo $themename; ?> Options</h2>

<div class="m_help">
<p>
<strong>Having trouble setting the theme?</strong> Refer to the Help Manual provided with the <?php echo $themename; ?> Theme. There may also be valuable information in the themeforest Studiobox Discussions area.</p>
</div>
 
<div class="m_opts">
<form method="post">
<?php foreach ($options as $value) {
switch ( $value['type'] ) {
 
case "open":
?>
 
<?php break;
 
case "close":
?>
 
</div>
</div>
<br />

 
<?php break;
 
case "title":
?>
<p>To easily use the <?php echo $themename;?> theme, you can use the menu below.</p>

 
<?php break;
 
case 'text':
?>

<div class="m_input m_text">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
 	<input name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" value="<?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id'])  ); } else { echo $value['std']; } ?>" />
 <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 
 </div>
<?php
break;
 
case 'textarea':
?>

<div class="m_input m_textarea">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
 	<textarea name="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" cols="" rows=""><?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id']) ); } else { echo $value['std']; } ?></textarea>
 <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 
 </div>
  
<?php
break;
 
case 'select':
?>

<div class="m_input m_select">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
	
<select name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>">
<?php foreach ($value['options'] as $option) { ?>
		<option <?php if (get_settings( $value['id'] ) == $option) { echo 'selected="selected"'; } ?>><?php echo $option; ?></option><?php } ?>
</select>

	<small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
</div>
<?php
break;
 
case "checkbox":
?>

<div class="m_input m_checkbox">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
	
<?php if(get_option($value['id'])){ $checked = "checked=\"checked\""; }else{ $checked = "";} ?>
<input type="checkbox" name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" value="true" <?php echo $checked; ?> />


	<small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 </div>
<?php break; 
case "section":

$i++;

?>

<div class="m_section">
<div class="m_title"><h3><img src="<?php bloginfo('template_directory')?>/functions/images/trans.png" class="inactive" alt="""><?php echo $value['name']; ?></h3><span class="submit"><input name="save<?php echo $i; ?>" type="submit" value="Save changes" />
</span><div class="clearfix"></div></div>
<div class="m_options">

 
<?php break;
 
}
}
?>
 
<p class="submit">
<input name="save" type="submit" value="Save all changes" />
<input type="hidden" name="action" value="save" />
</p>
</form>
<form method="post">
<p class="submit">
<input name="reset" type="submit" value="Reset" />
<input type="hidden" name="action" value="reset" />
</p>
</form>
 </div> 
 

<?php
}
?>
<?php
add_action('admin_init', 'mytheme_add_init');
add_action('admin_menu', 'mytheme_add_admin');
?>