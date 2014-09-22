<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo bloginfo( 'name' ); ?><?php if (!is_home()): echo " - " . get_the_title(); endif; ?> </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <?php $s = isset($_REQUEST['s']) ? 's' : ''; ?>
    <!-- Le styles -->
	<link href='http://fonts.googleapis.com/css?family=Oxygen:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Lobster+Two:700italic' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/styles.<?php echo $s; ?>css">
	<?php wp_head(); ?>
	
  </head>
<?php 
	$post_type_class = get_post_type();
	if( $post_type_class != '' ):
		$post_type_class = 'post-type-' . $post_type_class;	
	endif; 
	if(!empty($wp_query->queried_object) && !empty($wp_query->queried_object->taxonomy)):
		$post_type_class .= ' taxonomy-'.$wp_query->queried_object->taxonomy; 
	endif;
?>
<body class="<?php echo $post_type_class; ?>">

    <!-- Part 1: Wrap all page content here -->
    <div id="wrap">
    <?php $menu = wp_get_nav_menu_items( 'primary-nav'); ?>
    <?php //vomit($menu); ?>
    <div class="navbar navbar-pixie navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <i class="icon-th-large"></i>
          </button>
          <a class="brand" href="/"><i class="icon-leaf "></i> <?php echo bloginfo( 'name' ); ?></a>
          <div class="nav-collapse collapse">
            <?php 
			    wp_nav_menu( array(
			        'menu'       => 'primary-nav',
			        'depth'      => 2,
			        'container'  => false,
			        'menu_class' => 'nav',
			        'fallback_cb' => 'wp_page_menu',
			        //Process nav menu using our custom nav walker
			        'walker' => new wp_bootstrap_navwalker())
			    );
			?>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
