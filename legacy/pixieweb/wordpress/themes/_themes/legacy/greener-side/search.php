<?php get_header(); ?>

<div id="content">

<?php if (have_posts()) : ?>

	<div class="content-header"><h2 align="center" class="pagetitle">Search Results</h2></div>

<?php while (have_posts()) : the_post(); ?>

	<div class="butter"><br />
&nbsp; &nbsp;<?php the_time('M'); ?>&nbsp;<?php the_time('d'); ?><script type="text/javascript">pickImageFrom(1);</script></div><div <?php post_class(); ?> id="post-<?php the_ID(); ?>">

		<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s'), the_title_attribute('echo=0')); ?>"><?php the_title(); ?></a>
		</h2>

		<div class="postmetadata">
			By <?php the_author(); ?> 
			 Posted in 
				<?php the_category(', ') ?>
				 <strong>|</strong> 
				<?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?>
		</div>

		<div class="entry">
			<?php the_excerpt(); ?>
			<span><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s'), the_title_attribute('echo=0')); ?>"><?php echo "Read the rest of this entry &raquo;"; ?></a></span>
		</div>

	
    
    
 

</div><!-- end of post -->

<?php endwhile; ?>

<div class="navigationtest">
			 
<?php sjc_get_pagination() ?>  

		</div>

<?php else : /* NO posts */

	if ( '' != get_404_template() )
	 get_template_part( '404' , 'text' );
	else
		echo( "<h3><?php echo 'Upss, not found...'; ?></h3>" );

endif; ?>


</div>
<?php get_sidebar(); ?>


<?php get_footer(); ?>
