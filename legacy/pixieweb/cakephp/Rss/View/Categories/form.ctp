<?php
//vomit($this->data);

$t = ($editing ? 'Edit' : 'Add New');
$b = ($editing == 'edit' ? 'Save' : 'Add');
?>
<?php   
	$legend = 'Add new category';
	if($editing){
		$legend = 'Editing category - ' .  $this->data['Category']['name'];
	}
    echo $this->Form->create('Category');
    
    $this->Form->inputDefaults(
            array(
            	'class' => 'span6',
                'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
    
    $blacklist = array('created', 'modified'); 
    
    if($editing):
    	// Need to remove the current category from the list in the dropdown
    	// A category cannot be a parent of itself
    	unset($categories["" . $this->data['Category']['id']]);
    endif;
   
?>
    <fieldset>
        <legend><?php echo __($legend); ?></legend>
<?php     
    foreach($fields as $f):
    	$options = array();
    	if(!in_array($f, $blacklist)):
    		switch($f):
    			case 'parent_category_id':    				
    				$options = array('label' => 'Parent Category', 'options' => $this->RssHtml->get_cats_as_array($all_categories, true), 'escape' => false);
    				break;
    		endswitch;
    		echo $this->Form->input($f, $options);
    	endif;
    endforeach;
?>
	</fieldset>
<?php
    echo $this->Form->button($b . ' Category', array('type' => 'submit', 'class' => 'with-margin-top btn btn-primary'));
?>
