<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Venues Controller
 *
 */
class VenuesController extends EventureAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public $scaffold;

	public $paginate = array(
        'limit' => 15
    );
    
	public function index($id = null){
		// similar to findAll(), but fetches paged results
		$data = $this->paginate('Venue');
		$this->set('data', $data);
	}

	public function view($id = null){
		if($id != null):	   	    
	   	    $venue = $this->Venue->findById($id);
			$this->set(compact('venue', 'id'));
		endif;
	}

    public function add() {    	
	    $this->autoRender = false;

        if ($this->request->is('post')) {
            $this->Venue->create();
            if ($this->Venue->save($this->request->data)) {
                $this->Session->setFlash(	__('The venue has been added'), 'flash_save_success');
                $this->redirect(array('action' => 'index'));
            } else {
	        	$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
            }
        }       
                
        $this->render('Venues/form');      
            
    }    

    public function edit($id = null) {
	    $this->autoRender = false;

        $this->Venue->id = $id;
        if (!$this->Venue->exists()) {
            throw new NotFoundException(__('Invalid venue'));
        }
        
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->Venue->save($this->request->data)) {
                $this->Session->setFlash(__('The venue has been saved'));
                $this->redirect(array('action' => 'index'));
            } else {
                $this->Session->setFlash(__('The venue could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->Venue->read(null, $id);
        }        
        $this->render('Venues/form');
       
    }
    	
}
