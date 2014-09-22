<?php //var_dump($groups); ?>
<div id="groups_table">
<h3 class="groups">Groups <?php echo $this->Html->link('Add Group', array("controller" => "contacts", "action" => "add_group", "plugin" => "webtext")); ?></h3>

<table width="100%" border="0" cellpadding="0" id="dyna_groups_table">
  <tr>
    <th scope="col" width="50%">Name</th>
    <th scope="col">&nbsp;</th>
  </tr>
  <?php if(!isset($groups) || $groups == null) : ?>
  <tr>
    <td colspan="2">No groups defined</td>
  </tr>  
  <?php else:  ?>
  <?php foreach($groups as $g): ?>
  <tr>
    <td class="groups_cell"><?php echo $this->Html->link($g->name, array("controller" => "contacts", "action" => "edit_group", "plugin" => "webtext", urlencode($g->name))); ?> (<?php echo sizeof($g->groupEntries); ?>)</td>
    <?php //echo "+" . preg_replace("/[^0-9]/", "", $g->address); ?>
    <td class="function"><?php echo $this->Html->link('Edit Group', array("controller" => "contacts", "action" => "edit_group", "plugin" => "webtext", urlencode($g->name))); ?> | 
    	<?php echo $this->Html->link('Delete Group', array("controller" => "contacts", "action" => "delete_group", "plugin" => "webtext", $g->name), array('class' => 'confirm')); ?></td>
  </tr>
  <?php endforeach ?>  
  <?php endif;  ?>
</table>
</div>