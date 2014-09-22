<?php
/*
Plugin Name: Homepage Image
Plugin URI: http://press.three.ie
Description: A simple image chooser.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.three.ie
*/


error_reporting(E_ALL);
add_action("widgets_init", array('Home_Image', 'register'));
register_activation_hook( __FILE__, array('Home_Image', 'activate'));
register_deactivation_hook( __FILE__, array('Home_Image', 'deactivate'));

class Home_Image {
	function activate(){
		$data = array( 'uri' => '<image-uri>', 'alt' => '<alt>', 'link' => '<link>', 'target' => '<target>');
		if ( ! get_option('Home_Image')){
			add_option('Home_Image' , $data);
		} else {
			update_option('Home_Image' , $data);
		}
	}

	function deactivate(){
		delete_option('Home_Image');
	}

	function control(){
		$data = get_option('Home_Image');
?>
  <p><label>Enter image src <input name="Home_Image_uri"
type="text" value="<?php echo $data['uri']; ?>" /></label></p>
<p><label>Enter link <input name="Home_Image_link"
type="text" value="<?php echo $data['link']; ?>" /></label></p>
<p><label>Enter link target <input name="Home_Image_target"
type="text" value="<?php echo $data['target']; ?>" /></label></p>
<p><label>Enter image alt tag <input name="Home_Image_alt"
type="text" value="<?php echo $data['alt']; ?>" /></label></p>
  <?php
		if (isset($_POST['Home_Image_uri'])){
			$data['uri'] = attribute_escape($_POST['Home_Image_uri']);
			$data['alt'] = attribute_escape($_POST['Home_Image_alt']);
			$data['link'] = attribute_escape($_POST['Home_Image_link']);
			$data['target'] = attribute_escape($_POST['Home_Image_target']);
			update_option('Home_Image', $data);
		}
	}

	function widget($args){
		$data = get_option('Home_Image');
		echo "<div id='marque_image'>"; 
		
		if($data['link'] != ''): 
			echo "<a href='".$data['link']."' target='".$data['target']."'>";
		endif;
		
		echo "<img src='" . $data['uri'] . "' alt='".$data['alt']."' width='715'/>";
		if($data['link'] != ''):
			echo "</a>"; 
		endif;
		
		echo "<div class='marque_text'>".$data['alt']."</div></div>";
	}

	function register(){
		register_sidebar_widget('Home Image Chooser', array('Home_Image', 'widget'));
		register_widget_control('Home Image Chooser', array('Home_Image', 'control'));
	}
}

?>
