<!-- Message sent or scheduled -->
<div id="flashMessage" class="success">
<?php echo $this->Html->image('/webtext/imgs/flash-message-check.png', array('alt' => 'Download the iPhone/iPad/PC App today', 'class' => 'flash_message_icon'));?>
<?php 
if(isset($message) && $message != ''):
	echo '<span>'.$message.'</span>'; ;
endif; ?>

<div class="clear"></div>
</div>