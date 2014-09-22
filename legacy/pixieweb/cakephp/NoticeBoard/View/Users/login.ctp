<?php echo $this->Form->create('User', array('class' => 'form-signin')); ?>
	<h2 class="form-signin-heading">Please sign in</h2>
	<?php echo $this->Session->flash(); ?>
	<?php echo $this->Form->input('username', array('class' => 'input-block-level', 'placeholder' => 'Username')); ?>
	<?php echo $this->Form->input('password', array('class' => 'input-block-level', 'placeholder' => 'Password')); ?>
	<button class="btn btn-large btn-primary" type="submit">Sign in</button>
<?php echo $this->Form->end(); ?>