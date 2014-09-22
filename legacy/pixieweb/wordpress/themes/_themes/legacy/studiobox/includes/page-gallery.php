<?php
$images = get_children(
	array(
	'post_parent' => $post->ID,
	'post_status' => 'inherit',
	'post_type' => 'attachment',
	'post_mime_type' => 'image',
	'order' => 'ASC',
	'orderby' => 'menu_order'
	)
);

if ($sidebarshift) {
?>
<STYLE TYPE="text/css"> 
	.caption{font-size:12px;line-height:28px;color:#111;}
	.caption a { color:#3a3a3a; text-decoration:none; }
	.demo{margin-top:16px;}
	.gallery {width:942px;margin:0 auto; padding-left:2px;}
	.gallery li{width:84px;height:59px;border:3px double #111;margin: 0 2px;background:#000;margin-top:10px;}
	.gallery li div{left:240px;}
	.gallery li div .caption{}

	#main_image{margin:auto 0; text-align:center; display:block; }
	#main_image img{margin:auto 0; text-align:center;}
</STYLE>
<?php } 

if ( $images ) 
{
?>
	<!-- Use Built in Wordpress Gallery attatchements for Page Gallery -->
	<div id="gallerycontents" <?php if ($sidebarshift) {} else { echo 'class="twocolumn"'; } ?>>
		<div class="slideshowgallery">
			<div id="main_image"></div>
			<ul class="gallery_unstyled">
			<?php
			foreach ( $images as $id => $image ) {

			$attatchmentID = $image->ID; 
			$imagearray = wp_get_attachment_image_src( $attatchmentID , 'full', false);
			$imageURI = $imagearray[0];
			$imageID = get_post($attatchmentID);
			$imageTitle = $imageID->post_title;	

					$count++; 
					if ($count==1) { 
					?>
						<li class="active">
						<?php } else { ?>
						<li>
					<?php } ?>
					
							<img src="<?php echo $imageURI; ?>" title="<?php echo $imageTitle ?>" alt="<?php echo $imageTitle ?>" longdesc="<?php echo $imageTitle ?>" />

						</li>
					<?php
			}
			?>

			</ul>
		</div>
		<div class="clear"></div>
	</div>
<?php
}
?>