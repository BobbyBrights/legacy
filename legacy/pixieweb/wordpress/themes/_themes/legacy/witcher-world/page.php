<?php get_header(); ?>
	<div id="content" class="narrowcolumn">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<h2><?php the_title(); ?></h2>
			<div class="entrytext">
			  <?php the_content('<p class="serif">Read the rest of this page &raquo;</p>'); ?>
			  <div class="clear"></div>
        <div class="spacer"></div>				
			  <?php wp_list_bookmarks('<p><strong>Pages:</strong> ', '</p>', 'number'); ?>
			</div>
		</div>
	  <?php endwhile; endif; ?>
	  <?php edit_post_link('Edit this entry.', '<p>', '</p>'); ?>
	  <?php wp_link_pages(); ?>
		<?php comments_template(); ?>
    <?php
      $page = get_page($post->post_parent);
      if(count($page) != 0){
        echo "    <br/>Parent page: ";
    ?>
    <a class="childPageLink"  href="<?php echo $page->guid; ?>"><?php echo $page->post_title; ?></a>
    <?php
      }
      $pages = get_pages('child_of='.$post->ID);
      if(count($pages) == 1) echo "    <br/>Child page: ";
      if(count($pages) > 1) echo "    <br/>Child pages: ";
      $separator = "";
      foreach($pages as $page) { $content = $page->post_content;
?><?php echo $separator; ?><a class="childPageLink"  href="<?php echo get_page_link($page->ID) ?>"><?php echo $page->post_title; ?></a><?php
      $separator = ", ";
    }
    ?>
	</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>