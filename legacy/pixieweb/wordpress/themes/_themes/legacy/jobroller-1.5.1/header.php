<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<?php global $app_abbr; ?>
<!--[if lt IE 7 ]> <html class="ie6" xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7" xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8" xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9" xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>> <!--<![endif]-->

    <head profile="http://gmpg.org/xfn/11">

        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
		
        <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>

        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php if ( get_option('jr_feedburner_url') <> "" ) { echo get_option('jr_feedburner_url'); } else { echo get_bloginfo_rss('rss2_url'); } ?>" />
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

        <link rel="stylesheet" id="at-main-css" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" />
        
        <?php if (get_option('jr_child_theme')) $child_theme = get_option('jr_child_theme'); else $child_theme = 'style-default.css'; ?>
		<link rel="stylesheet" id="at-color-css" href="<?php if (file_exists(get_stylesheet_directory().'/styles/'.$child_theme)) echo get_stylesheet_directory_uri(); else bloginfo('template_url'); ?>/styles/<?php echo $child_theme; ?>" type="text/css" />

        <?php if ( is_singular() ) { ?><link rel="stylesheet" href="<?php  if (file_exists(get_stylesheet_directory().'/styles/print.css')) echo get_stylesheet_directory_uri(); else bloginfo('template_url'); ?>/styles/print.css" type="text/css" media="print" /><?php } ?>

        <?php if (file_exists(TEMPLATEPATH.'/favicon.ico')) { ?><link rel="shortcut icon" href="<?php if (file_exists(get_stylesheet_directory().'/favicon.ico')) echo get_stylesheet_directory_uri(); else bloginfo('template_url'); ?>/favicon.ico" type="image/x-icon" /><?php } ?>

        <?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>

        <?php wp_head(); ?>

    </head>

<body id="top" <?php
	$classes = '';
	if (get_option('jr_show_sidebar')=='no') $classes .= 'wider ';
	if (get_option('jr_child_theme')) $classes .= str_replace('.css','',get_option('jr_child_theme')).' ';
	body_class( $classes ); 
	?>>

	<?php appthemes_before(); ?>

    <div id="wrapper">

		<?php if(get_option('jr_debug_mode') == 'yes'){ ?><div class="debug"><h3><?php _e('Debug Mode On','appthemes'); ?></h3><?php print_r($wp_query->query_vars); ?></div><?php } ?>

		<div id="topNav">

			<div class="inner">

				<?php wp_nav_menu( array( 'theme_location' => 'top', 'sort_column' => 'menu_order', 'container' => 'menu-header', 'fallback_cb' => 'default_top_nav' ) ); ?>

				<div class="clear"></div>

			</div><!-- end inner -->

		</div><!-- end topNav -->
		
		<?php appthemes_before_header(); ?>

		<?php appthemes_header(); ?>
		
		<?php appthemes_after_header(); ?>

		<div class="clear"></div>

		<div id="content">

			<div class="inner">

				<div id="mainContent" class="<?php global $header_search; if (!$header_search) echo 'nosearch'; ?>">