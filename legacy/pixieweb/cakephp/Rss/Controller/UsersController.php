<?php
App::uses('RssAppController', 'Rss.Controller');
/**
 * Users Controller
 *
 */
class UsersController extends RssAppController {

	private function ___set(){
		$this->set('roles', $this->User->Role->find('list'));
	}
	
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

	public function index(){	
        parent::index();
	}
}
