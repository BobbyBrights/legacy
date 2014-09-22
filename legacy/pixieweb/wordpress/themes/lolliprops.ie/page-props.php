<?php get_header(); ?>

    <div class="container">
    
      <div class="row">
        <div class="span8">
        <h1>Prop Categories</h1>    	
    	<?php 
    		$c = get_terms('prop-category', array('hide_empty' => 0)); 
    		//var_dump($c);
	    	foreach($c as $tax): ?>
	    	<div class="prop-category">
		    	<h2><?php echo $tax->name; ?></h2>
		    	<a href="/prop-category/<?php echo $tax->slug; ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/prop-categories/<?php echo $tax->slug; ?>.png" /><br/>
		    	<?php echo $tax->description; ?>
		    	</a>
		    </div>
	    <?php	
	    	endforeach;
    	?>
        </div>
         <div class="span4">
    	<h3>Testimonials</h3>
    	##TODO - Code to pull all testimonials.
        </div>
      </div>

<?php get_footer(); ?>