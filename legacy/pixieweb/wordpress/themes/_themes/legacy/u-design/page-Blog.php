<?php
/**
 * @package WordPress
 * @subpackage U-Design
 */
/**
 * Template Name: Blog page
 */


get_header();

global $more; $more = 0; // Enable 'more tag' for this page
global $post;
// get the page id outside the loop (check if WPML plugin is installed and use the WPML way of getting the page ID in the current language)
$page_id = ( function_exists('icl_object_id') && function_exists('icl_get_default_language') ) ? icl_object_id($post->ID, 'page', true, icl_get_default_language()) : $post->ID;
$content_position = ( $udesign_options['blog_sidebar'] == 'left' ) ? 'grid_16 push_8' : 'grid_16';
if ( $udesign_options['remove_blog_sidebar'] == 'yes' ) $content_position = 'grid_24';

$exclude_portfolio_from_blog = $udesign_options['exclude_portfolio_from_blog'];

//adhere to paging rules
if ( get_query_var('paged') ) {
    $paged = get_query_var('paged');
} elseif ( get_query_var('page') ) { // applies when this page template is used as a static homepage in WP3+
    $paged = get_query_var('page');
} else {
    $paged = 1;
}

if ( $exclude_portfolio_from_blog == 'yes' ) {
    // get the portfolio categories to be excluded from the Blog section
    $portfolio_categories = $udesign_options['portfolio_categories'];
    $portfolio_cats_array = explode(',', $portfolio_categories);
    function add_minus_prefix( $var ) {
	return( '-' . $var);
    }
    $portfolio_cats_array_with_minus = array_map( "add_minus_prefix", $portfolio_cats_array );
    $portfolio_cats_with_minus = implode(',', $portfolio_cats_array_with_minus);
    $query_string = "cat=$portfolio_cats_with_minus&paged=$paged";
} else {
    $query_string = "paged=$paged";
}

query_posts( $query_string );

?>
<div id="content-container" class="container_24">
    <div id="main-content" class="<?php echo $content_position; ?>">
	<div class="main-content-padding">
<?php	    if (have_posts()) :
		while (have_posts()) : the_post(); ?>
		    <div <?php post_class() ?> id="post-<?php the_ID(); ?>">
			<div class="entry">
                            <div class="post-top">
                                <h2><a href="<?php the_permalink(); ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
                                <div class="postmetadata">
                                    <span>
<?php                                   if( $udesign_options['show_postmetadata_author'] == 'yes' ) :
                                            printf( __('By %1$s on %2$s ', 'udesign'), '</span>'.get_the_author_link().'<span>', get_the_date() );
                                        else :
                                            printf( __('On %1$s ', 'udesign'), get_the_date() );
                                        endif; ?>
                                    </span> &nbsp; / &nbsp; <span><?php the_category(', '); ?></span> &nbsp; / &nbsp; <?php comments_popup_link( __( 'Leave a comment', 'udesign' ), __( '1 Comment', 'udesign' ), __( '% Comments', 'udesign' ) ); ?> <?php edit_post_link(__('Edit', 'udesign'), '<div style="float:right;margin:0 10px;">', '</div>'); ?> 
<?php                               echo ( $udesign_options['show_postmetadata_tags'] == 'yes' ) ? the_tags(__('<div>Tags: ', 'udesign'), ', ', '</div>') : ''; ?>
                                </div>
                            </div>
                            <div class="clear"></div>

<?php                       // BEGIN Post Image
                            $post_image_url = get_post_meta($post->ID, 'post_image', true); // Grab the preview image from the custom field 'post_image', if set.
                            if ( !$post_image_url && has_post_thumbnail( $post->ID ) ) {
                                $tmp_image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
                                $post_image_url = $tmp_image[0];
                            }
                            
			    if ( $post_image_url ) : 
                                if ( $udesign_options['enable_custom_featured_image'] == 'yes' ) : 
                                    // Customize the dimension and alignment of the 'Featured Image' ...
                                    if( $udesign_options['force_image_dimention'] == 'yes' ) : 
                                        //... by a function defined in 'function.php' specifically for this theme using TimThumb
                                        echo customized_featured_image( $page->ID, $post_image_url, $udesign_options['featured_image_width'], $udesign_options['featured_image_height'], $udesign_options['featured_image_alignment'] );
                                    else : 
                                        //... by the default WP 'the_post_thumbnail()' function which doesn't stretch images if they are smaller
                                        echo the_post_thumbnail( array($udesign_options['featured_image_width'], $udesign_options['featured_image_height']), array('class' => $udesign_options['featured_image_alignment']) );
                                    endif;
                                else : ?>
                                    <div class="post-image-holder pngfix">
                                        <div class="post-image">
                                            <span class="post-hover-image pngfix"> </span>
                                            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><img class="hover-opacity" src="<?php echo get_bloginfo("template_directory"); ?>/scripts/timthumb.php?src=<?php echo $post_image_url; ?>&amp;w=570&amp;h=172&amp;zc=1&amp;q=90" alt="<?php the_title_attribute(); ?>" /></a>
                                        </div>
                                    </div>
<?php                           endif;
			    endif;
                            // END Post Image ?>
                            
<?php			    if ( $udesign_options['show_excerpt'] == 'yes' ) {
				the_excerpt(); //display the excerpt
			    } else {
				the_content('');  //display the default content, the empty string ('') is to remove the default "more" link
			    }
			    if ( $udesign_options['blog_button_text'] ) : ?>
<?php                           echo do_shortcode('[read_more text="'.$udesign_options['blog_button_text'].'" title="'.$udesign_options['blog_button_text'].'" url="'.get_permalink().'" align="left"]'); ?>
				<div class="clear"></div>
<?php			    endif; ?>
			</div><!-- end entry -->
		    </div>
                    <?php echo do_shortcode('[divider_top]'); ?>
<?php		endwhile; ?>

		<div class="clear"></div>

<?php		// Pagination
		if(function_exists('wp_pagenavi')) :
		    wp_pagenavi();
		else : ?>
		    <div class="navigation">
			    <div class="alignleft"><?php previous_posts_link() ?></div>
			    <div class="alignright"><?php next_posts_link() ?></div>
		    </div>
<?php		endif; ?>

<?php	    else : ?>
		<h2 class="center"><?php esc_html_e('Not Found', 'udesign'); ?></h2>
		<p class="center"><?php esc_html_e("Sorry, but you are looking for something that isn't here.", 'udesign'); ?></p>
<?php		get_search_form();
	    endif;
	    //Reset Query
	    wp_reset_query(); ?>
            
            <?php edit_post_link(__('Edit this page', 'udesign'), '<div style="float:right;margin:0 10px;">', '</div>'); ?>

	</div><!-- end main-content-padding -->
    </div><!-- end main-content -->

<?php	if( ( !$udesign_options['remove_blog_sidebar'] == 'yes' ) && sidebar_exist('BlogSidebar') ) { get_sidebar('BlogSidebar'); } ?>

</div><!-- end content-container -->

<div class="clear"></div>

<?php

get_footer();


