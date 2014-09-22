<?php
	$t = ($editing ? 'Edit' : 'Add New');
	$b = ($editing == 'edit' ? 'Save' : 'Add');
	$this->Html->script(
		array('/rss/js/ckeditor/ckeditor'),
		array('block' => 'scriptBottom'));
	$blacklist = array('created', 'modified');     
	
	$selected_categories = array();
	if(!empty($this->data['Category'])):
		foreach($this->data['Category'] as $c):
			$selected_categories[] = $c['id'];
		endforeach;
	endif;
	
	$legend = 'Add new item';
	if($editing){
		$legend = 'Editing Item - ' .  $this->data['Item']['summary'];
	}
    echo $this->Form->create('Item');
    $this->Form->inputDefaults(
            array(
            	'class' => 'span6',
                'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
     
?>
    <fieldset>
        <legend><?php echo __($legend); ?></legend>
<?php     
    foreach($fields as $f):
    	$options = array();
    	if(!in_array($f, $blacklist)):
    		switch($f):
    			case 'content':
    				$options = array('class' => 'span6 ckeditor');
    				break;
    			case 'category_id':
    				$options = array(
    					'options' => $this->RssHtml->get_cats_as_array($categories),
    					'multiple' => 'checkbox', 
    					'div' => 'input text checkboxes categories', 
    					'selected' => $selected_categories, 
    					'label' => 'Categories',
    					'escape' => false);
    				break;
    			case 'published':
    				$options = array('class' => '', 'div' => 'published input checkbox');
    				break;
    			case 'feed_id':
    				$options = array('options' => $feeds);
    				if(isset($this->passedArgs['Feed.id'])):
    					$options['default'] = $this->passedArgs['Feed.id']; 
    				endif;
    				break;
    			
    		endswitch;
    		echo $this->Form->input($f, $options);
    	endif;
    endforeach;
?>
		
	</fieldset>
	<div id="selected_categories"></div>
<?php
    echo $this->Form->button($b . ' Item', array('type' => 'submit', 'class' => 'with-margin-top btn btn-primary'));
?>
