<?php
wp_enqueue_style('pandora_coin_slider', get_template_directory_uri() . '/jquery/slider/coin-slider-styles.css');
wp_enqueue_script('pandora_coin_slider_script', get_template_directory_uri() . '/jquery/slider/coin-slider.js');

function pandora_new_excerpt_length($length) {
	return 30;
}
add_filter('excerpt_length', 'pandora_new_excerpt_length');

function pandora_new_excerpt_more($more) {
	return '...';
}
add_filter('excerpt_more', 'pandora_new_excerpt_more');

function pandora_slider_header_place()
{
?>	<div class='header_for_slider'>
	<div id='coin-slider'> <?php
	
	$counter = 0;	
	//for Limit switch off by auto WP framework
	query_posts( 'posts_per_page=2000' );
	//for Limit switch on by user Pandora settings
	$max = pandora_my_sliders_long();
	 while ( have_posts() && $counter < $max ) : the_post(); 
		if ( has_post_thumbnail() )
		{
			$original = wp_get_attachment_url( get_post_thumbnail_id() );
			$size = getimagesize($original);
			if ($size[0] > 999)
			{
				?>	
					<a href="<?php the_permalink(); ?>" target="_self">
					<?php the_post_thumbnail(); ?>
					<span>
						<?php the_title() ?>
						<?php echo " :::: ";?>
						<?php the_excerpt()?>
					</span>
					</a>
				<?php		
				$counter++;
			}
		}
	endwhile;	
	
	if ($counter == 0)
	{
		?>	
			<a href="<?php echo home_url() ?>" target="_self">
			<img src="<?php echo get_template_directory_uri() ?>/images/ban3.jpg">
			<span>
				<?php echo "Welcome you! :::: ";?>
				<?php echo _e( 'This is the Pandora theme by belicza.com. Pandora has many extended options in Pandora menu of the Dashboard. You should set a style. It\'s so easy :)', 'pandora' );?>
			</span>
			
			</a>
			
			<a href="<?php echo home_url() ?>" target="_self">
			<img src="<?php echo get_template_directory_uri() ?>/images/ban1.jpg">
			<span>
				<?php echo "Featured content :::: ";?>
				<?php echo _e( 'Post a text and upload an thumbnail image with 1000 pixels width for working Slider...', 'pandora' );?>
			</span>
			</a>
			
		<?php
	}
?>	</div> </div>
<?php wp_reset_query();

}

function pandora_slider_header_end()
{
?>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#coin-slider').coinslider({ 
				width: 1000, // width of slider panel
				height: 300, // height of slider panel
				spw: 7, // squares per width
				sph: 5, // squares per height
				delay: 3000, // delay between images in ms
				sDelay: 60, // delay beetwen squares in ms
				opacity: 0.7, // opacity of title and navigation
				titleSpeed: 2000, // speed of title appereance in ms
				effect: '', // random, swirl, rain, straight
				navigation: true, // prev next and buttons
				links : true, // show images as links
				hoverPause: true // pause on hover
			});
		});
	</script>
<?php
}
?>