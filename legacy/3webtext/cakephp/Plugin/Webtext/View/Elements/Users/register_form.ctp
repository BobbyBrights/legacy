<?php 
	echo $this->Form->create('User', array('id' => 'UserRegisterForm', 'url' => array('controller' => 'users', 'action' => 'register', 'plugin' => 'webtext'))); 
	echo $this->Form->input('telephoneNo', array('label' => 'Your mobile number'));
	echo $this->Form->input('emailAddress', array('label' => 'Your email address'));	
	echo $this->Form->button('Register', array('type' => 'submit'));
	echo $this->Form->button('Reset', array('type' => 'reset', 'class' => 'reset_btn'));
	echo $this->Form->end(); 
?>