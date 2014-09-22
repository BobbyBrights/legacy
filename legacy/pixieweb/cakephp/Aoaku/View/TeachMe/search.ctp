<!--<pre><?php echo json_encode($users); ?></pre>-->
          <h2>People teaching <?php echo $query['subject']; ?> in <?php echo $query['area']; ?></h2>
      <div class="row">
        <div class="span3">
          <div class="well sidebar-nav">
            <ul class="nav nav-list filters">
              <li class="nav-header">Filters</li>
              <li><label for="typeMale"><input type="checkbox" id="typeMale" />Male</label></li>
              <li><label for="typeFemale"><input type="checkbox" id="typeFemale" />Female</label></li>
              <li class="nav-header">Type</li>
              <li><label for="typeFree"><input type="checkbox" id="typeFree" />Free</label></li>
              <li><label for="typePremium"><input type="checkbox" id="typePremium" />Premium</label></li>
            </ul>
            <br/><a href="#" id="clear_filters">Clear all</a>
          </div><!--/.well -->
        </div><!--/span-->
        <div class="span9">
          <div class="row results">
          
          	<?php foreach($users as $u): ?>
          	<div class="span3 people type<?php echo ucfirst($u['User']['gender']); ?> type<?php echo ucfirst($u['AccountType']['name']); ?>">
              <h2><?php echo $u['User']['firstname']; ?></h2>
              <?php foreach($u['Subject'] as $s): ?>
              	<span class="subject"><?php echo $s['name']; ?></span>
              <?php endforeach; ?>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <?php echo $this->Html->link('View '.$u['User']['firstname'].' &raquo;', array('controller' => 'users', 'action' => 'view', 'plugin' => 'aoaku', $u['User']['id']), array('class' => 'btn', 'escape' => false)); ?>
              
                          </div>
          	
          	<?php endforeach ?>
          	
          </div><!--/row-->
          <div class="row notification no-results">
          	<div class="span9 well">No results for this filter.</div>
          </div>
        </div><!--/span-->
        	
      </div><!--/row-->
