<?php
/*
Plugin Name:  Three Business ETC Content Widget
Plugin URI: http://www.3broadband.ie
Description: This widget will select 2 items from the latest Business ETC content in the database.
Version: 1.0
Author: Stephen McElhinney
Author URI: http://www.three.ie
*/


error_reporting(E_ALL);
add_action( 'widgets_init', create_function( '', 'return register_widget("Business_ETC");' ) );


class Business_ETC extends WP_Widget {
	/** constructor */

	function __construct() {
		$widget_ops = array('classname' => 'Business_ETC', 'description' => __( 'This widget will select 2 items from the latest Business ETC content in the database.') );
		parent::__construct('business_etc', __('Business ETC Widget'), $widget_ops);
	}

	/** @see WP_Widget::widget */
	function widget( $args, $instance ) {
		extract( $args );
		$data = json_decode(get_option('business_feed_data'));
		//print_r($data);
		
?>
<div class="widget widgetfull business_feed_widget" id="Three_Mobile_Business_Feed_Widget">
  <h3><span>Business.</span></h3>
  <div class="sportwidget">
  	<?php 
  			for($i = 0; $i <= 2; $i++) : 
  				$article = $data->articles[$i];
  				//print_r($article);
  	
  				?>
  	<a class="scorelink" target="_blank" href="<?php echo $article->url; ?>"><?php echo $article->title; ?></a>
    <div class="story">
    		<a target="_blank" href="<?php echo $article->url; ?>"><img src="<?php echo $article->thumbnail; ?>" width="80" height="50" align="left" class="scoreimg"></a>
    		<?php echo $article->excerpt; ?>
    		<a class="readon" target="_blank" href="<?php echo $article->url; ?>">Read more </a>
    </div>    
  	<?php 
  			$i++;
  			endfor; ?>
  </div>
  <a href="/business/" class="morebutton mscore">More business</a>
  <div class="poweredbusiness" onclick="window.open('http://businessetc.thejournal.ie/?utm_source=three_businessetc&utm_campaign=feedlink&utm_medium=feed','_blank');" title="Visit Business ETC" style="cursor:pointer;">Powered by </div>
  <div class="clear"></div>
</div>
<?php
	}

	/** @see WP_Widget::update */
	function update( $new_instance, $old_instance ) {
	
	}

	/** @see WP_Widget::form */
	function form( $instance ) {

	}

}

?>