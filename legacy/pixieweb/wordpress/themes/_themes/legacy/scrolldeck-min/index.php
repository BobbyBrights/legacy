
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Bootstrap, from Twitter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.1.1.min.js"></script>

	<script src="<?php echo get_template_directory_uri(); ?>/js/scrolldeck/jquery.scrollTo-1.4.3.1.min.js"></script>
	<script src="<?php echo get_template_directory_uri(); ?>/js/scrolldeck/jquery.parallax-1.1.js"></script>
	<script src="<?php echo get_template_directory_uri(); ?>/js/scrolldeck/jquery.easing.1.3.js"></script>
	<script src="<?php echo get_template_directory_uri(); ?>/js/scrolldeck/jquery.scrollorama.js"></script>
	<script src="<?php echo get_template_directory_uri(); ?>/js/scrolldeck/jquery.scrolldeck.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){

		//.parallax(xPosition, adjuster, inertia, outerHeight) options:
		//xPosition - Horizontal position of the element
		//adjuster - y position to start from
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport

		$('#intro').parallax("50%", 0, 0.1, true);
		$('#second').parallax("50%", 0, 0.1, true);
		$('.bg').parallax("50%", 2500, 0.4, true);
		$('#third').parallax("50%", 2750, 0.3, true);
		
		var deck = new $.scrolldeck({
			slides: '.slide',
			buttons: '.scrolldeck-nav li a',
			easing: 'easeInOutExpo'
		});
	
	})
	</script>



    <!-- Le styles -->
    <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/theme.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/scrolldeck.css" rel="stylesheet">

    <!-- TODO: Add HTML5 shim, for IE6-8 support of HTML5 elements -->

    <!-- TODO:  Add Fav and touch icons -->
   
  </head>

  <body>


    <!-- Part 1: Wrap all page content here -->
    <div id="wrap">
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="#">Project name</a>
          <div class="nav-collapse collapse">
            <ul class="nav scrolldeck-nav">
              <?php 
              	$pages = get_pages(); 
              	foreach( $pages as $page ): 
              	?>
              		<li><a href="#<?php echo $page->post_name; ?>"><?php echo $page->post_title; ?></a></li>
              <?php endforeach; ?>
            </ul>



          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
    
    	    
      <!-- Begin page content -->
      <div class="container-fluid">
              <?php 
              	$pages = get_pages(); 
              	$idx = 1;
              	foreach( $pages as $page ): 
              	?>
      			<div id="<?php echo $page->post_name; ?>" class="slide start-here">
					<div class="story">
				    	<div class="pull-<?php echo $idx % 2 == 0 ? 'left' : 'right'; ?>">
						<h2><?php echo $page->post_title; ?></h2>
						<?php echo $page->post_content; ?>
						
						</div>
				    </div> <!--.story-->
				</div> <!--#intro-->
		
		
              <?php 
              	$idx++;
              	endforeach; ?>

      <div id="push"></div>
    </div>


    
    </div>



    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>

  </body>
</html>
