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
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/styles.<?php echo $s; ?>css">
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/home.<?php echo $s; ?>css">
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
	<?php global $stories; ?>
    <?php $stories = array(); ?>
    <?php $menu = wp_get_nav_menu_items( 'primary-nav'); ?>
    <?php //vomit($menu); ?>
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand<?php echo is_front_page() ? ' scroll' : ''; ?>" href="<?php echo !is_front_page() ? '/' : ''; ?>#home"><i class="icon-leaf "></i> <?php echo bloginfo( 'name' ); ?></a>
          <div class="nav-collapse collapse">
            <ul class="nav">
	          <?php 	          	
	          	foreach($menu as $m):
	          		if($m->menu_item_parent == 0): 
	          			$u = $m->url; 
	          			$c = ''; 
	          			if($m->type == 'post_type'):
	          				//$stories[] = $m->object_id;
	          				//$u = (!is_front_page() ? '/' : '') . '#' . sanitize_title(get_the_title($m->object_id)); 
	          				//$c = is_front_page() ? 'scroll' : ''; 
	          			endif;
	          ?>
              	<li><a href="<?php echo $u; ?>" class="<?php echo $c; ?>"><?php echo $m->title; ?></a></li>
              <?php 
              		endif; 
              	 endforeach; ?>
              
              
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
