<?php

/**
 * Display or retrieve the current post thumbnail from a custom field
 * or image attached to the post.
 *
 * @param string $num_cols Optional. Specifies the number of columns for the Portfolio page template layout.
 * @param string $width Optional. The width of the thumbnail in px.
 * @param string $height Optional. The height of the thumbnail in px.
 * @param bool $echo Optional, default to true. Whether to display or return.
 * @return string HTML string if $echo parameter is false.
 */
function get_portfolio_item_thumbnail( $num_cols='3', $width='260', $height='160', $echo = true ) {

    global $udesign_options, $post;
    $portfolio_default_thumb = get_bloginfo('template_url') . '/styles/common-images/portfolio-default-thumb.jpg';
    $portfolio_item_thumb = get_post_meta($post->ID, 'portfolio_item_thumb', true);
    $portfolio_item_preview = get_post_meta($post->ID, 'portfolio_item_preview', true); // Grab the preview item from the custom field 'portfolio_item_preview', if set.
    $portfolio_item_link = get_post_meta($post->ID, 'portfolio_item_link', true);
    $portfolio_item_link_target = ( get_post_meta($post->ID, 'portfolio_item_link_target', true) == '_blank' ) ? ' target="_blank"' : '';
    if ( $portfolio_item_link )  {
        $rel_attr = '';
        $preview_item = $portfolio_item_link;
    } else {
        $rel_attr = ' rel="wp-prettyPhoto[portfolio]"';
        $preview_item = $portfolio_item_preview;
    }
    $preview_item_title = get_post_meta($post->ID, 'portfolio_item_preview_title', true); // Grab the preview item title the custom field 'portfolio_item_preview_title', if set.
    $output = '';

    if ( function_exists('get_the_image') ) { // the case when "Get The Image" plugin is available (installed and activated)
	    $portfolio_thumb_as_array = get_the_image( array(
				'meta_key' => array('portfolio_item_thumb'),
				'format' => 'array',
				'size' => 'full',
				'default_image' => $portfolio_default_thumb,
				'link_to_post' => false,
				'image_scan' => true,
			    ) );
	    if ( $preview_item == '' && ( $portfolio_thumb_as_array[src] != $portfolio_default_thumb ) ) { $preview_item = $portfolio_thumb_as_array[src]; }
	    if ( $preview_item ) { // if preview item is available, go ahead and generate the thumbnail as a link
		$output .= '<span class="portfolio-zoom-image-'.$num_cols.'-col pngfix"> </span>';
		$output .= '<a'.$rel_attr.' href="'.$preview_item.'" title="'.$preview_item_title.'"'.$portfolio_item_link_target.'><img class="hover-opacity" src="'.get_bloginfo("template_directory").'/scripts/timthumb.php?src='.$portfolio_thumb_as_array[url].'&amp;w='.$width.'&amp;h='.$height.'&amp;zc=1&amp;q=90" width="'.$width.'" height="'.$height.'" alt="'.$portfolio_thumb_as_array[alt].'" /></a>';
	    } else { // if preview item is NOT available, generate a thumbnail that is NOT a link
		$output .= '<span class="portfolio-zoom-image-'.$num_cols.'-col pngfix"> </span>';
		$output .= '<img class="hover-opacity" src="'.get_bloginfo("template_directory").'/scripts/timthumb.php?src='.$portfolio_thumb_as_array[url].'&amp;w='.$width.'&amp;h='.$height.'&amp;zc=1&amp;q=90" width="'.$width.'" height="'.$height.'" alt="'.esc_attr__('Preview item is not available!.', 'udesign').'" />';
	    }

    } else { // the case when "Get The Image" plugin is NOT available
	    if ( !$portfolio_item_preview ) { // Check if an image is found in the post and assign it as the large preview image.
		if ( function_exists('get_image_url') && findImage() ) {
		    $portfolio_item_preview = get_image_url();
                    if ( !$preview_item ) { // when there's no preview_item nor a link specified but the image can be pulled from the content
                        $preview_item = $portfolio_item_preview; 
                    }
		}
	    }
	    if( $portfolio_item_thumb ) { // thumbnail is provided
		if ( $preview_item ) { // if preview item is available, go ahead an link it to the thumbnail.
		    $output .= '<span class="portfolio-zoom-image-'.$num_cols.'-col pngfix"> </span>';
		    $output .= '<a'.$rel_attr.' href="'.$preview_item.'" title="'.$preview_item_title.'"'.$portfolio_item_link_target.'><img class="hover-opacity" src="'.get_bloginfo("template_directory").'/scripts/timthumb.php?src='.$portfolio_item_thumb.'&amp;w='.$width.'&amp;h='.$height.'&amp;zc=1&amp;q=90" width="'.$width.'" height="'.$height.'" alt="'.get_the_title().'" /></a>';
		} else { // if preview item is NOT available, generate a thumbnail that is NOT a link
		    $output .= '<span class="portfolio-zoom-image-'.$num_cols.'-col pngfix"> </span>';
		    $output .= '<img class="hover-opacity" src="'.get_bloginfo("template_directory").'/scripts/timthumb.php?src='.$portfolio_item_thumb.'&amp;w='.$width.'&amp;h='.$height.'&amp;zc=1&amp;q=90" width="'.$width.'" height="'.$height.'" alt="'.esc_attr__('Preview image not available!.', 'udesign').'" />';
		}
	    } elseif ( $preview_item ) { // auto generate thumbnails
		$output .= '<span class="portfolio-zoom-image-'.$num_cols.'-col pngfix"> </span>';
		$output .= '<a'.$rel_attr.' href="'.$preview_item.'" title="'.$preview_item_title.'"'.$portfolio_item_link_target.'><img class="hover-opacity" src="'.get_bloginfo("template_directory").'/scripts/timthumb.php?src='.$portfolio_item_preview.'&amp;w='.$width.'&amp;h='.$height.'&amp;zc=1&amp;q=90" width="'.$width.'" height="'.$height.'" alt="'.get_the_title().'" /></a>';
	    } else { // Display default thumbnail image
		$output .= '<span class="portfolio-zoom-image-'.$num_cols.'-col pngfix"> </span>';
		$output .= '<img class="hover-opacity" src="'.get_bloginfo("template_directory").'/scripts/timthumb.php?src='.$portfolio_default_thumb.'&amp;w='.$width.'&amp;h='.$height.'&amp;zc=1&amp;q=90" alt="'.esc_attr__("Default Image", 'udesign').'" width="'.$width.'" height="'.$height.'" />';
	    }
    }
    if ( $echo )
	echo $output;
    else
	return $output;
}


