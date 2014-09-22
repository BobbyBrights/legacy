<?php
App::uses('NoticeBoardAppController', 'NoticeBoard.Controller');
/**
 * Categories Controller
 *
 */
class CategoriesController extends NoticeBoardAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public $scaffold;
	
	public function view($id = null){
		$this->set('category', $this->Category->findById($id));
	}


	public function add() {
		//vomit($_SERVER['PHP_AUTH_USER']);
		
		$this->autoRender = false;
		//$this->set_prerequisites();

		if ($this->request->is('post')) {
			$this->Category->create();
			if ($this->Category->save($this->request->data)) {
				$this->Session->setFlash(__('The category has been added'), 'flash_save_success');
				$this->redirect(array('action' => 'index', 'controller' => 'categories'));
			} else {
				$this->Session->setFlash(__('Something went wrong, check the form errors below'), 'flash_save_fail');
			}
		}

		$this->render('Categories/form');
	}
}
