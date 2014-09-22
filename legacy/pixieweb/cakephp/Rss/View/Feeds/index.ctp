<?php $link_options = array('controller' => 'feeds', 'action' => 'add'); ?>
<h1>Feeds <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New Feed', $link_options, array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h1>

<?php //vomit($feeds); ?>
<table class="table table-striped">
  <thead>
    <tr>
        <th><?php echo $this->Paginator->sort('id', '#'); ?></th>
        <th class="span5"><?php echo $this->Paginator->sort('name', 'Name'); ?></th>
        <th>Items</th>
        <th><?php echo $this->Paginator->sort('created', 'Created on'); ?></th>
        <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
        <?php foreach($feeds as $feed): ?>
        <tr>
      <td><?php echo $feed['Feed']['id']; ?></td>
      <td><?php echo $this->Html->link($feed['Feed']['name'], array('controller' => 'feeds', 'action' => 'view', $feed['Feed']['id']), array('escape' => false)); ?></td>
      <td><?php echo sizeof($feed['Item']); ?></td>
      <td><?php echo $feed['Feed']['created']; ?></td>
      <td><?php echo $this->element('crud', array('controller' => 'feeds', 'id' => $feed['Feed']['id'])); ?></td>
    </tr>               
        <?php endforeach; ?>
  </tbody>
</table>
<?php echo $this->element('pager'); ?>
