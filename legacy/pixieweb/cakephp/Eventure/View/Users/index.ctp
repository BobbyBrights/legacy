<?php $this->assign('title', 'User Listing'); ?>
<div class="row">
<div class="span8">
	<h1>User listing</h1>
	<form class="form-search pull-right" action="<?php echo $this->Html->url(array('action' => 'search')); ?>" method="post">
		<input type="hidden" name="model" value="users" />
		<div class="input-append">
			<input type="text" class="span2 search-query predict" placeholder="Search Users" data-model='users' data-field="name" name="name" autocomplete='off'>
			<button type="submit" class="btn">Search</button>
		</div>
	</form>
	<div class="clearfix"></div>
	<?php foreach($data as $user): ?>
		<h4 class="underlined"><?php echo $user['User']['username']; ?>
			<?php echo $this->Html->link('View this user <i class="icon-chevron-right"></i>', array('controller' => 'users', 'plugin' => 'eventure', 'action' => 'view', $user['User']['id']), array('class' => 'btn btn-mini pull-right', 'escape' => false)); ?>
		</h4>
	<?php endforeach; ?>
	<?php echo $this->element('pager'); ?>
</div>
<div class="span4">
	<div class="well">
		<h3>Actions</h3>
		<?php echo $this->Html->link('Add new user', array('action' => 'add'), array('class' => 'btn btn-large btn-block btn-primary')); ?>
	</div>

</div>


</div>
