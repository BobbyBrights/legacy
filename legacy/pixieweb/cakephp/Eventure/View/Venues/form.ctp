<div class="row">
		<h2>Venue form</h2>
		<div class="venue form well">
		<?php	
			echo $this->Form->create('Venue');
			$this->Form->inputDefaults(
				array(
					'class' => 'span6',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);

			echo $this->Form->input('name');
			echo $this->Form->input('address');
			echo $this->Form->input('contact');
			echo $this->Form->input('email');
			echo $this->Form->input('mobile');
			echo $this->Form->input('capacity');
			echo $this->Form->input('seating_map');
			echo $this->Form->input('website');
			echo $this->Form->input('phone');
			echo $this->Form->input('geolocation');			
			echo $this->Form->button('Save venue', array('type' => 'submit', 'class' => 'btn btn-large btn-primary'));			
			echo $this->Form->end();
		?>
		</div>
</div>
