<?php get_header(); ?>
	
		<div id="content">
			<div id="archivemarg"><?php if (have_posts()) : ?>
			<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
			<?php /* If this is a category archive */ if (is_category()) { ?>
			<h2 class="pagetitle">Archive for the '<?php echo single_cat_title(); ?>' Category</h2>
			<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
			<h2 class="pagetitle">Archive for
				<?php the_time('F jS, Y'); ?>
			</h2>
			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
			<h2 class="pagetitle">Archive for
				<?php the_time('F, Y'); ?>
			</h2>
			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
			<h2 class="pagetitle">Archive for
				<?php the_time('Y'); ?>
			</h2>
			<?php /* If this is a search */ } elseif (is_search()) { ?>
			<h2 class="pagetitle">Search Results</h2>
			<?php /* If this is an author archive */ } elseif (is_author()) { ?>
			<h2 class="pagetitle">Author Archive</h2>
			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2 class="pagetitle">Blog Archives</h2>
				<?php } ?></div>
			<?php while (have_posts()) : the_post(); ?>
			<div class="butter"><br />
&nbsp; &nbsp;<?php the_time('M'); ?>&nbsp;<?php the_time('d'); ?><script type="text/javascript">pickImageFrom(1);</script></div><div <?php post_class(); ?> id="post-<?php the_ID(); ?>">

		<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s'), the_title_attribute('echo=0')); ?>"><?php the_title(); ?></a>
		</h2>

		<div class="postmetadata">
			By <?php the_author(); ?> 
			 Posted in 
				<?php the_category(', ') ?> <?php the_tags(', ') ?>
				 <strong>|</strong> 
				<?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?>
		</div>

		<div class="entry">
			<?php the_excerpt(); ?>
			<span><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s'), the_title_attribute('echo=0')); ?>"><?php echo "Read the rest of this entry &raquo;"; ?></a></span>
		</div>

	
    
    
 

</div>
			<!-- end post-->
			<?php endwhile; ?>
			<div class="navigationtest">
			 
<?php sjc_get_pagination() ?>  

		</div>

			<?php else : ?>
			<h2 class="center">Not Found</h2>
			<?php get_search_form(); ?>
			<?php endif; ?>
		<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br /></div>
		<!-- end content div-->
		<?php get_sidebar(); ?>

<?php get_footer(); ?>
