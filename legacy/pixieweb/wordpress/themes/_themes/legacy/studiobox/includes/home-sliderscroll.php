<?php
$height=200; // Accoridon image height
$width=940;	// Accoridon image width
?>
<!-- Accordion Featured Block -->
<?php if ($studiobox_sliderfeat<>"") { ?> 
<!-- Featured Block -->
<div class="slideshowgallery">
	<div id="loopedSlider">	
		<div class="container">
			<div class="slides">
				<!-- For each additional image Add an extra Pagination -->
				
				<?php query_posts( 'cat=' . m_get_category_id($studiobox_sliderfeat) . '&posts_per_page=10' ); ?>
				<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
				<?php $image=get_post_meta($post->ID, $key, true); ?>
				<?php $count++; ?>
				
				<!-- For each additional image Add an extra Pagination -->
				<div>
					
					<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
						<?php echo resizeimage ($image,$height,$width,$quality, 1 , $post->post_title, $class="" ); ?>
					</a>
					
					<span class="slidecaption captionfade">
						<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
								<?php echo substr(get_the_excerpt(), 0,162); ?>
						</a>
					</span>
					
				</div>
							
				<?php endwhile; endif; ?>				
			</div>
		</div>
		<!-- Featured Arrows -->
		<a href="#" class="previous"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/slider/previous.png" alt="Previous" /></a>
		<a href="#" class="next"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/slider/next.png" alt="Next" /></a>
		<ul class="pagination" style="width: <?php echo 25*$count;?>px;">
			<?php
			for ( $counter = 1; $counter <= $count; $counter++ ) {
				if ($counter==1) {
				echo '<li class="active"><a rel="'.$counter.'" href="#">'.$counter.'</a></li>';
				} else {	
				echo '<li><a rel="'.$counter.'" href="#">'.$counter.'</a></li>';
				}
			}
			?>
		</ul>
		<!-- Featured Pagination -->
		<!-- 
		To equip more than Six pagination points Edit the slider.css in the CSS folder
		Locate ul.pagination
		And increase the pixel width to center the pagination with the image
		-->
	
	</div>
</div>
<?php } ?>
<!-- End of Featured Block -->