<?php
/**
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       Cake.View.Scaffolds
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
?>
<div class="row">
<!--
<div class="actions span3 well">
	<h3><?php echo __d('cake', 'Actions'); ?></h3>
	<ul class="nav nav-tabs nav-stacked">
		<li><?php echo $this->Html->link(__d('cake', 'New %s', $singularHumanName), array('action' => 'add')); ?></li>
<?php
		$done = array();
		foreach ($associations as $_type => $_data) {
			foreach ($_data as $_alias => $_details) {
				if ($_details['controller'] != $this->name && !in_array($_details['controller'], $done)) {
					echo '<li>';
					echo $this->Html->link(
						__d('cake', 'List %s', Inflector::humanize($_details['controller'])),
						array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'index')
					);
					echo '</li>';

					echo '<li>';
					echo $this->Html->link(
						__d('cake', 'New %s', Inflector::humanize(Inflector::underscore($_alias))),
						array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'add')
					);
					echo '</li>';
					$done[] = $_details['controller'];
				}
			}
		}
?>
	</ul>
</div>
-->
<div class="<?php echo $pluralVar; ?> index span8">
<form class="navbar-search pull-right" action="<?php echo $this->Html->url(array('action' => 'search')); ?>" method="post">
  <input type="text" class="search-query" placeholder="Search <?php echo $pluralHumanName; ?>">
</form>

<h2><?php echo $pluralHumanName; ?></h2>
<table cellpadding="0" cellspacing="0" class="table table-condensed">
<tr>
<?php foreach ($scaffoldFields as $_field): ?>
	<th><?php echo $this->Paginator->sort($_field); ?></th>
<?php endforeach; ?>
	<th><?php echo __d('cake', 'Actions'); ?></th>
</tr>
<?php
foreach (${$pluralVar} as ${$singularVar}):
	echo '<tr>';
		foreach ($scaffoldFields as $_field) {
			$isKey = false;
			
			if (!empty($associations['belongsTo'])) {
				foreach ($associations['belongsTo'] as $_alias => $_details) {
					if ($_field === $_details['foreignKey']) {
						$isKey = true;
						echo '<td>' . $this->Html->link(${$singularVar}[$_alias][$_details['displayField']], array('controller' => $_details['controller'], 'action' => 'view', ${$singularVar}[$_alias][$_details['primaryKey']])) . '</td>';
						break;
					}
				}
			}
			
			if ($isKey !== true) {
				echo '<td>' . h(${$singularVar}[$modelClass][$_field]) . '</td>';
			}
		}
		$a = array('class' => 'btn btn-small', 'escape' => false);
		$b = array('class' => 'btn btn-small btn-danger', 'escape' => false);
		
		echo '<td class="actions"><div class="btn-group">';
		echo $this->Html->link('<i class="icon-eye-open"></i> ' . __d('cake', 'View'), array('action' => 'view', ${$singularVar}[$modelClass][$primaryKey]), $a);
		echo ' ' . $this->Html->link('<i class="icon-edit"></i> ' . __d('cake', 'Edit'), array('action' => 'edit', ${$singularVar}[$modelClass][$primaryKey]), $a);
		echo ' ' . $this->Form->postLink(
			'<i class="icon-remove icon-white"></i> ' . __d('cake', 'Delete'),
			array('action' => 'delete', ${$singularVar}[$modelClass][$primaryKey]),
			$b,
			__d('cake', 'Are you sure you want to delete').' #' . ${$singularVar}[$modelClass][$primaryKey]
		);
		echo '</div></td>';
	echo '</tr>';

endforeach;

?>
</table>

<!--
	<div class="pagination">
		<ul>
	<?php
		echo $this->CustomPaginator->prev('&laquo;', array(), null, array('escape' => false));
		echo $this->CustomPaginator->numbers(array('separator' => ''));
		echo $this->CustomPaginator->next('&raquo;', array(), null, array('escape' => false));
	?>
		</ul>
	</div>
	
<!--	<div class="pagination">
              <ul>
                <li class="active"><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </div>
   -->        
</div>
<div class="span4">
	<div class="well">
		<h2>Actions</h2>
		<?php
		echo $this->Html->link('Add New ' . Inflector::classify($this->params['controller']), array('action' => 'add'), array('class' => 'btn btn-block btn-large btn-primary'));
		?>
	</div>
	
</div>
</div>