<?php //vomit($accredited); ?>	
<?php

$selected = array();
foreach($accredited as $a):
	$selected[] = $a['Attendee']['id'];
endforeach;
?>

<div class="row">
		<h2>Select Attendees</h2>
		<p>Add or update accreditation info: <strong><?php echo $accreditation['Event']['name'] . " - " . $accreditation['AccreditationType']['name']; ?></strong></p>
		<div class="accreditations form well">
			<span class="help-block">Choose all attendees</span>
			<?php	
				echo $this->Form->create(null, array('action' => 'add_attendee_accreditations'));
				$this->Form->inputDefaults(
					array(
						'class' => 'span6',
						'error' => array('attributes' => array('class' => 'alert alert-error'))
					)
				);
				if(isset($data)):
					echo $this->Form->hidden('id', array('value' => $data['accr_id']));
				endif;
				
				
				foreach($attendees as $a){
					echo "<label class='checkbox separated'><input id='Attendee".$a['Attendee']['id']."' type='checkbox' name='data[Attendee][id][]' value='".$a['Attendee']['id']."' ".(in_array($a['Attendee']['id'], $selected) ? "checked='checked'" : "")."/>" . $a['Attendee']['name'] . "</label>"; 
				}
	
				echo $this->Form->button('Update Accreditations', array('type' => 'submit', 'class' => 'btn btn-large btn-primary'));			
				echo $this->Form->end();
			?>
		</div>
</div>