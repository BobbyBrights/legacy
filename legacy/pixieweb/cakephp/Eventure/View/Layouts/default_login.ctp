<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Sign in &middot; Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <?php 
    	echo $this->Html->css(
    		array(
    		'http://fonts.googleapis.com/css?family=PT+Serif:400,700|Cardo:400,700',
    		'/eventure/css/bootstrap',
    		'/eventure/css/eventure.login',
    		'/eventure/css/bootstrap-responsive',
    		)
    	); 
    ?>
      <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body>

    <div class="container">
      <?php echo $this->fetch('content'); ?>
    </div> <!-- /container -->

   <?php echo $this->Html->script(
    	array(
    		'http://code.jquery.com/jquery-1.9.1.min.js',
    		'/eventure/js/bootstrap.min',
    	)); ?>
  </body>
</html>