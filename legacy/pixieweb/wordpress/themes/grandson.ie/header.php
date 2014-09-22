<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Grandson.ie - Print and digital services, based in Dundalk, Co. Louth.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Stephen McElhinney">

   <!-- Le styles -->
	<link href="<?php echo get_template_directory_uri(); ?>/flatstrap/assets/css/bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo get_template_directory_uri(); ?>/css/grandson.css" rel="stylesheet">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body class="<?php echo is_home() || is_front_page() ? 'home-page' : basename( $post->post_name ) ; ?>">