<div class="span3 related-content">
    <div class="well sidebar-nav">
	    <?php switch($wp_query->query_vars['taxonomy']): 
	    		case 'project-type': ?>
				<h2>Current Projects</h2>
			<?php break; 
				default: ?>
				<h2>Default</h2>
			<?php break; 
		 endswitch; ?>

    </div><!--/.well -->
</div>
