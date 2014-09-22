<?php 
	//pr($this->validationErrors);
	
	echo $this->Form->create('Contact', array('action' => $this->params['action'])); 
	$name_attrs = array();
	$name_attrs['label'] = 'Your contact name';

	if($this->params['action'] == 'edit_contact'):
		$name_attrs['value'] = urldecode($this->data['Contact']['name']);
		echo $this->Form->input('old_name', array('type' => 'hidden', 'value' => $this->data['Contact']['name']));
		//$name_attrs['readonly'] = true;
		//$name_attrs['class'] = 'readonly';
	endif;
	
	
	echo $this->Form->input('name', $name_attrs);
	echo $this->Form->input('msisdn', array('label' => 'Your contact number (International format. For Ireland, use +353XXXXXXXXXX)'));		
	//echo $this->Form->button('Reset', array('type' => 'reset'));
	$btn_text = $this->params['action'] == 'edit_contact' ? 'Update' : 'Add';
	echo $this->Form->button($btn_text, array('type' => 'submit'));
	echo $this->Form->end(); 
?><br/>
<?php
	echo $this->Html->link('Back to contacts.', array('controller' => 'contacts', 'action' => 'index', 'plugin' => 'webtext'), array('class' => 'forgot_pin'));
?>