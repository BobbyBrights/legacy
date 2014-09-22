<?php
class RESTComponent extends Component {
	
	var $components = array('Session', 'Core');
	
	public function internationalise($number = null){
		return $number;
		//return "Help!";
	}
	public function query($options = null){
		$response = array();
		
		$admin 			= Configure::read('WebtextAdmin');
		$api 			= Configure::read('WebtextAPI');
		$current_user 	= $this->Session->read('ActiveUser');
		
		
		switch($options['method']):
			case 'register':
				$cmd = '/usr/bin/curl -k -u '.$admin['user'].':'.$admin['pass'].' -X POST -H "Content-Type: application/json" -d \''.$options['data'].'\' '.$api['base'].'account_request';
				//var_dump($cmd);
				exec($cmd, $response);
				break;
				
				
			case 'send_device_info':
				$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" -d "'. str_replace("\"", "'", $options['data'])  .'" '.$api['base'].'device_info/'.$current_user['msisdn'];
				//var_dump($cmd);
				exec($cmd, $response);
				break;
				
			case 'send_message':
				//var_dump($options['recipients']);
				
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" -d "'. str_replace("\"", "'", $options['data'])  .'" '.$api['base'].'oneapi/'.$current_user['msisdn'].'/smsmessaging/outbound/tel%3A%2B'.$this->internationalise($current_user['msisdn']).'/requests';
					//var_dump($cmd);
					exec($cmd, $response);

				break;

			case 'send_scheduled_message':
			
				if( is_array($options['recipients']) && sizeof($options['recipients']) > 0 && isset($options['message'])):
					 
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" -d "'. str_replace("\"", "'", $options['data'])  .'" '.$api['base'].'oneapi/'.$current_user['msisdn'].'/scheduled/smsmessaging/outbound/tel%3A%2B'.$this->internationalise($current_user['msisdn']).'/requests';
					//var_dump($cmd);
					exec($cmd, $response);
				else: 
					$response = array("errorCode" => "NO_RECIPIENTS_SET");
				endif;
				break;
				
			case 'request_pin':
				$cmd = '/usr/bin/curl -k -X POST -H "Content-Type: application/json" '.$api['base'].'pin_request/'.$options['msisdn'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;
								
								
			case 'accept_terms':
				$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" '.$api['base'].'user_terms/'.$current_user['msisdn'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;
				
			case 'get_address_book':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X GET -H "Content-Type: application/json" '.$api['base'].'address_book/'.$current_user['msisdn'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;	
			case 'add_contacts':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" -d "'.str_replace("\"", "'", $options['data']).'" '.$api['base'].'address_book/'.$current_user['msisdn'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;		
				
				
			case 'edit_contact':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" -d "'.str_replace("\"", "'", $options['data']).'" '.$api['base'].'address_book/'.$current_user['msisdn'].'/entry/'.$options['old_name'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;	

			case 'delete_contact':
					///three-webtext/v1/address_book/08312345678/entry/alice
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X DELETE -H "Content-Type: application/json" '.$api['base'].'address_book/'.$current_user['msisdn'].'/entry/'.urlencode($options['data']);
					//var_dump($cmd);
					exec($cmd, $response);
				break;	
			case 'account_details':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X GET -H "Content-Type: application/json" '.$api['base'].'user_policies/'.$current_user['msisdn'].'/send_message';
					//var_dump($cmd);
					exec($cmd, $response);
				break;
			case 'delete_users':
					$cmd = '/usr/bin/curl -k -u '.$admin['user'].':'.$admin['pass'].' -X DELETE -H "Content-Type: application/json" -d \''.$options['data'].'\' '.$api['base'].'account_request';
					//var_dump($cmd);
					exec($cmd, $response);
				break;

			case 'delete_group':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X DELETE -H "Content-Type: application/json" '.$api['base'].'address_book/'.$current_user['msisdn'] . '/group/' . $options['data'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;

			case 'query_group':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X GET -H "Content-Type: application/json" '.$api['base'].'address_book/'.$current_user['msisdn'] . '/group/' . $options['data'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;
				
			case 'get_contact_info':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X GET -H "Content-Type: application/json" '.$api['base'].'address_book/'.$current_user['msisdn'] . '/entry/' . $options['data'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;
																
			case 'update_group':
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" '; 
					
					if($options['data']['new_name'] != $options['data']['old_name']):
						$cmd .= '-d \'{"name":"'. $options['data']['new_name'] .'"}\' '; 
					endif;
					
					$cmd .= $api['base'].'address_book/'.$current_user['msisdn'].'/group/' . $options['data']['old_name'];
					//var_dump($cmd);
					exec($cmd, $response);
				break;
			
			case 'modify_group_members': 
					$cmd = '/usr/bin/curl -k -u '.$current_user['msisdn'].':'.$current_user['code'].' -X POST -H "Content-Type: application/json" '; 
					
					if(isset($options['data']['contacts'])):
						$cmd .= '-d "'. str_replace("\"", "'", json_encode($options['data']['contacts']))  .'" ';
						//$cmd .= '-d \''.json_encode($options['data']['contacts']).'\' ';
					endif;
					$cmd .= $api['base'].'address_book/'.$current_user['msisdn'].'/group/' . urlencode($options['data']['name']) . "/entry";

					//var_dump($cmd);
					exec($cmd, $response);			
				break;
			
			case 'modify_group':

				break;
				
			// Special stuff..
			case 'purge_user':
					$cmd = '/usr/bin/curl -k -u '.$admin['user'].':'.$admin['pass'].' -X DELETE https://83.136.46.28/adminapi/rest/users/' . $options['user'];
					//var_dump($cmd);
					exec($cmd, $response);				
				break;
			default:
				break;
		endswitch;
		return implode("\n", $response);
	}
	
}

?>
