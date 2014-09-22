<?php
/**
 * @WordPress StudioBox Page
 */
get_header();

?>

	<?php if (have_posts()) : ?>

		<div id="categorytitle">
		</div>

		<?php get_sidebar(); ?>
		
		<?php while (have_posts()) : the_post(); ?>
		
			<div id="contents" class="twocolumn">
				<div id="title">
					Error 404 - Page not found!
				</div>
				<p>The page you're trying to reach does not exist, or has been moved.</p>
				<?php get_search_form(); ?>
			</div>
		
		<?php endwhile; ?>
	
	<?php endif; ?>
		
		<div class="clear"></div>
		
	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>