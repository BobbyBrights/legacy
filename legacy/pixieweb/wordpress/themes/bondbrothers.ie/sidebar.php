<?php // Sidebar ?>
<h4>Latest testimonials</h4>
<?php 

$args = array( 'post_type' => 'testimonial', 'posts_per_page' => 5 );
$loop = new WP_Query( $args );
while ( $loop->have_posts() ) : $loop->the_post();
	echo '<blockquote class="testimonial">';
	the_content();
	echo '<cite>';
	the_title();
	echo '</cite></blockquote>';
endwhile; 
?>



