<?php $this->assign('title', 'Attendee information for ' . $attendee['Attendee']['name']); ?>
<?php //vomit($attendee); ?>
<div class="row">
	<div class="span8">	
		<h2>Attendee Information</h2>
		<div class="well attendee-info">
			 <?php echo $this->Html->image('/eventure/img/male.png', array('alt' => 'Attendee', 'class' => 'pull-left with-trough-right', 'width' => 150)); ?>
			 <h3><?php echo $attendee['Attendee']['name']; ?></h3>
			 <?php if($attendee['LeadAttendee']['id'] != null): ?>
			 <div class="lead_contact">
				 <h4>Reports to: <?php echo $this->Html->link($attendee['LeadAttendee']['name'], array('action' => 'view', $attendee['LeadAttendee']['id'])); ?></h4>
			 </div>
			 <?php endif; ?>	
			<?php //vomit($attendee); ?>
		</div>	
		<h2>Accreditations</h2>
		<div class="well">
			<ul class="accreditations">
			<?php foreach($attendee['Accreditation'] as $a): ?>
				<li><?php echo $this->Utilities->get_accreditation($a['id'], $attendee['Accreditations']); ?></li>
			<?php endforeach; ?>
			</ul>
			<?php //vomit($a); ?>
		</div>
		<h2>Checkins</h2>
		<div class="well">
			<ul class="checkins">
			<?php foreach($attendee['Checkins'] as $a): ?>
				<li>Accreditation <strong><?php echo $this->Utilities->get_accreditation($a['Checkin']['accreditation_id'], $attendee['Accreditations']); ?></strong>. Checked in at <?php echo $a['Checkin']['created']; ?> with wristband <?php echo $a['Checkin']['wristband_no']; ?></li>
			<?php endforeach; ?>
			</ul>		
		</div>
	</div>
	<div class="span4">
		<h2>Actions</h2>
		<div class="well">
			<?php echo $this->Html->link('<i class="icon-user"></i>  Edit This Attendee', array('action' => 'edit', $id), array('class' => 'btn btn-large btn-block with-margin-bottom', 'escape' => false)); ?>
			<?php echo $this->Html->link('<i class="icon-user"></i>  Update Accreditations', array('action' => 'update_accreditations', $id), array('class' => 'btn btn-large btn-block with-margin-bottom', 'escape' => false)); ?>
			<?php echo $this->Html->link('<i class="icon-user icon-white"></i>  Add sub-ordinates', array('action' => 'add_subordinates', 'id' => $id), array('class' => 'btn btn-primary btn-large btn-block with-margin-bottom', 'escape' => false)); ?>
			<?php if(isset($is_admin) && $is_admin): ?>
			<?php echo $this->Form->postLink(
				'<i class="icon-remove icon-white"></i> ' . __d('cake', 'Delete this attendee'),
				array('plugin' => 'eventure', 'action' => 'delete', $attendee['Attendee']['id']),
				array('class' => 'btn btn-danger btn-large btn-block with-margin-top', 'escape' => false),
				__d('cake', 'Are you sure you want to delete ', true) . $attendee['Attendee']['name'] . ' from the system?'
			); ?>
			<?php endif; ?>
		</div>	
		 <?php if(sizeof($attendee['Subordinate']) > 0): ?>
		<h2>Subordinates</h2>
		<div class="well">
			<?php //vomit($subordinates); ?>
			<?php foreach($attendee['Subordinate'] as $subord): ?>
				<?php echo $this->Html->link($subord['name'], array('action' => 'view', $subord['id'])); ?><br/>
			<?php endforeach; ?>
		</div>	
		<?php endif; ?>

	</div>
</div>