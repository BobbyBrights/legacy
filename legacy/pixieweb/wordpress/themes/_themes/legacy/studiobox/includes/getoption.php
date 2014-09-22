<?php // Get the user choices for the theme.
error_reporting(E_ALL ^ E_NOTICE);
global $options;
foreach ($options as $value) {
	if (get_option( $value['id'] ) === FALSE) { $$value['id'] = $value['std']; } else { $$value['id'] = get_option( $value['id'] ); }
}
?>