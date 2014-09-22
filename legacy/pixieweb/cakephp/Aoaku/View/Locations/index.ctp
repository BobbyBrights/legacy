<?php
	$this->Html->script(
		array(
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyACmA7M62XheEmKZ7QQIzNxMtDRaDSGJq8&sensor=true',
			'/aoaku/js/map'
		), array('block' => 'script_footer'));
?>
<div class="row">
	<div class="span3">
	<div class="well">
		<h4>Top 10 Meet-up spots</h4>
		<ul class="points">
			<?php foreach ($locations as $u): ?>
			<?php $ll = explode(",", $u['Location']['geoloc']); ?>			
			<li data-lat="<?php echo $ll[0]; ?>" data-lng="<?php echo $ll[1]; ?>"><a href="<?php echo h($u['Location']['url']); ?>"><?php echo h($u['Location']['name']); ?></a></li>
		    <?php endforeach; ?>
		</ul>
	</div>
	</div>
	<div class="span9">
		<div id="map_canvas"></div>
	</div>
</div>