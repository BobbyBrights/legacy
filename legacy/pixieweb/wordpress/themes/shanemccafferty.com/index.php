    <?php get_header(); ?>

    <div class="row">
        <div class="container">
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <div class="col-md-8">
                <h1><?php the_title(); ?></h2>
                <?php the_content(); ?>
            </div>
            <div class="col-md-4">
                <?php get_sidebar(); ?>
            </div>
            <?php endwhile; else: ?>
            <div class="col-md-12">
                <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
            </div>
            <?php endif; ?>
        </div><!-- /.container -->
    </div>
    <?php get_footer(); ?>
