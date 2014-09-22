<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Promoters Controller
 *
 */
class PromotersController extends EventureAppController {

	public function view($id = null){
		$promoter = $this->Promoter->findById($id);
		$this->set(compact('promoter'));
	}
	
    public function add() {   
	    $this->autoRender = false;
 	  	
        if ($this->request->is('post')) {
            $this->Promoter->create();
            if ($this->Promoter->save($this->request->data)) {
                $this->Session->setFlash(	__('The promoter has been added'), 'flash_save_success');
                $this->redirect(array('action' => 'index'));
            } else {
	        	$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
            }
        }
        
        $this->render('Promoters/form');       
    }  	

    public function edit($id = null) {
	    $this->autoRender = false;

        $this->Promoter->id = $id;
        if (!$this->Promoter->exists()) {
            throw new NotFoundException(__('Invalid promoter'));
        }
        
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->Promoter->save($this->request->data)) {
                $this->Session->setFlash(__('The promoter has been saved'), 'flash_save_success');
                $this->redirect(array('action' => 'index'));
            } else {
                $this->Session->setFlash(__('The promoter could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->Promoter->read(null, $id);
        }
        
        $this->render('Promoters/form');
        
    }
    
	public function index($id = null){
		// similar to findAll(), but fetches paged results
		$data = $this->paginate('Promoter');
		$this->set('data', $data);
	}

}
