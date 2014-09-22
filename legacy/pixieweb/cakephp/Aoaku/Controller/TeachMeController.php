<?php
App::uses('AoakuAppController', 'Aoaku.Controller');
/**
 * Teaches Controller
 *
 */
class TeachMeController extends AoakuAppController {
	public $uses = array('Aoaku.User');

   public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('search');
    }

	
	public function search($subject = null, $area = null) {
		
		$users = $this->User->find('all');
		
		if($this->data):
			// Fresh query, ie. not via a quicklink
			$this->set('query', $this->data);
			$this->set('users', $users);
			
			
			// Serve
			
			
			// and re-cache
		else:
			// Stale query..
			// Serve the page from the cache if its available.
			$this->set('query', array("No data set"));				
			// Otherwise, emm.. no idea!	
		endif;
		
		
	}
}
