<?php

class themeslug_walker_nav_menu extends Walker_Nav_Menu {

		  
	// add main/sub classes to li's and links
	 function start_el( &$output, $item, $depth, $args ) {
	    global $wp_query;
	    
	    
	    $indent = ( $depth > 0 ? str_repeat( "\t", $depth ) : '' ); // code indent
	  
	    // depth dependent classes
	    $depth_classes = array(
	        ( $depth == 0 ? 'main-menu-item' : 'sub-menu-item' ),
	        ( $depth >=2 ? 'sub-sub-menu-item' : '' ),
	        ( $depth % 2 ? 'menu-item-odd' : 'menu-item-even' ),
	        'menu-item-depth-' . $depth
	    );
	    $depth_class_names = esc_attr( implode( ' ', $depth_classes ) );
	  
	    // passed classes
	    $classes = empty( $item->classes ) ? array() : (array) $item->classes;
	    $class_names = esc_attr( implode( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) ) );
		
		
		// Determine whether this menu has an overlay (mega menu)
		$overlay_menu = '';		
		$meta_values = get_post_custom();
		$meta_values['id'] = $item->post_id;
		$meta_values['ID'] = $item->ID;
		
		//var_dump($meta_values);
		
		//echo print_r($item->post_name, 1);
		
		if(isset($meta_values['my_meta_box_select'])):
			//echo print_r($meta_values['my_meta_box_select'], 1);		
			$oc_id = $meta_values['my_meta_box_select'][0];
			$p = get_post($oc_id); 
			//$overlay_menu = '<div class="overlay-menu">'.$p->post_content.'</div>';
			wp_reset_postdata();
		endif;


		
	    // build html
	    $output .= $indent . '<li id="nav-menu-item-'. $item->ID . '" class="' . $depth_class_names . ' ' . $class_names . '">';
		
	    // link attributes
	    $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
	    $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
	    $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
	    $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';
	    $attributes .= ' class="menu-link ' . ( $depth > 0 ? 'sub-menu-link' : 'main-menu-link' ) . '"';
	  
	    $item_output = sprintf( '%1$s<a%2$s>%3$s%4$s%5$s</a>%6$s%7$s',
	        $args->before,
	        $attributes,
	        $args->link_before,
	        apply_filters( 'the_title', $item->title, $item->ID ),
	        $args->link_after,
	        $overlay_menu,
	        $args->after
	    );
	  
	    // build html
	    $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	    
	}
}