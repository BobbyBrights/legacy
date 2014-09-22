<?php // LEFT SIDEBAR ?>
<div id="leftsidebar">
<?php if ( dynamic_sidebar(1) ) : else : ?>	
  <ul>
  <li><h2>Recent entries</h2>
    <ul>
      <?php query_posts('showposts=30'); ?>
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<li><a href="<?php the_permalink() ?>"><?php the_title() ?> <span>[<?php the_time('d.m.y') ?>]</span></a></li>
			<?php endwhile; endif; ?>
		</ul>
	</li>      
	<li><h2>Pages</h2>
		<ul>
			<?php wp_list_pages('title_li='); ?>
		</ul>
	</li>
	<li><h2>Categories</h2>
		<ul>
			<?php wp_list_categories('sort_column=name&optioncount=1&hierarchical=1'); ?>
		</ul>
	</li>
</ul>		       
<?php endif; ?>
</div>
<?php // END LEFT SIDEBAR ?>
<?php // RIGHT SIDEBAR ?>	
<div id="rightsidebar">
<?php if ( dynamic_sidebar(2) ) : else : ?>	
  <ul>			
		<li><h2>Archives</h2>
      <ul>
        <?php wp_get_archives('type=monthly'); ?>
      </ul>
		</li>
<?php /* If this is the frontpage */ if ( is_home() || is_page() ) { ?>						
		<?php wp_list_bookmarks(); ?>
		<li><h2>Meta</h2>
			<ul>
				<?php wp_register(); ?>
				<li><?php wp_loginout(); ?></li>
				<li><a href="<?php bloginfo('rss2_url'); ?>">Entries (RSS)</a></li>
        <li><a href="<?php bloginfo('comments_rss2_url'); ?>">Comments (RSS)</a></li>
        <li><a href="http://wordpress.org/" title="Powered by WordPress, state-of-the-art semantic personal publishing platform">WordPress</a></li>
				<?php wp_meta(); ?>
			</ul>
		</li>
<?php } ?>
  </ul>
<?php endif; ?>
</div>
<?php // END RIGHT SIDEBAR ?>