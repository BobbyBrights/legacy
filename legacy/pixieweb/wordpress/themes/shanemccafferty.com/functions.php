<?php
// Enable featured images
add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size( 300, 300, true ); // default Post Thumbnail dimensions (cropped)

// additional image sizes
// delete the next line if you do not need additional image sizes
add_image_size( 'category-thumb', 300, 9999 ); //300 pixels wide (and unlimited height)

require_once('includes/app-post-type.php');
require_once('includes/app-store-url.php');


if(!function_exists('vomit')){
    function vomit($msg){
        echo "<pre>" . print_r($msg, 1) . "</pre>";
    }
}