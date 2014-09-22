<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Accreditations Controller
 *
 */
class AccreditationsController extends EventureAppController {

	public $paginate = array(
        'limit' => 15
    );
    
	public function index($id = null){
		$this->set('data', $this->paginate());
	}
	
	public function beforeFilter(){
		parent::beforeFilter();
		$this->Accreditation->bindModel(array(
		    'hasOne' => array(
		        'Event' => array(
		            'foreignKey' => false,
		            'conditions' => array('Accreditation.event_id = Event.id')
		        ),
		        'AccreditationType' => array(
		            'foreignKey' => false,
		            'conditions' => array('Accreditation.accreditation_type_id = AccreditationType.id')
		        )
		    )/*,
		    'belongsTo' => array(
		        'Event' => array(
		            'foreignKey' => false,
		            'conditions' => array('Accreditation.event_id = Event.id')
		        )
		    )*/
		));		
	}
	
    public function add() {    			
    	$events = $this->Accreditation->Event->find('list');
    	$accreditation_types = $this->Accreditation->AccreditationType->find('list');


		$this->set(compact('accreditation_types', 'events'));
		
        if ($this->request->is('post')) {
            $this->Accreditation->create();

            $conditions = array(
            	'Accreditation.event_id' => $this->request->data['Accreditation']['event_id'],
            	'Accreditation.accreditation_type_id' => $this->request->data['Accreditation']['accreditation_type_id']
            );
            
            if($this->Accreditation->hasAny($conditions)){
	        	$this->Session->setFlash(	__('This accreditation already exists'), 'alert_info'); 
            } else {          
	            if ($this->Accreditation->save($this->request->data)) {
	                $this->Session->setFlash(	__('The accreditation has been added'), 'flash_save_success');
	                $id = $this->Accreditation->getInsertID();
	                $this->redirect(array('action' => 'add_attendee_accreditations', 'accr_id' => $id));
	                
	            } else {
		        	$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
	            }
            }
        } 
                
    }  
    
    function add_attendee_accreditations(){
    	$m = ClassRegistry::init('Eventure.AttendeesAccreditation');
    	
    	if ($this->request->is('post')) {
	    	$data = $this->request->data; 
	    		    	
	    	$s = array();
	    	
	    	if(!empty($data['Attendee'])):
		    	foreach($data['Attendee']['id'] as $a):
		    		$s[] = array(
		    			'AttendeesAccreditation' => array(
		    				'attendee_id' => $a,
		    				'accreditation_id' => $data['Accreditation']['id']	    				
		    			)
		    		);
		    	endforeach;
		    	// Delete all existing attendees for this accredition
	    	endif;
	    	$m->deleteAll(array('AttendeesAccreditation.accreditation_id' => $data['Accreditation']['id']), false);
	    	
	    	
	    	//vomit($s);
	    	if(sizeof($s) > 0):
	    		$m->saveMany($s);
	    	endif;
	    	
            $this->Session->setFlash(	__('The attendee accreditations have been added'), 'flash_save_success');
            $this->redirect(array('action' => 'index'));	   
                         	
    	} else {
		    if(isset($this->passedArgs['accr_id'])):
		    	$data = $this->passedArgs;
		    	
		    	$attendees = ClassRegistry::init('Eventure.Attendee')->find('all');
		    	//$attendees = $this->Attendee->find('all');
		    	$accreditation = $this->Accreditation->findById($this->passedArgs['accr_id']);
		    	
		    	$accredited = $m->findAllByAccreditationId($this->passedArgs['accr_id']);
		    	$this->set(compact('accreditation', 'attendees', 'data', 'accredited'));
		    	
		    	
		    else:
		    	throw new NotFoundException(__("Invalid Accreditation passed, or none set."));
		    endif;
	    }
    }

    

}
