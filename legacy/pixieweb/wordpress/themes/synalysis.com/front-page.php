<?php get_header(); ?>

    <!-- Carousel
    ================================================== -->
    <div id="myCarousel" class="carousel slide">
      <div class="carousel-inner">      
      	<?php dynamic_sidebar( 'home-slider' ); ?>
      </div>
      <?php if(count_sidebar_widgets( 'home-slider', false ) > 1): ?>
      <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>
      <?php endif; ?>
    </div><!-- /.carousel -->

    <div class="container marketing">
	  	
      <!-- Three columns of text below the carousel -->
      <div class="row spotlights" id="_spot">
        <div class="span4">
          <a href="#tab-1"><img class="img-circle" src="<?php echo get_template_directory_uri(); ?>/img/home/spot-synthesis.png"><br/>Synthesis</a>
        </div><!-- /.span4 -->
        <div class="span4">
          <a href="#tab-2"><img class="img-circle" src="<?php echo get_template_directory_uri(); ?>/img/home/spot-analysis.png"><br/>Analysis</a>
        </div><!-- /.span4 -->
		<div class="span4">
          <a href="#tab-3"><img class="img-circle" src="<?php echo get_template_directory_uri(); ?>/img/home/spot-system.png"><br/>System</a>
        </div><!-- /.span4 -->
        
      </div><!-- /.row -->
      
    </div>
    
    <div class="container-fluid homepage-tabs">

	  <div class="row-fluid content">
	  	<div class="container">
	  		<?php for($i = 1; $i <= 3; $i++): ?>
	  			<div class="tab" id="tab-<?php echo $i; ?>"><?php 
		  			$page = get_posts(array('name' => 'homepage-tab-' . $i, 'post_type' => 'custom-content'));
		  			if ( $page ){
		  				echo $page[0]->post_content;
		  			} else {
			  			echo "No content";
		  			}
		  		?>
		  		</div>
	  		<?php endfor; ?>
        </div><!-- /.span4 -->
	  </div>


    </div>
    <div class="container footer-div"> 
<?php get_footer(); ?>
