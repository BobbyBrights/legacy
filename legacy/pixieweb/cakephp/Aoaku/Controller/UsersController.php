<?php
App::uses('AoakuAppController', 'Aoaku.Controller');
/**
 * Users Controller
 *
 */
class UsersController extends AoakuAppController {

   public $components = array('RequestHandler');
   
   public $uses = array('Aoaku.Area', 'Aoaku.Subject', 'Aoaku.User', 'Aoaku.Token');
   public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->deny('index');
        $this->Auth->allow('add', 'check', 'single_sign_on');
    }

    public function index() {
        $this->User->recursive = 0;
        $this->set('users', $this->paginate());
    }

    public function me(){
        $this->User->id = AuthComponent::user('id');
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user'));
        }
        $u = $this->User->read(null, AuthComponent::user('id'));
        
        $this->set('user', $u);
        $this->set('editable', true);
        $this->set('rating', $this->get_rating($u));
        $this->set('areas', $this->Area->find('all'));
        $this->set('subjects', $this->Subject->find('all'));

        $this->render('/Users/view');  
    }

    public function upgrade(){
	    
    }
    
    public function meetup(){
	    
    }
    
    public function view($id = null) {
        $this->User->id = $id;
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user'));
        }
        $u = $this->User->read(null, $id);
        $this->set('user', $u);
        $this->set('rating', $this->get_rating($u));
        $this->set('areas', $this->Area->find('all'));
        $this->set('subjects', $this->Subject->find('all'));
        
        
    }

    private function get_rating($u){
    	$total = 0;
        $num = sizeof($u['Subject']);
        foreach($u['Subject'] as $s):
		 	$total += $s['UsersSubject']['rating'];
        endforeach;
	    
	    return $total > 0 && $num > 0 ? ceil($total / $num) : 0;
    }

    public function check() {
    	if(!empty($this->request->data)) {
			// Some users are added via Ajax eg. Facebook connect users.
			if($this->request->is('ajax')){
				$this->autoRender = false;
				$user = $this->User->findByEmail($this->request->data['d']);
				return json_encode(array("_request" => $this->request->data['d'], "_response" => $user));   
			}
		}
    }
    
    public function single_sign_on() {
    	if(!empty($this->request->data)) {
			// Some users are added via Ajax eg. Facebook connect users.
			if($this->request->is('ajax')){
				$this->autoRender = false;
				//$user = $this->User->findByEmail($this->request->data['d']);
				$user = $this->User->findByEmail($this->request->data['User']['email']);
				// Need to do something different here for Twitter .. 
				
				$this->Auth->login($user['User']);
				$this->set('current_user', $user);
				$this->set('logged_in', TRUE);
				$this->Session->setFlash(__('Welcome back ' . $user['User']['firstname']));
				return json_encode(array("response" => $user));   
			}
		}
    } 
           
    public function add() {
    	if(!empty($this->request->data)) {
    		if($this->request->is('ajax')){
				// Need to remove some validation if this is an ajax request.
				unset($this->User->validate['username']);      
				unset($this->User->validate['password']); 
            }
                
            $this->User->create();
            if ($this->User->save($this->request->data)) {
                $id = $this->User->id;
            	// Auto-login
            	$this->request->data['User'] = array_merge($this->request->data['User'], array('id' => $id));
            	$this->Auth->login($this->request->data['User']);
                // Some users are added via Ajax eg. Facebook connect users.
                if($this->request->is('ajax')){
                    $this->autoRender = false;
                    $user = $this->request->data['User'];
                    $token = $this->request->data['Token'];
                    
                    $t['user_id'] = $user['id'];                    
                    $t['service'] = $token['service'];
                    $t['token'] = $token['token'];
                     // Attempt to save the token for future use
                    return json_encode(array("response" => $this->Token->save($t)));   
                    
                } else {
                	$this->Session->setFlash(__('The user has been saved'));
	                $this->redirect('/aoaku/users/me');
                }
                //$this->redirect(array('action' => 'index'));
            } else {
            	if($this->request->is('ajax')){
                    $this->autoRender = false;
                    return json_encode(array('error' => 'The user could not be saved. Please, try again.'));
                } else {
                	$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
                }
            }
        }
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
    
   public function login() {
    if ($this->request->is('post')) {
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


}
