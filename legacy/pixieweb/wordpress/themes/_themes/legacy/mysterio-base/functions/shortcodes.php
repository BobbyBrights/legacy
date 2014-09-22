<?php
add_filter( 'widget_text', 'shortcode_unautop');
add_filter( 'widget_text', 'do_shortcode', 11);
add_shortcode('recent_posts',		'show_recent_posts');
add_shortcode('home_thumb',			'show_home_thumb');

function show_recent_posts($a, $c){
	extract(shortcode_atts(array(
		'type' => 'blog'
	), $a));
	// There is no content in this shortcode, at least there shouldnt be!
	$args = array( 'numberposts' => '5', 'post_type' => $type );
	$recent_posts = wp_get_recent_posts( $args );
	foreach( $recent_posts as $recent ){
		echo '<h2><a href="' . get_permalink($recent["ID"]) . '" title="Look '.esc_attr($recent["post_title"]).'" >' .   $recent["post_title"].'</a></h2>';
		echo '<p class="excerpt">'.$recent["post_excerpt"].'<br/><span>Published: '.$recent["post_date"].'</span></p>';		
		echo '<hr/>';
	}
}

function show_home_thumb($a, $c){
	extract(shortcode_atts(array(
		'img' => '',
		'caption_title' => 'Something goes here',
		'first_link_text' => 'More',
		'first_link_href' => '#'
	), $a));
?>
		<li class="span<?php echo intval(12 / intval( count_sidebar_widgets('modules', false) ) ) ;?>">
			<div class="thumbnail">
			  <img data-src="holder.js/300x200" alt="300x200" style="width: 300px; height: 200px;" src="<?php echo ""; ?>">
			  <div class="caption">
			    <h3><?php echo $caption_title; ?></h3>
			    <p><?php echo do_shortcode($c); ?></p>
			    <p><a href="<?php echo $first_link_href; ?>" class="btn btn-primary"><?php echo $first_link_text; ?></a> <a href="<?php echo $first_link_href; ?>" class="btn">Action</a></p>
			  </div>
			</div>
		</li>
<?php
}

?>