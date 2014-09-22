<?php
      register_sidebar(
                array(
                        'name'          => 'Sidebar',
                        'id'            => 'sidebar-1',
                        'description'   => '',
                        'before_widget' => '',
                        'after_widget'  => '',
                        'before_title'  => '<h2>',
                        'after_title'   => '</h2>' )
        );

/** 
* A pagination function 
* @param integer $range: The range of the slider, works best with even numbers 
* Used WP functions: 
* get_pagenum_link($i) - creates the link, e.g. http://site.com/page/4 
* previous_posts_link(' Previous '); - returns the Previous page link 
* next_posts_link(' Next '); - returns the Next page link 
*/  
function sjc_get_pagination($range = 4){  
  // $paged - number of the current page  
  global $paged, $wp_query;  
  // How much pages do we have?  
     $max_page = $wp_query->max_num_pages;  
	 if ( !$max_page ) {  
    $max_page = $wp_query->max_num_pages;  
  }  
  // We need the pagination only if there are more than 1 page  
  if($max_page > 1){  
    if(!$paged){  
      $paged = 1;  
    }  
    // On the first page, don't put the First page link  
   
    // To the previous page  
    previous_posts_link('&#60;&#60;');  
    // We need the sliding effect only if there are more pages than is the sliding range  
    if($max_page > $range){  
      // When closer to the beginning  
      if($paged < $range){  
        for($i = 1; $i <= ($range + 1); $i++){  
          echo "<a href='" . get_pagenum_link($i) ."'";  
          if($i==$paged) echo " class='current'";  
          echo ">$i</a>";  
        }  
      }  
      // When closer to the end  
      elseif($paged >= ($max_page - ceil(($range/2)))){  
        for($i = $max_page - $range; $i <= $max_page; $i++){  
          echo "<a href='" . get_pagenum_link($i) ."'";  
          if($i==$paged) echo " class='current'";  
          echo ">$i</a>";  
        }  
      }  
      // Somewhere in the middle  
      elseif($paged >= $range && $paged < ($max_page - ceil(($range/2)))){  
        for($i = ($paged - ceil($range/2)); $i <= ($paged + ceil(($range/2))); $i++){  
          echo "<a href='" . get_pagenum_link($i) ."'";  
          if($i==$paged) echo " class='current'";  
          echo ">$i</a>";  
        }  
      }  
    }  
    // Less pages than the range, no sliding effect needed  
    else{  
      for($i = 1; $i <= $max_page; $i++){  
        echo "<a href='" . get_pagenum_link($i) ."'";  
        if($i==$paged) echo " class='current'";  
        echo ">$i</a>";  
      }  
    }  
    // Next page  
    next_posts_link('&#62;&#62;');  
    // On the last page, don't put the Last page link  
   
  }  
}  
// add menu support and fallback menu if menu doesn't exist
add_action('init', 'sjc_register_menu');
function sjc_register_menu() {
	if (function_exists('register_nav_menu')) {
	
	register_nav_menu('sjc-main-menu', __('Main Menu'));
	}	

}
function sjc_greenerside_menu() {
	echo '<div id="greendrop"><ul>';
	if ('page' != get_option('show_on_front')) {
		echo '<li><a href="'. home_url() . '/">Home</a></li>';
	}
	wp_list_pages('title_li=');
	echo '</ul></div>';
}
add_theme_support( 'automatic-feed-links' );

if ( ! isset( $content_width ) )
	$content_width = 560; // Should be equal to the width the theme is designed for
	
	function sjc_enqueue_style(){
        global $wp_styles;
        // Register the stylesheets
        wp_register_style( 'sjc-print', get_template_directory_uri() .
'/print.css', false, false, 'print' );
        wp_register_style( 'sjc-ie6', get_template_directory_uri() .
'/ie6.css', false, false, 'screen' );
        wp_register_style( 'sjc-ie7', get_template_directory_uri() .
'/ie7.css', false, false, 'screen' );
        wp_register_style( 'sjc-ie8', get_template_directory_uri() .
'/ie8.css', false, false, 'screen' );
        // Enqueue the stylesheets and include conditional statements
        wp_enqueue_style( 'sjc-print' );
        wp_enqueue_style( 'sjc-ie6' );
        $wp_styles->add_data('sjc-ie6', 'conditional', 'IE 6');
        wp_enqueue_style( 'sjc-ie7' );
        $wp_styles->add_data('sjc-ie7', 'conditional', 'IE 7');
        wp_enqueue_style( 'sjc-ie8' );
        $wp_styles->add_data('sjc-ie8', 'conditional', 'IE 8');
}
add_action( 'wp_print_styles', 'sjc_enqueue_style' );


// Define the variable for the theme path
function sjc_localize_var(){
           return array(
        'js_url' => get_template_directory_uri()
    );
}

// Enqueue the script and include the js variable
function sjc_enqueue_script() {
                wp_enqueue_script('sjc_script',
get_template_directory_uri() .'/imagepicker.js');
                wp_localize_script( 'sjc_script', 'sjc_var',
sjc_localize_var());

                if ( is_singular() && get_option( 'thread_comments' ) )
                        wp_enqueue_script( 'comment-reply' );

}
// This will produce the javascript outside of the admin pages
add_action( 'wp_print_scripts', 'sjc_enqueue_script' );

?>