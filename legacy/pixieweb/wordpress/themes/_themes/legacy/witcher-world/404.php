<?php get_header(); ?>
  <div id="content" class="narrowcolumn">
    <h2>Error 404 &ndash; File not Found</h2>
    <div class="post">
      <p><strong>Sorry, but the page you were looking for could not be found.</strong></p>
      Please Select from the category below to find what you looking for or you can use our Search Form
      <ul>
        <li><h2>Search</h2>
          <?php get_search_form(); ?>
        </li>
        <li><h2>Recent entries</h2>
          <ul>
            <?php query_posts('showposts=30'); ?>
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <li><a href="<?php the_permalink() ?>"><?php the_title() ?> <span>[<?php the_time('d.m.y') ?>]</span></a></li>
            <?php endwhile; endif; ?>
          </ul>
        </li>
        <li><h2>Categories</h2>
          <ul>
            <?php wp_list_categories('sort_column=name&optioncount=1&hierarchical=1'); ?>
          </ul>
        </li>
      </ul>
    </div>
  </div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>