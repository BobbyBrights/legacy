<?php
  
  add_filter('use_default_gallery_style', '__return_false');
  
  add_theme_support('nav-menus');
  add_action( 'init', 'ww_register_my_menus');
  function ww_register_my_menus() {
     register_nav_menus(array('primary-menu' => 'Primary Menu'));
  }
  
  function ww_primarymenu() {
?>
<div id="main-menu" class="clear">
<?php $menu = wp_list_pages('title_li=&echo=0'); 
  if ($menu) { ?>
  <ul>
    <?php echo $menu; ?>
  </ul>
  <div class="clear"></div>
<?php } ?>
</div>
<div class="clear"></div>
<?php
  }
  
  add_theme_support( 'post-thumbnails');
  set_post_thumbnail_size( 100, 100, true);

  register_sidebars(2, array('before_widget' => '','after_widget' => ''));
  if (!isset($content_width)) $content_width = 525;
  
  add_action('after_setup_theme', 'theme_setup');
  function theme_setup() {
    add_theme_support('automatic-feed-links');
    add_editor_style();
    add_custom_background();
    
    define('HEADER_TEXTCOLOR', '');
    define('HEADER_IMAGE', '');
    
    define('HEADER_IMAGE_WIDTH', apply_filters( 'autoshow_header_image_width', 988));
    define('HEADER_IMAGE_HEIGHT', apply_filters( 'autoshow_header_image_height', 300));
    define('NO_HEADER_TEXT', true);
    add_custom_image_header('', 'custom_admin_header_style');
  }
  
  wp_register_script('ww_core', get_stylesheet_directory_uri().'/core.js', array('jquery'));
  wp_enqueue_script('ww_core');  
  
?>
