<?php get_header(); ?>

<div id="content">

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>



	

	<div> <div class="butter"><br />
&nbsp; &nbsp;<?php the_time('M'); ?>&nbsp;<?php the_time('d'); ?><script type="text/javascript">pickImageFrom(1);</script></div><div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
		<h1><?php the_title(); ?></h1>


			<div class="entry">
				<?php the_content(); ?>
              <?php wp_link_pages() ?>
			</div>

		</div>
	
	</div><!-- end of post -->
<div class="marg">
	<?php comments_template(); ?></div>

<?php endwhile; ?>

<?php else : /* NO posts */

	if ( '' != get_404_template() )
	 get_template_part( '404' , 'text' );
	else
		echo( "<h3><?php echo 'Upss, not found...' ; ?></h3>" );

endif; ?>
</div>
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>
