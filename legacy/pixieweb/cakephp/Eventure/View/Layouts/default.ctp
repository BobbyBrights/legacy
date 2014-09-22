<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $this->fetch('title'); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">   
    <!-- Le styles -->
    <?php 
    	echo $this->Html->css(
    		array(
    		'http://fonts.googleapis.com/css?family=PT+Serif:400,700|Cardo:400,700',
    		'/eventure/css/bootstrap',
    		'/eventure/css/bootstrap-responsive',
    		'/eventure/css/eventure.bootstrap',  		
    		'/eventure/css/bootstrap-datetimepicker.min'   		
    		)
    	); 
    ?>
   <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
        <!-- Navbar
    ================================================== -->
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <?php echo $this->Html->link('eventure', array('controller' => 'events', 'action' => 'index', 'plugin' => 'eventure'), array('class' => 'brand')); ?>
          <div class="nav-collapse collapse">
           <?php echo $this->element('nav'); ?>
           <?php echo $this->element('ancillary_nav'); ?>           
          </div>
        </div>
      </div>
    </div>
    
	
    <div class="container">
	  <?php echo $this->Session->flash(); ?>
      <?php echo $this->fetch('content'); ?>
      	<hr />
      <div class="footer">
        <p>&copy; www.eventure.ie 2013</p>
      </div>

    </div> <!-- /container -->
    <?php echo $this->Html->script(
    	array(
    		'http://code.jquery.com/jquery-1.9.1.min.js',
    		'/eventure/js/bootstrap.min',
    		'/eventure/js/bootstrap-datetimepicker.min',
    		'/eventure/js/jquery.knob',
    		'/eventure/js/handlers' 		
    	)); ?>
  </body>
</html>
