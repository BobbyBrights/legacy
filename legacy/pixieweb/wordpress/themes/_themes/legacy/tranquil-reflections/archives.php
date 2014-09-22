<?php
/*
Template Name: Archives
*/
?>

<?php get_header(); ?>

<div id="wrapper">

<?php get_sidebar(); ?>

<div id="content">

	<h2>By month</h2>
		<ul>
			<?php wp_get_archives('type=monthly'); ?>
		</ul>

	<h2>By category</h2>
  		<ul>
   			<?php wp_list_categories(); ?>
		</ul>

         <?php if (function_exists('wp_tag_cloud')) { ?>
         <h2>All Tags</h2>

         <?php wp_tag_cloud('format=list&smallest=9&orderby=count&order=DESC'); ?>

         <?php } ?>

</div>
</div>
<?php get_footer(); ?>

<?php wp_footer(); ?>

</body>
</html>