<?php 
	Router::connect('/hermes', array('controller' => 'tickets', 'action' => 'index', 'plugin' => 'hermes'));
	Router::connect('/hermes/home', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'hermes', 'home'));
	