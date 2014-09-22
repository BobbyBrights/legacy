<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo PLUGIN_FULL_NAME; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <?php
    
	echo $this->Html->css(array(
			'http://fonts.googleapis.com/css?family=Bubblegum+Sans|Lobster|Lemon|Damion',
			'http://fonts.googleapis.com/css?family=Open+Sans|Cagliostro',
	        '/' . PLUGIN_SHORT_NAME . '/css/bootstrap', 
	        '/' . PLUGIN_SHORT_NAME . '/css/bootstrap-responsive', 
	        '/' . PLUGIN_SHORT_NAME . '/css/tcd.bootstrap'));
	?>
	<?php echo $this->fetch('css'); ?>
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="../assets/js/html5shiv.js"></script>
    <![endif]-->
  </head>

  <body>
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <?php echo $this->Html->link(PLUGIN_FULL_NAME, array('plugin' => PLUGIN_SHORT_NAME, 'controller' => 'pages', 'action' => 'display', 'home'), array('class' => 'brand')); ?>
          
          <div class="nav-collapse collapse">
          	<p class="navbar-text pull-right">
          	  <?php echo $this->Html->link('Logout', array('action' => 'logout', 'controller' => 'users'), array('class' => 'navbar-link')); ?>
            </p>
            <ul class="nav">
            <!--
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            -->
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="span9">
        	<?php echo $this->Session->flash(); ?>
	        <?php echo $this->fetch('content'); ?>
        </div>       
          <!--/span-->
        <div class="span3">
          <div class="well sidebar-nav">
            <?php echo $this->element('side-nav'); ?>
          </div><!--/.well -->
          <?php echo $this->fetch('associated'); ?>
        </div><!--/span-->
        
        </div><!--/row-->

      <hr>

      <footer>
        <p>&copy; www.tcd.ie 2013</p>
      </footer>

    </div><!--/.fluid-container-->
<?php 
echo $this->Html->script(array(
	    'http://code.jquery.com/jquery-1.9.1.min.js',
	    '/' . PLUGIN_SHORT_NAME . '/js/bootstrap.min',
	    '/' . PLUGIN_SHORT_NAME . '/js/init',
)); 
echo $this->fetch('scriptBottom');
?>
	
  </body>
</html>
