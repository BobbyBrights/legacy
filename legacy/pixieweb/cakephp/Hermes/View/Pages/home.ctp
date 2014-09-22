<?php
	$tickets = $this->requestAction('/hermes/tickets/index');
	//vomit($open_tickets);
	
?><h2>Welcome 
	<?php echo $this->Html->link('<i class="icon-file-text"></i>&nbsp; Add new ticket', array('plugin' => strtolower( PLUGIN_NAME ), 'controller' => 'tickets', 'action' => 'add'), array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?>
</h2>

<section id="dashboard">
	<h3>All Tickets</h3>
<table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th width="25%">Summary</th>
                  <th>Assigned To</th>
                  <th width="10%">Status</th>
                  <th width="10%">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
              	<?php foreach($tickets as $t): ?>
                <tr>
                  <td><?php echo $t['Ticket']['id']; ?></td>
                  <td><?php echo $t['Ticket']['summary']; ?></td>
                  <td><?php echo $t['Assignee']['name']; ?></td>
                  <td><span class="label label-hermes-<?php echo $t['TicketStatus']['id']; ?>"><?php echo $t['TicketStatus']['name']; ?></span></td>
                  <td><?php echo $this->Html->link('View <i class="icon-circle-arrow-right"></i>', array('action' => 'view', 'controller' => 'tickets', $t['Ticket']['id']), array('class' => 'btn btn-small pull-right', 'escape' => false));  ?></td>
                </tr>
                <?php endforeach; ?>

              </tbody>
            </table>
            
            	
</section>