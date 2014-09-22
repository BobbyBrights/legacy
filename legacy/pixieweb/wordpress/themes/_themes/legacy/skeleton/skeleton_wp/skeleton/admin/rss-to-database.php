<?php
define('FOOTBALL_BLOG_ID', 2);
//

require('/home/wp_admin/simplepie/simplepie.inc');
require('/home/wp_admin/wordpress/wp-blog-header.php');
switch_to_blog(FOOTBALL_BLOG_ID);
global $wpdb;

// Clean up 
$wpdb->query('DELETE FROM wp_' .FOOTBALL_BLOG_ID. '_posts WHERE post_type = "news_item";');

$xml = "http://www.3football.ie/xsl/rss.xml";
$feed = new SimplePie($xml);
$count = 0;
foreach ($feed->get_items() as $item):
	$my_post = array(
		'post_title' => $item->get_title(),
		'post_content' => $item->get_description(),
		'post_status' => 'publish',
		'post_author' => 1,
		'post_type' => 'news_item'
	);
// Insert the post into the database
wp_insert_post( $my_post );
$count++;
endforeach;

restore_current_blog();
echo "Updated " . $count . " items.";
?>