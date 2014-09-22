<?php 
	echo $this->Session->flash(); 
	echo $this->element('Site/terms');
	echo $this->Form->create('User', array('url' => array('action' => 'accept_terms'))); 
	echo $this->Form->input('termsAccept', array('type' => 'checkbox', 'label' => 'Accept terms and conditions', 'div' => 'input checkbox accept_terms'));
	echo $this->Form->button('Continue', array('type' => 'submit'));
	echo $this->Form->end(); 
?>
