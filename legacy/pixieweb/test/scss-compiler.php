<?php header('Content-type: text/css');
echo "/* Compiled SCSS */" . "\n";
require_once('scss/SassParser.php');
//echo $_SERVER['SCRIPT_FILENAME'];
function __parse($src, $syntax, $style = 'nested') {
  $options = array(
    'style' => $style,
    'cache' => FALSE,
    'syntax' => $syntax,
    'debug' => FALSE,
    'callbacks' => array(
      'warn' => 'cb_warn',
      'debug' => 'cb_debug',
    ),
  );
  // Execute the compiler.
  $parser = new SassParser($options);
  return $parser->toCss($src, false);
}	
// Buffer the source content
ob_start();
include $_SERVER['SCRIPT_FILENAME'];   
$content = ob_get_clean();
echo __parse($content, 'scss');	
exit;
?>