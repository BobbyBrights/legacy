<?php $this->assign('title', 'Promoter information for ' . $promoter['Promoter']['name']); ?>
<div class="row">
	<div class="span8">	
		<h2>Promoter Information</h2>
		<div class="well attendee-info">
			 <?php echo $this->Html->image('/eventure/img/male.png', array('alt' => 'Promoter', 'class' => 'pull-left with-trough-right', 'width' => 150)); ?>
			 <h3><?php echo $promoter['Promoter']['name']; ?></h3>
			<?php //vomit($promoter); ?>
		</div>	
	</div>
	<div class="span4">
		<h2>Actions</h2>
		<div class="well">
			<?php echo $this->Html->link('<i class="icon-user"></i>  Edit This Promoter', array('action' => 'edit', $promoter['Promoter']['id']), array('class' => 'btn btn-large btn-block with-margin-bottom', 'escape' => false)); ?>
			
			<?php echo $this->Form->postLink(
				'<i class="icon-remove icon-white"></i> ' . __d('cake', 'Delete this promoter'),
				array('action' => 'delete', $promoter['Promoter']['id']),
				array('class' => 'btn btn-danger btn-large btn-block with-margin-top', 'escape' => false),
				__d('cake', 'Are you sure you want to delete ', true) . $promoter['Promoter']['name'] . ' from the system?'
			); ?>
			
		</div>	
	</div>
</div>