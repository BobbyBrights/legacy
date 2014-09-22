<?php get_header(); ?>

<div id="content">

<?php if (have_posts()) : ?>

	<div class="content-header"></div>

<?php while (have_posts()) : the_post(); ?>

	<div>
  
	  <div class="butter">  <br />
 <a href="<?php the_permalink() ?>">
&nbsp; &nbsp;<?php the_time('M'); ?>&nbsp;<?php the_time('d'); ?></a><script
type="text/javascript">pickImageFrom(1);</script></div><div id="post-<?php
the_ID(); ?>" <?php post_class(); ?>>

		
		
		<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s'), the_title_attribute('echo=0')); ?>">
		  <?php the_title(); ?>
		</a></h2>

		<div class="postmetadata">
			<a href="<?php the_permalink() ?>">By 
		<?php the_author(); ?></a>  
				<?php edit_post_link('Edit'); ?>
		    </div>

		<div class="entry">
			<?php the_content(); ?>
		</div>

		<?php wp_link_pages(); ?>
        
        <div class="postmetadata">
			
          
			
			 Posted in 
				<?php the_category(', ') ?> <?php the_tags(', ') ?>
				 <strong>|</strong> 
				<?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?>
				

			
			
			
		
	</div></div>
	</div>
	<!-- end of post -->

<?php endwhile; ?>
<div class="navigationtest">
			 
<?php sjc_get_pagination() ?>  

		</div>


<?php else : /* NO posts */

	if ( '' != get_404_template() )
	 get_template_part( '404' , 'text' );
	else
		echo( "<h3><?php echo 'Sorry, but you are looking for something that isn't here.' ; ?></h3>" );

endif; ?>


</div><!-- end #content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>

