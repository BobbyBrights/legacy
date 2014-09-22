<!DOCTYPE html>
<html>
  <head>
    <title>shanemccafferty.com | Freelance iOS Game Developer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="<?php echo get_template_directory_uri(); ?>/assets/styles/brand.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <?php $items = wp_get_nav_menu_items( 'single-page', array() ); ?>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle hidden" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#home"><span><?php bloginfo(); ?></span></a>
        </div>
        <div class="collapse navbar-collapse pull-right hidden">
          <ul class="nav navbar-nav">
            <?php
                foreach((array) $items as $o):
                    $page = get_page($o->object_id);
                    echo sprintf("<li class=''><a href='#%s'>%s</a></li>", $page->post_name, $page->post_title);
                endforeach;
            ?>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>