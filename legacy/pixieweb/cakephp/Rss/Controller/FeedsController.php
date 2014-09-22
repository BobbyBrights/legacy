<?php
App::uses('RssAppController', 'Rss.Controller');
/**
 * Feeds Controller
 *
 */
class FeedsController extends RssAppController {

	private function ___set($id = null){
		$users = array();
		$u = $this->Feed->User->find('all');

		foreach($u as $a):
			$users[$a['User']['id']] = $a['User']['fullname'] . " (" . $a['User']['name'] . ")";
		endforeach;

		if($id != null):
			$this->set('items', $this->Feed->Item->findAllByFeedId($id));
		endif;
		$this->set(compact('users'));
	}

	public function view($id = null) { 
		$this->___set($id);   	
		parent::view($id);
	}	
	
	public function edit($id = null) { 
		$this->___set($id);   
		$this->set('editing', true);		
		parent::edit($id);
	}	

	public function add() {
		$this->___set();   
		$this->set('editing', false);
		parent::add();
	}	
	
	public function index(){	

		if( $this->RequestHandler->isRss() ){
		
			$feed_id = intval($this->passedArgs[0]); 
			if($feed_id > 0):
				$o['limit'] = 20;
				$o['order'] ='Item.created DESC';
				$o['conditions'] = array("Feed.id" => $feed_id);
		        $items = $this->Feed->Item->find('all', $o);
				$this->set(compact('items'));
			else:					
				throw new NotFoundException(__("Invalid Feed ID"));
			endif;
        }
        parent::index();
	}
}
