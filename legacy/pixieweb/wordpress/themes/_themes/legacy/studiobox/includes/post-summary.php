<?php while (have_posts()) : the_post(); ?>
	<?php $image=get_post_meta($post->ID, $key, true); ?>

	<?php if ($image<>"") { ?>
	<a href="<?php the_permalink() ?>">
	<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo $image; ?>&amp;h=<?php echo $blogheight; ?>&amp;w=<?php echo $blogwidth; ?>&amp;zc=1" alt="<?php the_title(); ?>" />
	</a>
	<?php } ?>

	<div class="datecomment">
		<?php the_time('jS M Y') ?><span class="postedin">Posted in: <?php the_category(', ') ?></span>
		<span class="comments"><?php comments_popup_link('0', '1', '%'); ?></span>
	</div>

	<div class="posttitle">
		<a href="<?php the_permalink() ?>"><?php the_title(); ?></a>
	</div>

	<?php the_excerpt(); ?>

	<div class="readmorebutton"><a href="<?php the_permalink() ?>">Continue <strong>reading</strong></a></div>

	<div class="blogseperator clear"></div>
<?php endwhile; ?>

</div>

		<div class="clear"></div>
		<!-- Navigation -->
		<?php include (TEMPLATEPATH . "/includes/navigation.php"); ?>
		
