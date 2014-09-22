<div class="btn-group pull-right">
<?php echo $this->Html->link('<i class="icon-play"></i> View', array('controller' => $controller, 'action' => 'view', $id), array('class' => 'btn btn-mini', 'escape' => false)); ?>
<?php echo $this->Html->link('<i class="icon-edit"></i> Edit', array('controller' => $controller, 'action' => 'edit', $id), array('class' => 'btn btn-mini', 'escape' => false)); ?>
<?php //echo $this->Html->link('<i class="icon-remove"></i> Delete', array('controller' => $controller, 'action' => 'delete', $id), array('class' => 'btn btn-mini', 'escape' => false)); ?>
</div>