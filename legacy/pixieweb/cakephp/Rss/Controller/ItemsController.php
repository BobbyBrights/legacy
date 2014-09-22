<?php
App::uses('RssAppController', 'Rss.Controller');
/**
 * Items Controller
 *
 */
class ItemsController extends RssAppController {

	
	public function edit($id = null) {
		$this->___set();		
		$this->set('editing', true);	
		parent::edit($id);
	}	

	public function add() {
		$this->___set();	
		$this->set('editing', false);
		parent::add();
	}	
	
	public function ___set(){
		$this->set('categories', ClassRegistry::init('Rss.Category')->find('all'));
		$this->set('feeds', ClassRegistry::init('Rss.Feed')->find('list'));
		$this->set('users', ClassRegistry::init('Rss.User')->find('list'));
	}

	
}
