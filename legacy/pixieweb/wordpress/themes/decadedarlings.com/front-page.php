<?php get_header(); ?>
    <section id="carousel">
    	<!-- TODO: Add carousel code in here -->
    	<?php $num_items = 6; ?>
    	<div id="myCarousel" class="carousel slide">
		  <ol class="carousel-indicators">
		  	<?php for($i = 0; $i < $num_items; $i++): ?>
		  		<li data-target="#myCarousel" data-slide-to="<?php echo $i; ?>" class="<?php echo $i == 0 ? 'active' : ''; ?>"></li>
		  	<?php endfor; ?>	
		  </ol>
		  <div class="carousel-inner">
		  	<?php for($i = 0; $i < $num_items; $i++): ?>
		  		<div class="item <?php echo $i == 0 ? 'active' : ''; ?>"> <img src="<?php echo get_template_directory_uri(); ?>/img/carousel/<?php echo ($i + 1); ?>.jpg" width="964" alt="">
			      <!--
<div class="carousel-caption">
			        <h4>First Thumbnail label</h4>
			        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
			      </div>
-->
			    </div>
		    
		  	<?php endfor; ?>	
		  </div>
		  <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a> </div>
  
     
    </section>
    <section id="home-content" class="well well-content">
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<?php the_content(); ?>
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    	<?php endif; ?>
    </section>
	   
<?php get_footer(); ?>