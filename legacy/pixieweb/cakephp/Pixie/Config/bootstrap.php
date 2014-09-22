<?php
	Router::connect('/pixie/home', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'pixie', 'home'));
	Router::connect('/pixie/about', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'pixie', 'about'));
?>