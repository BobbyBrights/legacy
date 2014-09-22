<?php
// StudioBox Footer 
// Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");
?>
	
	<?php
	
	$key="image";
	$height="40";
	$width="40";
	$quality="72";
	?>
	
	
	<!-- Footer start -->
	<div id="footer">
		<div class="footer_logos"><img src="/wp-content/themes/studiobox/images/footer-logos.jpg" class="footer_image" alt="Sponsors Logo" /></div>
		<!--<div id="footerwrap">
		
			<div class="footerminibox">

					 <?php if ( !function_exists('dynamic_sidebar')

					  || !dynamic_sidebar("Footer 1") ) : ?>
					  
					  <?php echo "<div class='footertitle'>No Widget found</div>
								<div class='footertext'>
								Please Add a Footer widget.
								</div>"; ?>

					 <?php endif; ?>
					 
			</div>
			<div class="footerminibox">

					 <?php if ( !function_exists('dynamic_sidebar')

					  || !dynamic_sidebar("Footer 2") ) : ?>
					  
					  <?php echo "<div class='footertitle'>No Widget found</div>
								<div class='footertext'>
								Please Add a Footer widget.
								</div>"; ?>

					 <?php endif; ?>
					 
			</div>
	
			<div class="footerbox footerspace">
			
					<?php if ( !function_exists('dynamic_sidebar')

					  || !dynamic_sidebar("Footer 3") ) : ?>
					  
						<?php
						if ($studiobox_about_id<>"") { ?> 
							<?php $apage = new WP_Query('page_id='.$studiobox_about_id); while ($apage->have_posts()) : $apage->the_post(); $do_not_duplicate = $post->ID; ?>
							
								<div class="footertitle"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></div>
								<div class="footertext">
								<?php if ($studiobox_footerthumb<>"") { ?>
									<div class="aboutimage">
										<img src="<?php echo $studiobox_footerthumb; ?>" alt="photo" />
									</div>
								<?php } ?>
								<?php echo substr(get_the_excerpt(), 0,319); ?> <a href="<?php the_permalink() ?>">more</a>
								</div>
							<?php endwhile; ?>
						<?php } else { echo "<div class='footertitle'>No Widget found</div>
								<div class='footertext'>
								Please Add a Footer widget.
								</div>"; } ?>

					

					<?php endif; ?>
			</div>
			
			<div class="footerbox footerspace">

				
				<?php if ( !function_exists('dynamic_sidebar')

					  || !dynamic_sidebar("Footer 4") ) : ?>
				

				<?php 
				if($studiobox_footerportfolio<>"Disabled") { ?>

					<div class="flickr-box">
						<?php query_posts( 'cat=' . m_get_category_id($studiobox_footerportfolio) . '&posts_per_page=9' ); ?>
						<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
						<?php $image=get_post_meta($post->ID, $key, true); ?>
						<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
							<?php echo resizeimage ($image,$height,$width,$quality, 1 , $post->post_title, $class="" ); ?>
						</a>
						<?php endwhile; endif; ?>	
					</div>

					
				<?php } else { ?>
					 
					<div class="footertitle">No Widget found</div>
								<div class="footertext">
								Please login to WP admin and activate a Widget here.
								</div>

					<?php } ?>
					
					<?php endif; ?>
			</div>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</div>-->
	<div id="footerbarwrap">
	<ul>
		<li>Copyright &copy; 2012 <?php bloginfo(); ?>. All rights reserved.</li>
	</ul>
	<?php echo stripslashes($studiobox_footercode); ?>
	</div>
</div> <!-- Close Container -->
<?php wp_footer(); ?>
<script type="text/javascript"> Cufon.now(); </script>
</body>
</html>
