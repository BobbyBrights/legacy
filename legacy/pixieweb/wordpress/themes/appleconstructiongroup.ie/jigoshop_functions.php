<?php 
function mytheme_open_jigoshop_content_wrappers()
{
	
	echo '<div class="page-heading-container">
    <div class="container_24">
        <div class="grid_24">
            <div class="page-heading">
                <h1 class="page-title"><?php the_title(); ?></h1>
            </div> 
        </div>
        <div class="clear"></div>
    </div>
</div>
<!--End Page Heading -->
<!--Start Page Content -->
<div class="page-content-container">
    <div class="container_24">
        <div class="grid_24">
            <div class="page-content">
                <div class="grid_sub_24 sub_alpha">
                    <div class="content-bar">  
     ';
}

function mytheme_close_jigoshop_content_wrappers()
{
	echo '</div>
                    </div>                
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>';
}

function mytheme_prepare_jigoshop_wrappers()
{
    remove_action( 'jigoshop_before_main_content', 'jigoshop_output_content_wrapper', 10 );
    remove_action( 'jigoshop_after_main_content', 'jigoshop_output_content_wrapper_end', 10);

    add_action( 'jigoshop_before_main_content', 'mytheme_open_jigoshop_content_wrappers', 10 );
    add_action( 'jigoshop_after_main_content', 'mytheme_close_jigoshop_content_wrappers', 10 );
}
add_action( 'wp_head', 'mytheme_prepare_jigoshop_wrappers' );

?>