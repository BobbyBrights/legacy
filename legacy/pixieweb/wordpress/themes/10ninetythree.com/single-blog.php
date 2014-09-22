<?php get_header(); ?>
		<!-- Page Content -->
		<div class="container">
			<?php include_once('menu.php'); ?>		
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<div class="page-content">
				<div class="col-md-8">
				<h1><?php the_title(); ?></h1>
				<h3>Posted by <?php the_author(); ?></h3>
				<?php the_content(); ?>
				</div>
				<div class="col-md-4">
					<?php get_sidebar('blog'); ?>
				</div>
			</div>
			<?php endwhile; else: ?>
			<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
			<?php endif; ?>
		</div>
<?php get_footer(); ?>