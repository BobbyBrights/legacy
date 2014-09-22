<div class="span3 related-content">
	<?php 
		$recent_posts = wp_get_recent_posts(array('post_type' => 'blog'));
		$blogs = array(); 
		foreach( $recent_posts as $recent ){
        	$blogs[] = $recent["post_title"]; 
        }
		
	?>
	
    <div class="input-append">
    	<input type="text" data-provide="typeahead" data-items="4" data-source='<?php echo json_encode($blogs); ?>' id="blogs" name="blogs" placeholder="Search blog posts"><span class="add-on"><i class="icon-search"></i></span>
    </div>

<div class="well sidebar-nav">
    	<h2>Blog posts</h2>
        <ul class="nav nav-list no-indent">
	      	<?php
                
                foreach( $recent_posts as $recent ){
                    echo '<li><a href="' . get_permalink($recent["ID"]) . '" title="Look '.esc_attr($recent["post_title"]).'" >' .   $recent["post_title"].'</a> </li> ';
                }
            ?>
        </ul>
    </div><!--/.well -->
	<?php global $post; ?>
	<?php $u = get_userdata( $post->post_author ); ?>
	<p>Posted by: <?php echo $u->data->display_name;  ?> (<?php echo $post->post_modified; ?>)</p>

</div>
