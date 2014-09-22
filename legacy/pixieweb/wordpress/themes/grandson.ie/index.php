<?php get_header(); ?>
	<div id="wrap">
	    <div class="row">
			<!-- Top menu bar --> 
			<div id="nav-header">
				<nav id="primary-nav">
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
				</nav>
			
				
			</div>
	    </div><!-- /row -->
	    
	    <div class="row">
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	    		<h1><?php echo the_title(); ?></h1>
	    		<hr />
				<p><?php echo the_content(); ?></p>
	    	<?php endwhile; else: ?>
	    		<p><?php _e('Sorry, no pages matched your criteria.'); ?></p>
	    	<?php endif; ?>
	    
	    
	    
	    </div> <!-- /row -->
		<div id="push"></div>
	</div>
	
	<div id="footer">
      <div class="container">
		<h2>Get in touch</h2>
		<hr/>
		<a href="mailto:hey@grandson.ie">hey@grandson.ie</a>
		<span class="tel">+353 85 7290350</span> 
		<div class="social">
			<a href="http://twitter.com"><i class="icon-twitter"></i></a>
			<a href="http://facebook.com"><i class="icon-facebook"></i></a>
		</div>       
      </div>
    </div>
    
<?php get_footer(); ?>