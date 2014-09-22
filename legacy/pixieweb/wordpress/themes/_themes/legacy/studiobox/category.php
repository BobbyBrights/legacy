<?php
/**
 * @WordPress StudioBox Page
 */
get_header();
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
query_posts('posts_per_page=5');
?><div id="categorytitle">
		<?php
$category = get_the_category(); 
//var_dump($category);

echo $category[0]->cat_name;
?>
		</div>

		<?php get_sidebar(); ?>
		<?php 
			$category_large_image = TEMPLATEPATH . '/images/categories/category-' . $category[0]->term_id . '-large.jpg';
			$category_large_image_virtual =  '/wp-content/themes/studiobox/images/categories/category-' . $category[0]->term_id . '-large.jpg';
			
			if(file_exists($category_large_image)){?>
				<img src='<?php echo $category_large_image_virtual; ?>' alt='Category image for <?php echo $category[0]->cat_name; ?>' class='category_header_image' />
			<?php } ?>
		<?php while (have_posts()) : the_post(); ?>
		
			<div id="contents" class="twocolumn separated_content">
				<h3><?php the_title(); ?></h3>
				<p><?php the_excerpt(); ?></p>
				<a href="<?php the_permalink(); ?>">Read more..</a>
			</div>
			
		
		<?php endwhile; ?>
	

		<div class="clear"></div>
		
	</div> <!-- Close Mainpage -->
	<?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } else { echo "Function not declared" ;} ?>
<?php get_footer(); ?>