<?php
App::uses('HermesAppController', 'Hermes.Controller');
/**
 * Notes Controller
 *
 */
class NotesController extends HermesAppController {


	public function add(){
		parent::add();
		$this->redirect(array('action' => 'view', 'plugin' => 'hermes', 'controller' => 'tickets', $this->request->data['Note']['ticket_id']));
	}

}
