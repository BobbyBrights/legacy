 <?php 
class MessagesComponent extends Component {

	public $components = array('Webtext.REST');

	
	public function send_message($message = null, $recipients = null){
		//var_dump($group);
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'send_message';
		$options['message']= $message;
		$options['recipients']= $recipients;
		
		// Encode a json request
		//$message = htmlentities($message);
		
		$options['data'] = json_encode(array("address" => $recipients, "message" => $message));
		$response = $this->REST->query($options);
		return $response;
	}
	
	public function send_scheduled_message($message = null, $recipients = null, $startTime = null){
		//var_dump($group);
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'send_scheduled_message';
		$options['message']= $message;
		$options['recipients']= $recipients;
		// Encode a json request
		//$message = htmlentities($message);
		
		$options['data'] = json_encode(array("address" => $recipients, "message" => $message, 'startTime' => $startTime));
		$response = $this->REST->query($options);
		return $response;
	}	


}

?>