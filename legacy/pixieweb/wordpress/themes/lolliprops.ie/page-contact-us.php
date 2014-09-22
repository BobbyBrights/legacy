<?php get_header(); ?>
    <div class="container">
    
      <div class="row">
        <div class="span8">
        <h1>Contact Us</h1>    	
    	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    	<?php the_content(); ?>
    	<?php endwhile; endif; ?>

		<form>
		      <div class="controls controls-row">
		          <input id="name" name="name" type="text" class="span3" placeholder="Name"> 
		          <input id="email" name="email" type="email" class="span3" placeholder="Email address">
		      </div>
		      <div class="controls">
		          <textarea id="message" name="message" class="span6" placeholder="Your Message" rows="5"></textarea>
		      </div>
		      
		      <div class="controls">
		          <button id="contact-submit" type="submit" class="btn btn-primary input-medium pull-left">Send</button>
		      </div>
		  </form>
    	<div class="clearfix"></div>
        </div>
         <div class="span4">
    	<h3>Address Info</h3>
    	<img src="http://maps.google.com/maps/api/staticmap?center=53.306571,-6.351613&zoom=15&markers=53.306571,-6.351613&size=500x300&sensor=false" width="100%" />
    	<h4>Lolliprops</h4>
    	<p>
    	Unit 16/17 Fashion City <br/>
Ballymount Road Upper <br/>
Dublin 24 <br/>
Ireland</p>
<p>
		Phone: +353 1 429 3806 <br/>
Email: info@lolliprops.ie
</p>
        </div>
      </div>

<?php get_footer(); ?>