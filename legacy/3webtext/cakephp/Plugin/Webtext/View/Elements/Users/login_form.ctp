<?php 
	echo $this->Form->create('User', array('id' => 'UserLoginForm', 'url' => array('controller' => 'users', 'action' => 'login', 'plugin' => 'webtext'))); 
	echo $this->Form->input('telephoneNo', array('label' => 'Your mobile number'));
	echo $this->Form->input('pin', array('label' => 'Your PIN', 'type' => 'password'));		
	echo $this->Form->button('Login', array('type' => 'submit'));
	echo $this->Form->button('Reset', array('type' => 'reset', 'class' => 'reset_btn'));
	echo $this->Form->end(); 
?>
<br/>
<?php
	echo $this->Html->link('Forgot PIN?', array('controller' => 'users', 'action' => 'request_pin', 'plugin' => 'webtext'), array('class' => 'forgot_pin'));
?>