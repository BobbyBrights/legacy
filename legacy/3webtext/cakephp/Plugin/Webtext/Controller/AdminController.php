<?php

class AdminController extends WebtextAppController {
	
	public $components = array('Webtext.AddressBook', 'Webtext.REST');

	public function delete_user($msisdn = null) {
		if($msisdn != null):
			$options = array();
			$options['method'] = 'purge_user';
			$options['user'] = $msisdn;
			$response = $this->REST->query($options);
			$this->set('response', $response);	
		else:
			$response = array("errorMessage" => "No user specified.");
			$this->set('response', json_encode($response));
		endif;
			
	}
	
}