<?php 
	if($this->Session->read('ActiveUser.profile') != null): 
		$a = $this->Session->read('ActiveUser.profile');
?>
<div id="hub_overview">
<ul>
	<li><span>Logged in as: </span><br/><?php echo $this->Session->read('ActiveUser.msisdn') ?></li>
	<li><span>Remaining texts: </span><br/><?php echo $a->remainingAllowance;?> (of <?php echo $a->allowancePerInterval; ?>)</li>
	<li><span>Scheduled messages: </span><br/><?php echo $a->scheduledMessages == 0 ? "None" : $a->scheduledMessages;?></li>
	<li><span>Next renewal date: </span><br/><?php echo $a->allowanceRenewalDate;?></li>
</ul>
</div>

<?php
	endif; 
?>