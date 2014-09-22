<div class="row">
<div class="span8">
	<?php //vomit($data); ?>
	<?php //vomit($events); ?>
	<?php //vomit($accreditation_types); ?>
	<h1 class="with-margin-bottom">Checkins</h1>	
	<table class="table table-condensed">
		<tr>
			<th><?php echo $this->Paginator->sort('Attendee.name', 'Attendee Name'); ?></th>
			<th><?php echo $this->Paginator->sort('Accreditation.name', 'Accreditation'); ?></th>
			<th><?php echo $this->Paginator->sort('Checkin.created', 'Checked in at'); ?></th>
		</tr>
		<?php foreach($data as $checkin): ?>
		<tr>
			<td><?php echo !empty($checkin['Attendee']['name']) ?  $checkin['Attendee']['name'] : "(Not set)"; ?> </td>
			<td><?php echo get_event_name($checkin['Accreditation']['event_id'], $events) . " - " . get_accreditation_type($checkin['Accreditation']['accreditation_type_id'], $accreditation_types);  ?> </td>
			<td><?php echo $checkin['Checkin']['created']; ?> </td>
		</tr>
		<?php endforeach; ?>		
	</table>
<?php echo $this->element('pager'); ?>
</div>
<div class="span4">
	<div class="well">
		<h3>Actions</h3>
		<?php echo $this->Html->link('New checkin', array('action' => 'add'), array('class' => 'btn btn-large btn-block btn-primary', 'escape' => false)); ?>
	</div>
</div>


</div>
