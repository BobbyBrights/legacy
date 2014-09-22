<?php
/**
 * @Studiobox Sidebar
 */
?>

<?php // Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");
?>



	<!-- begin sidebar -->

	<?php
	
	if (is_single()) {
	
		$postgallery=get_post_meta($post->ID, "postgallery", true);
		// minigallery can be false and gallery true to be a big gallery
		if ($postgallery == "Big Image") { $sidebarshift=true; $bigimage=true; }
		if ($postgallery == "Mini Gallery") { $minigallery=true; $gallery=true;} 
		if ($postgallery == "Big Gallery") { $sidebarshift=true; $minigallery=false; $gallery=true;}
		if ($postgallery == "Video Embed") { $videoshowcase=true; $gallery=true;}
		if ($postgallery == "Big Video Embed") { $sidebarshift=true; $videoshowcase=true; $gallery=true;}
	} else {
		$sidebarshift=false;
	}
	?>
	
		<?php if ($sidebarshift) { ?>
		<div id="sidebarshift">
		<?php } else { ?>
		<div id="sidebar">
		<?php } ?>
			<form method="get" id="searchform" action="<?php bloginfo('home'); ?>/">
			<p><input type="text" value="" name="s" id="s" class="right" onfocus="if(this.value=='Search...')this.value = '';" onblur="if(this.value=='')this.value = '';" /></p>
			</form>
			
			<?php if ($studiobox_sidebarcatlist=="Enable Category List" ) { ?>
		
			<div class="sidebartitle">Categories</div>
			<div class="sidebaropts">
				<ul>
				<?php
				wp_list_categories('sort_column=name&optioncount=0&exclude='.$studiobox_exclude_cat.'&title_li='); // exclude categories by entering category value. eg. exclude=1,2,6,11
				?>
				</ul>
			</div>
			
			<div class="clear"></div>
			
			<?php } ?>
			
			<!-- begin Popular Posts 
			
			<?php if ($studiobox_popular=="Enable Popular Posts" ) { $popular=false; ?>
			
			<div class="sidebartitle">Popular</div>
			<div class="sidebarpopular">
				<ul>
					<?php $result = $wpdb->get_results("SELECT comment_count,ID,post_title FROM $wpdb->posts ORDER BY comment_count DESC LIMIT 0 , 5");
					foreach ($result as $post) {
					setup_postdata($post);
					$postid = $post->ID;
					$title = $post->post_title;
					$commentcount = $post->comment_count;
					if ($commentcount != 0) { $popular=true; ?>
					<li class="popularimage">
						<a href="<?php echo get_permalink($postid); ?>" title="<?php echo $title ?>">
							<?php
							$popularimage=get_post_meta($post->ID, "image", true);
							if ($popularimage<>"") { ?>
								<img src="<?php bloginfo('template_directory'); ?>/timthumb.php?src=<?php echo $popularimage; ?>&amp;h=40&amp;w=80&amp;zc=1" alt="" />
							<?php } ?>
						</a>
					</li>
					<li class="populardesc">
						<a href="<?php echo get_permalink($postid); ?>" title="<?php echo $title ?>">
							<?php echo $title ?>
						</a>
					</li>
					<li class="popclear">
					</li>
					<?php } } 
					wp_reset_query();?>
					<?php if ($popular==false) { echo "<li>No Populars yet!</li>"; } ?>
				</ul>
			</div>
			<?php } ?>
			-->

			<!-- begin Postfolio BOX -->
			
			<?php if ($studiobox_sidebarfeatured_id<>"Disabled") { ?>
				<div class="sidebartitle"><?php if ($studiobox_sidebarfeatured_title<>"") { echo $studiobox_sidebarfeatured_title; } else { echo "Featured"; } ?></div>
					<?php if ($studiobox_sidebarfeatured_style=="Random from Category") { 
						$my_query = new WP_Query('cat='.m_get_category_id($studiobox_sidebarfeatured_id).'&showposts=1&orderby=rand');
						} else {
						$my_query = new WP_Query('cat='.m_get_category_id($studiobox_sidebarfeatured_id).'&showposts=1');
					}
					?>
					<?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
					<?php $image=get_post_meta($post->ID, "image", true); ?>
					
				
					<div class="sidebaropts"><!-- Block One -->
							<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
								<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;h=200&amp;w=270&amp;zc=1" alt="<?php the_title(); ?>" />
							</a>
					</div>
					
					<?php endwhile; ?>
					<?php wp_reset_query();?>
			<?php } ?>
				
			<div class="clear"></div>
			
			<!-- begin Dynamic Sidebar -->
				
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar") ) : ?>

			<!--<div class="sidebaropts">
				<div class="sidebartitle">No Widgets found.</div>
				<ul><li>Please Add Sidebar Components</li></ul>
				</div>
			-->

			<?php endif; ?>
	
	<div class="clear"></div>
	
	<!-- begin ADs -->
		
	<?php if ($studiobox_adpage_id<>"") { // IF AD is found then display the AD otherwise display an Advertise here Image with a link ?>
		<div class="ad-box-wrap">
			
			<?php if ($studiobox_ad1_image<>"") { // IF AD is found then display the AD otherwise display an Advertise here Image with a link ?>
				<div class="ad-box"><a href="<?php echo $studiobox_ad1_link; ?>"><img src="<?php echo $studiobox_ad1_image; ?>" alt="image" /></a></div>
			<?php } else {?>
				<?php if ($studiobox_ad1_link<>"") { ?>
					<div class="ad-box"><a href="<?php echo get_option('home'); ?>/?page_id=<?php echo $studiobox_adpage_id; ?>"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/125px-ad-bright.gif" alt="adbox" /></a></div>	
				<?php } ?>
			<?php } ?>
			
			<?php if ($studiobox_ad2_image<>"") { // IF AD is found then display the AD otherwise display an Advertise here Image with a link ?>
				<div class="ad-box"><a href="<?php echo $studiobox_ad2_link; ?>"><img src="<?php echo $studiobox_ad2_image; ?>" alt="image" /></a></div>
			<?php } else {?>
				<?php if ($studiobox_ad2_link<>"") { ?>
					<div class="ad-box"><a href="<?php echo get_option('home'); ?>/?page_id=<?php echo $studiobox_adpage_id; ?>"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/125px-ad-bright.gif" alt="adbox" /></a></div>	
				<?php } ?>
			<?php } ?>
			
			<?php if ($studiobox_ad3_image<>"") { // IF AD is found then display the AD otherwise display an Advertise here Image with a link ?>
				<div class="ad-box"><a href="<?php echo $studiobox_ad3_link; ?>"><img src="<?php echo $studiobox_ad3_image; ?>" alt="image" /></a></div>
			<?php } else {?>
				<?php if ($studiobox_ad3_link<>"") { ?>
					<div class="ad-box"><a href="<?php echo get_option('home'); ?>/?page_id=<?php echo $studiobox_adpage_id; ?>"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/125px-ad-bright.gif" alt="adbox" /></a></div>	
				<?php } ?>
			<?php } ?>
			
			<?php if ($studiobox_ad4_image<>"") { // IF AD is found then display the AD otherwise display an Advertise here Image with a link ?>
				<div class="ad-box"><a href="<?php echo $studiobox_ad4_link; ?>"><img src="<?php echo $studiobox_ad4_image; ?>" alt="image" /></a></div>
			<?php } else {?>
				<?php if ($studiobox_ad4_link<>"") { ?>
					<div class="ad-box"><a href="<?php echo get_option('home'); ?>/?page_id=<?php echo $studiobox_adpage_id; ?>"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/125px-ad-bright.gif" alt="adbox" /></a></div>	
				<?php } ?>
			<?php } ?>
			
		</div>
	<?php } ?>

<div class="clear"></div>
<div class="sidebarbottom"></div>
		</div>
		


<!-- end sidebar -->
