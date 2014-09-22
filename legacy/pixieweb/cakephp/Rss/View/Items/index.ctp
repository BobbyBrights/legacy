<?php $link_options = array('controller' => 'items', 'action' => 'add'); ?>
<h1>Items <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New Item', $link_options, array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h1>
<?php echo isset($subtitle) ? '<h3 class="filter_title">' . $subtitle . '</h3>': ''; ?>
<?php // vomit($items); ?>
<table class="table table-striped">
  <thead>
    <tr>
        <th><?php echo $this->Paginator->sort('id', '#'); ?></th>
        <th class="span7"><?php echo $this->Paginator->sort('summary', 'Summary'); ?></th>
        <th><?php echo $this->Paginator->sort('Feed.name', 'Feed'); ?></th>
        <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
        <?php if(sizeof($items) > 0): ?>
        <?php foreach($items as $item): ?>
        <tr>
      <td><?php echo $item['Item']['id']; ?></td>
      <td><?php echo $this->Html->link($item['Item']['summary'], array('controller' => 'items', 'action' => 'view', $item['Item']['id']), array('escape' => false)); ?></td>
      <td><?php echo $item['Feed']['name']; ?></td>
      <td><?php echo $this->element('crud', array('controller' => 'items', 'id' => $item['Item']['id'])); ?></td>
    </tr>               
        <?php endforeach; ?>
        <?php else: ?>
        <tr>
      <td colspan="5">Empty set.</td>
    </tr> 
        <?php endif; ?>
        
  </tbody>
</table>
<?php echo $this->element('pager'); ?>
