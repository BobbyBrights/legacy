<ul class="nav nav-list">
  <li class="nav-header">Actions</li>
  <li><?php echo $this->Html->link('Feeds', array('controller' => 'feeds', 'action' => 'index')); ?></li>
  <li><?php echo $this->Html->link('Items', array('controller' => 'items', 'action' => 'index')); ?></li>
  <li><?php echo $this->Html->link('Users', array('controller' => 'users', 'action' => 'index')); ?></li>
  <li><?php echo $this->Html->link('Roles', array('controller' => 'roles', 'action' => 'index')); ?></li>
  <li><?php echo $this->Html->link('Categories', array('controller' => 'categories', 'action' => 'index')); ?></li>
</ul>
