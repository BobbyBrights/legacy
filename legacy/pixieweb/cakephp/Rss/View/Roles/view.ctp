<h2>Role: <?php echo $role['Role']['name']; ?></h2>
<p><?php echo $role['Role']['summary']; ?></p>
<div class="btn-group">
	<?php echo $this->Html->link('Edit this role', array('action' => 'edit', $role['Role']['id']), array('class' => 'btn btn-primary')); ?>
	<a class="btn btn-danger" href="#">Delete</a>
</div>
<hr />

<!-- Users Role -->
<?php //vomit($users_with_role); ?>
<h3>Users with this role</h3>
<?php if(!empty($users_with_role)): ?>
<ul>
<?php foreach ($users_with_role as $i): ?>
      <li><?php echo $this->Html->link( $i['User']['name'], array('controller' => 'users', 'action' => 'view', $i['User']['id'])); ?></li>
<?php endforeach; ?>
</ul>
<?php else: ?>
<p class="muted">No users with this role</p>
<?php endif ?>

