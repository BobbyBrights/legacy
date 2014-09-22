<?php // "Specific Child Menus" v1.01

/*	Author: Adam Meyer | www.apmeyer.com | @apmeyer on twitter

	Feel free to use this code in your wordpress templates.
	The purpose of this code is to generate a navigational menu
	that expands to only display child pages for the page being viewed
*/

// We're assigning this page's post ID to a new variable
// this just makes it a little more obvious later when we
// need to use this value
$thisPageID = $post->ID;

// The function below will be used to recursively build
// child menus for parent pages

// BEGIN FUNCTION getChildMenu()
function getChildMenu($parent) {

	// in the loop below we'll be relying on data outside the function
	// so we need to pull those global variables in
	global $wpdb;
	global $thisPageID;
	global $ancestors;

	// we'll be building a string throughout this function
	// the 'return' variable will contain that string
	$return = '';

	// query the posts table in the wordpress database
	// for published pages with the specified parent
	$querystr = "
	SELECT * FROM $wpdb->posts
	WHERE post_status = 'publish'
	AND post_type = 'page'
	AND post_parent = $parent
	ORDER BY menu_order";

	// get query results
		$pageposts = $wpdb->get_results($querystr, OBJECT);

	// if there are results let's make a menu!
	if ($pageposts) {

		$return = '<ul class="list_Menu_Sidebar">';

		//loop through the query results to build our nested child menus
		foreach ($pageposts as $post):

			// wordpress function to prepare the posts...
			// basically it enables us to use certain tags/functions
			setup_postdata($post);
			$return .= '<li><a href="';
			$return .= get_permalink($post->ID);
			$return .= '">';
			$return .= get_the_title($post->ID);
			$return .= '</a>';

			// use the wp_list_pages function to determine whether or not this page has children
			$children = wp_list_pages("title_li=&child_of=".$post->ID."&echo=0");

			// if this list item represents the page being viewed
			// and the page has children, display them
			// OR
			// if this list item has a parent and this list item's
			// ID is a part of the current page's ancestor array, display the child menu
			if(($children && $post->ID == $thisPageID) || ($post->post_parent && in_array($post->ID, $ancestors)) ){
				$return .= getChildMenu($post->ID);
			}

			$return .= '</li>';

		endforeach;

		// and, we're done generating the string that contains our child menus
		$return .= '</ul>';

		//
		return $return;
	}
} // END FUNCTION getChildMenu()

// START Displaying Menu
// we'll be using the getChildMenu() function within this section of code
// to recursively generate child menus (if there are any) for these pages 

// YES this page has at least one parent
if ($post->post_parent){

	// Create an array containing ancestors of the current page
	$ancestors = get_post_ancestors($post->ID);
	// How many ancestors are there?
	$root = count($ancestors)-1;
	// specify the root parent (the eldest grandparent)
	$rootParent = $ancestors[$root];

	// query the posts table in the wordpress database
	// for published pages with the specified parent
	$querystr = "
	SELECT * FROM $wpdb->posts
	WHERE post_status = 'publish'
	AND post_type = 'page'
	AND post_parent = $rootParent
	ORDER BY menu_order";

	// get query results
		$pageposts = $wpdb->get_results($querystr, OBJECT);

	// if there are results, let's make a menu!
	if ($pageposts) {

		// alter the CSS here if you need to use a different class, or if you need to assign an ID
		echo '<ul class="sidebar_nav">';

		// loop through the posts and display each child page as a list item
		foreach ($pageposts as $post):
			setup_postdata($post);

			//list top level parents
			echo '<li><a href="';
			echo the_permalink();
			echo '"';

			// keep level 2 parent "selected" by adding CSS class
			if ($post->ID == $thisPageID || in_array($post->ID, $ancestors)){
			 	echo ' class="activeMenuItem"';
			}

			echo '>';
			echo get_the_title($post->ID);
			echo '</a>';

			// use the wp_list_pages function to determine whether or not this page has children
			$children = wp_list_pages("title_li=&child_of=".$post->ID."&echo=0");

			// if this list item represents the page being viewed
			// and the page has children, display them
			// OR
			// if this list item has a parent and this list item's ID is a
			// part of the current page's ancestor array, display the child menu
			if( ($children && $post->ID == $thisPageID) || ($post->post_parent && in_array($post->ID, $ancestors)) ){
				//display children as list
				echo getChildMenu($post->ID);
			}

			echo '</li>';

		endforeach;
	}

// NO this page does not have a parent
} else {

	// if we are at the absolute root level then no child menus should be displayed
	// so, it's easiest to just use the wordpress wp_list_pages function to display the menu
	echo '<ul class="sidebar_nav">';
	wp_list_pages('title_li=&depth=1&sort_column=menu_order&child_of='.$thisPageID);
	echo '</ul>';

} // END Displaying Menu

?>
