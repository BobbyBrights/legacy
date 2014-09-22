<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Lolliprops</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Flatstrap by Littlesparkvt.com">
    <meta name="author" content="littlesparkvt.com">

    <!-- Le styles -->
    <link href="<?php echo get_template_directory_uri(); ?>/assets/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/assets/css/styles.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/assets/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/assets/js/google-code-prettify/prettify.css" rel="stylesheet">
    
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body class="<?php echo is_home() || is_front_page() ? 'with-marquee-header' : 'inner-page'; ?>">

    <div class="navbar navbar-lolliprops navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="/?_class=inline"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/lolliprops-logo.png" /></a>
          <div class="nav-collapse collapse pull-right">
          
          <?php   
              wp_nav_menu( 
              	array(
              		'menu' => 'primary-nav', 
              		'theme_location' => 'primary',
              		'container' => false, 
              		'menu_class' => 'nav', 
              		'walker' => new primary_nav_walker_nav_menu(), 
              		'depth' => 0
              	));               	
              ?>
              
            
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
    
