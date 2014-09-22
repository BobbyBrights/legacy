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
        <h1 class="tit_Section"><?php _e( 'Not Found', 'three.ie' ); ?></h1>
      </div>
      <!--<div class="box_Breadcrumb"> <a title="About" href="/about/index.html">About</a>. <span>Press Releases</span></div>-->
      <div class="box_Content">
      <div class="box_FreeHtml txtBox_cms">
      	<p><?php _e( 'Apologies, but the page you requested could not be found. Perhaps searching will help.', 'three.ie' ); ?></p>
					<?php get_search_form(); ?>
            </div>
            </div>
      <div class="box_Bottom"> </div>
    </div>
    <div class="clear"> </div>
  </div>
  <div class="clear"> </div>
</div>
<div class="box_PushFooter"> </div>
<script type="text/javascript">
		// focus on search field after it has loaded
		document.getElementById('s') && document.getElementById('s').focus();
	</script>
<!-- END COPY TEMPLATE -->
<?php get_footer(); ?>
