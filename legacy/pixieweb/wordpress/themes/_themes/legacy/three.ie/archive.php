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
      	<?php
	/* Queue the first post, that way we know
	 * what date we're dealing with (if that is the case).
	 *
	 * We reset this later so we can run the loop
	 * properly with a call to rewind_posts().
	 */
	if ( have_posts() )
		the_post();
?>

			<h1 class="page-title">
<?php if ( is_day() ) : ?>
				<?php printf( __( 'Daily Archives: <span>%s</span>', 'twentyten' ), get_the_date() ); ?>
<?php elseif ( is_month() ) : ?>
				<?php printf( __( 'Monthly Archives: <span>%s</span>', 'twentyten' ), get_the_date('F Y') ); ?>
<?php elseif ( is_year() ) : ?>
				<?php printf( __( 'Yearly Archives: <span>%s</span>', 'twentyten' ), get_the_date('Y') ); ?>
<?php else : ?>
				<?php _e( 'Blog Archives', 'twentyten' ); ?>
<?php endif; ?>
			</h1>

<?php
	/* Since we called the_post() above, we need to
	 * rewind the loop back to the beginning that way
	 * we can run the loop properly, in full.
	 */
	rewind_posts();

	/* Run the loop for the archives page to output the posts.
	 * If you want to overload this in a child theme then include a file
	 * called loop-archives.php and that will be used instead.
	 */
	 get_template_part( 'loop', 'archive' );
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
