<?php 
	echo $this->Session->flash();  
?>
<?php 
	if(isset($response)): 
		var_dump($response);
	else: 
		echo $this->element('Contacts/edit_group_form');
	endif;
?>