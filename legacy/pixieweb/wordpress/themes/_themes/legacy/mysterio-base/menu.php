
    <!-- NAVBAR
    ================================================== -->
    <div class="navbar-wrapper">
      <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->
      <div class="container">

        <div class="navbar navbar-fixed-top">
          <div class="navbar-inner navbar-mysterio">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="<?php echo home_url(); ?>">pixiewebdesign.net</a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse primary-nav">
              <?php 

  
              wp_nav_menu( 
              	array(
              		'menu' => 'primary-nav', 
              		'theme_location' => 'primary',
              		'container' => false, 
              		'menu_class' => 'nav', 
              		'walker' => new primary_nav_walker_nav_menu(), 
              		'depth' => 0
              	)); 

              	
              ?>
              
              
            </div><!--/.nav-collapse -->
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->

      </div> <!-- /.container -->
    </div><!-- /.navbar-wrapper -->
    