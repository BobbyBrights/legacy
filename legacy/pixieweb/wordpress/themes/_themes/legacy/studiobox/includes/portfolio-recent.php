<?php while (have_posts()) : the_post(); $recordcount++; ?>

<?php $image=get_post_meta($post->ID, $key, true); ?>
<?php $video=get_post_meta($post->ID, $vkey, true); ?>
<?php $gallery=true; ?>


<?php if ($image!=="") { ?>
			
			
			<?php if ($recordcount==1 && $page_num==0) { ?>
			
				<div class="subcategorytitle">
				Most recent work
				</div>

				<div id="recentportfolio">
					<div class="recent-portfolioitem recentportfoliobg">
						<?php if ($video<>"") { ?>
							<a class="lboxvideo" rel="studiolightbox" title="<?php the_title(); ?>" href="<?php echo $video; ?>">
						<?php } else { ?>
							<a rel="studiolightbox" title="<?php the_title(); ?>" href="<?php echo $image; ?>">
						<?php } ?>
							<img class="fade" src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;h=260&amp;w=460&amp;zc=1" alt="<?php the_title(); ?>" />
						</a>
					</div>
					<div class="recent-contentblock">
						<div class="recent-title">
							<a href="<?php the_permalink() ?>"><?php the_title(); ?></a>
						</div>
						<div class="recent-highlight">
						<?php $highlight=get_post_meta($post->ID, "highlight", true); ?>
						<?php echo substr($highlight, 0,125); ?>
						</div>
						<div class="recent-description">
						<?php echo substr(get_the_excerpt(), 0,347); ?>
						</div>
					</div>
				<div class="clear"></div>
				</div>
				
			
			<?php } else { $pcount++; ?>
			

				<?php if ($recordcount==2 && $page_num==0) { 
				
				$gallerydisplayed=true; ?>
				
				<div class="subcategorytitle">
				Other works
				</div>		

				<?php } ?>
				
				<?php if ($pcount==1) { 
				
				$portfolio_row_end=false; $gallerydisplayed=true;?> 
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
								<img class="fade" src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;h=<?php echo $pheight; ?>&amp;w=<?php echo $pwidth; ?>&amp;zc=1" alt="<?php the_title(); ?>" />
							</a>
					</div>
				<!-- Contents -->
					<div class="portfoliotitle clear"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></div>
					<div class="portfoliocontents"><?php echo substr(get_the_excerpt(), 0,75); ?></div>

				</div>
			<?php } ?>
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
