<?php
App::uses('EventureAppController', 'Eventure.Controller');
/**
 * Events Controller
 *
 */
class EventsController extends EventureAppController {

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
		$data = $this->paginate('Event');
		$this->set('data', $data);
	}
	
	
	public function view($id = null){	
		// Find all accreditations for this event
		$acc = ClassRegistry::Init('Eventure.Accreditation')->findAllByEventId($id);
		$m = ClassRegistry::init('Eventure.Accreditation'); 
		
		foreach($acc as &$a):
			$a['Attendees'] = ClassRegistry::Init('Eventure.AttendeesAccreditation')->findAllByAccreditationId($a['Accreditation']['id']);
		endforeach;
		
		$total_attendees = $total_checkins = 0;
		foreach($acc as $x):
			$total_attendees += sizeof($x['Attendees']);
			$total_checkins += sizeof($x['Checkin']);
		endforeach;
		
		$event = $this->Event->read(null, $id);	
		$all_accreditations = $m->find('all');
				
		$this->set(compact('event', 'acc', 'total_attendees', 'total_checkins', 'all_accreditations'));
		
		
		
	}
	
	private function find_accreditation_info($id){
		$accreditation_type = ClassRegistry::init('Eventure.AccreditationType');
		return $accreditation_type->findById($id);	
	}

	public function set_prerequisites(){
    	// Add bound models.     
    		    	
    	$p = ClassRegistry::init('Eventure.Promoter')->find('all');
    	$promoters = array();
    	foreach($p as $k):
    		$promoters[$k['Promoter']['id']] = $k['Promoter']['name'];
    	endforeach;

    	$v = ClassRegistry::init('Eventure.Venue')->find('all');
    	$venues = array();
    	foreach($v as $k):
    		$venues[$k['Venue']['id']] = $k['Venue']['name'];
    	endforeach;
    	
    	$m = ClassRegistry::init('Eventure.EventType')->find('all');
    	$event_types = array();
    	foreach($m as $k):
    		$event_types[$k['EventType']['id']] = $k['EventType']['name'];
    	endforeach;

    	$this->set(compact('promoters', 'event_types', 'venues'));		
	}
	
	
    public function add() {   
	    $this->autoRender = false;
 	  	$this->set_prerequisites();
 	  	
        if ($this->request->is('post')) {
            $this->Event->create();
            if ($this->Event->save($this->request->data)) {
                $this->Session->setFlash(	__('The event has been added'), 'flash_save_success');
                $this->redirect(array('action' => 'index'));
            } else {
	        	$this->Session->setFlash(	__('Something went wrong, check the form errors below'), 'flash_save_fail');
            }
        }
        
        $this->render('Events/form');       
    }  	

    public function edit($id = null) {
	    $this->autoRender = false;
 	  	$this->set_prerequisites();

        $this->Event->id = $id;
        if (!$this->Event->exists()) {
            throw new NotFoundException(__('Invalid event'));
        }
        
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->Event->save($this->request->data)) {
                $this->Session->setFlash(__('The event has been saved'));
                $this->redirect(array('action' => 'index'));
            } else {
                $this->Session->setFlash(__('The user could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->Event->read(null, $id);
        }
        
        $this->render('Events/form');
        
    }
    

}
