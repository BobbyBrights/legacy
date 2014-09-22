
<?php get_header(); ?>
<div id="slideshow"></div>

<?php get_sidebar(); ?>

<div id="content">

<?php if (have_posts()) : ?>

<?php while (have_posts()) : the_post(); ?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

<div class="date"><small><?php the_time('j ') ?></small>
<div class="dateday"><?php the_time(' F') ?></div></div> 

<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php if(the_title( '', '', false ) !='') the_title(); else echo 'Untitled';?></a></h2>

<?php the_post_thumbnail(); ?>

<div class="entry">

<?php the_content('Continue reading &raquo;'); ?>

</div>

<div class="pagelink"><?php wp_link_pages( 'before=<p class="link-pages">Page: ' ); ?></div>

<p class="info"><?php comments_popup_link('No comments yet', '1 comment', '% comments', 'comments-link', '<div class="commentoff">no comments</div>'); ?> </p>

</div>



<?php comments_template(); ?>

<?php endwhile; ?>


<div class="navigation"><?php if(function_exists('wp_paginate')) {
		wp_paginate();
	} ?>
	
	<?php next_posts_link('&laquo; Previous Entries') ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php previous_posts_link('Next Entries &raquo;') ?></div>

<p>&uarr; <a href='#up' title='Go upwards' target='_self'>Back to top</a></p>

<?php else : ?>

<h2>Not Found</h2>

<p>Sorry, but you are looking for something that isn't here.</p>

<?php endif; ?>
</div>
</div>


<?php get_footer(); ?>

</div>

<?php wp_footer(); ?>

</body>

</html>