<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 */
?>
<?php get_header(); ?>
<div class="page-heading-container">
    <div class="container_24">
        <div class="grid_24">
            <div class="page-heading">
            </div> 
        </div>
        <div class="clear"></div>
    </div>
</div>
<!--Start Page Content -->
<div class="page-content-container">
    <div class="container_24">
        <div class="grid_24">
            <div class="page-content">
                <div class="grid_sub_24 sub_alpha">
                    <div class="content-bar">
                        <!-- Start the Loop. -->
                        <?php if (have_posts()) : the_post(); ?>
                                <!--post start-->
                                <div class="post single">
                                    <h1 class="post_title"><?php the_title(); ?></h1> 
                               
                                    <div class="post_content"> 
                                        <?php the_content(); ?>
                                        <div class="clear"></div>
                                        <?php if ( has_tag() ) { ?>
                                            <div class="tag">
                                                <?php the_tags('Post Tagged with ', ', ', ''); ?>
                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                                <!--End Post-->
                                <!-- #nav-single -->
							
                        <?php else: ?>
                            <div class="post">
                                <p>
                                    <?php _e('Sorry, no posts matched your criteria.', 'bizway'); ?>
                                </p>
                            </div>
                        <?php endif; ?>
                        <!--End Loop-->
                        <!--Start Comment box-->
                        <?php //comments_template(); ?>
                        <!--End Comment box-->
                    </div>    
                </div>
             
            </div>    
        </div>
        <div class="clear"></div>
    </div>    
</div>
<?php get_footer(); ?>