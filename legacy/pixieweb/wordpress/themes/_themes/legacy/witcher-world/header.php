<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php if(is_singular()) wp_enqueue_script('comment-reply'); ?>
<title><?php bloginfo('name'); ?> <?php if(is_single()) { ?> &raquo; Blog Archive <?php } ?> <?php wp_title(); ?></title>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="page">
  <div id="header"<?php if(get_header_image() != "") echo " style='background-image: url(".get_header_image().");'"; ?>>
    <div class="header-menu">
<?php wp_nav_menu( array( 'theme_location' => 'primary-menu', 'container_id' => 'main-menu', 'container_class' => 'clear', 'fallback_cb'=>'ww_primarymenu') ); ?>
    </div>
    <div class="header-title"><a href="<?php echo home_url(); ?>/"><?php bloginfo('name'); ?></a></div>
    <div class="header-description"><?php bloginfo('description'); ?></div>
    <div class="header-rss"><a href="<?php bloginfo('rss2_url'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/rss32.png" alt="RSS" /></a></div>
  </div>
