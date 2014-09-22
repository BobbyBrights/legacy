<?php
	Router::connect('/eventure', array('controller' => 'events', 'action' => 'index', 'plugin' => 'eventure'));
	Router::connect('/eventure/contact', array('controller' => 'pages', 'action' => 'display', 'plugin' => 'eventure', 'contact'));
?>