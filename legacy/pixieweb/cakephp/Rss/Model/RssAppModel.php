<?php

App::uses('AppModel', 'Model');

class RssAppModel extends AppModel {
	public $useDbConfig = 'rss';

	
	public function __construct(){
	    parent::__construct(); 
		$this->fix_unaries();
		$this->append_plugin_name_to_classes();	   
		$this->set_validation_messages(); 
	}

	
	public function set_validation_messages(){
		
		switch($this->alias):
			case "Feed":
				$this->validate['name']['notempty']['message'] = "Feed name cannot be blank";
				break;
		
		endswitch; 	
		
	}
	
	public function append_plugin_name_to_classes(){
		$associations = array('hasMany', 'belongsTo', 'hasOne', 'hasAndBelongsToMany');
		foreach($associations as &$a):
			//vomit($this->{$a});
			if(!empty($this->{$a})):
				foreach($this->{$a} as &$b):
					if(isset($b['className'])):
						$old = $b['className']; 
						
						$b['className'] = PLUGIN_NAME . "." . $old;
					endif;
				endforeach;
			endif;
			//vomit($this->{$a});
		endforeach;		
	}

	public function fix_unaries(){		
		$unary['ParentCategory'] = 'Category';		
		$associations = array('hasMany', 'belongsTo', 'hasOne', 'hasAndBelongsToMany');
		
		foreach($associations as &$a):
			if(!empty($this->{$a})):
				foreach($this->{$a} as $k => &$v):
					if(isset($unary[$k])):
						$v['className'] = $unary[$k];
					endif; 
				endforeach;
			endif;
		endforeach;			
	}
	
	
	public function beforeSave($options = null){
	
		// Use this to do per-model changes, keep the models themselves dry so that they can be re-baked at any time. 
		parent::beforeSave($options);
		switch($this->alias):
			case "Item":
				$this->save_item_categories($this->data);
				break;
			case "User":
				$this->save_users_roles($this->data);
				break;
		endswitch;	
				
		return true;
	}
	
	public function afterSave($options = null){
		parent::afterSave($options);
		switch($this->alias):
			case "Feed":
				$this->save_feeds_authors($this->data);
				break;
		endswitch;	
		return true;
	}
	
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	public function save_users_roles($data){		
		// First, delete all FeedsCategories associations for this feed_id
		//vomit($data);
		
		$fc = ClassRegistry::init('Rss.UsersRole');
		$fc->deleteAll(array('User.id' => $data['User']['id']), false);

		$s = array();
		
		if(!empty($data['User']['role_id'])):
			foreach($data['User']['role_id'] as $i):
				$s[] = array('UsersRole' => array('user_id' => $data['User']['id'], 'role_id' => $i)); 
			endforeach;
		endif;
		
		//vomit($s);
		
		$fc->saveMany($s);		
	}


	public function save_feeds_authors($data){		
		// First, delete all FeedsCategories associations for this feed_id
		$fc = ClassRegistry::init('Rss.FeedsUser');
		$fc->deleteAll(array('Feed.id' => $data['Feed']['id']), false);

		$s = array();
		
		if(!empty($data['Feed']['user_id'])):
			foreach($data['Feed']['user_id'] as $i):
				$s[] = array('FeedsUser' => array('feed_id' => $data['Feed']['id'], 'user_id' => $i)); 
			endforeach;
		endif;
		
		$fc->saveMany($s);	
		//return false;	
	}	
	
	public function save_item_categories($data){		
		// First, delete all FeedsCategories associations for this feed_id
		$fc = ClassRegistry::init('Rss.ItemsCategory');
		$fc->deleteAll(array('Item.id' => $data['Item']['id']), false);

		$s = array();
		if(!empty($data['Item']['category_id'])):
			foreach($data['Item']['category_id'] as $i):
				$s[] = array('ItemsCategory' => array('item_id' => $data['Item']['id'], 'category_id' => $i)); 
			endforeach;
		endif;
		
		$fc->saveMany($s);		
	}	
}
