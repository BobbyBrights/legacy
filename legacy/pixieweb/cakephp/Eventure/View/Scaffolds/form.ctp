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
<?php if ($this->request->action != 'add'): ?>
		<li><?php echo $this->Form->postLink(
			__d('cake', 'Delete'),
			array('action' => 'delete', $this->Form->value($modelClass . '.' . $primaryKey)),
			null,
			__d('cake', 'Are you sure you want to delete # %s?', $this->Form->value($modelClass . '.' . $primaryKey)));
		?></li>
<?php endif; ?>
		<li><?php echo $this->Html->link(__d('cake', 'List') . ' ' . $pluralHumanName, array('action' => 'index')); ?></li>
<?php
		$done = array();
		foreach ($associations as $_type => $_data) {
			foreach ($_data as $_alias => $_details) {
				if ($_details['controller'] != $this->name && !in_array($_details['controller'], $done)) {
					echo "\t\t<li>" . $this->Html->link(
						__d('cake', 'List %s', Inflector::humanize($_details['controller'])),
						array('plugin' => 'eventure', 'controller' => $_details['controller'], 'action' => 'index')
					) . "</li>\n";
					echo "\t\t<li>" . $this->Html->link(
						__d('cake', 'New %s', Inflector::humanize(Inflector::underscore($_alias))),
						array('plugin' => 'eventure', 'controller' => $_details['controller'], 'action' => 'add')
					) . "</li>\n";
					$done[] = $_details['controller'];
				}
			}
		}
?>
	</ul>
</div>
-->
<div class="<?php echo $pluralVar; ?> form span12">
<?php
	echo $this->Form->create();
	foreach($scaffoldFields as $f):	
		//var_dump($f);
		if(!in_array($f, array('created', 'modified', 'updated'))):				
			$is_date_field = ($f == 'start_date' || $f == 'end_date'); 
			$span = 'span6';
			if($is_date_field):
				$span = 'span2'; 
				echo '<div class="input-append date datepicker" data-date="' . date('y-m-d') . '" data-date-format="yyyy-mm-dd">';
				echo $this->Form->input($f, array('type' => 'text', 'class' => $span, 'default' =>  date('y-m-d'), 'readonly' => 'true', 'div' => false));
				echo '<span class="add-on"><i class="icon-th"></i></span></div><div class="clear"></div>'; 			
			else:  
				
				if(isset($options[$f])):					
					echo $this->Form->input($f, array('options' => $options[$f], 'class' => $span));
				else:
					echo $this->Form->input($f, array('class' => $span));
				endif;
			
			endif;
		endif;
	endforeach; ?>
	<button class="btn btn-large btn-primary" type="submit">Submit</button>
<?php 
	echo $this->Form->end();
?>
</div>
</div>
