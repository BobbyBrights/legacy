<!DOCTYPE html>
<html lang="en" ng-app>
  <head>
    <meta charset="utf-8">
    <title>BondBrothers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">


    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	<?php wp_head(); ?>
    <!-- CSS -->
    <link href="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/bondbrothers.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/css/bootstrap-responsive.css" rel="stylesheet">
  </head>

  <body class="page-<?php echo is_front_page() || is_home() ? "home" : basename(get_permalink()) ; ?> post-type-<?php echo get_post_type($post->ID); ?>">
  	
  	<div class="row-fluid header">
  		<!--
<nav id="social-nav">
  			<?php   
              wp_nav_menu( 
              	array(
              		'menu' => 'social-nav', 
              		'theme_location' => 'social',
              		'container' => false, 
              		'menu_class' => '',
              		'depth' => 0
              	));               	
              ?>              
  		</nav>
-->
  		
  		<!--<div class="cart"><a href="/cart"><i class="icon-shopping-cart"></i> <?php echo sprintf('%d', jigoshop_cart::$cart_contents_count); ?> items in cart</a></div>-->
  		<div class="logo-section">
  			<a href="/"><img class="header-logo" src="<?php echo get_template_directory_uri(); ?>/images/logo.png" /></a>
  		</div>
  		<nav id="primary-nav">
  			<?php   
              wp_nav_menu( 
              	array(
              		'menu' => 'primary-nav', 
              		'theme_location' => 'primary',
              		'container' => false, 
              		'menu_class' => 'container smaller',
              		'walker' => new themeslug_walker_nav_menu,
              		'depth' => 0
              	));               	
              ?>
              
  		</nav>
  		<div id="overlay-placeholder">
  		</div>
  	</div>