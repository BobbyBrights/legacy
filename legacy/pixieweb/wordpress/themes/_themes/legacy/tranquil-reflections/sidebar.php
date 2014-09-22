<div id="sidebar">

<?php if (is_home()) { ?>

<div class="sidetoptxt">
<?php
    $options = get_option('tranquil_theme_options');
    echo $options['sidetop'];
?>
</div>
	
	<?php } ?><?php if (is_single()) { ?>

      <h2>About this Entry</h2>

      <p class="news">

      <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a> was posted on <nobr><?php the_time('F jS, Y') ?></nobr> at <nobr><?php the_time('g.ia') ?></nobr> and is filed under <?php the_category(', ') ?>.<?php if ('open' == $post->comment_status) : ?> This entry has <?php comments_number('no comments (yet)', 'one comment', '% comments' );?>.  You can follow any responses through the <?php post_comments_feed_link('RSS 2.0 Feed'); ?><?php endif; ?>.</a>
      </p>

<?php } ?>

<?php if ( !function_exists('dynamic_sidebar')
        || !dynamic_sidebar() ) : ?>



<h2>New Entries</h2>
    <?php
     global $post;
     $myposts = get_posts('numberposts=5&offset=1&category=1');
     foreach($myposts as $post) :
       setup_postdata($post);
     ?>
  <ul>
  <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
  </ul>
  <?php endforeach; ?>


<?php if (function_exists('get_recent_comments')) { ?>
<li><h2>Newest comments</h2>
<ul>
<?php get_recent_comments(); ?>
</ul>
</li>
<?php } ?>

<h2>Categories</h2>
<?php
wp_list_categories('title_li=');

?>


<h2>Monthly Archives</h2>
<ul>
<?php wp_get_archives('type=monthly'); ?>
</ul>

<?php if (is_home()) { ?>
<h2><?php ('Blogroll'); ?></h2>
<ul>
<?php get_bookmarks(-1, '<li>', '</li>', '', FALSE, 'name', FALSE, FALSE, -1, FALSE); ?>
</ul>
<?php } ?>

<h2>Syndication (RSS)</h2>
<ul>
<li><a href="<?php bloginfo('rss2_url'); ?>">RSS 2.0 Entries</a></li>
<li><a href="<?php bloginfo('comments_rss2_url'); ?>">RSS 2.0 Comments</a></li>
</ul>

<h2>Search</h2>

<?php get_search_form() ?>

<?php endif; ?>
<br />

</div>
	