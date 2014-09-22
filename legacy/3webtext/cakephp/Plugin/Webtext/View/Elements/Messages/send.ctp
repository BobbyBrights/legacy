<div id="message_form">
<h2>Send message</h2>
<?php
	$address = json_decode($address_book);
	
	//var_dump($address->entries);
	
	$contacts = array();
	$groups = array();
	
	if(isset($address->entries) && is_array($address->entries)):
	foreach($address->entries as $c):
		$contacts[$c->address] = urldecode($c->name) . ' ' . preg_replace('/[^\d\+]/','', $c->address);
	endforeach;
	endif;
	
	//var_dump($address->groups);
	if(isset($address->groups) && is_array($address->groups)):
	foreach($address->groups as $g):
		if(sizeof($g->groupEntries) > 0):
			$groups[$g->name] = $g->name . " (".sizeof($g->groupEntries).")";
		endif;
	endforeach;
	endif;

	//var_dump($contacts);
	
	echo $this->Form->create('Message', array('url' => array('controller' => 'messages', 'action' => 'send'))); 
	echo $this->Form->input('message', array('label' => 'Your message', 'type' => 'textarea', 'maxLength' => 765));
	echo $this->Form->input('recipients_individual', array('label' => 'Send to individual numbers (international format, eg. "+353", separated by a comma)'));
	$contacts_input_label = 'Your contacts'; 
	if(sizeof($contacts) > 0): 
	echo $this->Form->input('recipients_contacts', array('label' => $contacts_input_label, 'type' => 'select', 'multiple' => true, 'options' => $contacts, 'size' => 10, 'selected' => isset($message_to) && $message_to != null ? $message_to : 0));
	else: 
		echo "<div class='input text'>";
		echo $this->Form->label(null, $contacts_input_label . ' - no contacts saved. ' . $this->Html->link('Add contacts', array('controller' => 'contacts', 'action' => 'add_contact', 'plugin' => 'webtext'), array( 'escape' => false)));
		echo "</div>";
	endif;
	
	$groups_input_label = 'Your groups';
	if(sizeof($groups) > 0): 
		echo $this->Form->input('recipients_groups', array('label' => 'Your groups', 'type' => 'select', 'multiple' => true, 'options' => $groups));
	else: 
		echo "<div class='input text'>";
		echo $this->Form->label(null, $groups_input_label . ' - no groups saved. ' . $this->Html->link('Add groups', array('controller' => 'contacts', 'action' => 'add_group', 'plugin' => 'webtext'), array( 'escape' => false)));
		echo "</div>";
	endif;
	
	
	//echo $this->Form->select('recipients_contacts', $contacts, array('label' => 'Your contacts', 'multiple' => true));

	
	echo $this->Form->button('Send', array('type' => 'submit', 'class' => 'send_btn'));
	echo $this->Form->button('Reset', array('type' => 'reset', 'class' => 'reset_btn'));
	
	echo $this->Form->input('schedule', array('type' => 'checkbox', 'label' => 'Schedule for later date'));	
	$date_options = array();
	$date_options['div'] = 'scheduled_date';
	$date_options['interval'] = 15;
	$date_options['type'] = 'datetime';
	$date_options['label'] = 'Set for future delivery';
	$date_options['minYear'] = date('Y');
	$date_options['maxYear'] = date('Y') + 1;
	
	echo $this->Form->input('scheduled_date', $date_options);
	echo $this->Form->end(); 
	
?>
</div>