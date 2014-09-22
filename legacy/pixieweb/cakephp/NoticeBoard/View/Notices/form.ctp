<?php
$this->Html->script('/notice_board/js/ckeditor/ckeditor', array('block' => 'scriptBottom'));
//$this->Html->css('/notice_board/css/ckeditor_default', null, array('inline' => false));
?>
<h2>Add new notice</h2>
<?php   
    echo $this->Form->create('Notice');
    $this->Form->inputDefaults(
            array(
                    'class' => 'span6',
                    'error' => array('attributes' => array('class' => 'alert alert-error'))
            )
    );
    //vomit($categories);
    //vomit($this->passedArgs['category']);
    $c = array('options' => $categories);
    if(isset($this->passedArgs['category'])):
    	$c['default'] = $this->passedArgs['category'];
    endif;
    
    echo $this->Form->input('category_id', $c);
    echo $this->Form->input('summary');
    echo $this->Form->input('description', array('class' => 'ckeditor'));
    echo $this->Form->button(
    	($this->action == 'edit' ? 'Save' : 'Add') . ' Notice', array('type' => 'submit', 'class' => 'with-margin-top btn btn-primary'));
?>
