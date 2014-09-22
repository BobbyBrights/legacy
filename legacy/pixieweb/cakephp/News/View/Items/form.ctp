<?php 
	
	$title = $excerpt = $content = "";
	
	if(!empty($this->data)):
		$title = preg_replace('/[^(\x20-\x7F)]*/', '', $this->data['Item']['title']);
		$excerpt = preg_replace('/[^(\x20-\x7F)]*/', '', $this->data['Item']['excerpt']);
		$content = preg_replace('/[^(\x20-\x7F)]*/', '', $this->data['Item']['content']);
	endif;
	
	echo $this->Form->create('Item');
	echo $this->Form->input('item_type_id', array('options' => $item_types));
	echo $this->Form->input('title', array('value' => $title));
	echo $this->Form->input('excerpt', array('value' => $excerpt));
	echo $this->Form->input('content', array('class' => 'ckeditor', 'value' => $content));	
	
	echo $this->Form->end($this->params['action'] == 'edit' ? 'Save' : 'Add');
?>