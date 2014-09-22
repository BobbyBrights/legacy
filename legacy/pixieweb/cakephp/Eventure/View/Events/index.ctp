<?php $this->assign('title', 'Event Listing'); ?>
<div class="row">
<div class="span8">
	<h1>Event listing</h1>
	<form class="form-search pull-right" action="<?php echo $this->Html->url(array('action' => 'search')); ?>" method="post">
		<input type="hidden" name="model" value="events" />
		<div class="input-append">
			<input type="text" class="span2 search-query predict" placeholder="Search Events" data-model='events' data-field="name" name="name" autocomplete='off'>
			<button type="submit" class="btn">Search</button>
		</div>
	</form>
	<div class="clearfix"></div>
	<?php foreach($data as $event): ?>
		<h4 class="underlined"><?php echo $event['Event']['name']; ?>
			<?php echo $this->Html->link('View this event <i class="icon-chevron-right"></i>', array('controller' => 'events', 'plugin' => 'eventure', 'action' => 'view', $event['Event']['id']), array('class' => 'btn btn-mini pull-right', 'escape' => false)); ?>
		</h4>
	<?php endforeach; ?>
	<?php echo $this->element('pager'); ?>
</div>
<div class="span4 actions">
	<div class="well">
		<h3>Actions</h3>
		<?php echo $this->Html->link('Add new event', array('action' => 'add'), array('class' => 'btn btn-large btn-block btn-primary')); ?>
	</div>
	<div class="well">
	<h3>Recently added events</h3>
	</div>
</div>


</div>
