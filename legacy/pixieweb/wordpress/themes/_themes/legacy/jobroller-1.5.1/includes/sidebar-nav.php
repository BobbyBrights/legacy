<li class="widget widget-nav">
	
<ul class="display_section">
	<li><a href="#browseby" class="noscroll"><?php _e('Browse by&hellip;', 'appthemes'); ?></a></li>
	<li><a href="#tags" class="noscroll"><?php _e('Tags', 'appthemes'); ?></a></li>
</ul>
<div id="browseby" class="tabbed_section"><div class="contents">
    <ul>
		<?php
		// By Type
		$args = array(
		    'hierarchical'       => false,
		    'parent'               => 0
		);
		$terms = get_terms( 'job_type', $args );
		if ($terms) :
			echo '<li><a class="top" href="#open">'.__('Job Type', 'appthemes').'</a> <ul>';
		
			foreach($terms as $term) :
				echo '<li class="page_item ';
				if ( isset($wp_query->queried_object->slug) && $wp_query->queried_object->slug==$term->slug ) echo 'current_page_item';
				echo '"><a href="'.get_term_link( $term->slug, 'job_type' ).'">'.$term->name.'</a></li>';
			endforeach;
			
			echo '</ul></li>';
		endif;
		
		// By Salary
		$args = array(
		    'hierarchical'       => false,
		    'parent'               => 0
		);
		$terms = get_terms( 'job_salary', $args );
		if ($terms) :
			echo '<li><a class="top" href="#open">'.__('Job Salary', 'appthemes').'</a> <ul>';
		
			foreach($terms as $term) :
				echo '<li class="page_item ';
				if ( isset($wp_query->queried_object->slug) && $wp_query->queried_object->slug==$term->slug ) echo 'current_page_item';
				echo '"><a href="'.get_term_link( $term->slug, 'job_salary' ).'">'.$term->name.'</a></li>';
			endforeach;
			
			echo '</ul></li>';
		endif;

		// By Cat
		$args = array(
		    'hierarchical'       => false,
		    'parent'               => 0
		);
		$terms = get_terms( 'job_cat', $args );
		if ($terms) :
                    echo '<li><a class="top" href="#open">'.__('Job Category', 'appthemes').'</a> <ul>';

                    foreach($terms as $term) :
                        echo '<li class="page_item ';
                        if ( isset($wp_query->queried_object->slug) && $wp_query->queried_object->slug==$term->slug ) echo 'current_page_item';
                        echo '"><a href="'.get_term_link( $term->slug, 'job_cat' ).'">'.$term->name.'</a></li>';
                    endforeach;

                    echo '</ul></li>';
		endif;
		
		// By Date
		if ($datepage = get_option('jr_date_archive_page_id')) :
                    $datepagelink = get_permalink($datepage);
                    echo '<li><a class="top" href="#open">'.__('Date posted', 'appthemes').'</a> <ul>';
                    echo '<li><a href="'.add_query_arg('show', 'today', $datepagelink).'">'.__('Today','appthemes').'</a></li>';
                    echo '<li><a href="'.add_query_arg('show', 'week', $datepagelink).'">'.__('This Week','appthemes').'</a></li>';
                    echo '<li><a href="'.add_query_arg('show', 'lastweek', $datepagelink).'">'.__('Last Week','appthemes').'</a></li>';
                    echo '<li><a href="'.add_query_arg('show', 'month', $datepagelink).'">'.__('This Month','appthemes').'</a></li>';
                    echo '</ul></li>';
		endif;
		?>
		
		<?php jr_sidebar_nav_browseby(); ?>
		
    </ul>
</div></div>
<div id="tags" class="tabbed_section"><div class="contents">
	<?php
		$args = array(
		    'hierarchical'       => false,
		    'parent'               => 0
		);
		$terms = get_terms( 'job_tag', $args );
		if ($terms) :
			echo '<ul class="job_tags">';
		
			foreach($terms as $term) :
				echo '<li><a href="'.get_term_link( $term->slug, 'job_tag' ).'">'.$term->name.'</a></li>';
			endforeach;
			
			echo '</ul>';
		endif;
	?>
</div></div>
	<script type="text/javascript">
		/* <![CDATA[ */
			jQuery('ul.widgets li.widget.widget-nav div ul li ul, ul.widgets li.widget.widget-nav div').hide();
			jQuery('.widget-nav div.tabbed_section:eq(0), .widget-nav div.tabbed_section:eq(0) .contents').show();
			jQuery('.widget-nav ul.display_section li:eq(0)').addClass('active');
			
			// Tabs
			jQuery('.widget-nav ul.display_section li a').click(function(){
				
				jQuery('.widget-nav div.tabbed_section .contents').fadeOut();
				jQuery('.widget-nav div.tabbed_section').hide();
				
				jQuery(jQuery(this).attr('href')).show();
				jQuery(jQuery(this).attr('href') + ' .contents').fadeIn();
				
				jQuery('.widget-nav ul.display_section li').removeClass('active');
				jQuery(this).parent().addClass('active');
				
				return false;
			});

			// Sliding
			jQuery('ul.widgets li.widget.widget-nav div ul li a.top').click(function(){
				jQuery(this).parent().find('ul').slideToggle();
			});

		/* ]]> */
	</script>
</li> 