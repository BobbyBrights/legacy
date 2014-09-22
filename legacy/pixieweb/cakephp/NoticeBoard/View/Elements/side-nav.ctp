<ul class="nav nav-list">
  <li class="nav-header">Categories</li>
  <?php foreach($list_categories as $c): ?>
  <li><?php echo $this->Html->link($c['Category']['name'], array('controller' => 'notices', 'action' => 'index', 'category_id' => $c['Category']['id'])); ?></li>
  <?php endforeach; ?>
</ul>
<?php 
if($this->action != 'add' && $this->action != 'edit'):
	echo $this->Form->create('Search', array('url' => array('controller' => 'searches'), 'id' => 'search_form'));
	echo "<div class=\"input-append\">";
	echo $this->Form->input('query', array('class' => 'span2', 'type' => 'text', 'label' => false, 'div' => false, 'placeholder' => 'Search all notices'));
	echo $this->Form->button('Go', array('class' => 'btn', 'type' => 'submit'));
	echo "</div>";
	echo $this->Form->end();
endif;
?>
