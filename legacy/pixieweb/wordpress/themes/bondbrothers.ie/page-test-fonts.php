<?php 
$fonts = array('Euphoria Script', 'Jim Nightshade', 'Yesteryear', 'Alex Brush', 'Great Vibes', 'Monsieur La Doulaise', 'Dancing Script', 'Kaushan Script'); 
 
function slugify($text)
{ 
  // replace non letter or digits by -
  $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

  // trim
  $text = trim($text, '-');

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // lowercase
  $text = strtolower($text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  if (empty($text))
  {
    return 'n-a';
  }

  return $text;
}
?>
<link href='http://fonts.googleapis.com/css?family=<?php echo str_replace(" ", "+", implode("|", $fonts)); ?>' rel='stylesheet' type='text/css'>

<style type="text/css">
	#contain {
		width: 60%;
	}
	
	.row {
		display: block; width: 100%; padding: 20px; background-color: #000; position: relative; color: #FFF; margin-bottom: 12px; 
	}
	
	.row span {
		position: absolute; bottom: 0px; right: 0; text-align: right; display: block; padding: 4px; font-style: italic;
	}

<?php foreach($fonts as $f): ?>
	.<?php echo slugify($f); ?> h1 {
		font-family: '<?php echo $f; ?>', cursive; font-size: 2.4em;
	}
<?php endforeach; ?>
	
</style>

<a href="http://www.google.com/fonts/">Google Webfonts</a>
<div id="contain">
<?php foreach($fonts as $f): ?>
	<div class="row <?php echo slugify($f); ?>">
		<h1>Bondbrothers.ie - Formal Wear For Men and..</h1>
		<span><?php echo $f; ?></span>
	</div>
<?php endforeach; ?>


</div>