<?php
App::uses('NewsAppController', 'News.Controller');
/**
 * Admins Controller
 *
 */
class AdminController extends NewsAppController {

	public $useTable = false;
	
	public function setup(){
		
		$m = ClassRegistry::init('News.Metadatum');
		
		if ($this->request->is('post')):
			if(!empty($this->request->data['latest_news_items'])):
				//vomit($this->request->data['latest_news_items']);
				
				$m->deleteAll(array('Metadatum.key' => 'latest_news'), false);	
				
				$s = array(
					'Metadatum' => array(
						'key' => 'latest_news',
						'value' => $this->request->data['latest_news_items']
					)
				);				
				
				if($m->save($s)):
					$this->Session->setFlash('Latest news items saved!' );
				else:
					debug($m->validationErrors);
				endif;
				
			endif;
		endif;
		
		$m = $m->findByKey('latest_news');
		$s = $m['Metadatum']['value'];
		
		$a = explode(",", $s);
		//debug($s);		
		$this->set('init', $m);	
			
		if($m){
			$order = "FIND_IN_SET(Item.id, '".$s."')";
			$conditions['Item.id'] = $a;	
			$m = ClassRegistry::init('News.Item')->find('all', array('conditions' => $conditions, 'order' => $order));
			$this->set(compact('m'));
		}
		
	}

}
