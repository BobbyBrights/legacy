<?php
$height=200; // Accoridon image height
$width=786;	// Accoridon image width
?>
<!-- Accordion Featured Block -->
<?php if ($studiobox_accordionfeat<>"") { ?> 
	<div id="hc1" class="haccordion">
		<ul>
			<?php 
				//query_posts( 'cat=' . m_get_category_id($studiobox_accordionfeat) . '&posts_per_page=4' ); 
				$args = array("meta_key" => "show_in_slider", "meta_value" => "true", "posts_per_page" => "4");	
				query_posts( $args );
			?>
			<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
			<?php $image=get_post_meta($post->ID, $key, true); ?>
			<li>
				<div class="hpanel">
					<!-- Image -->
					<div class="hpanelimage">
						<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
							<?php the_post_thumbnail('slider-image', array("title" => get_the_title()));?>
						</a>
					</div>
					<!-- Caption -->
					<div class="hpanelcaption captionfade">
						<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
							<?php echo substr(get_the_excerpt(), 0,162); ?>
						</a>
					</div>
				</div>
			</li>
			<?php endwhile; endif; ?>
		</ul>
	</div>
<?php } ?>
<!-- End of Featured Block -->