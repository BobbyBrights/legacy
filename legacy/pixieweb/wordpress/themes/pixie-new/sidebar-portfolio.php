<div class="span3 related-content">
	<?php 
		$term_list = wp_get_post_terms($post->ID, 'project-type', array("fields" => "names"));
		//vomit($term_list);
	?>
		<h3>Categories</h3>
		<?php foreach($term_list as $t): ?>
			<span class="label label-inverse"><?php echo($t); ?></span>&nbsp;
		<?php endforeach; ?>
	<?php 
		$term_list = wp_get_post_terms($post->ID, 'keywords', array("fields" => "names"));
		//ithubvomit($term_list);
	?>
		<h3>Technologies/Skills</h3>
		<?php foreach($term_list as $t): ?>
			<span class="label label-info"><?php echo($t); ?></span>&nbsp;
		<?php endforeach; ?>
</div>
