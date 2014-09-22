<!DOCTYPE html>
<html lang="en" ng-app>
  <head>
    <meta charset="utf-8">
    <title>BondBrothers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- CSS -->
    <link href="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/bondbrothers.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body class="page-<?php echo( basename(get_permalink()) ); ?>">
  	
  	<div class="row-fluid header">
  		<img class="header-logo" src="<?php echo get_template_directory_uri(); ?>/images/logo.png" />
  		<nav id="primary-nav">
  			<ul>
  				<li>
  				<a href="/concept-1">Home</a>
  				<!--
  				<div class="overlay-menu">
	  				
	  				
  				</div>
  				-->
  				</li>
  				<li><a href="#">About</a></li>
  				<li><a href="#">Collections</a></li>
  				<li><a href="#">Pricing</a></li>
  				<li><a href="#">Packages</a></li>
  				<li><a href="#">Search</a></li>
  				<li><a href="#">Contact</a></li>
  				
  			</ul>
  		</nav>
  	</div>

  	<div class="row-fluid slider">
  		
  		
	  	<div id="full-width-slider" class="royalSlider heroSlider rsMinW">
	  	
	  	
		  <div class="rsContent">
		    <img class="rsImg" src="<?php echo get_template_directory_uri(); ?>/images/slider/1.jpg" alt="">
		    <div class="infoBlock infoBlockLeftBlack rsABlock" data-fade-effect="" data-move-offset="10" data-move-effect="bottom" data-speed="200">
		      <h4>This is an animated block, add any number of them to any type of slide</h4>
		      <p>Put completely anything inside - text, images, inputs, links, buttons.</p>
		    </div>
		  </div>
  

		  <div class="rsContent">
		    <img class="rsImg" src="<?php echo get_template_directory_uri(); ?>/images/slider/2.jpg" alt="">
		    <div class="infoBlock infoBlockRightBottomBlack rsABlock" data-fade-effect="" data-move-offset="10" data-move-effect="bottom" data-speed="200">
		      <h4>This is an animated block, add any number of them to any type of slide</h4>
		      <p>Put completely anything inside - text, images, inputs, links, buttons.</p>
		    </div>
		  </div>


		  <div class="rsContent">
		    <img class="rsImg" src="<?php echo get_template_directory_uri(); ?>/images/slider/3.jpg" alt="">
		    <div class="infoBlock infoBlockLeftBlack rsABlock" data-fade-effect="" data-move-offset="10" data-move-effect="bottom" data-speed="200">
		      <h4>This is an animated block, add any number of them to any type of slide</h4>
		      <p>Put completely anything inside - text, images, inputs, links, buttons.</p>
		    </div>
		  </div>
  
		 </div>


  	</div>
  	
  	<div class="row-fluid page-content">
  		<div class="container">
  			<div class="row">
	  			<div class="span3">
	  				
	  				<div class="ribbon both_ribbon">
		  				<h5>Spot 1 - Extra Information</h5>
		  			</div>


	  			</div>
	  			<div class="span5">
	  				<div class="ribbon left_ribbon">
						<h5>Spot 2 - Extra Information</h5>
						<p>On a second line</p>
					</div>
					
	  			</div>
	  			<div class="span4">
	  				
	  				<div class="thumbnail center well well-small text-center">
					  <h2>Newsletter</h2>
					    
					  <p>Subscribe to our weekly Newsletter and stay tuned.</p>
					    
					  <form action="" method="post">
					    <div class="input-prepend"><span class="add-on"><i class="icon-envelope"></i></span>
					        <input type="text" id="" name="" placeholder="your@email.com">
					    </div>
					    <br />
					    <input type="submit" value="Subscribe Now!" class="btn btn-large" />
					  </form>
					</div>

	  			</div>	  			
  			</div>
  			
  			<div class="row">
	  			<div class="span8">
	  			</div>
	  			<div class="span4">
	  			</div>	  			
  			</div>
  			<!--
  			<div class="row">
	  			<div class="span6">
	  			</div>
	  			<div class="span6">
	  			</div>	  			
  			</div>
  			-->
  			
  		</div>
  	</div>
  	
  	<div class="row-fluid strapline">
  		
  	</div>

  	<div class="row-fluid rich-footer">
  		<ul>
  			<li>Home</li>
  			<li>Packages</li>
  			<li>Menu item 3</li>
   			<li>Menu item 4</li>
   			<li>Menu item 5</li>
   			<li>Menu item 6</li>
  		</ul>
  		<ul>
  			<li>Another Menu</li>
  			<li>Packages</li>
  			<li>Menu item 3</li>
   			<li>Menu item 4</li>
   			<li>Menu item 5</li>
   			<li>Menu item 6</li>
  		</ul>
  		<ul>
  			<li>Yet another menu</li>
  			<li>Packages</li>
  			<li>Menu item 3</li>
   			<li>Menu item 4</li>
   			<li>Menu item 5</li>
   			<li>Menu item 6</li>
  		</ul>
   		<ul>
  			<li>And a final menu</li>
  			<li>Packages</li>
  			<li>Menu item 3</li>
   			<li>Menu item 4</li>
   			<li>Menu item 5</li>
   			<li>Menu item 6</li>
  		</ul>

  	</div>

  	
    <script src="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/js/jquery.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/js/bootstrap.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/royalslider/jquery.easing-1.3.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/royalslider/jquery.royalslider.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/bondbrothers.js"></script>

  </body>
</html>
