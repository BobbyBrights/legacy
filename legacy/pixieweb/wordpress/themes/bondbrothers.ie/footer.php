

  	<div class="row-fluid rich-footer">
  		<div class="container">
  			<div class="row">
  				<div class="span4"><h4>Follow us</h4><hr/>
  					<?php 
						$args = array( 'post_type' => 'blog', 'showposts' => 1 );
						$loop = new WP_Query( $args );
						if($loop->have_posts()):
						while ( $loop->have_posts() ) : $loop->the_post();
							echo 'Latest blog item: <a href="';
							the_permalink();
							echo '">';
							the_title();
							echo '</a>';
						endwhile; 
						endif;
					?>
					<hr/>
	  				<a href="/newsletter"><i class="icon-envelope"></i> Newsletter signup</a><br/>Stay in touch for exclusive offers.
	  				<hr/>
	  				<div class="social-icons">
	  					
	  					<a href=""><i class="icon-facebook"></i></a><a href=""><i class="icon-twitter"></i></a>  <a href=""><i class="icon-linkedin"></i></a><br/>Connect with us on social networks.
	  				</div>
  				</div>
  				<div class="span4"><h4>Get in touch</h4><hr/><p><i class="icon-phone"></i> <a href="tel:+35319579035">+353 1 9579035</a></p><p><i class="icon-envelope-alt"></i> <a href="#">info@bondbrothers.com</a></p><p><i class="icon-location-arrow"></i> <a href="https://www.google.com/maps?t=m&q=22+Donnybrook+Road%2C+Donnybrook%2C+Dublin+4&output=classic&dg=opt">22 Donnybrook Road, Donnybrook, D4</a>
  				</p><p>Store Opening hours: <br/>
	  				10am-6pm | Monday to Saturday<br/>
Open late Thursdays until 8pm <br/>
Appointment recommended for Saturdays and Thursday nights<br/>

  				</p></div>
  				<div class="span4"><h4>Find us on Google Maps</h4><hr/><a href="https://www.google.com/maps?t=m&q=22+Donnybrook+Road%2C+Donnybrook%2C+Dublin+4&output=classic&dg=opt"><img src="http://maps.googleapis.com/maps/api/staticmap?center=22 Donnybrook Road, Donnybrook, Dublin 4&zoom=16&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C53.322363,-6.236719&sensor=false" /></a></div>
  				
  			</div>
  			<div class="row footer">
  				<nav id="footer-nav">
  			<?php   
              wp_nav_menu( 
              	array(
              		'menu' => 'footer-nav', 
              		'theme_location' => 'footer',
              		'container' => false, 
              		'menu_class' => '',
              		'depth' => 0
              	));               	
              ?>              
			  	</nav>
  			</div>
  		</div>
  	</div>
	<?php wp_footer(); ?>
  </body>
</html>
