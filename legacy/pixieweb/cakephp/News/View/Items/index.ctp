<?php $p = $this->Paginator->params(); ?>
<?php $years = array(2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004); ?>
<?php if(!empty($items)): ?>
	<h1>Latest <?php echo isset($this->passedArgs['type']) ? Inflector::pluralize($items[0]['ItemType']['name']) : 'Items'; ?><span class="year">By year: 
	<?php foreach($years as $y): ?>	
		<?php 
			$opts['year'] = $y; 
			if(!empty($this->passedArgs['type'])):
				$opts['type'] = $this->passedArgs['type']; 
			endif;
			echo $this->Html->link($y, $opts); 
		?> |
	<?php endforeach; ?>
	</span></h1>
	<p>Total of <?php echo $p['count']; ?> <?php echo strtolower($items[0]['ItemType']['name']); ?> items returned for <?php echo !empty($this->passedArgs['year']) ? $this->passedArgs['year'] : date('Y'); ?></p>
	<?php foreach($items as $item): 
			//vomit($item);
			
			$m = strtolower( Inflector::slug($item['ItemType']['name'], '-') );
			$h = utf8_encode($item['Item']['title']);	

			$s = strtolower( Inflector::slug($h, '-') );
			
			//vomit($s);
			
			if($s == ''):
				$h = '(Title not set)';
				$s = strtolower( Inflector::slug($h, '-') ) ;
			endif;
			
	?>
		<article id="<?php echo $m. '-' . $item['Item']['id']; ?>" class="<?php echo $m; ?>">
			<h2><?php echo $this->Html->link($h, array('controller' => 'items', 'action' => 'view', 'plugin' => 'news', $s, $item['Item']['id'])); ?></h2>
			<p class="exceprt"><?php echo utf8_encode($item['Item']['excerpt']); ?></p>
			<p class="pub_date">Published on: <?php echo str_replace(' 00:00:00', '', $item['Item']['created']); ?></p>
		</article>
		<hr />
	<?php endforeach; ?>
	<?php echo $this->Paginator->numbers(); ?>
	
<?php else: ?>
	<p>Sorry, no items matched the criteria. </p>
<?php endif; ?>



<?php //vomit($items); ?>