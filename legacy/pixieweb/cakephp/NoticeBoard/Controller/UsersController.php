<?php
App::uses('NoticeBoardAppController', 'NoticeBoard.Controller');
/**
 * Users Controller
 *
 */
class UsersController extends NoticeBoardAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public $scaffold;
	

	public function login() {
		$this->layout = 'login';
	    if ($this->request->is('post')) {
	    	vomit($this);
	        if ($this->Auth->login()) {
	            $this->redirect($this->Auth->redirect());
	        } else {
	            $this->Session->setFlash(__('Invalid username or password, try again'));
	        }
	    }
	}

	
	public function logout() {
	    $this->redirect($this->Auth->logout());
	}
	
    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('add');
    }

    public function index() {
        $this->User->recursive = 0;
        $this->set('users', $this->paginate());
    }

    public function view($id = null) {
        $this->User->id = $id;
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user'));
        }
        $this->set('user', $this->User->read(null, $id));
    }

    public function add() {
    	$this->autoRender = false;
    	
        if ($this->request->is('post')) {
        	vomit($this->request->data);
        	
            $this->User->create();
            if ($this->User->saveAssociated($this->request->data, array('deep' => true))) {
                $this->Session->setFlash(__('The user has been saved'));
                //$this->redirect(array('action' => 'index'));
            } else {
                $this->Session->setFlash(__('The user could not be saved. Please, try again.'));
            }
        }
        
        $roles = $this->User->Role->find('list');
        $this->set(compact('roles')); 
        $this->render('Users/form');
        
    }

    public function edit($id = null) {
        $this->User->id = $id;
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user'));
        }
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->User->save($this->request->data)) {
                $this->Session->setFlash(__('The user has been saved'));
                $this->redirect(array('action' => 'index'));
            } else {
                $this->Session->setFlash(__('The user could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->User->read(null, $id);
            unset($this->request->data['User']['password']);
        }
    }

    public function delete($id = null) {
        if (!$this->request->is('post')) {
            throw new MethodNotAllowedException();
        }
        $this->User->id = $id;
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user'));
        }
        if ($this->User->delete()) {
            $this->Session->setFlash(__('User deleted'));
            $this->redirect(array('action' => 'index'));
        }
        $this->Session->setFlash(__('User was not deleted'));
        $this->redirect(array('action' => 'index'));
    }
	

}
