<?php get_header(); ?>

<div id="content">

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>



	

	<div> <div class="butter"><br />
&nbsp; &nbsp;<?php the_time('M'); ?>&nbsp;<?php the_time('d'); ?><script type="text/javascript">pickImageFrom(1);</script></div><div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
		<h1><?php the_title(); ?></h1>

		<div class="postmetadata">
			
		</div>

			<div class="entry">
				<?php the_content(); ?>
              <?php wp_link_pages() ?>
			</div>

		<div class="postmetadata">
			
		</div>
				<div class="navigationtest">
			 
<?php sjc_get_pagination() ?>  

		</div>	</div>
		<p class="small">
		<?php printf(__("You can follow any responses to this entry through the <a href='%s'>RSS 2.0</a> feed.", "default"), get_post_comments_feed_link()); ?> 
		<?php if (('open' == $post-> comment_status) && ('open' == $post->ping_status)) {
			// Both Comments and Pings are open ?>
			<?php printf(__('You can <a href="#respond">leave a response</a>, or <a href="%s" rel="trackback">trackback</a> from your own site.'), get_trackback_url(false)); ?>
		<?php } elseif (!('open' == $post-> comment_status) && ('open' == $post->ping_status)) {
			// Only Pings are Open ?>
			<?php printf(__('Responses are currently closed, but you can <a href="%s" rel="trackback">trackback</a> from your own site.'), get_trackback_url(false)); ?>
		<?php } elseif (('open' == $post-> comment_status) && !('open' == $post->ping_status)) {
			// Comments are open, Pings are not ?>
			<?php  echo "You can skip to the end and leave a response. Pinging is currently not allowed."; ?>
		<?php } elseif (!('open' == $post-> comment_status) && !('open' == $post->ping_status)) {
			// Neither Comments, no Pings are open ?>
			<?php echo "Both comments and pings are currently closed."; ?>
		<?php } ?>
		</p>

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
