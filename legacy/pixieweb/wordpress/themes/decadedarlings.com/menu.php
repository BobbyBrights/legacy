
<div class="nav-collapse collapse primary-nav">
<div class="navbar">
  <div class="navbar-inner">
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
  </div>
</div>
</div>
<!--/.nav-collapse -->