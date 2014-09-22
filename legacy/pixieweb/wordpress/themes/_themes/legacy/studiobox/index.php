<?php
/**
 * @WordPress Studiobox Main
 */
get_header();

?>

<?php // Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");


$vkey="video";
$key="image";
$quality=72;
$pheight=120;
$pwidth=240;
$portfolio_count=0;
?>

		
		<?php if ( !dynamic_sidebar('Home Image') ) : ?>
			<h1>Sidebar does not exist</h1>
		<?php endif; ?>
		
		<div class="clear"></div>

		
		<!-- Category Block -->
		<div class="mportfoliowrap left-aligned first-block">
			
			<?php if ( !dynamic_sidebar('Homepage Content') ) : ?>
				<h1>Sidebar does not exist</h1>
			<?php endif; ?>
		
			<div class="clear"></div>
		</div>	
		
		<div class="mportfoliowrap left-aligned second-block">
			<div class="mportfoliobox">
				<div class="homeportfoliotitle">
						<a href="/news-events" class="white-text">News &amp; Events</a>
				</div>
				
				<div class="mportfoliodescription white-background news-items">
					<?php if ( !dynamic_sidebar('News Area On Homepage') ) : ?>
						<h1>Sidebar does not exist</h1>
					<?php endif; ?>
				</div>
			</div>	
			<div class="clear"></div>
		</div>	
		
		<div class="clear"></div>
		

	</div> <!-- Close Mainpage -->
	
<?php get_footer(); ?>
