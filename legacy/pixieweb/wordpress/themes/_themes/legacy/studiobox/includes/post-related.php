<?php
	$original_post = $post;
	$tags = wp_get_post_tags($post->ID);
	if ($tags) {
	  echo '<div class="sidebartitle">Related Posts</div>';
	  $first_tag = $tags[0]->term_id;
	  $args=array(
		'tag__in' => array($first_tag),
		'post__not_in' => array($post->ID),
		'showposts'=>4,
		'caller_get_posts'=>1
	   );
	  $my_query = new WP_Query($args);
	  if( $my_query->have_posts() ) {
		echo '<div class="relatedposts"><ul>';
		while ($my_query->have_posts()) : $my_query->the_post(); ?>
		  <li class="relatedimage">
			  <a href="<?php the_permalink() ?>">
				<img src="<?php bloginfo('template_directory'); ?>/timthumb.php?src=<?php echo get_post_meta($post->ID, "image", true); ?>&amp;h=25&amp;w=40&amp;zc=1" alt="" />
			  </a>
		  </li>
		  <li class="relateddesc">
			<a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>">
			<?php the_title(); ?>
			</a>
		  </li>
		  <li class="relatedclear">
		  </li>
		<?php endwhile;
		echo "</ul></div>";
	  }
	}
	$post = $original_post;
	wp_reset_query();
?>