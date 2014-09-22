<?php $promoters[0] = 'Please choose a promoter (optional)'; ksort($promoters); ?>	
<div class="row">
	<div class="span12">
		<h2>Add user info</h2>
		<div class="checkin form well">
		<?php	
			echo $this->Form->create('User');
			$this->Form->inputDefaults(
				array(
					'class' => 'span6',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);
			
			echo $this->Form->input('username');
			echo $this->Form->input('password');
			echo $this->Form->input('promoter_id', array('options' => $promoters));
			echo $this->Form->input('Role', array('multiple' => 'checkbox', 'div' => 'input select checkbox'));

			echo $this->Form->button(($this->action == 'edit' ? 'Save' : 'Add') . ' User', array('type' => 'submit', 'class' => 'btn btn-large btn-primary'));			
			echo $this->Form->end();
		?>
		</div>
		
	</div>
</div>
