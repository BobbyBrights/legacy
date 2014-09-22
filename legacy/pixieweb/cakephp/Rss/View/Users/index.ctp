<?php $link_options = array('controller' => 'users', 'action' => 'add'); ?>
<h1>Feeds <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New User', $link_options, array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h1>

<?php //vomit($feeds); ?>
<table class="table table-striped">
  <thead>
    <tr>
        <th><?php echo $this->Paginator->sort('id', '#'); ?></th>
        <th class="span7"><?php echo $this->Paginator->sort('fullname', 'Name'); ?></th>
        <th><?php echo $this->Paginator->sort('modified', 'Last modified'); ?></th>
    </tr>
  </thead>
  <tbody>
        <?php foreach($users as $user): ?>
        <tr>
      <td><?php echo $user['User']['id']; ?></td>
      <td><?php echo $this->Html->link($user['User']['fullname'], array('controller' => 'users', 'action' => 'view', $user['User']['id']), array('escape' => false)); ?></td>
      <td><?php echo $user['User']['modified']; ?></td>
      <td><?php echo $this->element('crud', array('controller' => 'users', 'id' => $user['User']['id'])); ?></td>
    </tr>               
        <?php endforeach; ?>
  </tbody>
</table>
<?php echo $this->element('pager'); ?>
