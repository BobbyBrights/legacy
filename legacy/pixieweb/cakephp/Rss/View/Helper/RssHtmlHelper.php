<?php
class RssHtmlHelper extends AppHelper {
	
	public function category_breadcrumb($id, $categories, $default = 'No category selected'){	
		$a = array();	
		if($id > 0):
			foreach($categories as $c):
				if($c['Category']['id'] == $id){
					$a = $this->traverse($categories, $c, $a);
				}	
			endforeach;			
			return implode(" &raquo; ", array_reverse( $a ));	
		endif;
	}
	
	
	protected function traverse($categories, $selected, &$tmp){
		$tmp[] = $selected['Category']['name'];		
		if(!$selected['ParentCategory']['id'] == null):	
			foreach($categories as $cats):
				if($cats['Category']['id'] == $selected['ParentCategory']['id']):
					$tmp = $this->traverse($categories, $cats, $tmp);
				endif;
			endforeach;				
		endif;
		return $tmp;
	}
	
	public function get_cats_as_array($categories, $add_empty = false){
		$c = array();
		if($add_empty){
			$c[0] = 'No category selected';
		}
		foreach($categories as $a){
			$c[$a['Category']['id']] = $this->category_breadcrumb($a['Category']['id'], $categories);
			//$c[$a] = $this->category_breadcrumb($id, $categories);
		}
		
		return $c;
	}

}