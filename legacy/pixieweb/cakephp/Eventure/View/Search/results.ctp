<?php //vomit($data); ?>
<?php //vomit($results); ?>
<?php //vomit($display_col); ?>
<div class="row">
<div class="span8">
	<h1>Search results</h1>
	<div class="clearfix"></div>
	<table class="table table-condensed">
		<tr>
			<th colspan="2"><?php echo $this->Paginator->sort($fieldName, $modelName); ?></th>
		</tr>
		<?php foreach($results as $result): ?>
		<tr>
			<td><?php echo $result[$modelName][$fieldName]; ?> </td>
			<td><?php echo $this->Html->link('View this '.$modelName.' <i class="icon-chevron-right"></i>', array('controller' => strtolower(Inflector::pluralize($modelName)), 'plugin' => 'eventure', 'action' => 'view', $result[$modelName]['id']), array('class' => 'btn btn-mini pull-right', 'escape' => false)); ?>
			</td>
		</tr>
		<?php endforeach; ?>
		
	</table>
	<?php echo $this->element('pager'); ?>
</div>

<div class="span4">
	<div class="well">
		<h3>Actions</h3>
		<?php echo $this->Html->link('Add new ' . $modelName, array('action' => 'add'), array('class' => 'btn btn-large btn-block btn-primary')); ?>
	</div>
</div>


</div>

