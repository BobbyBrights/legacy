<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Synalysis.com</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
	<link href="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/css/bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo get_template_directory_uri(); ?>/css/synalysis.css" rel="stylesheet">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body class="<?php echo isset($_GET['font']) ? $_GET['font'] : 'normal'; ?> <?php echo is_front_page() ? 'front-page' : 'inner'; ?>">
  
  
  	<?php include_once('menu.php'); ?>
    <div class="navbar navbar-inverse navbar-fixed-top visible-tablet visible-desktop">
      <div class="navbar-inner navbar-synalysis">
        <div class="container">
          <a class="brand" href="<?php echo home_url(); ?>">Synalysys<span>&trade;</span></a>
         
          <div class="nav-collapse collapse">
            
            <?php   
              wp_nav_menu( 
              	array(
              		'menu' => 'primary-nav', 
              		'theme_location' => 'primary',
              		'container' => false, 
              		'menu_class' => 'nav primary', 
              		'walker' => new primary_nav_walker_nav_menu(), 
              		'depth' => 0
              	));               	
              ?>
              
          </div><!--/.nav-collapse -->
			<!-- Social links -->
			
		<div class="social-links pull-right">
	          <?php   
              wp_nav_menu( 
              	array(
              		'menu' => 'social-links',	
              		'container' => false, 
              		'menu_class' => 'social-links',
              		'depth' => 0
              	));               	
              ?>
          </div>
                    
        </div>
        

          
      </div>
    </div>

