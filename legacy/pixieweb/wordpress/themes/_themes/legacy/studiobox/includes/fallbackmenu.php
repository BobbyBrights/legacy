<ul>
<li><a href="<?php echo get_option('home'); ?>">Home</a></li>
<?php
$fallbackpages = wp_list_pages('echo=0&title_li=&sort_column=menu_order');  
$fallbackpages = preg_replace('/title=\"(.*?)\"/','',$fallbackpages);  // Get rid of href Titles in the menu. A Distraction
echo $fallbackpages;
?>
</ul>