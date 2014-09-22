<?php 
add_action('save_post', 'save_custom_meta'); 

// Save the Data  
function save_custom_meta($post_id) {  
    $p = get_post_type($post_id);
    $fields = array();
    global $foo_meta_fields, $course_meta_fields; 
    
    switch($p){
	    case "foo":
	    	$fields = $foo_meta_fields;
	    	break;
	    case "course":
	    	$fields = $course_meta_fields;
	    	break;
    }
    
    // verify nonce  
/*
    if (!wp_verify_nonce($_POST['custom_meta_box_nonce_' . $p], basename(__FILE__))){
        var_dump($post);
        return $post_id;  
    }
*/
    // check autosave  
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)  
        return $post_id;  
    // loop through fields and save the data  
    foreach ($fields as $field) {     	
        $old = get_post_meta($post_id, $field['id'], true);  
        $new = $_POST[$field['id']];  
        if ($new && $new != $old) {  
            update_post_meta($post_id, $field['id'], $new);  
        } elseif ('' == $new && $old) {  
            delete_post_meta($post_id, $field['id'], $old);  
        }  
    } // end foreach  
}  
 