    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <?php echo $this->Html->link('Hokio', array('plugin' => 'hokio', 'controller' => 'pages', 'action' => 'display', 'home'), array('class' => 'brand')); ?>
          
          <div class="nav-collapse collapse">
          	<p class="navbar-text pull-right">
          	  <?php echo $this->Html->link('Logout', array('action' => 'logout', 'controller' => 'users'), array('class' => 'navbar-link')); ?>
            </p>
            <ul class="nav">
            <!--
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            -->
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>