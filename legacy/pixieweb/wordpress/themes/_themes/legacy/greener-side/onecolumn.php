
<?php
/*
Template Name: Single Column Template
*/
?>
<?php get_header(); ?>

<div id="content2">

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>





	<div>
	<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
 <div class="butter"><br />
&nbsp; &nbsp;<?php the_time('M'); ?>&nbsp;<?php the_time('d'); ?>
      <script type="text/javascript">pickImageFrom(1);</script></div>
	  <div class="post2" id="post-<?php the_ID(); ?>">
		<h1><?php the_title(); ?></h1>
		<div class="entry">
			<?php the_content(); ?>
		</div>
<?php wp_link_pages(); ?>
		<div class="postmetadata">
			
		</div>
</div>

</div></div>


	
	<div class="marg"><?php comments_template(); ?></div>

<?php endwhile; ?>

<?php else : /* NO posts */

	if ( '' != get_404_template() )
	 get_template_part( '404' , 'text' );
	else
		echo( "<h3><?php echo 'Upss, not found...' ; ?></h3>" );

endif; ?>
	
</div>


<?php get_footer(); ?>

