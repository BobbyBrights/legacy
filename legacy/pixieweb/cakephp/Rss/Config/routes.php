<?php
	Router::connect('/rss', array('controller' => 'pages', 'action' => 'display', 'plugin' => PLUGIN_SHORT_NAME, 'home'));
	
	// Set up RSS parsing
	Router::parseExtensions('rss');
	