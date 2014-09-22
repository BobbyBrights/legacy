
<?php if(isset($logged_in) && $logged_in && isset($current_user)): ?>
  <ul class="nav">
  <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">My aoaku</a>
    <ul class="dropdown-menu">
	  <li><?php echo $this->Html->link('My account', array('controller' => 'users', 'action' => 'me', 'plugin' => 'aoaku')); ?></li>
	  <li><?php echo $this->Html->link('My meet-ups', array('controller' => 'users', 'action' => 'meetup', 'plugin' => 'aoaku')); ?></li>
	  <?php if($current_user['AccountType']['id'] != 1): ?>
	  <li><?php echo $this->Html->link('Go premium', array('controller' => 'users', 'action' => 'upgrade', 'plugin' => 'aoaku')); ?></li>
	  <?php endif; ?>
      <li class="nav-header">Community</li>
	  <li><?php echo $this->Html->link('My ratings', array('controller' => 'users', 'action' => 'ratings', 'plugin' => 'aoaku')); ?></li>
	  <li><?php echo $this->Html->link('My locations', array('controller' => 'locations', 'action' => 'index', 'plugin' => 'aoaku', $current_user['User']['username'])); ?></li>
    </ul>
  </li>
  </ul>
<?php else: ?>
	<p class="pull-right login white">Log in using <a class="facebook-connect link-only">Facebook</a>, <a class="twitter-connect link-only">Twitter</a> or <a class="google-connect link-only">Google</a>.</p>
<?php endif; ?>
