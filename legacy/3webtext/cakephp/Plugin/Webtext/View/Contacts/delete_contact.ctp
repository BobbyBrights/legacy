<?php 
	echo $this->Session->flash();  
?>
<?php 
	if(isset($response)): 
		var_dump($response);
	endif;
?>