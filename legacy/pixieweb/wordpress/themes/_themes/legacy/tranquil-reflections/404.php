<?php get_header(); ?>

<?php get_sidebar(); ?>

<div id="content">

	<h2>404 - File not found</h2>
	
	<p>Sorry, we couldn't find the page you were looking for.</p>
	<p><a href="<?php echo home_url(); ?>">Click here to go home. <?php bloginfo('name'); ?></a> 
	<p>Or perhaps a search <?php get_search_form() ?>
</p> 
	
</div>

<?php get_footer(); ?>

<?php wp_footer(); ?>

</body>
</html>