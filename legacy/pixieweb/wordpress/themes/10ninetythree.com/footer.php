		<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
		<!-- classie.js by @desandro: https://github.com/desandro/classie -->
		<script src="<?php echo get_template_directory_uri(); ?>/js/components/classie.js"></script>

		<?php if (is_page('what-we-do')): ?>
		<!-- What we do --> 
		<script src="<?php echo get_template_directory_uri(); ?>/js/components/cbpScroller.js"></script>
		<script type="text/javascript">
			new cbpScroller( document.getElementById( 'cbp-so-scroller' ) );
		</script>
		<?php endif; ?>

		<?php if (is_page('how-we-work')): ?>
		<!-- How we work --> 
		<script src="<?php echo get_template_directory_uri(); ?>/js/jquery-easing.min.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/js/components/slideScroll.js"></script>
		<?php endif; ?>

		<?php if (is_page('who-we-are')): ?>
		<!-- Who we are --> 
		<script src="<?php echo get_template_directory_uri(); ?>/js/components/cbpSplitLayout.js"></script>
		<?php endif; ?>		
		<script src="<?php echo get_template_directory_uri(); ?>/js/components/jquery.dlmenu.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/js/10ninetythree.js"></script>
		<?php //wp_footer(); ?>
	</body>
</html>
