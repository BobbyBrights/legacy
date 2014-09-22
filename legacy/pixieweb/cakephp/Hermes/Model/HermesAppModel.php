<?php

App::uses('AppModel', 'Model');

class HermesAppModel extends AppModel {
	public $useDbConfig = 'hermes';
	
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
	                    $b['className'] = PLUGIN_NAME . "." . $old;
	                endif;
	            endforeach;
	        endif;
	    endforeach;     
	}

	

}
