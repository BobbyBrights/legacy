  <!-- Main hero unit for a primary marketing message or call to action -->
  
  <div class="hero-unit">
    <h1>Lets get started.</h1>
    <?php echo $this->element('teach_form'); ?>
    <div class="clear"></div>
    <?php echo !isset($logged_in) ? $this->Html->link('..or sign up today', array('controller' => 'users', 'action' => 'add', 'plugin' => 'aoaku'), array('class' => 'signup-link')) : ''; ?>
    <!--<p><a class="btn btn-primary btn-large">Learn more &raquo;</a></p>-->
  </div>
  <div class="row">
  	<div class="span8 banner-middle">
  		<div class="well">
		  	<h2>Hero unit</h2>
		  	<p>Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
		  	<br/><a class="btn" href="#">View details &raquo;</a>
  		</div>
  		<!--
  		<div class="span3">
	  		<h2>Headline 2</h2>
	  		<p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man. </p>
	  		<p><a class="btn twitter" href="#">Follow &raquo;</a></p>
	  	</div>
	  	<div class="span3">
	  		<h2>Headline 3</h2>
	  		<p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man. </p>
	  		<p><a class="btn twitter" href="#">Follow &raquo;</a></p>
	  	</div>
	  	-->
    
  	</div>
    <div class="span4">
      <a class="twitter-timeline" href="https://twitter.com/smcelhinney" data-widget-id="300371254563704832">Tweets by @smcelhinney</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<!--
      <a class="twitter-timeline" href="https://twitter.com/smcelhinney" data-widget-id="300371254563704832">Tweets by @smcelhinney</a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
-->
      <p><a class="btn twitter" href="#">Follow &raquo;</a></p>
    </div>
  </div>
