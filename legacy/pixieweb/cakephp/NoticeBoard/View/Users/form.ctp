<h2>Add new user</h2>
<?php   
    echo $this->Form->create('User');
    $this->Form->inputDefaults(
            array(
                    'class' => 'span6',
                    'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
    
    echo $this->Form->input('username');
    echo $this->Form->input('password');
    echo $this->Form->input('Role');

    echo $this->Form->button(
    	($this->action == 'edit' ? 'Save' : 'Add') . ' Notice', array('type' => 'submit', 'class' => 'btn btn-small btn-primary'));
?>
