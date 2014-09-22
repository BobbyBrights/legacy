<?php 
	if(isset($response)): 
		var_dump($response);
	else: 
		echo $this->element('Contacts/add_contact_form');
	endif;
?>