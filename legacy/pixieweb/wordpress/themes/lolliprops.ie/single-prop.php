<?php get_header(); ?>

    <div class="container">
    
      <div class="row">
        <div class="prop-info">
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<h2>Prop Info: <?php echo the_title(); ?></h2>
    	<div class="span6">
	    	<?php if (has_post_thumbnail( $post->ID ) ): ?>
			<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'post-thumbnail' ); ?>
			<img src="<?php echo $image[0]; ?>" class="pull-left prop-image" />
			<?php endif; ?>
	    	
	    	
	    	<table class="table prop-meta">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Color</td>
                  <td>Purple / Various</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>20cm x 90cm x 78cm</td>
                </tr>
                
                <tr>
                  <td>Weight</td>
                  <td>8kg</td>
                </tr>
              </tbody>
            </table>
            
            
            
    	</div>
    	<div class="span6">
    		<h4>Rating </h4><span class="rating-static rating-45"></span>
    		<span class="muted">Based on 17 reviews</span>
	    	<?php the_content(); ?>
	    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>
	    	
	    	<h5>Categories</h5>
	    	<?php foreach(get_the_terms( $post->ID, 'prop-category' ) as $p): ?>
	    		<?php //var_dump($p); ?>
	    		<a class="label label-info" href="<?php echo "/" . $p->taxonomy . "/" . $p->slug; ?>"><?php echo $p->name; ?></a>&nbsp;
	    	<?php endforeach; ?>
	    	<h3>Similar props</h3>
	    	
	    	<!-- Enquiry form -->
	    	<h3>Enquiry form</h3>
	    	<form>
		      <div class="controls controls-row">
		          <input id="name" name="name" type="text" class="span3" placeholder="Name"> 
		          <input id="email" name="email" type="email" class="span3" placeholder="Email address">
		      </div>
		      <div class="controls">
		          <textarea id="message" name="message" class="span6" placeholder="Your Message" rows="5"></textarea>
		      </div>
		      
		      <div class="controls">
		          <button id="contact-submit" type="submit" class="btn btn-primary input-medium pull-right">Send</button>
		      </div>
		  </form>		
		
    	</div>
    	

    	
    	<?php endwhile; else: ?>
    	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    	<?php endif; ?>
        </div>
        
      </div>

<?php get_footer(); ?>