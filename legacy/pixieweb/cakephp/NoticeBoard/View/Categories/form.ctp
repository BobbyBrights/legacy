<h2>Add new category</h2>
<?php   
    echo $this->Form->create('Category');
    $this->Form->inputDefaults(
            array(
                    'class' => 'span6',
                    'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
    echo $this->Form->input('name');
    echo $this->Form->button(
    	($this->action == 'edit' ? 'Save' : 'Add') . ' Category', array('type' => 'submit', 'class' => 'btn btn-small btn-primary'));
?>
