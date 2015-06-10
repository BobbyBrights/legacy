<?php	
	//vomit($tickets); 

?>
<h2>My Tickets 
	<?php echo $this->Html->link('<i class="icon-file-text"></i>&nbsp; Add new ticket', array('plugin' => strtolower( PLUGIN_NAME ), 'controller' => 'tickets', 'action' => 'add'), array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?>
</h2>
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Ticket Type</th>
      <th>Summary</th>
      <th>Created</th>
      <th>Status</th>
      <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
  <?php foreach($tickets as $ticket): ?>
    <tr>
      <td><?php echo $ticket['Ticket']['id']; ?></td>
      <td><?php echo $ticket['User']['fullname']; ?></td>
      <td><?php echo $ticket['TicketType']['name']; ?></td>
      <td><?php echo $ticket['Ticket']['summary']; ?></td>
      <td><?php echo $ticket['Ticket']['created']; ?></td>
      <td><?php echo $ticket['TicketStatus']['name']; ?></td>
      <td><?php echo $this->Html->link('View <i class="icon-circle-arrow-right"></i>', array('action' => 'view', $ticket['Ticket']['id']), array('class' => 'btn btn-small pull-right', 'escape' => false));  ?></td>
    </tr>
    
  <?php endforeach; ?>
  </tbody>
</table>
