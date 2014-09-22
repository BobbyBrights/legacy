<?php
/**
 * @StudioBox header
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>

<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />

<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

<?php // Get the user choices for the theme options.
include (TEMPLATEPATH . "/includes/getoption.php");
?>

<link href="<?php bloginfo('stylesheet_url'); ?>" rel="stylesheet" type="text/css" media="screen" />
<link href="<?php bloginfo('stylesheet_directory'); ?>/css/ddsmoothmenu.css" rel="stylesheet" type="text/css" />
<link href="<?php bloginfo('stylesheet_directory'); ?>/css/colorbox.css" type="text/css" media="screen" rel="stylesheet" />

<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

<?php
$logo="logo.png";
$stylefile="";
$darkcolor="";

if ($studiobox_skin == "Bright theme") { $stylefile="bright.css"; $logo="/skins/bright/logo.png"; }
if ($studiobox_skin == "Light - Blue") { $stylefile="light-blue.css"; $logo="/skins/light-blue/logo.png"; }
if ($studiobox_skin == "Light - Red") { $stylefile="light-red.css"; $logo="/skins/light-red/logo.png"; }
if ($studiobox_skin == "Light - Green") { $stylefile="light-green.css"; $logo="/skins/light-green/logo.png"; }
if ($studiobox_skin == "Dark theme") { $stylefile="dark.css"; $logo="/skins/dark/logo.png"; }
if ($studiobox_skin == "Dark - Blue") { $stylefile="dark.css"; $darkcolor="dark-blue.css"; $logo="/skins/dark-blue/logo.png"; }
if ($studiobox_skin == "Dark - Red") { $stylefile="dark.css"; $darkcolor="dark-red.css"; $logo="/skins/dark-red/logo.png"; }
if ($studiobox_skin == "Dark - Green") { $stylefile="dark.css"; $darkcolor="dark-green.css"; $logo="/skins/dark-green/logo.png"; }

/**
if ($studiobox_skin == "Classic theme") { $stylefile="classic.css"; $logo="logo.png"; }
if ($studiobox_skin == "Shade theme") { $stylefile="shade.css"; $logo="/skins/shade/logo.png"; }
if ($studiobox_skin == "Dark theme") { $stylefile="dark.css"; $logo="/skins/dark/logo.png"; }
if ($studiobox_skin == "Blue theme") { $stylefile="blue.css"; $logo="/skins/blue/logo.png"; }
if ($studiobox_skin == "Red theme") { $stylefile="red.css"; $logo="/skins/red/logo.png"; }
if ($studiobox_skin == "Green theme") { $stylefile="green.css"; $logo="/skins/green/logo.png"; }
**/
?>

<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
<link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="<?php bloginfo('atom_url'); ?>" />

<?php wp_head(); ?>
<?php
if (is_archive()) {
?>
<link href="<?php bloginfo('stylesheet_directory'); ?>/css/portfolio-galleria.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery.galleria.js"></script>
<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/galleria-init1.js"></script>
<?php
}
?>

<?php
if (is_single()) {
?>
<link href="<?php bloginfo('stylesheet_directory'); ?>/css/page-galleria.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery.galleria.js"></script>
<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/galleria-init2.js"></script>
<?php
}
?>

	<?php
	
	if (is_home()) {
	
		switch ($studiobox_featstyle) {
			case "Accordion Slides":
				?>
				
		<link href="<?php bloginfo('stylesheet_directory'); ?>/css/haccordion.css" rel="stylesheet" type="text/css" />
				
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/haccordion.js">
		/***********************************************
		* Horizontal Accordion script- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
		* This notice MUST stay intact for legal use
		* Visit Dynamic Drive at http://www.dynamicdrive.com/ for this script and 100s more
		***********************************************/
		</script>
				
		<!-- Accordion initialize -->	
		<script type="text/javascript">

		haccordion.setup({
			accordionid: 'hc1', 
			paneldimensions: {peekw:'50px', fullw:'786px', h:'200px'},
			selectedli: [-1, true], 
			collapsecurrent: false 
		})

		</script>
				
				<?php
				break;
			case "Slider Scroll":
				?>

		<link href="<?php bloginfo('stylesheet_directory'); ?>/css/slider.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/loopedslider.min.js"></script>
				
		<!-- Slider Initialize -->	
		<script type="text/javascript" charset="utf-8">
				$(function(){
					$('#loopedSlider').loopedSlider({
						addPagination: false,
						containerClick: false,
						autoStart: 8000
					});
				});
		</script>
				
				<?php
				break;
			case "Slideshow Gallery":
				?>
				
				
				<link href="<?php bloginfo('stylesheet_directory'); ?>/css/home-galleria.css" rel="stylesheet" type="text/css" />
				<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery.galleria.js"></script>
				<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/galleria-init1.js"></script>
				
				<?php
				break;
		}
	}
	?>
	
	
