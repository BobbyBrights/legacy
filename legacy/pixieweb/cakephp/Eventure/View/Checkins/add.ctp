<?php $this->assign('title', 'Add new checkin'); ?>
<div class="row">
		<h2>Check in form</h2>
		<div class="checkin form well">
		<?php	
			echo $this->Form->create('Checkin');
			$this->Form->inputDefaults(
				array(
					'class' => 'span4',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);

			echo $this->Form->input('attendee_id', array('empty' => 'Choose Attendee'));
			echo $this->Form->input('accreditation_id', array('after' => '<a href="#" class="btn btn-mini refresh-accreditations"><i class="icon-refresh"></i> Refresh</a>'));
			echo $this->Form->input('wristband_no');
			echo $this->Form->button('Check in', array('type' => 'submit', 'class' => 'btn btn-large'));
			
			echo $this->Form->end();
		?>
		</div>
</div>
