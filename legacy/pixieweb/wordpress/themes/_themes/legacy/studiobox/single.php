<?php
/**
 * @Studiobox Single
 */

get_header();

?>

<?php // Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");
?>

<?php
$sidebarshift=false;
$bigimage=false;
$videocodekey="videoembed";
$gallerykey="postgallery";
$imagekey="image";
$height=0;
$width=600;
$fullwidth=940;
$videoshowcase=false;
$minigallery=true;
$gallery=false;

$i=0;
?>


	<?php if (have_posts()) : ?>
	
		<?php $postgallery=get_post_meta($post->ID, $gallerykey, true); ?>
		<?php $image=get_post_meta($post->ID, $imagekey, true); ?>
		<?php $videocode=get_post_meta($post->ID, $videocodekey, true); ?>
			
		<?php // minigallery can be false and gallery true to be a big gallery
		if ($postgallery == "Big Image") { $sidebarshift=true; $bigimage=true; }
		if ($postgallery == "Mini Gallery") { $minigallery=true; $gallery=true;} 
		if ($postgallery == "Big Gallery") { $sidebarshift=true; $minigallery=false; $gallery=true;}
		if ($postgallery == "Video Embed") { $videoshowcase=true; $gallery=true;}
		if ($postgallery == "Big Video Embed") { $sidebarshift=true; $videoshowcase=true; $gallery=true;}
		?>
		
		<?php if ($sidebarshift) { // One column ?>	
			<div id="fullwidth-categorytitle">
		<?php } else { ?>
			<div id="categorytitle">
		<?php } ?>
			<?php
			$category = get_the_category();
			//echo $category[0]->cat_name;
			?>
			<?php the_title(); ?>
		</div>
		

		<?php if ($sidebarshift) {} else { get_sidebar(); } // Only Show sidebar if the Gallery is not set as a Big Gallery ?>
		
		<?php while (have_posts()) : the_post(); ?>
		

					
					<?php if ( $gallery ) { // echo $postgallery; // Has to be set else only an image will be display - if image is set

						if ($videoshowcase) { 
							?>
							
							<div class="videoembed">
								<?php echo $videocode; ?>
							</div>
							
							<?php
						
						} else {
					
						include (TEMPLATEPATH . "/includes/page-gallery.php");
						
						}
					
					} else { //POST GALLERY End 
					
						if ($image<>"") { 
						
							if ($bigimage) { ?>
							
								<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;w=<?php echo $fullwidth; ?>&amp;zc=1" alt="<?php the_title(); ?>" />
								
								<?php } else { ?>
							
								<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;w=<?php echo $width; ?>&amp;zc=1" alt="<?php the_title(); ?>" />
							<?php } ?>
						<?php } ?>
					<?php } ?>
				
				<?php if ($sidebarshift) get_sidebar();  ?>
				
					<div id="contents" class="twocolumn fwcmargin">
						<!--
						<div class="datecomment">
							<?php the_time('jS M Y') ?><span class="postedin">Posted in: <?php the_category(', ') ?></span>
							<span class="comments"><?php comments_popup_link('0', '1', '%'); ?></span>
						</div>
						
						<div id="title">
							<?php the_title(); ?>
						</div>
						-->
						
						<?php $highlight=get_post_meta($post->ID, "highlight", true); ?>
						<?php if ($highlight<>"") { ?>
							<div id="titleHighlight">
							<?php echo $highlight; ?>
							</div>
						<?php } ?>
						
						<?php the_content(); ?>
						
						<div class="clear"></div>
						
						<div class="thetags">
							<?php the_tags('Tags: ', ', ', '<br />'); ?>
						</div>
						
						<?php
						if ($studiobox_relatedposts=="Enable Related Posts") {
							include (TEMPLATEPATH . "/includes/post-related.php");
						}
						?>

						
						<?php //comments_template(); // Get wp-comments.php template ?>
					</div>
		
		<?php endwhile; ?>
	
	<?php endif; ?>
		
		<div class="clear"></div>
		
		
		
	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>