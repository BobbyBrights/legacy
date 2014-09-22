<?php //vomit($events); ?>
<?php //vomit($accreditation_types); ?>
<div class="row">
	<div class="span7">
		<h2>Accreditation</h2>
		<div class="checkin form well">
		<?php	
			echo $this->Form->create('Accreditation');
			$this->Form->inputDefaults(
				array(
					'class' => 'span6',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);
			echo $this->Form->input('event_id', array('options' => $events));
			echo $this->Form->input('accreditation_type_id', array('options' => $accreditation_types));
			echo $this->Form->button('Add Accreditation', array('type' => 'submit', 'class' => 'btn btn-large btn-primary'));			
			echo $this->Form->end();
		?>
		</div>
	</div>
	<div class="span5">
		<h2>Side content</h2>
	</div>
</div>
