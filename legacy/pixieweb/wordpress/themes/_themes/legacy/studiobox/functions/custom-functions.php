<?php
/* Remove Wordpress Version */
//remove_action('wp_head', 'wp_generator');
/* Summarize a description based on length */
function shortdescrption ($pageid, $textlen) {
	$apage = new WP_Query('page_id='.$pageid); while ($apage->have_posts()) : $apage->the_post(); $do_not_duplicate = $post->ID;
	$output = substr(get_the_excerpt(), 0,$textlen);
	endwhile;
	return $output;
}

/* Resize images */
function resizeimage ($image,$height,$width,$quality, $crop, $title,$class) {
	if ($class) {
	$output = '<img src="'. get_bloginfo('template_url'). '/timthumb.php?src='. $image .'&amp;h='. $height .'&amp;w='. $width .'&amp;zc=1&amp;q='. $quality .'" alt="'. $title .'" class="'. $class .'"/>';
	} else {
	$output = '<img src="'. get_bloginfo('template_url'). '/timthumb.php?src='. $image .'&amp;h='. $height .'&amp;w='. $width .'&amp;zc=1&amp;q='. $quality .'" alt="'. $title .'"/>';
	}
	return $output;
}


/* Get the Category ID */
function m_get_category_id($cat_name) {
	$categories = get_categories();
	foreach($categories as $category){ //loop through categories
		if($category->name == $cat_name){
			$cat_id = $category->term_id;
			break;
		}
	}
	if (empty($cat_id)) { return 0; }
	return $cat_id;
}
?>