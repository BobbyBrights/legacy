<?php

$t = ($editing ? 'Edit' : 'Add New');
$b = ($editing == 'edit' ? 'Save' : 'Add');
$this->Html->script('/notice_board/js/ckeditor/ckeditor', array('block' => 'scriptBottom'));

$selected_authors = array();
//vomit($this->data);

if(isset($this->data['User'])):
	foreach($this->data['User'] as $g):
		$selected_authors[] = $g['FeedsUser']['user_id'];
	endforeach;
endif;

?>
<?php   
	$legend = 'Add new feed';
	if($editing){
		$legend = 'Editing Feed - ' .  $this->data['Feed']['name'];
	}
    echo $this->Form->create('Feed');
    $this->Form->inputDefaults(
            array(
            	'class' => 'span6',
                'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
    $blacklist = array('created', 'modified'); 
    
?>
    <fieldset>
        <legend><?php echo __($legend); ?></legend>
<?php     
    foreach($fields as $f):
    	$options = array();
    	if(!in_array($f, $blacklist)):
    		switch($f):
    			case 'user_id':
    				$options = array(
    					'multiple' => 'checkbox', 
    					'div' => 'input text checkboxes span6', 
    					'selected' => $selected_authors, 
    					'label' => 'Authors (choose all)');
    				break;
    		endswitch;
    		echo $this->Form->input($f, $options);
    	endif;
    endforeach;
?>
	</fieldset>
<?php
    echo $this->Form->button($b . ' Item', array('type' => 'submit', 'class' => 'with-margin-top btn btn-primary'));
?>


