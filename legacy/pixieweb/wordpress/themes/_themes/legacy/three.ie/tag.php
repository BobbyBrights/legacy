<?php
/**
 */

get_header(); ?>
<!-- START COPY TEMPLATE -->
<div class="box_BodyContent">
  <div class="box_MainContent">
    <div class="box_000 box_Plan"> <a class="link_Anchor" name="topPage"> </a>
      <div class="box_Title js_sIFR_Title_Section">
        <h1 class="tit_Section">Press Releases.</h1>
      </div>
      <div class="box_Breadcrumb"> <a title="About" href="/about/index.html">About</a>. <span>Press Releases</span></div>
      <div class="box_Content">
      	<h2 class="page-title"><?php
					printf( __( 'Tag Archives: %s', 'twentyten' ), '<span>' . single_tag_title( '', false ) . '</span>' );
				?></h2>
        <?php
/* Run the loop for the tag archive to output the posts
 * If you want to overload this in a child theme then include a file
 * called loop-tag.php and that will be used instead.
 */
 get_template_part( 'loop', 'tag' );
?>
      </div>
      <div class="box_Bottom"> </div>
    </div>
    <div class="clear"> </div>
  </div>
  <?php get_sidebar(); ?>
  <div class="clear"> </div>
</div>
<div class="box_PushFooter"> </div>
<!-- END COPY TEMPLATE -->
<?php get_footer(); ?>
