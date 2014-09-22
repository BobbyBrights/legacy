<?php
//add_filter( 'widget_text', 'shortcode_unautop');
add_filter( 'widget_text', 'do_shortcode', 11);

// Actual shortcodes
add_shortcode('recent_posts',		'show_recent_posts');
add_shortcode('ang_contact_form',	'angular_contact_form');

function show_recent_posts($a, $c){
	extract(shortcode_atts(array(
		'type' => 'blog'
	), $a));
	// There is no content in this shortcode, at least there shouldnt be!
	$args = array( 'post_type' => $type );
	$icon_class = $type == 'blog' ? 'icon-bookmark-empty' : 'icon-folder-close-alt';
	$recent_posts = wp_get_recent_posts( $args );
	
	$str  = ''; 
	
	foreach( $recent_posts as $recent ){
	
		switch($type):
			case 'blog': 
				$str .= '<article class="ribbon '.$type.'"><h2><i class="'.$icon_class.'"></i>&nbsp;<a href="' . get_permalink($recent["ID"]) . '" title="Look '.esc_attr($recent["post_title"]).'" >' .   $recent["post_title"].'</a></h2><p class="excerpt">'.$recent["post_excerpt"].'<br/><span class="muted small">Published: '.$recent["post_date"].'</span></p><a class="btn btn-small btn-info pull-right blog-link" href="' . get_permalink($recent["ID"]) . '" title="'.esc_attr($recent["post_title"]).'">Read more <i class="icon-circle-arrow-right"></i></a><div class="clearfix"></div></article>';
				break;
			case 'portfolio': 
				$str .= '<article class="'.$type.' pf-bg-'.$recent["ID"].'"><h2>'.$recent["post_title"].'</h2><p class="excerpt">'.$recent["post_excerpt"].'</p><a class="call-to-action" href="' . get_permalink($recent["ID"]) . '" title="'.esc_attr($recent["post_title"]).'">Read more <i class="icon-circle-arrow-right"></i></a></article>';
				break;
			default:
				break;
		endswitch;
	
	}
	return $str;
}

function angular_contact_form($a, $c){
	return '##ANGULAR_CONTACT_FORM_WIDGET##';
}

?>