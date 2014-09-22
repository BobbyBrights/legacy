<?php $terms = wp_get_post_terms( $post->ID, 'keywords' ); //vomit($post); ?>
<div class="span3 related-content">
    <div class="well sidebar-nav">
    	<h3>Information</h3>
    	<dl class="meta">
    		<dt>Added</dt>
    		<dd>{date}</dd>
    		<dt>Keywords</dt>
    		<dd>
    		<?php if(sizeof($terms) > 0): ?>

					<?php foreach($terms as $t): ?>
						<span class="label label-info"><?php echo $t->name; ?></span> 
					<?php endforeach; ?>

				<?php endif; ?>
    		</dd>
    	</dl>
    	
    </div><!--/.well -->
</div>
