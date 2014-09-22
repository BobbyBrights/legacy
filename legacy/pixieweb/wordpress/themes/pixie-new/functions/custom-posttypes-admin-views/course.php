<?php
// Field Array
$course_meta_fields = array(
	array(
		'label'=> 'Overview',
		'desc'	=> 'Text overview of the course',
		'id'	=> 'course_overview',
		'type'	=> 'textarea'
	),
	array(
		'label'=> 'Checkbox Input',
		'desc'	=> 'A description for the field.',
		'id'	=> 'course_checkbox',
		'type'	=> 'checkbox'
	),
	array(
		'label'=> 'Select Box',
		'desc'	=> 'A description for the field.',
		'id'	=> 'course_select',
		'type'	=> 'select',
		'options' => array (
			'one' => array (
				'label' => 'Option One',
				'value'	=> 'one'
			),
			'two' => array (
				'label' => 'Option Two',
				'value'	=> 'two'
			),
			'three' => array (
				'label' => 'Option Three',
				'value'	=> 'three'
			)
		)
	),
	array(
		'label'=> 'Price',
		'desc'	=> 'Single one-off course price',
		'id'	=> 'course_price',
		'type'	=> 'text'
	)
);


// The Callback
function show_custom_meta_box_for_course() {
	global $course_meta_fields, $post;
	custom_meta_view($course_meta_fields, "custom_meta_box_nonce_course", wp_create_nonce(basename(__FILE__)), $post);
}

// Remove some metas
function remove_meta_boxes_course() {
  remove_meta_box('postexcerpt', 'course', 'normal');
  remove_meta_box('postcustom' , 'course' , 'normal' ); //removes custom fields for page
  remove_meta_box('slugdiv', 'course', 'normal' );
  remove_meta_box('postdiv', 'course', 'normal' );
  remove_post_type_support('course', 'editor');
  
}
add_action( 'admin_menu', 'remove_meta_boxes_course' );

// Add the Meta Box  
function add_course_desc_meta_box() {  
    add_meta_box(  
        'course_description', // $id  
        'Course Description', // $title   
        'show_custom_meta_box_for_course', // $callback  
        'course', // $page  
        'normal', // $context  
        'high'); // $priority  
}  
add_action('add_meta_boxes', 'add_course_desc_meta_box'); 