<?php get_header(); ?>

<!-- Carousel
    ================================================== -->

<div class="hero-unit">
  
  <div class="container">
      
  	  <div class="<?php echo $_REQUEST['_class']; ?>">
	      <h1>A prop for all seasons.</h1>
		  <p class="lead">Looking for the next big thing for your corporate event? Browse through our themes and choose one that suits you.</p>
		  <a class="btn btn-large btn-primary" href="/themes">Browse themes</a> </div>
	  </div>

  </div>
</div>

<!-- Nested Columns -->
<div class="container blocks">
  <h2>Specialists in making a scene.</h2>
  <div class="row">
    <div class="span12">
      <div class="row">
        <div class="span6 feature">
          <figure class="effeckt-caption effeckt-caption-8"> 
          <img src="<?php echo get_template_directory_uri(); ?>/assets/img/features/1.jpg" alt="" >
            <figcaption>
              <div class="effeckt-figcaption-wrap">
                <h3>Move</h3>
                <p>Lorem ipsum dolar.</p>
              </div>
            </figcaption>
          </figure>
        </div>
        <div class="span6">
          <div class="row">
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-3"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/1.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Sqkwoosh</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-4"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/2.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Slide Side</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
          <div class="row">
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-5"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/3.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Cover</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-6"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/4.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Fall in</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--
  <div class="row">
    <div class="span12">
      <div class="row">
        <div class="span6">
          <div class="row">
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-3"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/5.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Sqkwoosh</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-4"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/6.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Slide Side</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
          <div class="row">
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-5"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/7.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Cover</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div class="span3 spotlight">
              <figure class="effeckt-caption effeckt-caption-6"> <img src="<?php echo get_template_directory_uri(); ?>/assets/img/spotlights/8.jpg" alt="" >
                <figcaption>
                  <div class="effeckt-figcaption-wrap">
                    <h3>Fall in</h3>
                    <p>Lorem ipsum dolar.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <div class="span6 feature with-iframe">
          
          <iframe src="http://player.vimeo.com/video/17439665" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
          
          
        </div>
      </div>
    </div>
  </div>
-->
</div>
<div class="container-fluid second-page" id="page-2">
    <div class="container">
      <h1>Example headline.</h1>
      <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
      <a class="btn btn-large btn-primary" href="#">Call to action</a> </div>
  </div>
</div>
<div class="container-fluid third-page" id="page-3">
    <div class="container">
      <h1>Example headline.</h1>
      <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
      <a class="btn btn-large btn-primary" href="#">Call to action</a> </div>
  </div>
</div>
<?php get_footer(); ?>
