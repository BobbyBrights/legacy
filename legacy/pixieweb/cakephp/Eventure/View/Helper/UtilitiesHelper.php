<?php
class UtilitiesHelper extends AppHelper {
	public $helpers = array('Html');

	public function navigation($nav_array = null, $is_sub_menu = false, $a = array()){
		//echo "<pre>" . json_encode($nav_array) . "</pre>";
		$nav_class = $is_sub_menu ? "dropdown-menu" : "nav";
		echo "<ul class='" . $nav_class . "'>";
		foreach($nav_array as $k => $v):
			$has_sub_menu = isset($v['submenu']);
		echo "<li";
		echo $has_sub_menu ? " class='dropdown'" : "" ;
		echo ">";
		if($has_sub_menu):
			echo $this->Html->link($k . '<b class="caret"></b>', '#', array('escape' => false, 'class' => 'dropdown-toggle', 'data-toggle' => 'dropdown'));
		echo $this->navigation($v['submenu'], true);
		else:
			$opts = array('controller' => $v['controller'], 'action' => $v['action'], 'plugin' => 'eventure');
		if(isset($v['page'])):
			$opts[] = $v['page'];
		endif;
		echo $this->Html->link($k, $opts);
		endif;
		echo "</li>";
		endforeach;
		echo "</ul>";
	}
	
	public function get_accreditation($id, $accs){
		foreach($accs as $k):
			if($k['Accreditation']['id'] == $id):
				return $k['Event']['name'] . " - " . $k['AccreditationType']['name'];
			endif;
		endforeach;
		
		return "(unknown)";
	}
}
