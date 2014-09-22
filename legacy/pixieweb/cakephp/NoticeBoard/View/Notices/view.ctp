<?php //vomit($notice); ?>
<h2><?php echo $notice['Notice']['summary']; ?></h2>
<p><?php echo $notice['Notice']['description']; ?></p>
<p class="muted">Posted on <?php echo $notice['Notice']['created']; ?> in <?php echo $this->Html->link($notice['Category']['name'], array('controller' => 'notices', 'action' => 'index', 'category_id' => $notice['Category']['id'])); ?></p>

<div class="btn-group">
	<?php echo $this->Html->link('Edit', array('action' => 'edit', $notice['Notice']['id']), array('class' => 'btn btn-primary')); ?>
	<a class="btn btn-danger" href="#">Delete</a>
</div>