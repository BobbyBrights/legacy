<!DOCTYPE html>
<html lang="en">
<head>
<?php echo $this->Html->charset(); ?>
<title><?php echo $this->fetch('title'); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<?php
echo $this->Html->css(array(
	'/aoaku/css/bootstrap', 
	'/aoaku/css/bootstrap-responsive', 
	'/aoaku/css/aoaku'));
?>
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
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
      <?php echo $this->Html->link('aoaku.com', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'aoaku', 'home'), array('class' => 'brand')); ?>
      <div class="nav-collapse collapse">
	    <?php echo $this->element('nav'); ?>
	    <?php echo $this->element('login_form'); ?>
      </div>
      <!--/.nav-collapse --> 
    </div>
  </div>
</div>
<div class="container alt"> 
  <!-- Example row of columns -->
  <?php echo $this->Session->flash(); ?> 
  <?php echo $this->Session->flash('auth'); ?> 
  <?php echo $this->fetch('content'); ?>
  <hr>
  <footer>
    <p class="pull-left">&copy; www.aoaku.com 2013</p>
    <ul class="footer-nav pull-right">
     	<li><?php echo $this->Html->link('About', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'aoaku', 'about')); ?></li>
	    <li><?php echo $this->Html->link('Contact', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'aoaku', 'contact')); ?></li>
    	<li><?php echo $this->Html->link('Privacy', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'aoaku', 'privacy')); ?></li>
    	<li><?php echo $this->Html->link('Terms & Conditions', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'aoaku', 'terms')); ?></li>
    </ul>	
  </footer>
</div>
<div id="fb-root"></div>
<!-- /container --> 
<?php echo $this->Html->script(array(
            'http://code.jquery.com/jquery-1.9.1.min.js',
            '/aoaku/js/jquery.autocomplete.min',
            '/aoaku/js/bootstrap.min',
            '/aoaku/js/handlers',
            '/aoaku/js/facebook-connect',           
        )); ?>
<?php echo $this->fetch('script_footer'); ?>
</body>
</html>
