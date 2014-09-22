<?php
/*
Template Name: Fullwidth Template
*/
?>

<?php get_header(); ?>

	<?php if (have_posts()) : ?>

		<div id="fullwidth-categorytitle">
		<?php the_title(); ?>
		</div>
		
		<?php while (have_posts()) : the_post(); ?>
		
			<div id="contents">
				<?php the_content(); ?>
			</div>
		
		<?php endwhile; ?>
	
	<?php endif; ?>
		
		<div class="clear"></div>
		
	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>