<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Decade Darlings</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,600,300' rel='stylesheet' type='text/css'>
    <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/decadedarlings.css" rel="stylesheet">
<!--     <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap-responsive.css" rel="stylesheet"> -->

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="../assets/js/html5shiv.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>

    <div class="container-narrow">
	    <section class="row-fluid logo">
	    	<img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" />
	    </section>
	   <?php include('menu.php'); ?>