<?php
$height=200; // Accoridon image height
$width=940;	// Accoridon image width
?>
<!-- Accordion Featured Block -->
<?php if ($studiobox_slideshowfeat<>"") { ?> 
	<!-- Featured Block -->
	<div id="gallerycontents">
		<div class="slideshowgallery">
			<div id="main_image"></div>
			<ul class="gallery_unstyled">
			
				<?php query_posts( 'cat=' . m_get_category_id($studiobox_slideshowfeat) . '&posts_per_page=10' ); ?>
				<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
				<?php $image=get_post_meta($post->ID, $key, true); ?>
				<?php 
					$count++;
					if ($count==1) { 
				?>
					<li class="active">
					<?php } else { ?>
					<li>
				<?php } ?>
				
						<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;h=<?php echo $height; ?>&amp;w=<?php echo $width; ?>&amp;zc=1" title="<?php the_title(); ?>" alt="<?php the_permalink() ?>" longdesc="<?php the_title(); ?>" />

					</li>
							
				<?php endwhile; endif; ?>				
			</ul>
		</div>
	</div>
<?php } ?>
<!-- End of Featured Block -->