<?php get_header(); ?>

    <div class="container">
      
      <div class="row">
        <div class="span8">
    	
    	<?php $term = $wp_query->queried_object; ?>
    	<h1><?php echo $term->name; ?></h1>
    	<?php if ( have_posts() ) : ?>
    	<?php while ( have_posts() ) : the_post(); ?>
    	<div class="single-prop">
    		<?php if (has_post_thumbnail( $post->ID ) ): ?>
			<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'prop-thumb' ); ?>
 			<img src="<?php echo $image[0]; ?>" class="pull-left prop-image" />
			<?php endif; ?>
			
	    	<h4><?php echo the_title(); ?></h4>
	    	<?php the_excerpt(); ?>
	    	<a class="btn bt-primary" href="<?php echo the_permalink(); ?>">View prop</a>
    	</div>
    	<div class="clearfix"></div>
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, there are no props in this category.'); ?></p>
    	<?php endif; ?>
        </div>
        <div class="span4">
    		<?php get_sidebar('taxonomy'); ?>
        </div>
      </div>

<?php get_footer(); ?>