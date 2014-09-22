<?php
/*
Template Name: Twelve Column Content Area
*/

get_header(); ?>

    <div class="container marketing">


      <div class="row">
        
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<?php the_content(); ?>
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    	<?php endif; ?>

      </div>
      
      
      
    </div>
    
    
	 <div class="container footer-div">

<?php get_footer(); ?>