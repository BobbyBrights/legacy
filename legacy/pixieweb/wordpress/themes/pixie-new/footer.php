<?php 
    query_posts(array( 
        'post_type' => 'blog',
        'showposts' => 1 
    ) );  
?>


	    
      <div id="push"></div>
    </div>

    <div id="footer">
      <div class="container">
        <?php if (have_posts()) : the_post(); ?>
		<p class="muted credit pull-left">Latest blog entry &gt; <a href="<?php the_permalink() ?>"><?php the_title(); ?></a>.</p>
		<?php endif; wp_reset_query(); ?>
        <p class="muted credit pull-right"><!-- Careers | Attributions | Privacy | --> &copy; www.pixiewebdesign.net 2013</p>        
      </div>
    </div>
    <?php wp_footer(); ?>
  </body>
</html>

