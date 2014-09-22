<?php
add_action('wp_head', 'load_angular');

function load_angular(){
	echo "<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js'></script>";
}
?>