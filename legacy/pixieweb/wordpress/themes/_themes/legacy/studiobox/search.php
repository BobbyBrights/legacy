<?php
/**
 * @WordPress Studiobox Search Page
 */
get_header();

?>




	

		<div id="categorytitle">
		Search Result for <?php /* Search Count */ $allsearch = &new WP_Query("s=$s&showposts=-1"); $key = wp_specialchars($s, 1); $count = $allsearch->post_count; _e(''); _e('<span class="search-terms">'); echo $key; _e('</span>'); _e(' &mdash; '); echo $count . ' '; _e('articles'); wp_reset_query(); ?>
		</div>
		<?php if (have_posts()) : ?>
		<?php get_sidebar(); ?>
		
<?php
$vkey="video";
$key="image";
$ttype="type";
//$width=$photob_image_width;
$width=570;
$gallery=false;
$portfolio=false;
$gcount=0;
$pcount=0;
$pheight=106;
$pwidth=220;

$blogheight=200;
$blogwidth=600;
?>
		
	<div id="contents" class="twocolumn">
					
		<!-- Blog Post Summary -->
		<?php include (TEMPLATEPATH . "/includes/post-summary.php"); ?>
	
		<?php else : ?>
			<div id="contents">
				<div class="posttitle">Not Found</div>
				<p class="center">Sorry, but you are looking for something that isn't here.</p>
				<?php get_search_form(); ?>
			</div>
		
		<?php endif; ?>
	
		<div class="clear"></div>
		
	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>