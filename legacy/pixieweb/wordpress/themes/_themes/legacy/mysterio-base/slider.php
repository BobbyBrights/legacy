<?php if ( is_active_sidebar( 'home-ffs' ) ) : ?>
	<div id="slider" class="sl-slider-wrapper">
		<div class="sl-slider">
			<?php dynamic_sidebar( 'home-ffs' ); ?>
		</div>
		
<?php 
//vomit(count_sidebar_widgets('home-ffs'));
if(count_sidebar_widgets('home-ffs'. false) > 1):
	$str = '<nav id="nav-dots" class="nav-dots"><span class="nav-dot-current"></span>';
	for($i = 1; $i < count_sidebar_widgets('home-ffs'. false); $i++){
		$str .= '<span></span>';	
	}
	$str .= '</nav>';
	echo $str;
endif;
?>
	</div>
<?php else: ?>
	<div class="container">
		<h2>Static image</h2>
	</div>
<?php endif; ?>