<?php $this->assign('title', 'Attendee information for ' . $attendee['Attendee']['name']); ?>
<?php 
	$selected_accreditations = array(); 
	
	if(sizeof($attendee['Accreditation']) > 0):
		foreach($attendee['Accreditation'] as $a):
			$selected_accreditations[] = $a['id'];
		endforeach;
	endif;
	//vomit($selected_accreditations);
?>

<div class="row">
	<div class="span9">	
		<h2>Accreditations for <?php echo $attendee['Attendee']['name']; ?></h2>
		<div class="checkin form well">
		<?php
			echo $this->Form->create('AttendeesAccreditation');
			echo $this->Form->input('attendee_id', array('type' => 'hidden', 'default' => $attendee['Attendee']['id']));
			echo $this->Form->input('accreditation_id', array('multiple' => 'checkbox', 'div' => 'checkbox-group span7', 'selected' => $selected_accreditations));
			echo $this->Form->button('Save Accreditations', array('type' => 'submit', 'class' => 'btn btn-large'));		
			echo $this->Form->end();
		?>
		</div>
	</div>
	<div class="span3">
		
		 
			
	</div>
</div>