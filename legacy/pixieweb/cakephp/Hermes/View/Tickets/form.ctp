<?php echo $this->Form->create('Hermes.Ticket'); ?>

<?php echo $this->Form->hidden('user_id', array('default' => 1)); ?>
<?php echo $this->Form->input('summary'); ?>
<?php echo $this->Form->input('detail'); ?>
<?php echo $this->Form->input('ticket_type_id', array('options' => $ticket_types)); ?>
<?php echo $this->Form->hidden('ticket_status_id', array('default' => 1)); ?>
<br/><br/><a href="#" class="add_attachment_field">Add more attachments</a>
<?php echo $this->Form->input('attachment',array( 'type' => 'file')); ?>

<?php $action = $this->params['action'] == 'edit' ? 'Update' : 'Add'; ?>
<?php echo $this->Form->button('<i class="icon-ticket"></i> '.$action.' Ticket',  array('class' => 'btn btn-primary', 'title' => 'Create Ticket', 'escape' => false)); ?>