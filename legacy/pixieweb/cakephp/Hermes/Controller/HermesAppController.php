<?php

App::uses('AppController', 'Controller');

class HermesAppController extends AppController {
// This Controller cruds all models.
 
/**
 * admin_index method
 *
 * @return void
 */
 	public $paginate = array(
 		'limit' => 20,
 		'recursive' => 0
 	);
 	
	public function index() {
		$m = $this->modelClass;
		$this->set(Inflector::tableize($m), $this->paginate());
	}
 
/**
 * admin_view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$m = $this->modelClass;
		$v = strtolower($m);
		
		$this->$m->id = $id;
		if (!$this->$m->exists()) {
			throw new NotFoundException(__("Invalid $v"));
		}
		$this->set($v, $this->$m->read(null, $id));
	}
 
/**
 * admin_add method
 *
 * @return void
 */
	public function add() {
		$m = $this->modelClass;
		$v = strtolower($m);
 
		if ($this->request->is('post')) {
			$this->$m->create();
			if ($this->$m->save($this->request->data)) {	
				
				$this->Session->setFlash(__("The $v has been saved"));
				switch($v):
					case 'ticket':
						$this->redirect(array('action' => 'index'));
						break;
					default:
						break;
				endswitch;
			} else {
				$this->Session->setFlash(__("The $v could not be saved. Please, try again."));
			}
		}
	}
 
/**
 * admin_edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$m = $this->modelClass;
		$v = strtolower($m);
 
		$this->$m->id = $id;
		if (!$this->$m->exists()) {
			throw new NotFoundException(__("Invalid $v"));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->$m->save($this->request->data)) {
				$this->Session->setFlash(__("The $v has been saved"));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__("The $v could not be saved. Please, try again."));
			}
		} else {
			$this->request->data = $this->$m->read(null, $id);
		}
	}
 
/**
 * admin_delete method
 *
 * @throws MethodNotAllowedException
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function admin_delete($id = null) {
		$m = $this->modelClass;
		$v = strtolower($m);
 
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$this->$m->id = $id;
		if (!$this->$m->exists()) {
			throw new NotFoundException(__("Invalid $v"));
		}
		if ($this->$m->delete()) {
			$this->Session->setFlash(__("$m deleted"));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__("$m was not deleted"));
		$this->redirect(array('action' => 'index'));
	}
 
 
}
