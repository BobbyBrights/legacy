<?php if(isset($logged_in) && $logged_in): ?>
<p class="pull-right login white">Welcome, <?php echo $current_user['User']['firstname']; ?> ( <?php echo $this->Html->link('Logout', array('controller' => 'users', 'plugin' => 'aoaku', 'action' => 'logout')); ?> )</p>
<?php else: ?>
<?php 
	echo $this->Form->create('User', 
		array(
			'id' => 'UserLoginFormTop',
			'url' => array('controller' => 'users', 'action' => 'login', 'plugin' => 'aoaku'), 
			'type' => 'post', 
			'class' => 'navbar-form pull-right login-form',
			'inputDefaults' => array(
				'label' => false,
				'div' => false,
				'class' => 'span2'
			)
		)
	);
	echo $this->Form->input('username', array('placeholder' => 'Username'));
    echo $this->Form->input('password', array('placeholder' => 'Password'));
    echo $this->Form->button('Sign in', array('type' => 'submit', 'class' => 'btn'));
    echo $this->Form->end(); 
?>
<?php endif; ?>

