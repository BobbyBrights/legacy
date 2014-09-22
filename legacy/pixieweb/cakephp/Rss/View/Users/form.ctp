<?php
$t = ($editing ? 'Edit' : 'Add New');
$b = ($editing == 'edit' ? 'Save' : 'Add');
?>
<?php   
$legend = 'Add new user';
if($editing){
	$legend = 'Editing User - ' .  $this->data['User']['name'];
}
echo $this->Form->create('User');
$this->Form->inputDefaults(
        array(
        	'class' => 'span6',
            'error' => array('attributes' => array('class' => 'alert alert-error small-form'))
        )
);

$blacklist = array('created', 'modified'); 

$selected_roles = array();

if(isset($this->data['Role'])):
	foreach($this->data['Role'] as $g):
		$selected_roles[] = $g['id'];
	endforeach;
endif;
    
?>
    <fieldset>
        <legend><?php echo __($legend); ?></legend>
<?php     
    foreach($fields as $f):
    	$options = array();
    	if(!in_array($f, $blacklist)):
    		switch($f):
    			case 'role_id':
    				$options = array(
    					'multiple' => 'checkbox', 
    					'div' => 'input text checkboxes span6', 
    					'selected' => $selected_roles, 
    					'label' => 'Roles');
    				break;
    		endswitch;
    		echo $this->Form->input($f, $options);
    	endif;
    endforeach;
?>
	</fieldset>
<?php
    echo $this->Form->button($b . ' User', array('type' => 'submit', 'class' => 'with-margin-top btn btn-primary'));
?>
