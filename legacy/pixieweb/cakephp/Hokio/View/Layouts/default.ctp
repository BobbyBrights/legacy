<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $this->fetch('title'); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <?php    
	echo $this->Html->css(array(
	        '/hokio/css/bootstrap.min', 
	        '/hokio/css/bootstrap-responsive.min', 
	        '/hokio/css/hokio'));
	?>
	<?php echo $this->fetch('css'); ?>
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <?php echo $this->Html->script('http://html5shiv.googlecode.com/svn/trunk/html5.js'); ?>
    <![endif]-->
  </head>

  <body>	  
	<?php echo $this->element('top-nav'); ?>
    <div class="container">
      <div class="row">
        <div class="span9">
        	<?php echo $this->Session->flash(); ?>
	        <?php echo $this->fetch('content'); ?>
        </div>       
          <!--/span-->
        <div class="span3">
          <div class="well sidebar-nav">
            
          </div><!--/.well -->
          <?php echo $this->fetch('associated'); ?>
        </div><!--/span-->
        
        </div><!--/row-->

     <?php echo $this->element('footer'); ?> 
     
    </div><!--/.fluid-container-->
	<?php 
	echo $this->Html->script(array(
		    'http://code.jquery.com/jquery-1.9.1.min.js',
		    '/hokio/js/bootstrap.min',
		    '/hokio/js/init',
	)); 
	echo $this->fetch('scriptBottom');
	?>	
  </body>
</html>
