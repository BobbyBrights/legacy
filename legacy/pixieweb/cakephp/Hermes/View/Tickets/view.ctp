<div class="row-fluid well ticket-info">
  <h2 class="underlined">Ticket Details <?php echo $this->Html->link('Edit', array('controller' => 'tickets', 'action' => 'edit', $ticket['Ticket']['id']), array('escape' => false, 'class' => 'btn btn-primary pull-right')); ?></h2>
  <div class="span6">
    <dl>
      <dt>Requestor: </dt>
      <dd><?php echo $ticket['User']['name']; ?>
      <dt>Created: </dt>
      <dd><?php echo $ticket['Ticket']['created']; ?>
      <dt>Summary: </dt>
      <dd><?php echo $ticket['Ticket']['summary']; ?>
      <dt class="full">Description: </dt>
      <dd><?php echo $ticket['Ticket']['detail']; ?>
    </dl>
  </div>
  <div class="span6">
    <dl>
      <dt>Ticket Type: </dt>
      <dd><?php echo $ticket['TicketType']['name']; ?>
      <dt>Ticket Status: </dt>
      <dd><?php echo $ticket['TicketStatus']['name']; ?>
      <dt>Assigned to: </dt>
      <dd><?php echo $ticket['Assignee']['name']; ?>
    </dl>
    <?php //vomit($ticket); ?>
  </div>
  <div class="clearfix"></div>
  <h2 class="underlined">Notes</h2>
  <?php foreach($ticket['Note'] as $note): ?>
  	<?php echo "<p>" . $note['summary'] . "</p><p class='muted'>Created on: " . $note['created'] . "</p>"; ?><hr />
  <?php endforeach; ?>
  
</div>

<h3>Add note</h3>
<?php echo $this->Form->create('Hermes.Note', array('action' => 'add', 'controller' => 'notes', 'plugin' => 'hermes')); ?> <?php echo $this->Form->hidden('ticket_id', array('default' => $ticket['Ticket']['id'])); ?> <?php echo $this->Form->input('summary'); ?><?php echo $this->Form->button('<i class="icon-file-text"></i> Add Note', array('class' => 'btn btn-primary', 'escape' => false)); ?>