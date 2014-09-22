<?php get_header(); ?>

<?php get_sidebar(); ?>

<div id="content">

<?php if (have_posts()) : ?>

<?php while (have_posts()) : the_post(); ?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

<h1><?php the_title(); ?></h1>

<div class="entry">

<?php the_content(); ?>
<?php wp_link_pages( 'before=<p class="link-pages">Page: ' ); ?>

</div>

<p class="info">Category: <?php the_category(', ') ?><?php if (function_exists('the_tags')) { ?><?php the_tags('<strong> |</strong> Tags: ', ', ', ''); ?> <?php } ?><?php edit_post_link('Edit',' <strong>|</strong> ',''); ?> | <?php comments_popup_link('No comments yet', '1 comment', '% comments', 'comments-link', '<div class="commentoff">no comments</div>'); ?></p>

</div>
<div id="comment-top">
<?php comments_template(); ?>



<?php endwhile; ?>

<p align="center"><?php next_posts_link('&laquo; Previous Entries') ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php previous_posts_link('Next Entries &raquo;') ?></p><?php else : ?>

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