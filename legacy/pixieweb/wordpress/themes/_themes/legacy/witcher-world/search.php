<?php get_header(); ?>
	<div id="content" class="narrowcolumn">
	<?php if (have_posts()) : ?>
		<h2 class="pagetitle">Search Results</h2>
		<?php while (have_posts()) : the_post(); ?>
			<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<h3><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h3>
				<small><?php the_time('l, F jS, Y') ?></small>
				<div class="entry">
        <div class="spacer"></div>
	       	<?php 
	 				if ( has_post_thumbnail()) {
	   					$large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large');
	   					print '<a href="' . $large_image_url[0] . '" title="' . the_title_attribute('echo=0') . '" >';
	   					the_post_thumbnail(); 
	   					print '</a>';
	 				} ?>	
					<?php the_excerpt() ?>
				</div>
				<p class="postmetadata">Posted in <?php the_category(', ') ?> | <?php edit_post_link('Edit','',' | '); ?>
				<?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?></p> 
				<!--
				<?php trackback_rdf(); ?>
				-->
			</div>
		<?php endwhile; ?>
		<div class="navigation">
			<div class="alignleft"><?php previous_posts_link( '&laquo; Previous page', '' ); ?></div>
			<div class="alignright"><?php next_posts_link( 'Next page &raquo;', '' ); ?></div>
			<div class="clear"></div>
		</div>
	  <?php else : ?>
		<h2 class="center">Nothing Found on your search criteria !</h2>
		<?php get_search_form(); ?>
	  <?php endif; ?>
	</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>