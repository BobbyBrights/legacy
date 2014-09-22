<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Checkins Controller
 *
 */
class CheckinsController extends EventureAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	//public $scaffold;
    public function index(){
    	$accreditation_types = ClassRegistry::Init('Eventure.AccreditationType')->find('all');
   	 	$events = ClassRegistry::Init('Eventure.Event')->find('all');
   	 	
    	
    	$data = $this->paginate();
    	foreach($data as $k => $v):
    		$data[$k]['Attendee'] = get_as_obj(ClassRegistry::init('Eventure.Attendee')->findById($v['Checkin']['attendee_id']), 'Attendee');
    		$acc = get_as_obj(ClassRegistry::init('Eventure.Accreditation')->findById($v['Checkin']['accreditation_id']), 'Accreditation');
    		
    		$data[$k]['Accreditation'] = $acc;	
    	endforeach;
    	
    	//
   		$this->set(compact('data', 'events', 'accreditation_types', 'attendees'));    
    }
    
	
    public function add() {
    	$m = ClassRegistry::init('Eventure.Attendee');
    	$a = $m->find('all');
    	$attendees = array();
    	foreach($a as $k):
    		$attendees[$k['Attendee']['id']] = $k['Attendee']['name'];
    	endforeach;

        if ($this->request->is('post')) {
            $this->Checkin->create();
            if ($this->Checkin->save($this->request->data)) {
                $this->Session->setFlash(	__('The checkin has been added'), 'flash_save_success');
                $this->redirect(array('action' => 'add'));
            } else {
            	if ($this->Checkin->flashErrorMessage) {
                	$this->Session->setFlash( $this->Checkin->flashErrorMessage, 'flash_save_fail');
                } else {
	        		$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
	        	}
            }
        } 
        
        $this->set(compact('attendees'));
        
    }
    
    
}
