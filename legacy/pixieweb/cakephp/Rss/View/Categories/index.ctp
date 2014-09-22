<?php $link_options = array('controller' => 'categories', 'action' => 'add'); ?>
<h1>Categories <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New Category', $link_options, array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h1>

<?php //vomit($categories); ?>
<table class="table table-striped">
  <thead>
    <tr>
        <th><?php echo $this->Paginator->sort('id', '#'); ?></th>
        <th class="span7"><?php echo $this->Paginator->sort('name', 'Name'); ?></th>
        <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
        <?php foreach($categories as $c): ?>
		<?php
		$parent = "";
		if(!empty($c['ParentCategory']) && $c['ParentCategory']['id'] != null):
			$parent = $c['ParentCategory']['name'] . " &raquo; "; 
		endif;		
		?>
    <tr>
      <td><?php echo $c['Category']['id']; ?></td>
      <td><?php echo $this->RssHtml->category_breadcrumb($c['Category']['id'], $categories); ?></td>
      <td><?php echo $this->element('crud', array('controller' => 'categories', 'id' => $c['Category']['id'])); ?></td>
    </tr>               
        <?php endforeach; ?>
  </tbody>
</table>
<?php echo $this->element('pager'); ?>
