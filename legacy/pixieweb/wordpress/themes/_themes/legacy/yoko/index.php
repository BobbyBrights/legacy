<?php
/**
 * @package WordPress
 * @subpackage Yoko
 */

get_header(); ?>

<div id="wrap">
<div id="main">
	<div id="content">
		<div id="content-lhs">
			<?php dynamic_sidebar('home-header-section'); ?>
			<?php dynamic_sidebar('home-content-section'); ?>
			<div class="clear"></div>
			
			</div>
			
		<div id="content-rhs">
		<?php dynamic_sidebar('home-links-section'); ?>
		
		</div>
	<div class="clear"></div>	
			</div>
		<div class="clear"></div>	
	</div><!-- end content -->

<?php if(!is_home()) { get_sidebar(); }?>
<?php get_footer(); ?>