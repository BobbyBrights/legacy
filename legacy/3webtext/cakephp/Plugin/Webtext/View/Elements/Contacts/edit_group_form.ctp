<?php 
	//pr($this->validationErrors);	
	//var_dump($group_data);
	$g = json_decode($group_data);
	
	if(isset($g->statusCode) && $g->statusCode == 404):
		echo "<h2>No group data found for ".$this->params['pass'][0]."</h2>";
	else:
	echo $this->Form->create('Group', array('url' => array('controller' => 'contacts', 'action' => 'edit_group'))); 
	echo $this->Form->input('o_name', array('type' => 'hidden', 'value' => $g->name));
	$name_attrs = array();
	$name_attrs['label'] = 'Your Group name';
	$name_attrs['value'] = $g->name;
	echo $this->Form->input('name', $name_attrs);
	
	$contacts = json_decode($address_book);

	
	//var_dump($contacts->entries);
	$contacts_options = array();

	foreach($contacts->entries as $c):
		$contacts_options[ $c->name ] = urldecode($c->name) . " (" . preg_replace("/tel:/", "", $c->address).")";
	endforeach;
	
	// echo $form->input('Checkboxes', array('type'=>'select', 'multiple'=>'checkbox', 'options'=>array(1=>'One Value', 2=>'Two Value)));
	
	$contacts_properties = array('label' => 'Select contacts to add', 'type' => 'select', 'multiple' => 'checkbox', 'options' => $contacts_options, 'div' => 'input select no_margin_left');
	if(isset($g->groupEntries)):
		$contacts_properties['selected'] = $g->groupEntries;
	endif;
	
	echo $this->Form->input('contacts', $contacts_properties);
	echo $this->Form->button('Update', array('type' => 'submit'));
	
	echo $this->Form->end(); 
	endif;
?>