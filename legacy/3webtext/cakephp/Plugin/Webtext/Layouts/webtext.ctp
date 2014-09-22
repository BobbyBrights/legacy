<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns:str="http://exslt.org/strings" lang="en">
<head>
<title><?php echo $title_for_layout; ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="title" content="<?php echo $title_for_layout; ?>">
<meta name="description" content="Activate your micro SIM online. ">
<meta name="robots" content="index,follow">
<link type="text/css" rel="stylesheet" href="http://www.three.ie/css/threeIrl.css">
<link type="text/css" rel="stylesheet" href="http://www.three.ie/css/jquery.overlay.css">
<link media="screen" type="text/css"  rel="stylesheet" charset="utf-8" href="http://www.three.ie/css/uniform.default.css">
<link media="screen" type="text/css" rel="stylesheet" charset="utf-8" href="http://www.three.ie/css/forms.css">
<link media="screen" type="text/css" rel="stylesheet" charset="utf-8" href="http://www.three.ie/css/priceplans.css">
<?php echo isset($css_for_layout) ? $this->Html->css($css_for_layout) : ""; ?>
<?php echo $this->Html->css('/webtext/css/webtext'); ?>
<script type="text/javascript" src="http://www.three.ie/js/jquery.min.js"></script>
<script type="text/javascript" src="http://www.three.ie/js/js_utilities.js"></script>
<?php echo $this->Html->script('/webtext/js/jquery.functions'); ?>
<?php echo isset($js_for_layout) ? $this->Html->script($js_for_layout): ""; ?>

</head>
<body class="">
<div class="box_Body">
  <?php echo $this->element('header'); ?>
  
  <div class="box_BodyContent">
  	<div id="top_menu">
  		<?php 
  			$links = array();
  			if($this->Session->check('ActiveUser.profile')):
  				$links[] = $this->Html->link('Logout', array("controller" => "users", "action" => "logout", "plugin" => "webtext"));
  				//var_dump($this->Session->read('ActiveUser'));
  			else:
  				$links[] = $this->Html->link('Login', array("controller" => "users", "action" => "login", "plugin" => "webtext"));;
  				$links[] = $this->Html->link('Register', array("controller" => "users", "action" => "register", "plugin" => "webtext"));;
  			endif;
  			echo "<ul>";
  			foreach($links as $l):
  				echo "<li>" . $l . "</li>";
  			endforeach;
  			echo "</ul>";
  		?>
  		<?php  ?>
  		
  	</div>
  	<div id="tab_menu">
  		<ul>
  			<li><?php echo $this->Html->link('Messages', array("controller" => "messages", "action" => "send", "plugin" => "webtext")); ?></li>
  			<li><?php echo $this->Html->link('Contacts & Groups', array("controller" => "contacts", "action" => "index", "plugin" => "webtext")); ?></li>
  			<li><?php echo $this->Html->link('My Webtext', array("controller" => "users", "action" => "index", "plugin" => "webtext")); ?></li>
  		</ul>  		
  	</div>  
  	<div class="clear"></div>	
  	<div class="body_content">
  		<div class="left_col"><?php echo $content_for_layout; ?></div>
  		<div class="right_col"><?php echo $this->element('Site/ad_300_250'); ?></div>
  		<div class="clear"></div>
  	</div>
  	<?php echo $this->element('Users/hub_overview'); ?>
  </div>
</div>
  <?php echo $this->element('footer'); ?>

<div id="js_Overlay" class="js_Overlay">
  <div class="contentWrap"></div>
</div>
<!-- Localized -->
</body>
</html>