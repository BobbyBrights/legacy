<?php
/*
Template Name: 3 of 4 with Right Sidebar
*/

get_header(); ?>

  	
  	<div class="row-fluid page-content">
  		<div class="container">

  			
  			<div class="row">
	  			<div class="span9">
	  				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	  					<?php the_content(); ?>
	  				<?php endwhile; else: ?>
	  				<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
	  				<?php endif; ?>

	  			</div>	
	  			<div class="span3">
	  				<?php get_sidebar($post->post_name); ?>
	  			</div>	
  			</div>
  		
  			
  		</div>
  	</div>
  	

<?php get_footer(); ?>