<?php
/**
 */

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
      <div class="box_FreeHtml txtBox_cms">
      	<?php $loop = new WP_Query( array( 'post_type' => 'blog', 'posts_per_page' => 20 ) ); ?>
      	<ul class="press-releases-list">
      		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

	<?php the_title( '<li><a href="' . get_permalink() . '" title="' . the_title_attribute( 'echo=0' ) . '" rel="bookmark">', '</a></li>' ); ?>
<?php endwhile; ?>
      	</ul>
</div>
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
