<?php
add_filter( 'show_admin_bar', 'hide_admin_bar_from_front_end' );

if(! function_exists('vomit') ) {
	function vomit($msg){
		echo "<pre>" . print_r($msg, 1) . "</pre>";
	}	
}

function hide_admin_bar_from_front_end(){
  if (is_blog_admin()) {
    return true;
  }
  return false;
}


