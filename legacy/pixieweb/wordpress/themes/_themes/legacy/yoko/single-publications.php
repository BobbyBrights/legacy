<?php
/*
Single Post Template: Publications Template
Description: This part is optional, but helpful for describing the Post Template
*/
/**
 * @package WordPress
 * @subpackage Yoko
 */

get_header(); 
$args = array(
	'post_type'=> 'publications'
);
query_posts( $args );
?>

<div id="wrap">
<div id="main">

	<div id="content">

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	
			<?php get_template_part( 'content', 'publications' ); ?>
				
			<?php comments_template( '', true ); ?>

			<?php endwhile; // end of the loop. ?>
			<!--
			<nav id="nav-below">
				<div class="nav-previous"><?php previous_post_link( '%link', '' . _x( '&larr;  Previous Post', 'Previous post link', 'yoko' ) . '' ); ?></div>
				<div class="nav-next"><?php next_post_link( '%link', __('') . _x( 'Next Post &rarr;', 'Next post link', 'yoko' ) . '' ); ?></div>
			</nav><!-- end nav-below -->
				
	</div><!-- end content -->
	
<?php get_sidebar(); ?>
<?php get_footer(); ?>