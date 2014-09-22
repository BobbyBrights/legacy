<?php echo $this->Session->flash(); ?> 
<?php echo $this->Session->flash('auth'); ?> 
<!-- app/View/Users/add.ctp -->
<div class="row">
<div class="users form well span5">
<?php echo $this->Form->create('User'); ?>
    <fieldset>
        <legend><?php echo __('Register your details'); ?></legend>
        <?php 
        echo $this->Form->input('firstname', array('label' => 'First Name'));
        echo $this->Form->input('surname');
        echo $this->Form->input('email');
        
        echo $this->Form->input('username');
        echo $this->Form->input('password');
        /*
        echo $this->Form->input('account_type_id', array(
            'options' => array('1' => 'Free', '2' => 'Premium'), 
            'label' => 'Account Type'
        ));
        */
        echo $this->Form->input('gender', array(
            'options' => array('male' => 'Male', 'female' => 'Female')
        ));
    ?>
    </fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="span5">
	.. or connect with
	<?php echo $this->Html->link('Connect with Facebook', '#', array('class' => 'btn social facebook-connect')); ?>
	<a class="btn social twitter-connect" href="#">Sign in with Twitter</a>
	<a class="btn social google-connect" href="#">Sign in with Google</a>
</div>
</div>

<!-- Modal -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Connecting with Facebook.</h3>
  </div>
  <div class="modal-body">
    <p>Please wait</p>
  </div>
  <!--
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">Save changes</button>
  </div>
  -->
</div>