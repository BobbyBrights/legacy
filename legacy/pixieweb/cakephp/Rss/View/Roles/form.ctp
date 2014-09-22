<?php
$t = ($editing ? 'Edit' : 'Add New');
$b = ($editing == 'edit' ? 'Save' : 'Add');
?>
<?php   
	$legend = 'Add new role';
	if($editing){
		$legend = 'Editing User - ' .  $this->data['Role']['name'];
	}
    echo $this->Form->create('Role');
    $this->Form->inputDefaults(
            array(
            	'class' => 'span6',
                'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
    
    $blacklist = array('created', 'modified'); 
    
    echo $this->Form->inputs(array('legend' => $legend), $blacklist);
    echo $this->Form->button($b . ' Role', array('type' => 'submit', 'class' => 'with-margin-top btn btn-primary'));
?>
