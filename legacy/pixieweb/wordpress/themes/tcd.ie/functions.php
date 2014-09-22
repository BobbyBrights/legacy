<?php
/* Sidebars */
$sidebars = array();
$sidebars[] = array(
	'name' => 'Homepage Top Center Content',
	'id' => 'hp_top_center_content',
	'before_widget' => '',
    'after_widget' => '',
    'before_title' => '',
    'after_title' => '',
); 
$sidebars[] = array(
	'name' => 'Homepage Bottom Center Content',
	'id' => 'hp_bottom_center_content',
	'before_widget' => '',
    'after_widget' => '',
    'before_title' => '',
    'after_title' => '',
); 
if ( function_exists('register_sidebar') ): 
	foreach($sidebars as $s): 
		register_sidebar($s);
	endforeach;
endif;

/* Custom Post Types */
 
    
?>