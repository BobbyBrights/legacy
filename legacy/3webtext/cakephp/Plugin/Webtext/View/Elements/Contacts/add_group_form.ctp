<?php 
	//pr($this->validationErrors);	
	echo $this->Form->create('Group', array('url' => array('controller' => 'contacts', 'action' => $this->params['action']))); 
	$name_attrs = array();
	$name_attrs['label'] = 'Your Group name';
	echo $this->Form->input('name', $name_attrs);
	
	//var_dump($address_book);
	
	$contacts = json_decode($address_book);
	//var_dump($contacts->entries);
	$contacts_options = array();
	
	foreach($contacts->entries as $c):
		$contacts_options[ $c->name ] = urldecode($c->name) . "  (". preg_replace("/tel:/", "", $c->address).")";
	endforeach;
	
	// echo $form->input('Checkboxes', array('type'=>'select', 'multiple'=>'checkbox', 'options'=>array(1=>'One Value', 2=>'Two Value)));
	
	echo $this->Form->input('contacts', array('label' => 'Select contacts to add', 'type' => 'select', 'multiple' => 'checkbox', 'options' => $contacts_options, 'div' => 'input select no_margin_left'));
	
	$btn_text = $this->params['action'] == 'edit_contact' ? 'Update' : 'Add';
	echo $this->Form->button($btn_text, array('type' => 'submit'));
	echo $this->Form->end(); 
?>