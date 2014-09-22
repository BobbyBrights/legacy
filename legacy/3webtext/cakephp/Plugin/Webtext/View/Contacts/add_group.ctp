<?php 
	echo $this->Session->flash();  
?>
<?php 
	if(isset($response)): 
		var_dump($response);
	else: 
		echo $this->element('Contacts/add_group_form');
	endif;
?>