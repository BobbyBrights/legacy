<?php
App::uses('NewsAppController', 'News.Controller');
/**
 * Items Controller
 *
 */
class ItemsController extends NewsAppController {


	public function add(){
		$this->set('item_types', $this->Item->ItemType->find('list'));		
		parent::add();
	}

	public function edit($id = null){
		$this->set('item_types', $this->Item->ItemType->find('list'));		
		parent::edit($id);
	}
		
	public function view($slug = '', $id = null){
		// $slug is throwaway, it's just used for SEO.
		$m = ClassRegistry::init('News.AttachmentsItem'); 		
		$attachments = $m->findAllByItemId($id); 
		foreach($attachments as &$a):
			$meta = ClassRegistry::init('News.Metadatum');
			$a['Metadata'] = $meta->findAllByAttachmentId($a['Attachment']['id']);
		endforeach;
		$this->set(compact('attachments'));
		
		parent::view($id);
	}
	
	public function json($id = null){
		$this->layout = false;
		$fields = array('Item.id', 'Item.title');
		$conditions = array();
		
		if(!empty($this->passedArgs['filter'])){
			$f = $this->passedArgs['filter'];
			$conditions['Item.title LIKE'] = "%$f%"; 
		}

		if(!empty($this->passedArgs['item_type'])){
			$f = $this->passedArgs['item_type'];
			$conditions['ItemType.id'] = $f; 
		}

		
		$m = $this->Item->find('all', array('fields' => $fields, 'conditions' => $conditions, 'order' => 'Item.modified DESC'));
		
		if($id != null){
			$m = $this->Item->findById($id);
		}
		
		if(!empty($this->passedArgs['autocomplete']) && $this->passedArgs['autocomplete'] == true){
			$t = array();
			foreach($m as $k):
				$t[] = array('id' => $k['Item']['id'], 'value' => $k['Item']['title'], 'label' => $k['Item']['title']);
			endforeach;
			$m = $t;
		}
		
		$this->set(compact('m'));
		$this->render('Items/json');		
	}
}
