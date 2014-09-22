<?php get_header(); ?>  
    <section id="page-content" class="blog-posts">
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<div class="well-content">
    	<article class="full">
    		<h1><?php the_title(); ?></h1>
    		<p><?php the_content(); ?></p>
    	</article>
    	</div>
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    	<?php endif; ?>
    </section>
    <section class="rhs">
    	
    </section>
<?php get_footer(); ?>