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
        <h1 class="tit_Section">Press Releases.</h1>
      </div>
      <div class="box_Breadcrumb"> <a title="Back" href="javascript:history.back()">&lt; Back</a></div>
      <div class="box_Content">
      <div class="box_FreeHtml txtBox_cms wider">
      	<h2 class="page-title"><?php
					printf( __( 'Category Archives: %s', 'twentyten' ), '<span>' . single_cat_title( '', false ) . '</span>' );
				?></h2>
        <?php
					$category_description = category_description();
					if ( ! empty( $category_description ) )
						echo '<div class="archive-meta">' . $category_description . '</div>';

				/* Run the loop for the category page to output the posts.
				 * If you want to overload this in a child theme then include a file
				 * called loop-category.php and that will be used instead.
				 */
				get_template_part( 'loop', 'category' );
				?>
      </div>
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
