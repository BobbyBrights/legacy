<?php
function register_menu() {
	register_nav_menu('single-page', __('Single Page Layout'));
}
add_action('init', 'register_menu');

if(!function_exists('vomit')){
    function vomit($msg){
        echo "<pre>" . print_r($msg, 1) . "</pre>";
    }
}