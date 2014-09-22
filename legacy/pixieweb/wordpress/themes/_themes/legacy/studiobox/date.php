<?php
/**
 * @Studiobox
 */

get_header();

?>

<?php // Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");
?>

<?php
$vkey="video";
$key="image";
$ttype="type";
$height=$perspective_image_height;
//$width=$photob_image_width;
$width=570;
$gallery=false;
$portfolio=false;
$gcount=0;
$pcount=0;
$pheight=106;
$pwidth=220;

$blogheight=200;
$blogwidth=592;

$gallerydisplayed=false;
?>


	<div id="categorytitle">
				<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
				<?php /* If this is a category archive */ if (is_category()) { ?>
				<?php single_cat_title(); ?>
				<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				Regular Posts Tagged &#8216;<?php single_tag_title(); ?>&#8217;
				<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				Archive for <?php the_time('F jS, Y'); ?>
				<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				Archive for <?php the_time('F, Y'); ?>
				<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				Archive for <?php the_time('Y'); ?>
				<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				Author Archive
				<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				Blog Archives
				<?php } ?>
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