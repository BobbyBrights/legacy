    <?php get_header(); ?>

    <div class="row">

    <section id="hero">
        <div class="content">
            <h1>Shane McCafferty</h1>
            <p>Freelance iOS Developer, creator of WordForward, Crobble and other great AppStore games. And a wonderful tea maker. </p>
            <a href="#contact" class="btn btn-primary">Contact me</a>
        </div>
    </section>


    <section id="apps">
         <div class="container">
            <h2>Apps</h2>
            <?php
            $my_query = null;
            $my_query = new WP_Query(
                array(
                    'post_type' => 'app',
                    'post_status' => 'publish',
                    'posts_per_page' => -1,
                    'caller_get_posts'=> 1
                )
            );
            if( $my_query->have_posts() ) {
              while ($my_query->have_posts()) : $my_query->the_post();
                    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'post-thumbnail' );
                    $key_1_value = get_post_meta( get_the_ID(), 'key_1', true );
                    // check if the custom field has a value
                    if( ! empty( $key_1_value ) ) {
                      echo $key_1_value;
                    }

              ?>

                <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="move-up" style="background-image: url('<?php echo $thumb[0]; ?>')">
                        <h2><?php the_title_attribute(); ?></h2>
                    </div>
                </div>
                <?php
              endwhile;
            }
            wp_reset_query();  // Restore global post data stomped by the_post().
            ?>
        </div>
    </section>
    <section id="contact">
        <div class="container">
            <h2>Contact</h2>
            <div class="col-xs-12 col-sm-6 col-md-6">

            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
                <a href="https://twitter.com/egvroom" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @egvroom</a>
                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
            </div>
        </div>
    </section>

    </div><!-- /.container -->

    <?php get_footer(); ?>
