<?php
//***************Category Exluding script - 
//Enter categories to exclude seperated by commas. $query->set('cat', '-7, -1 , -2');
function exclude_category($query) {
	if ( $query->is_home ) {
		// Get the user choices for the theme.
		$query->set('cat', '');
	}
return $query;
}

add_filter('pre_get_posts', 'exclude_category');
?>