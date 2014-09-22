<?php get_header(); ?>

    <div class="container">
		<div class="marquee-header">
	      <div class="hero-unit">
	        <h1>Leaderboard message</h1>
	        <p>This is your mainmarketing campaign, or particular theme that you want to highlight. The image behind is blurred intentionally, but we could bring some objects into sharp focus.</p>
	        <p><a class="btn btn-primary btn-large">Learn more &raquo;</a></p>
	      </div>
		</div>
    </div>


    <div class="container">

      <div class="row">
        <div class="span6">


        <div class="spotlight">
        <div class="pull-left">
          <h2>Spotlight 1</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris . </p>
          <a class="btn clear-below" href="#">View details &raquo;</a>
        </div>
        <div class="pull-right spotlight-image">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlight1.png" />
         </div>
         <div class="clearfix"></div>
        </div>
		<!-- -->
		
		
		        <div class="spotlight">
        <div class="pull-left">
          <h2>Spotlight 2 (with video)</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris . </p>
          <a class="btn clear-below" href="#">View details &raquo;</a>
        </div>
        <div class="pull-right spotlight-image">
          <!-- Button to trigger modal -->
		  <a href="#myModal" role="button" class="btn" data-toggle="modal"><img src="http://img.youtube.com/vi/4u7Xoe2DNpw/default.jpg" /></a>
         </div>
         <div class="clearfix"></div>
        </div>
		<!-- -->
		
		
		        <div class="spotlight">
        <div class="pull-left">
          <h2>Spotlight 3</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris . </p>
          <a class="btn clear-below" href="#">View details &raquo;</a>
        </div>
        <div class="pull-right spotlight-image">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlight2.png" />
         </div>
         <div class="clearfix"></div>
        </div>
		<!-- -->
		
		
		        <div class="spotlight">
        <div class="pull-left">
          <h2>Spotlight 1</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris . </p>
          <a class="btn clear-below" href="#">View details &raquo;</a>
        </div>
        <div class="pull-right spotlight-image">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlight3.png" />
         </div>
         <div class="clearfix"></div>
        </div>
		<!-- -->
		
 
		<!-- Modal -->
		<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-header">
		    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		    <h3 id="myModalLabel">Youtube Video</h3>
		  </div>
		  <div class="modal-body">
		    <iframe width="100%" height="315" src="//www.youtube.com/embed/4u7Xoe2DNpw" frameborder="0" allowfullscreen></iframe>
		  </div>
		  <div class="modal-footer">
		    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		  </div>
		</div>		

        </div>
        <div class="span6">
          <h2>About Lolliprops</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn" href="#">View details &raquo;</a></p>
          <hr/>
          <h2>Latest blog post</h2>
          <p>My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. </p>
          <p><a class="btn" href="#">View details &raquo;</a></p>
          <hr/>
          <h2>What our customers are saying</h2>
          <p class="testimonial">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. <span>- Alex Cross</span> </p>
         <p class="testimonial">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. <span>- Alex Cross</span> </p>
         <p class="testimonial">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. <span>- Alex Cross</span> </p>
          
       </div>
      </div>

<?php get_footer(); ?>