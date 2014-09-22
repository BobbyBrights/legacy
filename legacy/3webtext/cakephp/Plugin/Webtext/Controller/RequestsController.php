<?php
App::uses('WebtextAppController', 'Webtext.Controller');
/**
 * Requests Controller
 *
 */
class RequestsController extends WebtextAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
 	var $namedArgs = TRUE;
	public $scaffold;
	
	public function get_account(){
		$this->layout = 'ajax';
		
		$account = array();
		$account['remainingAllowance'] = 15;
		$account['scheduledMessages'] = 1;
		$account['allowancePerInterval'] = 111;
		$account['allowanceRenewalDate'] = '18/01/2013';
		
		if (isset($this->namedArgs['type'])) 
        { 
            $account['type'] = $this->namedArgs['type']; 
        }
        
		$this->set('response', $account);
	}

}
