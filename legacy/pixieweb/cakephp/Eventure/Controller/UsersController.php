<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Users Controller
 *
 */
class UsersController extends EventureAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	
	public function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('add', 'edit', 'index'); // Letting users register themselves, for now
	}
	
	public function login() {
		$this->layout = 'default_login';
		if ($this->request->is('post')) {
	    	if ($this->Auth->login()) {
	        	$this->redirect($this->Auth->redirect());
	        } else {
		    	$this->Session->setFlash(__('Invalid username or password, try again', 'invalid_login'));
		    }
		}
	}
	
	public function logout() {
		$this->redirect($this->Auth->logout());
	}
	
	public function me(){
		$this->autoRender = false;
		$user = $this->User->read(null, AuthComponent::user('id'));		
		$this->set(compact('user'));
		$this->render('Users/view');
	}

	

	public function view($id = null){
		//vomit($this->User->find('all'));
		
		$user = $this->User->read(null, $id);
		
		$this->set(compact('user'));
	}
	
    public function add() {   
	    $this->autoRender = false;
 	    $this->___set();
	  	
        if ($this->request->is('post')) {
            $this->User->create();
            $user = $this->User->save($this->request->data); 
            if (!empty($user)) { 
                $this->Session->setFlash(	__('The user has been added'), 'flash_save_success');
                
                //$this->redirect(array('action' => 'index'));
            } else {
	        	$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
            }
        }
        
        $this->render('Users/form');       
    }  	

    public function edit($id = null) {
	    $this->autoRender = false;
	    $this->___set($id);
	    
        $this->User->id = $id;
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user ID'));
        }
        
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->User->save($this->request->data, array('deep' => true))) {
                $this->Session->setFlash(__('The user has been saved'));
                $this->redirect(array('action' => 'index'));
            } else {
                $this->Session->setFlash(__('The user could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->User->read(null, $id);
        }
        
        $this->render('Users/form');
        
    }
    
	public function index($id = null){
		// similar to findAll(), but fetches paged results
		$data = $this->paginate('User');
		$this->set(compact('data'));
	}

	public function ___set($user_id = null){
		$promoters = $this->User->Promoter->find('list');
		$roles = $this->User->Role->find('list');
		
    	$this->set(compact('promoters', 'roles'));
    	
	}

}
