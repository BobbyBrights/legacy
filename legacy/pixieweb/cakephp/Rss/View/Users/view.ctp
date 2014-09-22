<h2><?php echo $user['User']['fullname']; ?> - <?php echo $user['User']['name']; ?></h2>
<?php if(!empty($user['Role'])): ?>
<div class="badges role">
	<p class="pull-left"><span class="lead-in">Roles: </span>
	<?php foreach($user['Role'] as $f): ?>
		<span class="label label-info margin-right"><?php echo $f['name']; ?></span>
	<?php endforeach; ?>
	</p>
</div>
<div class="clearfix"></div>
<?php endif; ?>
<div class="btn-group">
	<?php echo $this->Html->link('Edit this user', array('action' => 'edit', $user['User']['id']), array('class' => 'btn btn-primary')); ?>
	<a class="btn btn-danger" href="#">Delete</a>
</div>
<hr />

<?php //vomit($user); ?>



<!-- Users Feed Items -->
<h3>Users Items</h3>
<?php if(!empty($user['Item'])): ?>
<ul>
<?php foreach ($user['Item'] as $i): ?>
      <li><?php echo $this->Html->link( $i['summary'], array('controller' => 'items', 'action' => 'view', $i['id'])); ?></li>
<?php endforeach; ?>
</ul>
<?php else: ?>
<p class="muted">No items from this user</p>
<?php endif ?>