<?php 
	echo $this->Form->create('User'); 
	echo $this->Form->input('telephoneNo', array('label' => 'Your mobile number'));
	
	echo $this->Form->button('Request PIN', array('type' => 'submit', 'class' => 'request_pin'));
	echo $this->Form->button('Reset', array('type' => 'reset', 'class' => 'reset_btn'));
	echo $this->Form->end(); 
?>