<!--[if lte IE 6]>
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_directory'); ?>/css/ie6.css" media="screen" />
<![endif]-->

<!--[if lte IE 7]>
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_directory'); ?>/css/ie7.css" media="screen" />
<![endif]-->

<!--[if lte IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_directory'); ?>/css/ie8.css" media="screen" />
<![endif]-->

<link href="<?php bloginfo('stylesheet_directory'); ?>/css/custom-style.css" rel="stylesheet" type="text/css" />

<link href="<?php bloginfo('stylesheet_directory'); ?>/css/pagenavi-css.css" type="text/css" media="screen" rel="stylesheet" />

<?php if ($stylefile<>"") { ?>
	<link href="<?php bloginfo('stylesheet_directory'); ?>/css/skins/<?php echo $stylefile; ?>" rel="stylesheet" type="text/css" />
<?php } ?>

<?php if ($darkcolor<>"") { ?>
	<link href="<?php bloginfo('stylesheet_directory'); ?>/css/skins/<?php echo $darkcolor; ?>" rel="stylesheet" type="text/css" />
<?php } ?>

<!-- Dropdown menus --> 
<!-- The Css dropdown framework's layout -->
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/dropdown-framework/css/dropdown/dropdown.css" type="text/css" media="screen" />
<!-- And the menu's design aka theme -->
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/dropdown-framework/css/dropdown/ubuntu.css" type="text/css" media="screen" />

</head>

<?php if ($studiobox_featstyle=="Accordion Slides" && (is_home())) { ?>
<!-- Open Accordion once everything is loaded -->	
<body onload="javascript:haccordion.expandli('hc1', 0)">
<?php } else { ?>
<body>
<?php } ?>

<?php if (is_home()) { ?>		
<div id="mainpagecontainer"> <!-- Outside Container -->
<?php } else { ?>
<div id="pagecontainer"> <!-- Other than mainpage -->
<?php } ?>

	<div id="mainpage"> 
	
		
		<div id="mainpageheader"> <!-- Header Start -->
			<div class="clear"></div>
			
			<h2 class="heading-site">Teacher Education for Sustainable Development.</h2>
		<div id="smoothmenu1" class="ddsmoothmenu">		
			
		<?php
		
		function sbox_nav_fallback() {
		   include (TEMPLATEPATH . "/includes/fallbackmenu.php");
		}
		
		if ( function_exists('wp_nav_menu') ) { 
			// If 3.0 menus exist
			wp_nav_menu( array( 'container' => '', 'theme_location' => 'primary', 'fallback_cb' => 'sbox_nav_fallback' ) );

		} else {
			// Else show the regular Menu
			include (TEMPLATEPATH . "/includes/menu.php");
		} 

		?>
		<br style="clear: left" />
		</div>		
			<!-- Logo -->
			<div id="logo">
				<a href="<?php echo get_option('home'); ?>">
					<?php if ($studiobox_logo<>"") { ?>
						<img src="<?php echo $studiobox_logo; ?>" alt="logo" />
					<?php } else { ?>
						<img src="<?php bloginfo('stylesheet_directory'); ?>/images/<?php echo $logo; ?>" alt="logo" />
					<?php } ?>
					<!--<div class="tagline"><?php bloginfo( 'description' ); ?> </div>-->
				</a>
				
			</div>			
		</div> <!-- Close Header -->
		
		<div class="clear"></div>	
		
			<div id="main-nav">
				<?php $defaults = array(
        'theme_location' => '', // Setting up the location for the main-menu, Main Navigation.
        'menu' => 'top-menu',
        'menu_class' => 'dropdown', //Adding the class for dropdowns
        'container_id' => 'navwrap', //Add CSS ID to the containter that wraps the menu.
        'fallback_cb' => 'wp_page_menu'
            ); 
        
        wp_nav_menu( $defaults ); ?>
			</div>
		