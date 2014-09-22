<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Attendees Controller
 *
 */
class AttendeesController extends EventureAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public $scaffold;

	public $helpers = array('Eventure.Utilities');
	
    public function get_accreditation_name($e, $a){
		return "test" . $e . "-". $a;    
    }
    
    public function index(){
		$this->set('data', $this->paginate());    
    }
     
	public function view($id = null){
		if($id != null):	   	
			$this->set_prerequisites($id);
			
			    
	   	    $attendee = $this->Attendee->findById($id);
	   	    if(sizeof($attendee) == 0){
		   	    throw new NotFoundException('This Attendee could not be found');
	   	    }
	   	    // Attendee should be single value
	   	    $m = ClassRegistry::init('Eventure.AttendeesAccreditation');
	   	    $attendee['AttendeesAccreditations'] = $m->findAllByAttendeeId($id);
	   	    $m = ClassRegistry::init('Eventure.Checkin');
	   	    $attendee['Checkins'] = $m->findAllByAttendeeId($id);
	   	    
	   	    // These will be picked up by Utility methods.
	   	    $m = ClassRegistry::init('Eventure.Event');
	   	    $attendee['Events'] = $m->find('all');
	   	    $m = ClassRegistry::init('Eventure.Accreditation');
	   	    $attendee['Accreditations'] = $m->find('all');
	   	    $m = ClassRegistry::init('Eventure.AccreditationType');
	   	    $attendee['AccreditationTypes'] = $m->find('all');
			$this->set(compact('attendee', 'id'));
		endif;
	}
	
	public function add_subordinates(){
     	$this->Attendee->id = $this->passedArgs['id'];
     	
        if (!$this->Attendee->exists()) {
            throw new NotFoundException(__('Invalid attendee'));
        } else {
        	$attendee = $this->Attendee->read(null, $this->passedArgs['id']);
        	$subs = 1;
	        $this->set(compact('attendee', 'subs'));		        
        }
        
        if ($this->request->is('post')) {
        	// Manual save - build a usable array
        	$attendees = array();
        	$count = 0;
        	foreach($this->request->data['name'] as $t):
        		$n = $t;
        		$attendees[] = array(
        			"Attendee" => array(
        				"name" => $t, 
        				"mobile" => $this->request->data['mobile'][$count],
        				"promoter_id" => $this->request->data['promoter_id'],
        				"lead_attendee_id" => $this->request->data['lead_attendee_id']
        			)
        		);
        		$count++;
        	endforeach;
        	//vomit($this->request->data);
        	//vomit($attendees);        	
        	
        	$this->Attendee->create();   	
			if ($this->Attendee->saveAll($attendees, array('validate' => 'only'))) {
				// validates
				$this->Attendee->saveAll($attendees);
				$this->Session->setFlash( sprintf('The attendee %s has been added.', $n), 'flash_save_success');
				//$this->redirect(array('action' => 'view', $this->request->data['lead_attendee_id']));			  
			} else {
				// does not validate - probably some invalid fields.
				$this->Session->setFlash(	__('Something went wrong, check the form below. All fields are mandatory'), 'flash_save_fail');
			}
        }
                
	}

	public function set_prerequisites($attendee_id = null){
    	// Get attendees   	    	    	
    	$b = $this->Attendee->find('all');
    	$attendees = array();
    	
    	foreach($b as $k):
    		if($k['Attendee']['id'] != $attendee_id): // Removes the currently edited attendee from the list, as they shouldnt be a subordinate of themselves. 
    			$attendees[$k['Attendee']['id']] = $k['Attendee']['name'];
    		endif;
    	endforeach;

    	$a = ClassRegistry::init('Eventure.Accreditation')->find('all');
    	$at = ClassRegistry::init('Eventure.AccreditationType')->find('all');
    	$ev = ClassRegistry::init('Eventure.Event')->find('all');
    	
    	$accreditations = array();
    	foreach($a as $k):
    		$accreditations[$k['Accreditation']['id']] = get_event_name($k['Accreditation']['event_id'], $ev) . " - " . 	get_accreditation_type($k['Accreditation']['accreditation_type_id'], $at); 
    	endforeach;
    	
   	
    	$this->set(compact('attendees', 'accreditations', 'subordinates'));
    	
	}

    public function update_accreditations($id = null) {

        $this->Attendee->id = $id;
        if (!$this->Attendee->exists()) {
            throw new NotFoundException(__('Invalid attendee'));
        }

        $this->set_prerequisites();
        $attendee = $this->Attendee->read(null, $id); 
		$this->set(compact('attendee'));   
		//vomit($attendee);

        if ($this->request->is('post')) {
        	$this->autoRender = false;
        	// Just delete all existing accreditations first off - they no longer apply
        	$this->Attendee->AttendeesAccreditation->deleteAll(array('AttendeesAccreditation.attendee_id' => $id), false);
        	
        	// Inspect the request        	
        	if(!empty($this->request->data['AttendeesAccreditation']['accreditation_id'])):
        		$aa = array();
        		foreach($this->request->data['AttendeesAccreditation']['accreditation_id'] as $ia):
	        		$aa[] = array(
	        			"AttendeesAccreditation" => array(
	        				"attendee_id" => $id, 
	        				"accreditation_id" => $ia, 
	        				
	        			)
	        		); 
        		endforeach;
	        	if(sizeof($aa) > 0):
	        		$this->Attendee->AttendeesAccreditation->create();
	        		$this->Attendee->AttendeesAccreditation->saveAll($aa);
	        	endif;
        	endif;

            $this->Session->setFlash(	__('The attendee accreditations have been added'), 'flash_save_success');
            $this->redirect(array('action' => 'view', $id));
            
        }          
		//$this->set('attendees_accreditations', $this->Attendee->read(null, $id));   
			
    }    	


    public function add() {    	
	    $this->autoRender = false;
	    $this->set_prerequisites();
        if ($this->request->is('post')) {
            $this->Attendee->create();
            if ($this->Attendee->save($this->request->data)) {
                $this->Session->setFlash(	__('The attendee has been added'), 'flash_save_success');
                $this->redirect(array('action' => 'update_accreditations', $this->Attendee->getLastInsertID()));
            } else {
	        	$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
            }
        }               
        $this->render('Attendees/form');          
    }    

    public function edit($id = null) {
	    $this->autoRender = false;
 	  	$this->set_prerequisites($id);
 	  	
        $this->Attendee->id = $id;
        if (!$this->Attendee->exists()) {
            throw new NotFoundException(__('Invalid attendee'));
        }
        
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->Attendee->save($this->request->data)) {
                $this->Session->setFlash(__('The attendee has been saved'));
                $this->redirect(array('action' => 'update_accreditations', $id));
            } else {
                $this->Session->setFlash(__('The attendee could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->Attendee->read(null, $id);
        }        
        $this->set('attendee_id', $id);
        $this->render('Attendees/form');
       
    }

}
