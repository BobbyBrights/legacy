<?php

if(! function_exists('vomit') ) {
	function vomit($msg){
		echo "<pre>" . print_r($msg, 1) . "</pre>";
	}
	
}