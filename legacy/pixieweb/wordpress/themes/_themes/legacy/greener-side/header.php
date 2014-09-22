<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="shortcut icon" href="<?php get_template_directory_uri(); ?>/images/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" media="only screen and (max-device-width: 1024px)" href="<?php get_template_directory_uri(); ?>/mobile.css" type="text/css" />


<?php
	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();?>
</head>

<body <?php body_class(); ?>>
	<div id="wrapper"><div id="containerg">
		
			<div id="topg">&nbsp;
  <h2 align="right">
    <?php bloginfo('name'); ?></h2>
  <div id="tag">
<?php bloginfo('description'); ?></div><!-- end #tag --></div> <!-- end #topg -->

<?php get_search_form(); ?>
				

				<div id="bgg"><div id="contentmain">
				
<div id="menug">
					
	
					
			
			 
		

	<?php
	if (function_exists('wp_nav_menu')) {
		wp_nav_menu(array('container_id' => 'greendrop','theme_location' => 'sjc-main-menu', 'fallback_cb' => 'sjc_greenerside_menu'));
	}
	else {
		sjc_greenerside_menu();
	}
	?>


		
							
					

				<div id="rssfeeds">
        <a href="<?php bloginfo_rss('rss2_url'); ?>"></a>      </div></div><!-- end #menug -->

				<div id="contentg">
				

				<?php if(function_exists('bcn_display') && !front_page()) { /* Generate the Breadcrumbs NavXT if is installed */ ?>
<div id="breadcrumb"><?php bcn_display(); ?></div>
				<?php } ?>

			

			