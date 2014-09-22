<?php get_header(); ?>
        <div class="container-fluid page-content top-part">
            <div class="container"></div>
        </div>

        <div class="container bottom-part">
            <div class="row-fluid">
            	<div class="span9">
				<!-- Start the Loop. -->
				<?php if (have_posts()) : while(have_posts()): the_post(); ?>
				<?php $terms = wp_get_post_terms( $post->ID, 'keywords' ); //vomit($post); ?>
				<article id="project-<?php echo $post->post_name; ?>" class="single-taxonomy-project-type post-<?php echo $post->ID; ?>">
				<h2><?php the_title(); ?></h2>
				<?php the_excerpt(); ?>
				<?php if(sizeof($terms) > 0): ?>
				<div class="terms">
					<?php foreach($terms as $t): ?>
						<span class="label label-info"><?php echo $t->name; ?></span> 
					<?php endforeach; ?>
				</div>
				<?php endif; ?>
				<a href="<?php the_permalink(); ?>" class="btn btn-info">Find out more.</a>
				</article>
				<?php endwhile; else: ?>
				<?php _e('There are currently no projects in this category. Doesnt mean I\'m not working hard though!.', 'mysterio-base'); ?>
				<?php endif; ?>
            	</div>
             <?php get_sidebar(); ?>     
            </div>
<?php get_footer(); ?>