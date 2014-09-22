<?php get_header(); ?>
	<div id="content" class="narrowcolumn">
	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
			<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>
				<div class="entry">
					<?php the_excerpt(); ?>&nbsp;<a href="<?php the_permalink() ?>">Go to post page</a>
					<br/>
					<br/>
					<small ><?php the_time('F jS, Y') ?> by <?php the_author() ?></small>
				</div>
				<!--
				<?php trackback_rdf(); ?>
				-->
			</div>
		<?php endwhile; ?>
	  <?php wp_link_pages(); ?>
		<div class="navigation">
			<div class="alignleft"><?php previous_posts_link( '&laquo; Previous page', '' ); ?></div>
			<div class="alignright"><?php next_posts_link( 'Next page &raquo;', '' ); ?></div>
			<div class="clear"></div>
		</div>
	<?php else : ?>
		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php get_search_form(); ?>
	<?php endif; ?>
	</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>