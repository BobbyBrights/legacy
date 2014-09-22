<?php $gallery=true; ?>


<!-- Use Built in Wordpress Gallery attatchements for Page Gallery -->
<?php $gallerydisplayed=true;?>					
<div id="gallerycontents">
	<div class="slideshowgallery">
		<div id="main_image"></div>
		<ul class="gallery_unstyled">
		<?php while (have_posts()) : the_post(); ?>
			<?php $image=get_post_meta($post->ID, $key, true); ?>
			<?php if ($image!=="") { ?>
				<?php
				$count++; 
				if ($count==1) { 
				?>
					<li class="active">
					<?php } else { ?>
					<li>
				<?php } ?>
				
						<img src="<?php echo $image; ?>" title="<?php the_title(); ?>" alt="<?php the_permalink() ?>" longdesc="<?php the_title(); ?>" />

					</li>
			<?php } ?>
		<?php endwhile; ?>
		</ul>
	</div>
	<div class="clear"></div>
	<div class="marginbottom"></div>	
</div>


</div>



