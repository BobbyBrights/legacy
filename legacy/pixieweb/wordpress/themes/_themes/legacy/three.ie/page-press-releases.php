<?php
get_header(); ?>
<!-- START COPY TEMPLATE -->
<div class="box_BodyContent box_Simple_Page">

	<?php get_sidebar('left'); ?>    



  <div class="box_MainContent">

    <div class="box_000 box_Plan"> <a class="link_Anchor" name="topPage"> </a>
      <div class="box_Title js_sIFR_Title_Section">
        <h1 class="tit_Section"><?php wp_title("", true); ?></h1>
      </div>
      <!--<div class="box_Breadcrumb"> <a title="About" href="/about/index.html">About</a>. <span>Press Releases</span></div>-->
      <div class="box_Content">
      <div class="box_FreeHtml txtBox_cms wider">
      	<div class="search_menu">
<?php dynamic_sidebar( 'right-sidebar' ); ?>
<div class="clear"> </div>
</div>
      	<h3>Latest Press Releases</h3>
      	<ul class="press-releases-list">
      	<?php
  			$paged = get_query_var('paged') ? get_query_var('paged') : 1;
  			$wp_query = new WP_Query(array('post_type' => 'press_releases', 'paged' => $paged, 'post_per_page' => 30));
  			while ($wp_query->have_posts()) : $wp_query->the_post();
  				the_title( '<li><a href="' . get_permalink() . '" title="' . the_title_attribute( 'echo=0' ) . '" rel="bookmark">', '</a></li>' ); 
  			endwhile; 
  		?>
      	</ul>
      	<?php wp_pagenavi(); ?>
</div>

<div class="clear"> </div>
            </div>
      <div class="box_Bottom"> </div>
    </div>
    <div class="clear"> </div>
  </div>

  <div class="clear"> </div>
</div>
<div class="box_PushFooter"> </div>
<!-- END COPY TEMPLATE -->
<?php get_footer(); ?>
