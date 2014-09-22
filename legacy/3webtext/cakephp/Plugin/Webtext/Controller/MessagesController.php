<?php
class MessagesController extends WebtextAppController {
	
	
	public function sent(){
		$this->set('title_for_layout', 'Webtext - Message sent.');
	}
	
	public function send($message_to = null){	
		$this->set('title_for_layout', 'Webtext - Send Messages.');
		$this->set('omniture_page_name', 'Webtext - Send Messages.');
		$this->set('message_to', $message_to);
		
		if($this->assert_logged_in()){
			$this->set('logged_in', true);
			$this->set('address_book', $this->AddressBook->get());
			if(isset($this->data) && !empty($this->data)) {
				$this->Message->set($this->data);
				// Gather contacts
				$recipients = array();
				
				if(isset($this->data['Message']['recipients_contacts']) && is_array($this->data['Message']['recipients_contacts'])):
					$recipients = array_merge($recipients, $this->data['Message']['recipients_contacts']);
				endif;
				// Gather groups
				
				if(isset($this->data['Message']['recipients_groups']) && is_array($this->data['Message']['recipients_groups']) && sizeof($this->data['Message']['recipients_groups']) > 0):
					//var_dump($this->data['Message']['recipients_groups']);
					
					foreach($this->data['Message']['recipients_groups'] as $g):
						$response = $this->AddressBook->query_group(urlencode($g));
						
						$r = json_decode($response);
						foreach($r->groupEntries as $c):
							$c_info = $this->AddressBook->get_contact_info(urlencode($c));
							//var_dump($c_info);
							if($c_info != ''):
								$x = json_decode($c_info);
								//var_dump($x);
								
								$recipients[] = $x->address;
							endif;						
						endforeach;
					endforeach;
				endif;
				
				//var_dump($recipients);
				
				
				// Need to do custom validation on the arbitrary input field
				if ($this->data['Message']['recipients_individual'] != '') {
					
					
					$str = preg_replace('/\s\s+/', '', $this->data['Message']['recipients_individual']); // strips all whitespace
					$str = preg_replace('/[^\d\,\+]/', '', $str); // strips all non valid characters
					
					//var_dump($str);
					
					
					$valid_string = true;
					
					$phone_numbers = explode(",", $str); 
					
					if(!is_array($phone_numbers) || $str == ''):
						$valid_string = false;
					else:
						foreach($phone_numbers as $p):
							//var_dump($p);
							//var_dump(preg_match('/^\+[\d]{7,}$/', $p));
							if($p != '' && preg_match('/\+?[\d]{7,}$/', $p) == 0):
								$valid_string = false;
								break;
							else:
								$recipients[] = $p;
							endif;
						endforeach;
					endif;
					
					if(!$valid_string):	
						$this->Message->invalidate( 'recipients_individual', 'Invalid phone numbers found. Valid characters 0-9, and + sign.' );
					endif;
            	}
 				
 				//var_dump($recipients);
 				
 				// Get unique tel: 's
 				$recipients = array_unique($recipients);
 				
 				// Need to reset the array.
 				$recipients = array_merge(array(),$recipients);
 				
				$this->set('total_recipients', sizeof($recipients));
				           	
            	// So far so good. Lets validate the message now. 
            	if(is_array($recipients) && sizeof($recipients) > 0): 
				if($this->Message->validates()):					
					// Determine if this is immediate or scheduled
					$response = null;
					$message = $this->data['Message']['message']; 
					$message = str_replace("'", "\'", $message);
					
					$is_scheduled = isset($this->data['Message']['schedule']) && $this->data['Message']['schedule'] == 1;
					
					if($is_scheduled): 
						
						/*
						$debug = array();
						$debug['scheduled_date_as_array'] = $this->data['Message']['scheduled_date'];
						
						$debug['scheduled_date_as_timestamp_no_tz_set'] = $this->get_utc_date($this->data['Message']['scheduled_date']);
						
						$debug['current_system_time_as_timestamp_no_tz_set'] = time();
						$date_with_tz = "today " . date("h:i a ") . "Europe/Dublin";
						$debug['current_date_with_tz_set'] = $date_with_tz;
						
						$debug['current_system_time_as_timestamp_with_tz_set'] = strtotime($date_with_tz);
						*/
						
						//print_r($debug);
						
						
						$s_date = $this->get_ist_date($this->data['Message']['scheduled_date']);
						$response = $this->Messages->send_scheduled_message($message, $recipients, $s_date);
					else:
						$response = $this->Messages->send_message($message, $recipients);
					endif;
					// Should always returns a json response.
					$json = json_decode($response);
					//var_dump($json->resourceReference);
					if(isset($json->resourceReference->resourceURL)):
						$user_settings = json_decode($this->ActiveUser->get_user_settings());
						$this->Session->write('ActiveUser.profile', $user_settings); // Dont forget to refresh this everytime a message is sent!
						$message = $is_scheduled ? 'Message scheduled to be sent in ' . $this->get_difference_between_now_and($this->get_time_stamp($this->data['Message']['scheduled_date'])) : 'Message sent!';
						$this->handleError('200', 'success', $message);
						$this->data = null;
						//$this->redirect(array("controller" => "messages", "action" => "sent", "plugin" => "webtext"));
					else: 
						switch($response):
							default: 
								$e = json_decode($response);
								$this->handleError($e->statusCode, 'generic_error', $e->errorMessage, $e->errorCode);
								break;
						endswitch;
					endif;
				endif; 
				else: 
					$this->handleError('401', 'no_recipients_set');
				endif;
			}
			
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "messages", "action" => "index", "plugin" => "webtext"));
		}

	}
	
	public function index(){
		$this->set('title_for_layout', 'Webtext - Messages homepage');
	}

	public function get_time_stamp($date_fields = null){
		// str_format = dd-MM-yyyy HH:mm z
		// int mktime ([ int $hour = date("H") [, int $minute = date("i") [, int $second = date("s") [, int $month = date("n") [, int $day = date("j") [, int $year = date("Y") [, int $is_dst = -1 ]]]]]]] )
		extract($date_fields);
		if($hour < 12 && $meridian == 'pm'):
			$hour += 12;
		else:
			if ($hour == 12 && $meridian == 'am'):
				$hour = 0;
			endif;
		endif;
		return mktime($hour, $min, 0, $month, $day, $year);
	}
	
	
	public function get_ist_date($date_fields = null){
		// str_format = dd-MM-yyyy HH:mm z
		
		extract($date_fields);
		if($hour < 12 && $meridian == 'pm'):
			$hour += 12;
		else:
			if ($hour == 12 && $meridian == 'am'):
				$hour = 0;
			endif;
		endif;
		
		return gmdate("d/m/Y H:i:s \G\M\T", mktime($hour, $min, 0, $month, $day, $year));
	}
		
	public function get_unix_timestamp($date_field = null){
		return strtotime($date_field);
	}
	
	public function get_difference_between_now_and($b){ 
		$a = time();
				
		//$a = strtotime("+1 hour");
		
		$diff = abs($b - $a);
		/*
		var_dump($date_with_tz);
		var_dump($a);
		var_dump($b);
		var_dump($diff);
		*/
		
		// diff is now in seconds.
		$days = floor($diff / (60*60*24));
		$hours = floor(($diff - $days * 60*60*24) / (60*60));
		$mins = floor(($diff - $days * 60*60*24 - $hours * 60*60) / (60));
		$str = ""; 
		if($days > 0):
			$str .= $days . " days, ";
		endif;
		if($hours > 0):
			$str .= $hours . " hours, ";
		endif;
		$str .= $mins . " mins";
		
		return $str;
	}
	
	public function archive(){
	
	}
}