<?php header('Content-type: text/cache-manifest'); ?>
<?php header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() - 3600)); ?>
<?php require_once('functions.php'); ?>
CACHE MANIFEST
# 2013-04-08:v29

CACHE:
<?php /* Images folder 
	   ************************************************************/	?>
<?php show_all_files('img', array('jpg', 'png')); ?>
<?php /* CSS folder 
	   ************************************************************/	?>
<?php show_all_files('css', array('css', 'png', 'gif')); ?>
<?php /* JS folder 
	   ************************************************************/	?>
<?php show_all_files('js', array('js', 'css', 'gif', 'png')); ?>
<?php /* Other 
	   ************************************************************/	?>
http://code.jquery.com/jquery-1.8.2.min.js
http://www.google.com/jsapi?key=AIzaSyB-4MTeNvQ_jUjQbsebJjjDxce8R6RPHoc
http://fonts.googleapis.com/css?family=Open+Sans:400,600

FALLBACK: 

NETWORK:
*