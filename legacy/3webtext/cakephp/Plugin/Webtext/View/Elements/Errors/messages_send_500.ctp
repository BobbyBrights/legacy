<!-- No recipients set -->
<div id="flashMessage"><?php 
if(isset($message) && $message != ''):
	echo $message;
else:
	echo 'Generic server error';
endif;
?></div>