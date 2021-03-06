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
<div class="<?php echo $pluralVar; ?> view span12">
<h2><?php echo __d('cake', 'View %s', $singularHumanName); ?></h2>
	<dl>
<?php
$i = 0;
foreach ($scaffoldFields as $_field) {
	$isKey = false;
	if (!empty($associations['belongsTo'])) {
		foreach ($associations['belongsTo'] as $_alias => $_details) {
			if ($_field === $_details['foreignKey']) {
				$isKey = true;
				echo "\t\t<dt>" . Inflector::humanize($_alias) . "</dt>\n";
				echo "\t\t<dd>\n\t\t\t";
				echo $this->Html->link(
					${$singularVar}[$_alias][$_details['displayField']],
					array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'view', ${$singularVar}[$_alias][$_details['primaryKey']])
				);
				echo "\n\t\t&nbsp;</dd>\n";
				break;
			}
		}
	}
	if ($isKey !== true) {
		echo "\t\t<dt>" . Inflector::humanize($_field) . "</dt>\n";
		echo "\t\t<dd>" . h(${$singularVar}[$modelClass][$_field]) . "&nbsp;</dd>\n";
	}
}
?>
	</dl>
	
	<?php
if (!empty($associations['hasOne'])) :
foreach ($associations['hasOne'] as $_alias => $_details): ?>
<div class="related">
	<h3><?php echo __d('cake', "Related %s", Inflector::humanize($_details['controller'])); ?></h3>
<?php if (!empty(${$singularVar}[$_alias])): ?>
	<dl>
<?php
		$i = 0;
		$otherFields = array_keys(${$singularVar}[$_alias]);
		foreach ($otherFields as $_field) {
			echo "\t\t<dt>" . Inflector::humanize($_field) . "</dt>\n";
			echo "\t\t<dd>\n\t" . ${$singularVar}[$_alias][$_field] . "\n&nbsp;</dd>\n";
		}
?>
	</dl>
<?php endif; ?>
	<div class="actions">
		<ul>
		<li><?php
			echo $this->Html->link(
				__d('cake', 'Edit %s', Inflector::humanize(Inflector::underscore($_alias))),
				array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'edit', ${$singularVar}[$_alias][$_details['primaryKey']])
			);
			echo "</li>\n";
			?>
		</ul>
	</div>
</div>
<?php
endforeach;
endif;

if (empty($associations['hasMany'])) {
	$associations['hasMany'] = array();
}
if (empty($associations['hasAndBelongsToMany'])) {
	$associations['hasAndBelongsToMany'] = array();
}
$relations = array_merge($associations['hasMany'], $associations['hasAndBelongsToMany']);
$i = 0;

foreach ($relations as $_alias => $_details):
$otherSingularVar = Inflector::variable($_alias);
?>
<div class="related">
	<h3><?php echo __d('cake', "%s", Inflector::humanize($_details['controller'])); ?></h3>
<?php if (!empty(${$singularVar}[$_alias])): ?>
	<table cellpadding="0" cellspacing="0" class="table table-condensed">
	<tr>
<?php
		$otherFields = array_keys(${$singularVar}[$_alias][0]);
		$otherFields = array_diff($otherFields, $related_fields_to_remove);
		
		if (isset($_details['with'])) {
			$index = array_search($_details['with'], $otherFields);
			unset($otherFields[$index]);
		}
		
		foreach ($otherFields as $_field) {
			echo "\t\t<th>" . Inflector::humanize($_field) . "</th>\n";
		}
?>
		<th class="actions">Actions</th>
	</tr>
<?php
		$i = 0;
		foreach (${$singularVar}[$_alias] as ${$otherSingularVar}):
			echo "\t\t<tr>\n";

			foreach ($otherFields as $_field) {
				if($_field == 'accreditation_type_id'):
					echo "\t\t\t<td>" . $this->EventureAPI->showAccreditationInfo(${$otherSingularVar}[$_field]) . "</td>\n";
				else: 
					echo "\t\t\t<td>" . ${$otherSingularVar}[$_field] . "</td>\n";
				endif;
			}

			echo "\t\t\t<td class=\"actions\">\n";
			echo "\t\t\t\t";
			echo $this->Html->link(
				__d('cake', 'View'),
				array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'view', ${$otherSingularVar}[$_details['primaryKey']])
			);
			echo "\n";
			echo "\t\t\t\t";
			echo $this->Html->link(
				__d('cake', 'Edit'),
				array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'edit', ${$otherSingularVar}[$_details['primaryKey']])
			);
			echo "\n";
			echo "\t\t\t\t";
			echo $this->Form->postLink(
				__d('cake', 'Delete'),
				array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'delete', ${$otherSingularVar}[$_details['primaryKey']]),
				null,
				__d('cake', 'Are you sure you want to delete', true) .' #' . ${$otherSingularVar}[$_details['primaryKey']] . '?'
			);
			echo "\n";
			echo "\t\t\t</td>\n";
		echo "\t\t</tr>\n";
		endforeach;
?>
	</table>
<?php endif; ?>
<!-- 
	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(
				__d('cake', "New %s", Inflector::humanize(Inflector::underscore($_alias))),
				array('plugin' => $plugin_name, 'controller' => $_details['controller'], 'action' => 'add')
			); ?> </li>
		</ul>
	</div>
-->
</div>
<?php endforeach; ?>



</div>
</div>

