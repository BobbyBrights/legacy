<div id="upload_form">
<h2>Upload Contacts</h2>
<?php
	echo $this->Session->flash(); 
	if(isset($erroneous) && sizeof($erroneous) > 0): 
		echo $this->element('Errors/erroneous_entries', array('erroneous' => $erroneous));
	endif;
	
	echo $this->element('Notification/duplicate_entry_warning');
	echo $this->Form->create('Contact', array('action' => 'upload', 'type' => 'file'));
	echo $this->Form->file('file');
	echo $this->Form->button('Upload', array('type' => 'submit'));
	echo $this->Form->end();
?>
</div>
<div class="clear"></div>
<div id="csv_info">
<h2>CSV File format</h2>
<p>You must upload a CSV file in the following format. Two columns, with the name of the contact in the left column, and the <em>full international number format (including the + sign)</em> in the right column using Notepad. Files created by other applications may generate errors when you try to upload them.</p>
<p><?php echo $this->Html->image('/webtext/imgs/csv-file-format.png', array('alt' => 'Sample CSV format'));?></p>

</div>

<div id="csv_info">
<h2>How to make a CSV of my existing Webtext contacts?</h2>
<?php echo $this->Html->link('How do I create a CSV file from my old contacts?', array('action' => 'bookmarklet'), array('class' => 'text_link')); ?>
</div>
