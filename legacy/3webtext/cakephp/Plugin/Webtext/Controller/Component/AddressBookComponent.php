<?php 
class AddressBookComponent extends Component {

	public $components = array('Webtext.REST');
	
	public function startup( &$controller ) { 
        $this->controller = $controller; 
   	} 
   
   
	public function query_group($name){
		// Returns address book as JSON string
		// GET /three-webtext/v1/address_book/08312345678/group/group1 HTTP/1.1
		$options = array();
		$options['method'] = 'query_group';
		$options['data'] = $name;
		$response = $this->REST->query($options);
		return $response;
	}

	public function get(){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'get_address_book';
		$response = $this->REST->query($options);
		
		$arr_a = json_decode($response);
		
		$sorted = array();

			foreach ($arr_a->entries as $key => $row) {
    			$sorted[$key]  = $row->name;
			}
			array_multisort($sorted, SORT_ASC, &$arr_a->entries);
		
;

		return json_encode($arr_a);
	}
	
	public function edit_group_members($group){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'modify_group_members';
		$options['data']['name'] = $group['name'];
		$options['data']['contacts'] = array("groupEntries" => $group['contacts']);
		$response = $this->REST->query($options);
		return $response;
	}

	public function update_group($group = null){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'update_group';
		$options['data']['old_name'] = urlencode($group['old_name']);
		$options['data']['new_name'] = urlencode($group['new_name']);
		$response = $this->REST->query($options);
		return $response;
	}

	public function get_contact_info($contact_name = null){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'get_contact_info';
		$options['data']= $contact_name;
		$response = $this->REST->query($options);
		return $response;
	}
			
	public function create_group($group = null){
		$group['old_name'] = $group['name']; 
		$group['new_name'] = $group['name'];
		return $this->update_group($group);
	}
		
	public function add_contacts($contacts = null){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'add_contacts';
		$options['data'] = json_encode(array("entries" => $contacts));
		
		$response = $this->REST->query($options);
		return $response;
	}

	public function edit_contact($contact = null, $old_name = null){	
		// First, add the new contact
		//$contact['name'] = str_replace("'", "\'", $contact['name']);
		$a_response = $this->REST->query(array("method" => "add_contacts", "data" => json_encode(array("entries" => array($contact)))));
		if($a_response != ''):
			return $a_response;
		else: 
			// Added fine, now delete the old one - only do this if the contact name and the old name are not identical
			$d_response = '';
			if($contact['name'] != $old_name):
				$d_response = $this->REST->query(array("method" => "delete_contact", "data" => $old_name));
				
			endif;
			return $d_response;
			
		endif;
		
		// Catch all
		return json_encode(array("statusCode" => 500, "errorCode" => "GENERIC_SYSTEM_ERROR"));
	}
	
	public function delete_contact($name = null){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'delete_contact';
		$options['data'] = urldecode($name);
		
		$response = $this->REST->query($options);
		return $response;
	}
	
	public function delete_group($name = null){
		// Returns address book as JSON string
		$options = array();
		$options['method'] = 'delete_group';
		$options['data'] = urlencode($name);		
		$response = $this->REST->query($options);
		return $response;
	}	
}

?>