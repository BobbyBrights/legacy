<?php get_header(); ?>
    <div class="container-fluid <?php echo is_home() ? 'no-padding' : 'with-top-padding'; ?>">
    
    <!-- Section for each page -->	
	<?php if (have_posts()) : the_post(); ?>
	<div class="span9">
	<div class="page-header post-<?php echo sanitize_title(get_the_title()); ?>">
	    <h1><i class="icon-tags icon-large"></i> <?php echo get_the_title(); ?></h1>
	</div>
	<p class="lead"><?php the_content(); ?></p>
	</div>
	<?php get_sidebar('blog'); ?>
	<?php //var_dump($post); ?>
	<?php else: ?><?php _e('Sorry, no posts matched your criteria.', 'pixiewebdesign.net'); ?>
	<?php endif; ?>
    </div> <!-- /container -->
<?php get_footer(); ?>