<?php $link_options = array('controller' => 'roles', 'action' => 'add'); ?>
<h1>Feeds <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New Role', $link_options, array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h1>

<?php //vomit($feeds); ?>
<table class="table table-striped">
  <thead>
    <tr>
        <th><?php echo $this->Paginator->sort('id', '#'); ?></th>
        <th class="span7"><?php echo $this->Paginator->sort('name', 'Name'); ?></th>
        <th><?php echo $this->Paginator->sort('modified', 'Last modified'); ?></th>
        <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
        <?php foreach($roles as $role): ?>
        <tr>
      <td><?php echo $role['Role']['id']; ?></td>
      <td><?php echo $this->Html->link($role['Role']['name'], array('controller' => 'roles', 'action' => 'view', $role['Role']['id']), array('escape' => false)); ?></td>
      <td><?php echo $role['Role']['modified']; ?></td>
      <td><?php echo $this->element('crud', array('controller' => 'roles', 'id' => $role['Role']['id'])); ?></td>
    </tr>               
        <?php endforeach; ?>
  </tbody>
</table>
<?php echo $this->element('pager'); ?>
