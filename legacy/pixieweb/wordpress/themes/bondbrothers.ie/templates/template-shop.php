<?php
/*
Template Name: Shop Home
*/

get_header(); ?>
  	<div class="row-fluid page-content shop-home">
  		<div class="container">
  			<div class="row">
  				<div class="span3">
  					<ul>
  					<?php dynamic_sidebar( 'shop-homepage-left' ); ?>
  					</ul>
  				</div>
  				<div class="span9">
	  				<?php dynamic_sidebar( 'shop-homepage-carousel' ); ?>
	  				<?php dynamic_sidebar( 'shop-homepage-angels' ); ?>
  					<h2>Recent products</h2>
  					<?php echo do_shortcode('[recent_products per_page="12" columns="4" pagination="yes"]'); ?>
	  				
  				</div>
  				
  				
  			</div>

  		</div>
  	</div>
 
<?php get_footer(); ?>
