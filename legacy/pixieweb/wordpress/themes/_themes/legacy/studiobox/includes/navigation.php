<div class="navigationbox negmargin">
<?php if(function_exists('wp_pagenavi')) { // if PageNavi is activated ?>
 
<?php wp_pagenavi(); // Use PageNavi ?>
 
<?php } else { // Otherwise, use traditional Navigation ?>
 
<div class="navigation">
<?php next_posts_link('&laquo; Older Entries') ?> <!-- next_post_link -->
</div>
 
<div class="navigation">
<?php previous_posts_link('Newer Entries &raquo;') ?><!-- previous_post_link -->
</div>
 
<?php } // End if-else statement ?>
</div>
<div class="clear"></div>