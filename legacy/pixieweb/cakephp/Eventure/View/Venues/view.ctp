<?php $this->assign('title', 'Venue information for ' . $venue['Venue']['name']); ?>
<?php //$map_api_key = "AIzaSyDSuKPo2zWF1PDkRl5_iBvv5vbvEndWuwc"; ?>
<div class="row">
	<div class="span8">	
		<h2>Venue Information</h2>
		<dl class="venue">
		<?php foreach (array_keys($venue['Venue']) as $p): ?>
			<dd><?php echo Inflector::humanize($p); ?></dd>
			<dt><?php echo isset($venue['Venue'][$p]) && !empty($venue['Venue'][$p]) ? $venue['Venue'][$p] : '&nbsp;'; ?></dt>
		<?php endforeach; ?>
		</dl>
	</div>
	<div class="span4">
		<h2>Map</h2>
		<div class="well">
			<?php $center = $venue['Venue']['geolocation']; ?>
			<a href="https://maps.google.com/maps?q=<?php echo $center; ?>">
			<img src="http://maps.googleapis.com/maps/api/staticmap?center=<?php echo $center; ?>&zoom=16&size=330x200&sensor=false" />
			</a>
		</div>
		<h2>Actions</h2>
		<div class="well">
			<?php echo $this->Html->link('Edit this venue', array('action' => 'edit', $venue['Venue']['id']), array('class' => 'btn btn-large btn-block btn-primary')); ?>
		</div>	
	</div>
</div>