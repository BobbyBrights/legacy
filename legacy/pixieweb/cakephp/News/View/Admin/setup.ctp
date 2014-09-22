<?php $def_news = str_replace("\"", "", json_encode($init)); ?>
<?php $def_ann = str_replace("\"", "", json_encode($init)); ?>

<?php echo $this->Form->create(null); ?>
<h2>Latest news (drag to reorder, and Save)</h2>
<input type="text" name="items" class="autocompl" placeholder="Search all items" id="a_i"/>
<ul class="sortable" id="latest_news">
<?php if(!empty($m)): ?>
<?php foreach($m as $item): ?>
	<li><?php echo utf8_encode( $item['Item']['title'] ); ?><input type="hidden" name="cfg[latest_news][]" value="<?php echo $item['Item']['id']; ?>" /><a class="close">&times;</a></li>
<?php endforeach; ?>
<?php endif; ?>
</ul>
<input type="hidden" id="latest_news_items" name="latest_news_items" value="<?php echo $def_news; ?>" />

<h2>Announcements (drag to reorder, and Save)</h2>
<input type="text" name="items" class="autocompl" placeholder="Search all announcements" id="ann"/>
<ul class="sortable" id="latest_announcements">
<?php if(!empty($m)): ?>
<?php foreach($m as $item): ?>
	<li><?php echo utf8_encode( $item['Item']['title'] ); ?><input type="hidden" name="cfg[latest_news][]" value="<?php echo $item['Item']['id']; ?>" /><a class="close">&times;</a></li>
<?php endforeach; ?>
<?php endif; ?>
</ul>
<input type="hidden" id="latest_announcements" name="latest_announcements" value="<?php echo $def_ann; ?>" />
<?php echo $this->Form->end('Save'); ?>