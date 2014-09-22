<?php 
	echo $this->Form->create('Export', array('url' => array('controller' => 'export', 'action' => 'index'))); 
	echo $this->Form->input('username', array('label' => 'Your mobile number'));
	echo $this->Form->input('pin', array('label' => 'Your PIN', 'type' => 'password'));		
	echo $this->Form->button('Login', array('type' => 'submit'));
	echo $this->Form->end(); 
?>