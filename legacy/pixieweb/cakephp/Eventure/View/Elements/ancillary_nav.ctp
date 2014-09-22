<div class="btn-group pull-right">
		   
           <?php echo $this->Html->link('<i class="icon-user icon-white"></i> My Dashboard', array('controller' => 'users', 'action' => 'me', 'plugin' => 'eventure'), array('class' => 'btn btn-small btn-info', 'escape' => false)); ?>
           
           <?php if(!empty($is_admin) && $is_admin): ?>
		   	<?php echo $this->Html->link('<span class="caret"></span> Site Admin', '#', array('data-toggle' => 'dropdown', 'class' => 'btn btn-small btn-info dropdown-toggle', 'escape' => false)); ?>
		   	<ul class="dropdown-menu">
			    <li><?php echo $this->Html->link('<i class="icon-user"></i> Users', array('controller' => 'users', 'action' => 'index', 'plugin' => 'eventure'), array('escape' => false)); ?></li>
			    <li><?php echo $this->Html->link('<i class="icon-flag"></i> Promoters', array('controller' => 'promoters', 'action' => 'index', 'plugin' => 'eventure'), array('escape' => false)); ?></li>
			    <li><?php echo $this->Html->link('<i class="icon-pencil"></i> Accreditation Types', array('controller' => 'accreditation_types', 'action' => 'index', 'plugin' => 'eventure'), array('escape' => false)); ?></li>
			    <li><?php echo $this->Html->link('<i class="icon-headphones"></i> Event Types', array('controller' => 'event_types', 'action' => 'index', 'plugin' => 'eventure'), array('escape' => false)); ?></li>
			    <li><?php echo $this->Html->link('<i class="icon-bookmark"></i> Roles', array('controller' => 'roles', 'action' => 'index', 'plugin' => 'eventure'), array('escape' => false)); ?></li>
			  </ul>
		   <?php endif; ?>
		   
		   
           <?php echo $this->Html->link('<i class="icon-remove icon-white"></i> Logout', array('controller' => 'users', 'action' => 'logout', 'plugin' => 'eventure'), array('class' => 'btn btn-small btn-info', 'escape' => false)); ?>
           
           </div>
           