<?php
App::uses('RssAppController', 'Rss.Controller');
/**
 * Roles Controller
 *
 */
class RolesController extends RssAppController {

	public function edit($id = null) {    
		$this->set('editing', true);
		parent::edit($id);
	}	

	public function add() {
		$this->set('editing', false);
		parent::add();
	}	

	public function view($id = null) {
		$m = ClassRegistry::init('Rss.UsersRole');
		$this->set('users_with_role', $m->findAllByRoleId($id) );
		
		parent::view($id);
	}
}
