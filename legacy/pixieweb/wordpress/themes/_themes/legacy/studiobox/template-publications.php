<?php
/*
Single Post Template: Publications Template
Description: Template for publications pages.
*/
?>
<?php 
get_header();

?>

<?php // Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");
?>

<?php
$sidebarshift=false;
$bigimage=false;
$videocodekey="videoembed";
$gallerykey="postgallery";
$imagekey="image";
$height=0;
$width=600;
$fullwidth=940;
$videoshowcase=false;
$minigallery=true;
$gallery=false;

$i=0;
?>

	<?php if (have_posts()) : ?>
	
		<?php $postgallery=get_post_meta($post->ID, $gallerykey, true); ?>
		<?php $image=get_post_meta($post->ID, $imagekey, true); ?>
		<?php $videocode=get_post_meta($post->ID, $videocodekey, true); ?>
		
		<?php if ($sidebarshift) { // One column ?>	
			<div id="fullwidth-categorytitle">
		<?php } else { ?>
			<div id="categorytitle">
		<?php } ?>
			<?php
			$category = get_the_category();
			//echo $category[0]->cat_name;
			?>
			<?php the_title(); ?>
		</div>
		

		<?php if ($sidebarshift) {} else { get_sidebar(); } // Only Show sidebar if the Gallery is not set as a Big Gallery ?>
		
		<?php while (have_posts()) : the_post(); ?>
				
				<?php if ($sidebarshift) get_sidebar();  ?>
				
					<div id="contents" class="twocolumn fwcmargin">
						<!--
						<div class="datecomment">
							<?php the_time('jS M Y') ?><span class="postedin">Posted in: <?php the_category(', ') ?></span>
							<span class="comments"><?php comments_popup_link('0', '1', '%'); ?></span>
						</div>
						
						<div id="title">
							<?php the_title(); ?>
						</div>
						-->
						
						<?php $highlight=get_post_meta($post->ID, "highlight", true); ?>
						<?php if ($highlight<>"") { ?>
							<div id="titleHighlight">
							<?php echo $highlight; ?>
							</div>
						<?php } ?>
						
						<?php the_content(); ?>
												<div class="clear"></div>

						<?php
						/* Display Publications List here */
						//list terms in a given taxonomy using wp_list_categories (also useful as a widget if using a PHP Code plugin)

						$taxonomy     = 'publications_category';
						$orderby      = 'name';
						$show_count   = 0;      // 1 for yes, 0 for no
						$pad_counts   = 0;      // 1 for yes, 0 for no
						$hierarchical = 1;      // 1 for yes, 0 for no
						$title        = '';
						$empty        = 0;

						$args = array(
  							'taxonomy'     => $taxonomy,
  							'orderby'      => $orderby,
  							'show_count'   => $show_count,
  							'pad_counts'   => $pad_counts,
  							'hierarchical' => $hierarchical,
  							'title_li'     => $title,
  							'hide_empty'   => $empty
						);
						
						$categories = get_categories( $args );
						//var_dump($categories);
						foreach($categories as $c){
							$post_count = intval($c->count);
								
							$cat_id = intval($c->term_id);
							if($post_count > 0)	{
						?>
						<h2><?php echo $c->name; ?></h2>
						<ul>
<?php
global $post;
$args['post_type'] = 'publications';
$args['numberposts'] = '-1';

$args['tax_query'] = array(
    array(
      'taxonomy' => 'publications_category',
      'field' => 'id',
      'terms' => $cat_id, // Where term_id of Term 1 is "1".
      'include_children' => false
    )
  );


// = array('post_type' => 'publications');
$myposts = get_posts( $args );
?>
<?php
foreach( $myposts as $post ) :	setup_postdata($post); ?>
	<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
<?php endforeach; ?>
</ul>	
						<?php
							}
						}
						?>		
						<div class="clear"></div>
						
						<div class="thetags">
							<?php the_tags('Tags: ', ', ', '<br />'); ?>
						</div>

						
						<?php //comments_template(); // Get wp-comments.php template ?>
					</div>
		
		<?php endwhile; ?>
	
	<?php endif; ?>
		
		<div class="clear"></div>
		
		
		
	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>