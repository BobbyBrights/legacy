<?php //vomit($user); ?>
<?php $this->assign('title', 'User information for ' . $user['User']['name']); ?>
<div class="row">
	<div class="span8">	
		<h2>Attendee Information</h2>
		<div class="well attendee-info">
			 <?php echo $this->Html->image('/eventure/img/male.png', array('alt' => 'User', 'class' => 'pull-left with-trough-right', 'width' => 150)); ?>
			 <h3><?php echo $user['User']['username']; ?></h3>
			<?php //vomit($attendee); ?>
		</div>	

	</div>
	<div class="span4">
		<h2>Actions</h2>
		<div class="well">
			<?php echo $this->Html->link('<i class="icon-user"></i>  Edit This user', array('action' => 'edit', $user['User']['id']), array('class' => 'btn btn-large btn-block with-margin-bottom', 'escape' => false)); ?>
			
			<?php if($is_admin): ?>
			<?php echo $this->Form->postLink(
				'<i class="icon-remove icon-white"></i> ' . __d('cake', 'Delete this user'),
				array('plugin' => 'eventure', 'action' => 'delete', $user['User']['id']),
				array('class' => 'btn btn-danger btn-large btn-block with-margin-top', 'escape' => false),
				__d('cake', 'Are you sure you want to delete ', true) . $user['User']['username'] . ' from the system?'
			); ?>
			<?php endif; ?>
		</div>	


	</div>
</div>