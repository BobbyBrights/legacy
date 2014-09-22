<!DOCTYPE html>
<html lang="en" ng-app>
<head>
    <meta charset="utf-8">
    <title><?php if(is_home()): ?>pixiewebdesign.net<?php else: ?><?php echo get_the_title(); ?><?php endif; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content=""><!-- Le styles -->
    <link href="<?php echo get_stylesheet_uri(); ?>" rel="stylesheet" type="text/css"><!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="../assets/js/html5shiv.js"></script>
    <![endif]-->
    <?php wp_head();  ?>
</head>
<?php 
	$post_type_class = get_post_type();
	if( $post_type_class != '' ):
		$post_type_class = 'post-type-' . $post_type_class;	
	endif; 
	if(!empty($wp_query->queried_object)):
		$post_type_class .= ' taxonomy-'.$wp_query->queried_object->taxonomy; 
	endif;
?>
<body class="<?php echo $post_type_class; ?>">
    <div id="wrap">
        <!-- Begin page content -->
        <?php include('menu.php'); ?>