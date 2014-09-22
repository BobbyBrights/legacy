<?php 
class ActiveUserComponent extends Component {

	public $components = array('Webtext.REST');
	
	public function get_user_settings(){
		$options = array();
		$options['method'] = 'account_details';	
		$response = $this->REST->query($options);
		return $response;
	}


	public function register_user($data){	
		$options = array();
		$options['method'] = 'register';			
		$options['data'] = json_encode(array("telephoneNo" => $data['telephoneNo'], "emailAddress" => $data['emailAddress']));
		$response = $this->REST->query($options);
		return $response;
	}

	public function accept_terms(){
		$options = array();
		$options['method'] = 'accept_terms';			
		$response = $this->REST->query($options);
		return $response;
	}
	
	public function request_pin($msisdn = null){
		$options = array();
		$options['method'] = 'request_pin';
		$options['msisdn'] = $msisdn;			
		$response = $this->REST->query($options);
		return $response;
	}
	
	public function send_device_info($data){
		$options = array();
		$options['method'] = 'send_device_info';
		$options['data'] = json_encode($data);
		$response = $this->REST->query($options);
		return $response;
	}
				
}

?>