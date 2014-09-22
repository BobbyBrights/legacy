<?php
	use UnitedPrototype\GoogleAnalytics;
	define('_GAT_STR',			'UA-37718223-1');
	
	require_once('autoload.php'); // Autoload namespaced classes
	function ga_init($a) {
	    global $post;
	    //var_dump($post->post_name);
		// Initilize GA Tracker
		$tracker = new GoogleAnalytics\Tracker(_GAT_STR, 'www.fixtures.ie');
		
		// Assemble Visitor information
		// (could also get unserialized from database)
		$visitor = new GoogleAnalytics\Visitor();
		$visitor->setIpAddress($_SERVER['REMOTE_ADDR']);
		$visitor->setUserAgent($_SERVER['HTTP_USER_AGENT']);
		$visitor->setScreenResolution('1024x768');
		
		// Assemble Session information
		// (could also get unserialized from PHP session)
		$session = new GoogleAnalytics\Session();
		
		// Assemble Page information
		$page = new GoogleAnalytics\Page('/' . $post->post_name);
		$page->setTitle($post->post_title);
		
		// Track page view
		$tracker->trackPageview($page, $session, $visitor);
	}
	add_action('wp_footer', 'ga_init', 100);
?>