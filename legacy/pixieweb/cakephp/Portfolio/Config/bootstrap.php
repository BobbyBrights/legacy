<?php 

if(!function_exists('vomit')):
	function vomit($a, $json = true){
		echo "<pre>" . ($json ? json_encode($a) : print_r($a, 1)) . "</pre>";
	}
endif;


?>