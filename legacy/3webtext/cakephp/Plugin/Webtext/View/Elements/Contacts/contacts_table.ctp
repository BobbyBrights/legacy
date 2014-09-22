<div id="contacts_table">
<h3>Contacts <?php echo $this->Html->link('Add Contact', array("controller" => "contacts", "action" => "add_contact", "plugin" => "webtext")); ?></h3>
<?php echo $this->Form->create(null, array('url' => array('controller' => 'contacts', 'action' => 'delete_contacts'))); ?> 
<table width="100%" border="0" cellpadding="0" id="dyna_contacts_table" <?php echo isset($contacts) ? 'data-contacts-count="' . sizeof($contacts) .'"' : ''; ?>>
  <thead>
  <tr id="header_row" class="static">
    <th scope="col" width="40%">Name</th>
    <th scope="col" width="60%">Mobile
    
    <!--<label for="check_all" class="check_all">Select All <input type="checkbox" id="check_all" /></label>-->
    
    </th>
  </tr>
  </thead>
  <tbody style="overflow-y: scroll; overflow-x: hidden; height: 100px;">
  <?php if(!isset($contacts) || $contacts == null) : ?>
  <tr>
    <td colspan="2">No contacts defined</td>
  </tr>  
  <?php else:  ?>
  <?php foreach($contacts as $c): ?>
  <tr class="_<?php echo strtoupper( substr($c->name, 0, 1) );?> contact_row">
    <td class="address"><?php echo urldecode($c->name); ?></td>
    <td class="msisdn"><em><?php echo preg_replace("/tel:/", "", $c->address); ?></em>
    
  <!--  <td class="msisdn"><em><?php echo preg_replace(array("/[^0-9]/", "/^([^0+])/"), array("", "+$1"), $c->address); ?></em> -->
    
    <div class="function">
    <?php echo $this->Html->link('Message', array("controller" => "messages", "action" => "send", "plugin" => "webtext", $c->address), array('class' => 'message')); ?>&nbsp;&nbsp; 
    <?php echo $this->Html->link('Edit', array("controller" => "contacts", "action" => "edit_contact", "plugin" => "webtext", $c->name, preg_replace("/[^0-9|\+]/", "", $c->address))); ?>&nbsp;&nbsp;
    <?php echo $this->Html->link('Delete', array("controller" => "contacts", "action" => "delete_contact", "plugin" => "webtext", $c->name), array('class' => 'confirm')); ?>
    
    	<?php 
    		$contacts_properties = array('label' => false, 'type' => 'checkbox', 'hiddenField' => false, 'div' => false, 'class' => 'delete_multiple', 'value' => $c->name, 'name' => 'data[User][contacts][]');
			//echo $this->Form->input('contacts', $contacts_properties);
    	?>
    
    </div>
    </td>
    
  </tr>
  <?php endforeach ?>  
  <?php endif;  ?>
  <tr class="hidden no_matches">
    <td colspan="3">No matches</td>
  </tr> 
  <tr class="hidden delete_multiple_contacts">
    <td colspan="3"><?php echo $this->Form->button("Delete selected", array('type' => 'submit', 'class' => 'delete_multiple'));?></td>
  </tr>  
  </tbody>
  <tfoot></tfoot>
</table>
<?php echo $this->Form->end(); ?>

</div>