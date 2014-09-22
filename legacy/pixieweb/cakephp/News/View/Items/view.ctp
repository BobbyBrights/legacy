<?php $m = strtolower( Inflector::slug($item['ItemType']['name'], '-') ); ?>
<?php echo $this->Html->link('Edit', array('controller' => 'items', 'action' => 'edit', $this->passedArgs[1])); ?>
<article id="<?php echo $m. '-' . $item['Item']['id']; ?>" class="<?php echo $m; ?>">
	<h2><?php echo utf8_encode( $item['Item']['title'] ); ?></h2>
	<?php echo utf8_encode($item['Item']['content']); ?>
	<p class="pub_date">Published on: <?php echo str_replace(' 00:00:00', '', $item['Item']['created']); ?></p>
	<?php if(isset($attachments)):?>
		
		<div id="gallery">
			<?php foreach($attachments as $a): 
				$caption = '';
				foreach($a['Metadata'] as $m):
					if($m['Metadatum']['key'] == 'caption'):
						$caption = $m['Metadatum']['value'];
					endif;
				endforeach;
			?><div class="box"><img src="<?php echo $a['Attachment']['path']; ?>" width="280"/><?php if($caption != ''): ?><div class="caption"><?php echo utf8_encode($caption); ?></div><?php endif; ?></div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</article>
