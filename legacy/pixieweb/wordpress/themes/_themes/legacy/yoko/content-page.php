<?php
/**
 * @package WordPress
 * @subpackage Yoko
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="page-entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>
	</header><!--end page-entry-hader-->

	<div class="single-entry-content">
		<?php the_content(); ?>
		<div class="clear"></div>
		<!--<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'yoko' ), 'after' => '</div>' ) ); ?>-->
		<?php edit_post_link( __( 'Edit &rarr;', 'yoko' ), '<span class="edit-link">', '</span>' ); ?>
		<?php //get_sidebar(); ?>
	</div><!--end entry-content-->
	<div class="clear"></div>
</article>
<div id="content-rhs"><?php dynamic_sidebar('page-rhs'); ?></div>
<!-- end post-<?php the_ID(); ?> -->
