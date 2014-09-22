<?php 
	$nav = array();
	$nav['Home'] = array('controller' => 'admin', 'action' => 'setup', 'plugin' => 'news');
	$nav['All Items'] = array('controller' => 'items', 'action' => 'index', 'plugin' => 'news', 'year' => date("Y"));
	$nav['Press Releases'] = array('controller' => 'items', 'action' => 'index', 'plugin' => 'news', 'type' => 1, 'year' => date("Y"));
	$nav['College News'] = array('controller' => 'items', 'action' => 'index', 'plugin' => 'news', 'type' => 2, 'year' => date("Y"));
	$nav['Galleries'] = array('controller' => 'items', 'action' => 'index', 'plugin' => 'news', 'type' => 4, 'year' => date("Y"));
?>	

<h2>Sitemap</h2>
<ul class="site-menu-1 site-menu">
<?php foreach($nav as $n => $v): ?>
	<li><?php echo $this->Html->link($n, $v); ?></li>
<?php endforeach; ?>
</ul>