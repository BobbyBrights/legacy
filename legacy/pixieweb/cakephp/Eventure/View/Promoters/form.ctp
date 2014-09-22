<?php //var_dump($attendees); ?>	
<div class="row">
		<h2>Add promoter info</h2>
		<div class="checkin form well">
		<?php	
			echo $this->Form->create('Promoter');
			$this->Form->inputDefaults(
				array(
					'class' => 'span6',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);
			
			echo $this->Form->input('name');
			echo $this->Form->input('email');
			echo $this->Form->input('phone');
			echo $this->Form->input('website');
			echo $this->Form->input('address');			
			echo $this->Form->input('comments');			
			echo $this->Form->button(($this->action == 'edit' ? 'Save' : 'Add') . ' Promoter', array('type' => 'submit', 'class' => 'btn btn-large btn-primary'));			
			echo $this->Form->end();
		?>
		</div>
		
</div>
