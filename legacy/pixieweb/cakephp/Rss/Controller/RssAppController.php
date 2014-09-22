<?php
App::uses('AppController', 'Controller');

class RssAppController extends AppController {

	public $components = array('RequestHandler', 'Security');
	public $helpers = array('Text', 'Html', 'Rss.RssHtml');

	public function beforeFilter(){
		parent::beforeFilter();
		/*
		$this->Auth->authenticate = array(
			'Idbroker.Ldap' => array(
				'userModel' => 'Idbroker.LdapAuth'
			)
		);
        //If you want to do your authorization from the isAuthorized Controller use the following
        $this->Auth->authorize = array('Controller');
        */
        $this->Security->requirePost(array('delete'));
        $this->Security->validatePost = false;
        $this->Security->blackHoleCallback = 'blackhole';
	}


	public function blackhole($type) {
	    // handle errors.
	    vomit($type);
	}
	
	/*
        * This just says aslong as this is a valid user let them in, you can also modify this to restrict to a group  */

	public function isAuthorized(){
		$user = $this->Auth->user();
		if($user) return true;
		return false;
	}
	
// Crud 

	public $paginate = array(
		'limit' => 20,
		'recursive' => 0
	);

	public function index() {
		$m = $this->modelClass;
		$pagination_keys = array('sort', 'direction', 'limit', 'page', 'order', 'Filter.title');
		
		$a = $this->passedArgs;
		        
		foreach($pagination_keys as $k):
			unset($a[$k]);
		endforeach;		
		
		$opts = array(
        	'conditions' => $a, 
        	'order' => array(
            	"$m.created" => 'desc'
            )
        );
		$this->paginate = $opts;
        
		$data = $this->paginate($m);
		// Allowed from requestAction
		if (isset($this->params['requested']) && $this->params['requested'] == 1){
			return $data;
		}
		
		if(isset($this->passedArgs['Filter.title'])):
			$this->set('subtitle', $this->passedArgs['Filter.title'] );
		endif;
		    
		$this->set(Inflector::tableize($m), $data);
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
		$this->autoRender = false;
		
		$m = $this->modelClass;
		$v = strtolower($m);
		
		$this->___m($m);
		
		if ($this->request->is('post')) {
			$this->$m->create();
			if ($this->$m->save($this->request->data)) {
				$this->Session->setFlash(__("The $v has been saved"), 'flash_save_success');
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__("The $v could not be saved. There may be validation errors (see below)."), 'flash_save_error');
			}
		}
		
		$this->render(Inflector::pluralize($m) . '/form');
	}

	/**
	 * admin_edit method
	 *
	 * @throws NotFoundException
	 * @param string $id
	 * @return void
	 */
	public function edit($id = null) {
	
		$this->autoRender = false;
		
		$m = $this->modelClass;
		$v = strtolower($m);
		
		$this->___m($m);
		
		
		$this->$m->id = $id;
		if (!$this->$m->exists()) {
			throw new NotFoundException(__("Invalid $v"));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->$m->save($this->request->data)) {
				$this->Session->setFlash(__("The $v has been saved"), 'flash_save_success');
				$this->redirect(array('action' => 'view', $id));
			} else {
				
				$this->Session->setFlash(__("The $v could not be saved. There may be validation errors (see below)."), 'flash_save_error');
			}
		} else {
			$this->request->data = $this->$m->read(null, $id);
		}
		
		$this->render(Inflector::pluralize($m) . '/form');
	}

	/**
	 * admin_delete method
	 *
	 * @throws MethodNotAllowedException
	 * @throws NotFoundException
	 * @param string $id
	 * @return void
	 */
	public function delete($id = null) {
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
			$this->Session->setFlash(__("$m deleted"), 'flash_deleted');
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__("$m was not deleted"));
		$this->redirect(array('action' => 'index'));
	}
	
	public function ___m($m){
		$fields = array_keys($this->{$m}->getColumnTypes());
		switch($m):
			case "Feed":
				$fields[] = 'user_id';				
				break;
			case "Item":
				$fields[] = 'category_id';				
				break;
			case "User":
				$fields[] = 'role_id';				
				break;
		endswitch;

		$this->set(compact('fields'));
	}
}