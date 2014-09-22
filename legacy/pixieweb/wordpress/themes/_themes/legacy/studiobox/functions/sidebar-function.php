<?php
if ( function_exists('register_sidebar') ){
	register_sidebar(array(
			'name' => 'Sidebar',
			'before_widget' => '<div class="sidebaropts">',
			'after_widget' => '</div>',
			'before_title' => '<div class="sidebartitle">',
			'after_title' => '</div>'
		)
	);

	register_sidebar(array(
			'name' => 'Home Image',
			'id' => 'home-image',
			'before_widget' => '<div id="main-image">',
			'after_widget' => '</div>',
			'before_title' => '',
			'after_title' => '',
		)
	);
	
	register_sidebar(array(
			'name' => 'Homepage Content',
			'id' => 'homepage-content-area',
			'before_widget' => '',
			'after_widget' => '',
			'before_title' => '<span class="identifier hidden">',
			'after_title' => '</span>',
		)
	);
	
	register_sidebar(array(
			'name' => 'News Area On Homepage',
			'id' => 'news-area',
			'before_widget' => '',
			'after_widget' => '',
			'before_title' => '<h3>',
			'after_title' => '</h3>',
		)
	);
	
	
}
?>