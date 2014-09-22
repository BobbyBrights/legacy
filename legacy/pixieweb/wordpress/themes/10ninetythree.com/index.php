<?php get_header(); ?>
<?php if(is_front_page()): ?>
	<div id="wrap">
<?php endif; ?>		
		<!-- Page Content -->
		<div class="<?php echo is_page('get-in-touch') || is_page('how-we-work') ? '' : 'container'; ?>">
			<?php include_once('menu.php'); ?>			
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<div class="page-content"><?php the_content(); ?></div>
			<?php endwhile; else: ?>
			<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
			<?php endif; ?>
		</div>
	<!-- End Page Content -->
	<?php if(is_front_page()): ?>
		<div id="push"></div>
	</div>
	<?php 
    query_posts(array( 
        'post_type' => 'blog',
        'showposts' => 1 
    ));  
	?>
	<div id="home-footer">
		<div class="container">
		        <?php if (have_posts()) : the_post(); ?>
		<h2>Latest blog entry - <a href="<?php the_permalink() ?>"><?php the_title(); ?></a>.</h2>
		<?php endif; wp_reset_query(); ?>
		</div>
    </div>
	<?php endif; ?>
<?php get_footer(); ?>