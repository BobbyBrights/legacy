<?php
/**
 * JobRoller Sidebars
 * This file defines sidebars for widgets.
 *
 *
 * @version 1.0
 * @author AppThemes
 * @package JobRoller
 *
 */

// Initialize all the sidebars so they are widgetized
function jr_sidebars_init() {
    if (!function_exists('register_sidebars'))
        return;

    register_sidebar(array(
        'name'          => __('Main Sidebar','appthemes'),
        'id'            => 'sidebar_main',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));

    register_sidebar(array(
        'name'          => __('Blog Sidebar','appthemes'),
        'id'            => 'sidebar_blog',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));

    register_sidebar(array(
        'name'          => __('Page Sidebar','appthemes'),
        'id'            => 'sidebar_page',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));

    register_sidebar(array(
        'name'          => __('Job Sidebar','appthemes'),
        'id'            => 'sidebar_job',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));

	register_sidebar(array(
        'name'          => __('User Sidebar','appthemes'),
        'id'            => 'sidebar_user',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));

    register_sidebar(array(
        'name'          => __('Submit Job Sidebar','appthemes'),
        'id'            => 'sidebar_submit',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));
    
    register_sidebar(array(
        'name'          => __('Resume Sidebar','appthemes'),
        'id'            => 'sidebar_resume',
        'description'   => '',
        'before_widget' => '<li id="%1$s" class="widget %2$s"><div>',
        'after_widget'  => '</div></li>',
        'before_title'  => '</div><h2 class="widget_title">',
        'after_title'   => '</h2><div class="widget_content">',
    ));
	
}
// tell WordPress to add these to the theme
add_action( 'init', 'jr_sidebars_init' );


// include the submit a job sidebar button via a hook
function jr_sidebar_sjob() {
	if ('resume' == get_post_type() || is_post_type_archive('resume') || is_tax( 'resume_specialities' ) || is_tax( 'resume_groups' ) || is_tax( 'resume_languages' ) || is_tax( 'resume_specialities' ) || is_tax( 'resume_category' ) || is_tax( 'resume_job_type' ) ) :
		get_template_part( 'includes/sidebar-sresume' );
	else :
		get_template_part( 'includes/sidebar-sjob' );
	endif;
}
// hook into the correct action
add_action('appthemes_before_sidebar_widgets', 'jr_sidebar_sjob');


