<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
		<title>10ninetythree.com | <?php the_title(); ?></title>
		<meta name="description" content="10 ninety-three - The Creative Consultants. We work with exciting start-ups to help deliver growth.">
		<meta name="keywords" content="creative, design, web, technology, mobile, apps, strategy" />
		<meta name="author" content="Stephen McElhinney" />
		<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/10ninetythree.css" />
		<!-- Latest compiled and minified CSS -->
		<script src="<?php echo get_template_directory_uri(); ?>/js/modernizr.custom.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
		<?php //wp_head(); ?>
	</head>
	<body class="page-<?php the_slug(); ?><?php if(is_front_page()): echo ' front-page'; endif; ?> post-type-<?php echo get_post_type();?>">

