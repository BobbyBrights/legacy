<?php get_header(); ?>
<div class="container <?php echo is_home() ? 'no-padding' : 'with-top-padding'; ?>">
<?php
	if(have_posts()): while (have_posts()) { the_post(); ?>

	<section class="story" data-speed="8" data-type="background" id="<?php echo sanitize_title(get_the_title()); ?>">
		<?php the_content(); ?>
	</section><?php
	}
	endif;
	?>
</div><!-- /container -->
<?php get_footer(); ?>