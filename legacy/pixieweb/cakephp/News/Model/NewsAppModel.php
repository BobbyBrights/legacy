<?php

App::uses('AppModel', 'Model');

class NewsAppModel extends AppModel {
	public $useDbConfig = 'news';
	
	public function __construct(){
	    parent::__construct(); 
	    $this->append_plugin_name_to_classes();     
	}
	
	public function append_plugin_name_to_classes(){
	    $associations = array('hasMany', 'belongsTo', 'hasOne', 'hasAndBelongsToMany');
	    foreach($associations as &$a):
	        if(!empty($this->{$a})):
	            foreach($this->{$a} as &$b):
	                if(isset($b['className'])):
	                    $old = $b['className']; 
	                    $b['className'] = "News." . $old;
	                endif;
	            endforeach;
	        endif;
	    endforeach;     
	}


}
