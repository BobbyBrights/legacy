<?php
	if(!function_exists('vomit')):
		function vomit($msg){
			echo "<pre>" . print_r($msg, 1) . "</pre>";
		}
	endif; 
	
	function utf8replacer($captures) {
	  if ($captures[1] != "") {
	    // Valid byte sequence. Return unmodified.
	    return $captures[1];
	  }
	  elseif ($captures[2] != "") {
	    // Invalid byte of the form 10xxxxxx.
	    // Encode as 11000010 10xxxxxx.
	    return "\xC2".$captures[2];
	  }
	  else {
	    // Invalid byte of the form 11xxxxxx.
	    // Encode as 11000011 10xxxxxx.
	    return "\xC3".chr(ord($captures[3])-64);
	  }
	}
