<h2><?php echo $item['Item']['summary']; ?></h2>
<p class="muted">Posted in <?php echo $this->Html->link($item['Feed']['name'], array('controller' => 'feeds', 'action' => 'view', $item['Feed']['id'])) ; ?> | Author: <?php echo $this->Html->link($item['User']['name'], array('controller' => 'users', 'action' => 'view', $item['User']['id'])) ;  ?> | Publish date: <?php echo $item['Item']['created']; ?></p>
<p><?php echo $item['Item']['content']; ?></p>
<?php if(!empty($item['Category'])): ?>
	<div id="categories">Categories: 
		<?php foreach($item['Category'] as $c): ?>
			<span class="label label-warning"><?php echo $c['name']; ?></span>
		<?php endforeach; ?>
	</div>
<?php endif; ?>


<hr />
<div class="btn-group">
	<?php echo $this->Html->link('Edit this item', array('action' => 'edit', $item['Item']['id']), array('class' => 'btn btn-primary')); ?>
	<a class="btn btn-danger" href="#">Delete</a>
</div>
