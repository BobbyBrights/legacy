<!--<pre><?php echo json_encode($user); ?></pre>
<!--<pre><?php echo json_encode($subjects); ?></pre>-->

<div class="row">

<div class="span7">
  <h2><?php echo $user['User']['firstname'] . " " . $user['User']['surname']; ?><?php if($this->action != 'me'): ?><a class="btn pull-right" href="#">Connect with me</a><?php endif; ?></h2>
  <?php foreach($user['Subject'] as $s): ?>
  	<span class="subject"><?php echo $s['name']; ?></span>
  <?php endforeach; ?>

</div><!--/span-->
<div class="span5">
  <div class="well">
  <h3>Current rating</h3>
  <div class="stars default">
 	 <div class="stars filled_<?php echo $rating; ?>"></div>
  </div>
  <p><?php echo $rating/2; ?> / 5 - based on 415 reviews</p>
  </div><!--/.well -->

  <div class="well alt">
  <h3>My specialties</h3>
  <?php foreach($subjects as $s): ?>
  	<label><input type="checkbox" class="_ajax_subject" value="<?php echo $s['Subject']['id']; ?>" /><?php echo $s['Subject']['name']; ?></label>
  <?php endforeach; ?>
  </div><!--/.well -->

  <div class="well alt">
  <h3>My areas</h3>
  <?php foreach($areas as $l): ?>
  	<label><input type="checkbox" class="_ajax_area" value="<?php echo $l['Area']['id']; ?>" /><?php echo $l['Area']['name']; ?></label>
  <?php endforeach; ?>
  </div><!--/.well -->


</div><!--/span-->

</div><!--/row-->
