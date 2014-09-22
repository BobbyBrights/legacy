<?php get_header(); ?>
        <div class="container-fluid page-content top-part">
            <div class="container"></div>
        </div>

        <div class="container bottom-part">
            <div class="row-fluid">
                <div class="span9">
                    <?php if (have_posts()) : the_post(); ?>

                    <div class="page-header">
                        <h1><?php echo get_the_title(); ?></h1>
                    </div>

                    <p class="lead"><?php the_content(); ?></p><?php //var_dump($post->post_type); ?><?php if($post->post_type == 'blog'): comments_template(); endif;?><?php else: ?><?php _e('Sorry, no posts matched your criteria.', 'pixieweb'); ?><?php endif; ?>
                </div>
                <?php get_sidebar('blog'); ?>
             </div>
        </div>
<?php get_footer(); ?>