<?php //vomit($category); ?>
<h2><?php echo $category['Category']['name']; ?></h2>
<p><?php echo $category['Category']['summary']; ?></p>
<div class="btn-group">
	<?php echo $this->Html->link('Edit this category', array('action' => 'edit', $category['Category']['id']), array('class' => 'btn btn-primary')); ?>
	<a class="btn btn-danger" href="#">Delete</a>
</div>
<hr />

<h3>Items associated with this category <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New Item', array('action' => 'add', 'controller' => 'items'), array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h3>

<?php //vomit($feeds); ?>

<?php if(!empty($items)): ?>
<ul>
<?php foreach ($items as $i): ?>
      <li><?php echo $this->Html->link( $i['Item']['summary'], array('controller' => 'items', 'action' => 'view', $i['Item']['id'])); ?></li>
<?php endforeach; ?>
</ul>
<?php else: ?>
<p class="muted">No feeds associated with this category</p>
<?php endif ?>