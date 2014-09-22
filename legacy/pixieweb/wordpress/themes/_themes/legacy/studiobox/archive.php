<?php
/**
 * @WordPress StudioBox Page
 */
get_header();

?>

	<?php if (have_posts()) : ?>

		<div id="categorytitle">
		<?php the_title(); ?>
		</div>

		<?php get_sidebar(); ?>
		
		<?php while (have_posts()) : the_post(); ?>
		
			<div id="contents" class="twocolumn">

				<?php the_content(); ?>
			</div>
		
		<?php endwhile; ?>
	
	<?php endif; ?>
		
		<div class="clear"></div>
		
	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>