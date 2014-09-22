<?php 
	if(isset($response)): 
		var_dump($response);
	else: 
		echo $this->element('Contacts/upload_form', array('erroneous' => isset($erroneous) ? $erroneous : array()));
	endif;
?>
