<?php //echo "<pre>" . print_r($data, 1) . "</pre>"; ?>
<div class="row">
<div class="span8">
	<h1 class="with-margin-bottom">Attendees</h1>
	<form class="form-search pull-right" action="<?php echo $this->Html->url(array('action' => 'search')); ?>" method="post">
		<input type="hidden" name="model" value="attendees" />
		<div class="input-append">
			<input type="text" class="span2 search-query predict" placeholder="Search Attendees" data-model='attendees' data-field="name" name='name' autocomplete='off'>
			<button type="submit" class="btn">Search</button>
		</div>
	</form>

	
	
	<table class="table table-condensed">
		<tr>
			<th colspan="2"><?php echo $this->Paginator->sort('name', 'Attendee Name'); ?></th>
		</tr>
		<?php foreach($data as $attendee): ?>
		<tr>
			<td><?php echo $this->Html->link($attendee['Attendee']['name'], array('controller' => 'attendees', 'plugin' => 'eventure', 'action' => 'view', $attendee['Attendee']['id'])); ?> </td>
			<td><?php echo $this->Html->link('View this attendee <i class="icon-chevron-right"></i>', array('controller' => 'attendees', 'plugin' => 'eventure', 'action' => 'view', $attendee['Attendee']['id']), array('class' => 'btn btn-mini pull-right', 'escape' => false)); ?>
			</td>
		</tr>
		<?php endforeach; ?>
		
	</table>
	
<div class="pagination">
<ul>
<?php 
// Shows the page numbers

// Shows the next and previous links
echo $this->CustomPaginator->prev('&laquo;', null, null, array('escape' => false, 'class' => 'disabled prev'));
echo $this->CustomPaginator->numbers(array('separator' => ''));
echo $this->CustomPaginator->next('&raquo;', null, null, array('escape' => false, 'class' => 'disabled next'));

?>
    </ul>
</div>
</div>
<div class="span4">
	<div class="well">
		<h3>Actions</h3>
		<?php echo $this->Html->link('Add new attendee', array('action' => 'add'), array('class' => 'btn btn-large btn-block btn-primary')); ?>
	</div>
</div>


</div>
