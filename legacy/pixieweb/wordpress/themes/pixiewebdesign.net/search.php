<?php get_header(); ?>
    <div class="container <?php echo is_home() ? 'no-padding' : 'with-top-padding'; ?>">
	<?php if (have_posts()) : ?>

		<?php while (have_posts()) : the_post(); ?>
		<div class="post" id="post-<?php the_ID(); ?>">
			<h1 class="title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
			<p class="meta"><small>Posted on <?php the_time('F jS, Y') ?> by <?php the_author() ?> <?php edit_post_link('Edit', ' | ', ''); ?></small></p>
			<div class="entry">
				<?php the_excerpt(); ?>
			</div>
	        <div class="info">
			<p class="links">&raquo; <?php comments_popup_link('No Comments', '1 Comment', '% Comments'); ?></p>
			<p class="tags"><?php the_tags('Tags: ', ', ', ' '); ?></p>
	        </div>
		</div>

		
	<?php else : ?>
		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
	<?php endif; ?>
	
	<?php get_sidebar('blog'); ?>
    </div> <!-- /container -->
<?php get_footer(); ?>
