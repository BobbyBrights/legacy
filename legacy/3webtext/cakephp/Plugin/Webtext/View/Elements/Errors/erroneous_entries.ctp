<?php
//var_dump($error);
?>
<div class="error list_items">
<span class="error_message">Some errors were found in your CSV file, they are detailed below. You can change these in the CSV file and re-upload.</span>
<ul>
<?php foreach ($erroneous as $a): ?>
	<li><?php echo $a['name']; ?> - <?php echo $a['address']; ?></li>
<?php endforeach; ?>
</ul>
</div>