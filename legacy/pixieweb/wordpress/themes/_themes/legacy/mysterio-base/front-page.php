<?php get_header(); ?>

        <div class="container-fluid page-content top-part">
	        	<?php include('slider.php'); ?>
        </div>
        <div class="container bottom-part">

            <div class="row-fluid home-angels"> 	
	            <ul class="thumbnails"><?php dynamic_sidebar( 'modules' ); ?></ul>	  	
	      	</div>
        </div>

<?php get_footer(); ?>