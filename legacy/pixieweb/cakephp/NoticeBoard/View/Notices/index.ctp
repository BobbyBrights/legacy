<?php //vomit($category); ?>
<h1>Notices
<?php 
	$link_options = array('controller' => 'notices', 'plugin' => 'notice_board', 'action' => 'add'); 
	if(isset($this->passedArgs['category_id'])):
		$link_options['category'] = $this->passedArgs['category_id']; 
	endif;
	echo $this->Html->link('<i class="icon-envelope icon-white"></i> Add New Notice', $link_options, array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h1>

<?php //vomit($data); ?>
<table class="table table-striped">
  <thead>
    <tr>
  	<th><?php echo $this->Paginator->sort('id', '#'); ?></th>
	<th><?php echo $this->Paginator->sort('summary', 'Summary'); ?></th>
	<th><?php echo $this->Paginator->sort('created', 'Created on'); ?></th>
    </tr>
  </thead>
  <tbody>
  	<?php foreach($data as $notice): ?>
  	<tr>
      <td><?php echo $notice['Notice']['id']; ?></td>
      <td><?php echo $this->Html->link($notice['Notice']['summary'], array('controller' => 'notices', 'plugin' => 'notice_board', 'action' => 'view', $notice['Notice']['id']), array('escape' => false)); ?></td>
      <td><?php echo $notice['Notice']['created']; ?></td>
      <td></td>
    </tr>  	  	
  	<?php endforeach; ?>
  </tbody>
</table>
<?php echo $this->element('pager'); ?>
            