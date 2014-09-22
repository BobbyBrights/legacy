<?php 
	echo $this->Session->flash();  
	$msisdn = $this->Session->read('ActiveUser.msisdn');
?>
<div id="request_pin_form">
<h2>Request new PIN</h2>
<p>If you've lost your PIN, press the button below to have it resent to your mobile. Note: This will log you out, and you will need to log back in again using your new PIN.</p>
<?php 
	echo $this->Form->create('User', array('url' => array('controller' => 'users', 'action' => 'request_pin', 'plugin' => 'webtext'))); 
	echo $this->Form->input('telephoneNo', array('type' => 'hidden', 'value' => $msisdn));
	echo $this->Form->input('redirect', array('type' => 'hidden', 'value' => '/webtext/users/index'));
	echo $this->Form->button('Request PIN', array('type' => 'submit', 'class' => 'request_pin'));
	echo $this->Form->end(); 
?>
</div>