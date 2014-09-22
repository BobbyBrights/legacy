<?php
/*
  Template Name: Home Page - (new design)
 */
?>
<?php get_header(); ?> 
<!--Start Slider Wrapper-->
<div class="slider-wrapper-container">
    <div class="container_24">
        <div class="grid_24">
            <div class="slider-wrapper">
		<!--
                <?php if (bizway_get_option('bizway_first_head') != '') { ?>
                    <h1><?php echo stripslashes(bizway_get_option('bizway_first_head')); ?></h1>
                <?php } else { ?>
                    <h1><?php _e('Easy &amp; Flexible to Use WordPress Theme','bizway'); ?></h1>
                <?php } ?>    
                <?php if (bizway_get_option('bizway_second_head') != '') { ?>
                    <h2><?php echo stripslashes(bizway_get_option('bizway_second_head')); ?></h2>
                <?php } else { ?>
                    <h2><?php _e('The header area consists of the area for putting up your own fullwidth banner which can include Address details.','bizway'); ?></h2>
                <?php } ?>
		-->
                <div class="flexslider">
                    <ul class="slides">
                        <?php
                        //The strpos funtion is comparing the strings to allow uploading of the Videos & Images in the Slider
                        $mystring1 = bizway_get_option('bizway_slideimage1');
                        $value_img = array('.jpg', '.png', '.jpeg', '.gif', '.bmp', '.tiff', '.tif');
                        $check_img_ofset = 0;
                        foreach ($value_img as $get_value) {
                            if (preg_match("/$get_value/", $mystring1)) {
                                $check_img_ofset = 1;
                            }
                        }
                        // Note our use of ===.  Simply == would not work as expected
                        // because the position of 'a' was the 0th (first) character.                            
                        ?>
                        <?php if ($check_img_ofset == 0 && bizway_get_option('bizway_slideimage1') != '') { ?>
                            <li><?php echo bizway_get_option('bizway_slideimage1'); ?></li>
                        <?php } else { ?> 
                            <li>
                                <?php if (bizway_get_option('bizway_slideimage1') != '') { ?>
                                    <a href="<?php echo bizway_get_option('bizway_slidelink1'); ?>"><img  src="<?php echo bizway_get_option('bizway_slideimage1'); ?>" alt=""/></a>
                                <?php } else { ?>
                                    <a href="#"><img  src="<?php echo get_template_directory_uri(); ?>/images/slide1.jpg" alt=""/></a>
                                <?php } ?></li>
                        <?php } ?>  
                         <?php
                        //The strpos funtion is comparing the strings to allow uploading of the Videos & Images in the Slider
                        $mystring2 = bizway_get_option('bizway_slideimage2');
                        $value_img = array('.jpg', '.png', '.jpeg', '.gif', '.bmp', '.tiff', '.tif');
                        $check_img_ofset = 0;
                        foreach ($value_img as $get_value) {
                            if (preg_match("/$get_value/", $mystring2)) {
                                $check_img_ofset = 1;
                            }
                        }
                        // Note our use of ===.  Simply == would not work as expected
                        // because the position of 'a' was the 0th (first) character.                            
                        ?>
                        <?php if ($check_img_ofset == 0 && bizway_get_option('bizway_slideimage2') != '') { ?>
                            <li><?php echo bizway_get_option('bizway_slideimage2'); ?></li>
                        <?php } else { ?> 
                            <li>
                                <?php if (bizway_get_option('bizway_slideimage2') != '') { ?>
                                    <a href="<?php echo bizway_get_option('bizway_slidelink2'); ?>"><img  src="<?php echo bizway_get_option('bizway_slideimage2'); ?>" alt=""/></a>
                                <?php } else { ?>
                                    <a href="#"><img  src="<?php echo get_template_directory_uri(); ?>/images/slide2.jpg" alt=""/></a>
                                <?php } ?></li>
                        <?php } ?>  
                    </ul>
                </div>      
                <div class="slider-shaddow"></div>             
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>
<!--End Body Wrapper-->
<!--Start main Wrapper-->
<div class="main-content-container">
    <div class="container_24">
        <div class="grid_24">
            <div class="main-content"> 
                
               
               
               
               <div class="grid_sub_8 sub_alpha">
                    <div class="page-item first-item view view-ninth">
                     <h1><a href="/kitchens">Fitted Kitchens</a></h1>
                                                                            <a href="/kitchens"><img class="effect" src="/files/2012/08/kitchens.jpg"></a>
                         
                                                    
                            <div class="mask mask-1"></div>
                            <div class="mask mask-2"></div>
                         
                                                   
                    </div>
                </div>
                
                <div class="grid_sub_8 sub_middle">
                    <div class="page-item item-two view view-ninth">
                                                    <h1><a href="/stone-cladding">Cladding</a></h1>
                                                                            <a href="/stone-cladding"><img class="effect" src="/files/2012/08/cladding.jpg"></a>
                         
                                                  
                    </div>
                </div>
                
                <div class="grid_sub_8 sub_omega">
                    <div class="page-item last-item view view-ninth">
                                                  <h1><a href="/composite-decking">Composite Decking</a></h1>
                                                                            <a href="/composite-decking"><img class="effect" src="/files/2012/07/composite-decking.jpg"></a>
                                                   
                         
                    </div>
                </div>
                
                <div class="grid_sub_8 sub_alpha">
                    <div class="page-item first-item view view-ninth">
                                                    <h1><a href="/doors">Doors</a></h1>
                                                                            <a href="/doors"><img class="effect" src="/files/2012/08/doors.jpg"></a>
                            <div class="mask mask-1"></div>
                            <div class="mask mask-2"></div>
                         
                                                   
                         
                    </div>
                </div>
                
                <div class="grid_sub_8 sub_middle">
                    <div class="page-item item-two view view-ninth">
                                                    <h1><a href="/flooring">Flooring</a></h1>
                                                                            <a href="/flooring"><img class="effect" src="/files/2012/08/flooring.jpg"></a>
                         
                                                    
                         
                    </div>
                </div>
                
                <div class="grid_sub_8 sub_omega">
                    <div class="page-item last-item view view-ninth">
                                                   <h1><a href="/windows">Windows</a></h1>
                                                                            <a href="/windows"><img class="effect" src="/files/2012/07/windows.jpg"></a>
                         
                                                    
                    </div>
                </div>
                
                
                
                
            </div>      
        </div>
        <div class="clear"></div>
    </div>
</div>
<!--End main Wrapper-->
<?php get_footer(); ?>