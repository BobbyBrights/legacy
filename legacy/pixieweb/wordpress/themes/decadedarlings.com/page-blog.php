<?php get_header(); ?>  
	<h1>Blog Entries</h1>
    <section id="page-content" class="blog-posts">
    	<?php $args = array( 'post_type' => 'blog' )?>
    	<?php query_posts( $args );?>
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<article class="summary">
    		
    		<?php if(has_post_thumbnail()): the_post_thumbnail(array('class' => 'article-post-thumbnail')); endif; ?>
    		<h2><?php the_title(); ?></h2>
    		<p><?php the_excerpt(); ?></p>
    		<p><a href="<?php the_permalink(); ?>">Read more</a></p>
    		
    	</article>
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    	<?php endif; ?>
    </section>
    <section class="rhs">
    	
    </section>
<?php get_footer(); ?>