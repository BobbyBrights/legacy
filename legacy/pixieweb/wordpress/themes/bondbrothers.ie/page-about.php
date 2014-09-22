<?php get_header(); ?>

  	
  	<div class="row-fluid page-content">
  		<div class="container">

  			
  			<div class="row">
  				<div class="span3">
	  				<?php get_sidebar(); ?>
	  			</div>
	  			<div class="span9">
	  				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	  					<h1><?php the_title(); ?></h1><hr/>
	  					<div id="about-content">
	  					<?php the_content(); ?>
	  					</div>
	  					<img src="<?php echo get_template_directory_uri(); ?>/images/about.jpg" class="float-right" />
	  				<?php endwhile; else: ?>
	  				<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
	  				<?php endif; ?>

	  			</div>
	  				  			
  			</div>
  		
  			
  		</div>
  	</div>
  	

<?php get_footer(); ?>