<?php //vomit($feed['Category']); ?>
<h2><?php echo $feed['Feed']['name']; ?><div class="btn-group pull-right">
	<?php echo $this->Html->link('Edit', array('action' => 'edit', $feed['Feed']['id']), array('class' => 'btn btn-primary')); ?>
	<a class="btn btn-danger" href="#">Delete</a>
</div></h2>
<?php if(!empty($feed['Category'])): ?>
<div class="badges">
	<p class="pull-left"><span class="lead-in">Categories: </span>
	<?php foreach($feed['Category'] as $f): ?>
		<span class="label label-info margin-right"><?php echo $this->RssHtml->category_breadcrumb( $f['id'], $all_categories); ?></span>
	<?php endforeach; ?>
	</p>
</div>
<div class="clearfix"></div>
<?php endif; ?>
<p><?php echo $feed['Feed']['summary']; ?></p>
<hr />

<h3>Latest Items in this feed <?php echo $this->Html->link('<i class="icon-plus icon-white"></i> Add New Item', array('action' => 'add', 'controller' => 'items', 'Feed.id' => $feed['Feed']['id']), array('class' => 'btn btn-primary pull-right', 'escape' => false)); ?></h3>
<?php $items = $this->requestAction('rss/items/index/Feed.id:' . $feed['Feed']['id']); ?>
<?php if($items != null): ?>
<ul>
<?php foreach ($items as $i): ?>
      <li><?php echo $this->Html->link( $i['Item']['summary'], array('controller' => 'items', 'action' => 'view', $i['Item']['id'])); ?></li>
<?php endforeach; ?>
</ul>
<?php else: ?>
<p class="muted">No latest items</p>
<?php endif ?>
<hr/>
<h3>Feed Authors</h3>
<?php //vomit($feed['User']); ?>
<?php if(!empty($feed['User'])): ?>
<ul>
<?php foreach ($feed['User'] as $i): ?>
      <li><?php echo $this->Html->link( $i['fullname'] . " (" . $i['name'] . ")", array('controller' => 'users', 'action' => 'view', $i['id'])); ?></li>
<?php endforeach; ?>
</ul>
<?php else: ?>
<p class="muted">No authors for this feed. </p>
<?php endif ?>