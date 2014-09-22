<?php
/**
 * @package WordPress
 * @subpackage Yoko
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'yoko' ), max( $paged, $page ) );
?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="stylesheet" type="text/css" media="screen" href="<?php echo get_template_directory_uri(); ?>/custom.css" />
<link rel="stylesheet" type="text/css" media="screen" href="<?php echo get_template_directory_uri(); ?>/js/nivo-slider/nivo-slider.css" />
<?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/nivo-slider/jquery.nivo.slider.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/home.js"></script>

<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="page" class="clearfix">
	<header id="branding">
		
		<nav id="mainnav" class="clearfix">
			<?php dynamic_sidebar('header-ancillary-menu'); ?>
		<div class="clear"></div>
			<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
		</nav><!-- end mainnav -->

		<?php global $yoko_options;
		$yoko_settings = get_option( 'yoko_options', $yoko_options ); ?>
		
		<hgroup id="site-title">
		<?php if( $yoko_settings['custom_logo'] ) : ?>
			<a href="<?php echo home_url( '/' ); ?>" class="logo"><img src="<?php echo $yoko_settings['custom_logo']; ?>" alt="<?php bloginfo('name'); ?>" /></a>
		<?php else : ?>
			<h1><a href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><?php bloginfo( 'name' ); ?></a></h1>
				<h2 id="site-description"><?php bloginfo( 'description' ); ?></h2>
		<?php endif; ?>
		</hgroup><!-- end site-title -->
					
		<nav id="subnav">
			<?php
			if (is_nav_menu( 'Sub Menu' ) ) {
			wp_nav_menu( array('menu' => 'Sub Menu' ));} ?>
		</nav><!-- end subnav -->	
</header><!-- end header -->