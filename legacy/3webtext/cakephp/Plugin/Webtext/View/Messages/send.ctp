<?php 
	echo $this->Session->flash();  
	//if( isset($response) ) print_r(json_decode($response));
	echo $this->Element('Messages/send');
?>