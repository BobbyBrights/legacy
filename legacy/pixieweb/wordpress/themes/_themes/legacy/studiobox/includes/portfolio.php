<?php while (have_posts()) : the_post(); ?>

<?php $image=get_post_meta($post->ID, $key, true); ?>
<?php $video=get_post_meta($post->ID, $vkey, true); ?>
<?php $gallery=true; ?>

<?php if ($image!=="") { ?>
			<?php $gallerydisplayed=true; $pcount++; ?>
			<?php if ($pcount==1) { $portfolio_row_end=false; ?> 
				<div class="categoryportfoliowrap">
					<div class="portfoliobox"> 
			<?php } else { ?>
					<div class="portfoliobox mportfoliospace">
			<?php } ?>
			
				<!-- Lightbox and image hover -->
				<?php if ($video<>"") { ?> 
					<div class="mportfolio mportfoliobgvideo"> 
				<?php } else { ?> 
					<div class="mportfolio mportfoliobg"> 
				<?php } ?>
							
						<?php if ($video<>"") { ?>
							<a class="lboxvideo" rel="studiolightbox" title="<?php the_title(); ?>" href="<?php echo $video; ?>">
						<?php } else { ?>
							<a rel="studiolightbox" title="<?php the_title(); ?>" href="<?php echo $image; ?>">
						<?php } ?>
								<img class="fade" src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;h=<?php echo $pheight; ?>&amp;w=<?php echo $pwidth; ?>&amp;q=92&amp;zc=1" alt="<?php the_title(); ?>" />
							</a>
					</div>
				<!-- Contents -->
					<div class="portfoliotitle clear"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></div>
					<div class="portfoliocontents"><?php echo substr(get_the_excerpt(), 0,75); ?></div>

				</div>
<?php } ?>
<?php if ($pcount==3) { $portfolio_row_end=true; $pcount=0; ?> <div class="clear"></div></div> <?php } ?>

<?php endwhile; ?>

<?php if ($gallery<>false) { 
	if ($portfolio_row_end==false) { ?>
		</div>
	<?php } 
} ?>

<div class="clear"></div>
<div class="pmarginbottom"></div>

<?php include (TEMPLATEPATH . "/includes/navigation.php"); ?>

<?php if ($gallerydisplayed==true) { //Sometimes a gallery can be empty ?>	
	</div>
<?php } ?>
