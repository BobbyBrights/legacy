<?php get_header(); ?>

    <div class="container marketing">


      <div class="row">
        <div class="span8 page-content">
        
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<h1><?php the_title(); ?></h1>
    	<?php the_content(); ?>
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    	<?php endif; ?>
        </div>
        
        <div class="span4">
        	<?php get_sidebar(); ?>
        </div>
      </div>
      
      
      
    </div>
    
    
	 <div class="container footer-div">

<?php get_footer(); ?>