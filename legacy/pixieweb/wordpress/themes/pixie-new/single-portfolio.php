<?php get_header(); ?>
<div class="container portfolio-single">
	
    <!-- Section for each page -->	<article class="span9">
	<?php if (have_posts()) : the_post(); ?>
	
	<div class="page-header">
	    <h1><?php echo get_the_title(); ?> <span class="pull-right social-icons"><a href="#"><i class="icon-twitter-sign"></i></a> <a href="#"><i class="icon-facebook-sign"></i></a> <a href="#"><i class="icon-google-plus-sign"></i></a> <a href="#"><i class="icon-envelope"></i></a></span></h1>
	</div>
	<?php echo get_the_post_thumbnail($page->ID, 'portfolio-masthead-image'); ?>
	<p class="lead"><?php the_content(); ?></p>
	</article>
	<?php get_sidebar('portfolio'); ?>
	<?php //var_dump($post); ?>
	<?php else: ?><?php _e('Sorry, no posts matched your criteria.', 'pixiewebdesign.net'); ?><?php endif; ?>
</div>
<?php get_footer(); ?>