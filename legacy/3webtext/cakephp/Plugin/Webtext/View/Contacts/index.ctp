<?php 
	echo $this->Session->flash();  
	if(isset($erroneous)):

	endif;
	
	if(isset($address_book)):
		$a = json_decode($address_book);
		echo $this->element('Contacts/contacts_table', array('contacts' => isset($a->entries) ? $a->entries : array()));
		echo $this->element('Contacts/groups_table', array('groups' => isset($a->groups) ? $a->groups : array()));	
	endif;
	echo $this->element('Contacts/upload_info');	
?>