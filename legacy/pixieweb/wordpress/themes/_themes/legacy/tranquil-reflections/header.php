<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?> >

<head profile="http://gmpg.org/xfn/11">

<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />

<?php if (is_home()) { ?>
	<title><?php bloginfo('name'); ?> &mdash; <?php bloginfo('description'); ?></title>

	<?php } elseif(is_category() or is_archive() or is_page() or is_single() or is_404() ) { ?>
	<title><?php wp_title(''); ?> &mdash; <?php bloginfo('name'); ?></title>

         <?php } elseif(is_search() ) { ?>
	<title>Serach results &mdash; <?php bloginfo('name'); ?></title>

	<?php } else { ?>
	<title> <?php wp_title(); ?> &mdash; <?php bloginfo('name'); ?></title>
	<?php } ?>


<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />

<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>

<?php wp_head(); ?>


</head>

<body <?php body_class(); ?>> 
	
	<div id="wrapper">
		<div>
			<a name="up" id="up"></a></div>
			
			
		
			
			
		<div id="header" style="cursor: pointer;" onclick='location.href="<?php echo home_url('home'); ?>"'>
			
						
				<div class="social">			
						<table width="148" border="0" cellspacing="0" cellpadding="0">
						<tr>
	<?php $options = get_option('tranquil_theme_options'); ?>
	<td align="center"><?php if(!empty( $options['Facebook'] ) ) : ?><a href="<?php echo $options['Facebook'];?>"><img src="<?php bloginfo('template_url'); ?>/images/facebook.png" alt="" border="0"/></a> <?php endif; ?></td>
	<td align="center"><?php if(!empty( $options['Twitter'] ) ) : ?><a href="<?php echo $options['Twitter'];?>"><img src="<?php bloginfo('template_url'); ?>/images/twitter.png" alt="" border="0"/></a> <?php endif; ?></td>
							<td align="center"><a href="./?feed=rss2"><img src="<?php bloginfo('template_url'); ?>/images/rss.png" alt="" border="0"/></a></td>
						</tr>
					</table>
				</div>
			
			
				<h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1>
               <div id="tagline"><?php bloginfo('description'); ?></div>
			</div>
			
			<div id="allcontent">	
			
			
					 
				<div id="nav">
				
					
					
								
					<?php wp_nav_menu( array('sort_column' => 'menu_order', 'container_class' => 'menu-header', 'theme_location' => 'primary') ); ?>
							
					
				
				
				</div>
				</div>