<!DOCTYPE html>
<html>
  <head>
    <title>ten93.ie | Creative consultants. </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="<?php echo get_template_directory_uri(); ?>/assets/styles/brand.css" rel="stylesheet">
    <?php $items = wp_get_nav_menu_items( 'single-page', array() ); ?>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#home"><span>ten93.ie</span></a>
        </div>
        <div class="collapse navbar-collapse pull-right">
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
    <div class="row">
    <?php
        foreach((array) $items as $o){
            $page = get_page($o->object_id);
            echo sprintf("<section id='%s'><div class='container'>%s</div></section>", $page->post_name, wpautop($page->post_content));
        }
    ?>
    </div><!-- /.container -->

    <footer class="row">
        <div class="container">
            &copy; ten93.ie 2014.
        </div>
    </footer>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/scripts/site.js"></script>

  </body>
</html>