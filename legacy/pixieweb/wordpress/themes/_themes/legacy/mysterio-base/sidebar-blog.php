<div class="span3 related-content">
    <div class="well sidebar-nav">
    	<h2>Blog posts</h2>
        <ul class="nav nav-list no-indent">
	      	<?php
                $recent_posts = wp_get_recent_posts(array('post_type' => 'blog'));
                foreach( $recent_posts as $recent ){
                    echo '<li><a href="' . get_permalink($recent["ID"]) . '" title="Look '.esc_attr($recent["post_title"]).'" >' .   $recent["post_title"].'</a> </li> ';
                }
            ?>
        </ul>
    </div><!--/.well -->
</div>
