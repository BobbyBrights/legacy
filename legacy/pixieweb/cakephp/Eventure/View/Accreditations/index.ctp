<div class="row">
<div class="span8">
	<h1>Accreditations</h1>
	<form class="form-search pull-right" action="<?php echo $this->Html->url(array('action' => 'search')); ?>" method="post">
		<input type="hidden" name="model" value="events" />
		<div class="input-append">
			<input type="text" class="span2 search-query predict" placeholder="Search Events" data-model='accreditations' data-field="name" name="name" autocomplete='off'>
			<button type="submit" class="btn">Search</button>
		</div>
	</form>
	<div class="clearfix"></div>
	<?php //vomit($data); ?>
	<table class="table table-condensed">
		<tr>
			<th colspan="2"><?php echo $this->Paginator->sort('Event.name', 'Accreditation Name'); ?></th>
		</tr>
		<?php foreach($data as $a): ?>
		<?php $opts = array('controller' => 'accreditations', 'plugin' => 'eventure', 'action' => 'add_attendee_accreditations', 'accr_id' => $a['Accreditation']['id']); ?>
		<tr>
			<td><?php echo $this->Html->link($a['Event']['name'] . " - " . $a['AccreditationType']['name'], $opts); ?> </td>
			<td><?php echo $this->Html->link('Update accreditations <i class="icon-chevron-right"></i>', $opts, array('class' => 'btn btn-mini pull-right', 'escape' => false)); ?>
			</td>
		</tr>
		<?php endforeach; ?>
		
	</table>


	<?php echo $this->element('pager'); ?>
</div>
<div class="span4">
	<div class="well">
		<h3>Actions</h3>
		<?php echo $this->Html->link('Add new accreditation', array('action' => 'add'), array('class' => 'btn btn-large btn-block btn-primary')); ?>
	</div>
</div>


</div>
