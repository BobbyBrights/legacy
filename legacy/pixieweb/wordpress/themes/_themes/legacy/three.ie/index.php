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
        <h1 class="tit_Section"><?php bloginfo( 'name' ); ?></h1>
      </div>
      <!--<div class="box_Breadcrumb"> <a title="About" href="/about/index.html">About</a>. <span>Press Releases</span></div>-->
      <div class="box_Content">
		<?php dynamic_sidebar( 'homepage-main-image' ); ?>
		<div class="clear"></div>
		<div id="latest-posts-widget-area" class="horizontal-widget-area">
			<?php dynamic_sidebar( 'latest-posts-widget-area' ); ?>
			<div class="clear"> </div>
		</div>
		<div id="homepage-content-area" class="horizontal-widget-area">
			<?php dynamic_sidebar( 'homepage-content-area' ); ?>
			<div class="clear"> </div>
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
