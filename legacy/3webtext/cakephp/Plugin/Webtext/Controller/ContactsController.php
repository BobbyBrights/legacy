<?php

class ContactsController extends WebtextAppController {
	
	public function index(){
		$this->set('title_for_layout', 'Webtext - Contacts Home.');
		if($this->assert_logged_in()){
			$this->set('address_book', $this->AddressBook->get());
		} else {
			$this->handleError('403', 'acl_restricted');
		}
	}
	
	public function bookmarklet(){}
	
	public function delete_contacts(){
		$this->set('title_for_layout', 'Webtext - Contacts Home.');
		if(isset($this->data) && !empty($this->data)):
			//var_dump($this->data);
		endif;
		//$this->handleError('202', 'success', 'Contacts deleted.');
		//$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
	}
	
	public function upload(){
		$this->set('title_for_layout', 'Webtext - Upload Contacts.');
		ini_set("upload_max_filesize", "1M");
		ini_set("auto_detect_line_endings", "1");
		
		if($this->assert_logged_in()){
			$this->set('address_book', $this->AddressBook->get());
			if(isset($this->data) && !empty($this->data)) {
				$mimes = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
				
				if(!in_array($this->data['Contact']['file']['type'], $mimes)):
					$this->handleError('415', 'file_not_allowed');
				else:
				
				$tmp_file = $this->data['Contact']['file']['tmp_name'];
				$row = 1;
				$valid = array();
				$erroneous = array();
	
				if(isset($tmp_file) && $tmp_file != null):
					if (($handle = fopen($tmp_file, "r")) !== FALSE) :
						while (($data = fgetcsv($handle)) !== FALSE) :
							if(preg_match('/\+?[\d]{7,}$/', $data[1])):
								$valid['entries'][] = array("name" => urlencode($data[0]), "address" => "tel:".$data[1]);
							else:
								$erroneous[] = array("name" => $data[0], "address" => $data[1]);
							endif;	
    					endwhile;
    					fclose($handle);
					endif; 
					if(isset($valid['entries']) && sizeof($valid['entries']) > 0):
						$response = $this->AddressBook->add_contacts($valid['entries']);
						if($response == ''): 
							$this->handleError('202', 'success', 'Contacts updated. ' .sizeof($valid['entries']) . ' new contacts added.');
							$this->set('erroneous', $erroneous);
							if(sizeof($erroneous) == 0):
								$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
							endif;
						else:
							$this->set('response', $response);
						endif;
					else: 
						$this->handleError('414', 'file_not_allowed');
					endif;
				else:
					$this->handleError('415', 'file_not_allowed');
				endif;
				endif;
			}
			
		} else {
			$this->handleError('403', 'acl_restricted');
		}
	}
	
	public function edit_group($name = null){
		$this->set('title_for_layout', 'Webtext - Edit Group.');
		if($this->assert_logged_in()){
			$this->set('address_book', $this->AddressBook->get());
			if(isset($this->data) && !empty($this->data)) {
				$this->set('group_data', $this->AddressBook->query_group($this->data['Group']['o_name']));
				$this->Group->set($this->data);
				if($this->Group->validates()):
					// Delete the old group
					$this->AddressBook->delete_group($this->data['Group']['o_name']);
					
					// Add a new group
					$response = $this->AddressBook->create_group($this->data['Group']);
					if($response != ''):
						// And now update the contacts in the group
						$e = json_decode($response);
		
						switch($e->statusCode):
							case 409:
								$this->handleError('409', 'already_exists');
								break;
							default:
								break;
						endswitch;
					else:
						$response = $this->AddressBook->edit_group_members($this->data['Group']);
						if($response == ''):
							$this->handleError('200', 'already_exists');
							$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
						endif;
					endif;
				endif; 
			} else {
				$this->set('group_data', $this->AddressBook->query_group($name));
			}
			
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
		}
	}
	
	public function create_group($group_name = null){
		$this->set('title_for_layout', 'Webtext - Create Group.');
		if($this->assert_logged_in()){
			if($group_name != null):
				$this->AddressBook->create_group($group_name);
				$this->handleError('200', 'group_created', 'Group ' . $group_name . ' created.');
				$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
			else:
				$this->handleError('404', 'group_name_not_null', 'Group name cannot be null');
			endif;
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
		}
	}

	public function add_group(){	
		$this->set('title_for_layout', 'Webtext - Add Group.');	
		if($this->assert_logged_in()){
			$this->set('address_book', $this->AddressBook->get());
			if(isset($this->data) && !empty($this->data)) {
				$this->Group->set($this->data);
				if($this->Group->validates()):
					$has_contacts = is_array($this->data['Group']['contacts']) && sizeof($this->data['Group']['contacts']) > 0;
					if($has_contacts):
						$response = $this->AddressBook->create_group($this->data['Group']);
						if($response !=''):
							$e = json_decode($response);
							switch($e->statusCode):
								case 409:
									// Group already exists
									$this->handleError('409', 'already_exists');
									break;
								default:
									break;
							endswitch;
						else:
						// Add contact members if they were set
							$response = $this->AddressBook->edit_group_members($this->data['Group']);
							if($response !=''):
								$e = json_decode($response);
								$this->handleError($e->statusCode, 'fail', $e->errorMessage);
							else:
								$this->handleError('200', 'group_created');
								$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
							endif;
						endif;
					else: 
						$this->handleError('301_no_recipients_set','');
					endif;
						
						
						// Set flash and redirect
						
				endif;
			}
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
		}
	}
	
	

	public function delete_group($group_name = null){	
		$this->set('title_for_layout', 'Webtext - Delete Group.');	
		if($this->assert_logged_in()){
				if($group_name != null): 
					$response = $this->AddressBook->delete_group($group_name);
					if($response == ''): 
						$this->handleError('202', 'group_deleted');
						$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
					else:
						$this->set('response', $response);
					endif;
				else: 
					$this->handleError('404', 'group_name_not_found');
					$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));				
				endif;
			
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
		}
	}
		
	public function add_contact(){	
		$this->set('title_for_layout', 'Webtext - Add Contact.');	
		if($this->assert_logged_in()){
			if(isset($this->data) && !empty($this->data)) {

				$this->Contact->set($this->data);
				
				if($this->Contact->validates()):
					$contacts = array();
					$contacts[] = array("name" => urlencode($this->data['Contact']['name']), "address" => "tel:" . $this->data['Contact']['msisdn']);
					
					$response = $this->AddressBook->add_contacts($contacts);
					if($response == ''): 
						$this->handleError('200', 'success');
						$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
					else:
						$this->set('response', $response);
					endif;
				endif; 
				
			} 
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
		}
	}
	
	public function edit_contact($name = null, $msisdn = null){	
		$this->set('title_for_layout', 'Webtext - Edit Contact.');	
		if($this->assert_logged_in()){

			if (empty($this->request->data)) {		
				if($name != null && $msisdn != null): 
					// Populate the data in the form with the querystring.
					$data = array();
					$data['Contact']['name'] = $name;
					$data['Contact']['msisdn'] = $msisdn;
					$this->request->data = $data;
				else: 
					$this->handleError('404', 'missing_parameters');
					$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));				
				endif;
				
    		} else {
				$this->Contact->set($this->data);
				if($this->Contact->validates()):
					$contact = array("name" => urlencode(trim($this->data['Contact']['name'])), "address" => "tel:" . $this->data['Contact']['msisdn']);
					$response = $this->AddressBook->edit_contact($contact, $this->data['Contact']['old_name']);
					if($response == ''): 
						// Delete the old contact 
						// $this->delete_contact($this->data['Contact']['old_name'], false);
						$this->handleError('200', 'success');
						$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
					else:
						$e = json_decode($response);
						$this->handleError($e->statusCode, 'error', $e->errorMessage);
					endif;
				endif; 	
    		}
    		
		} else {
			$this->handleError('403', 'acl_restricted');
			$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
		}
	}

	public function delete_contact($name = null, $redirect = true){	
		$this->set('title_for_layout', 'Webtext - Delete Contact.');	
		if($this->assert_logged_in()){
				if($name != null): 
				
					
					$response = $this->AddressBook->delete_contact(urlencode($name));
					if($response == ''): 
						$this->handleError('200', 'success');
						if($redirect):
							$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
						endif;
					else:
						$this->set('response', $response);
					endif;
				else: 
					$this->handleError('404', 'missing_parameters');
					if($redirect):
						$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));	
					endif;			
				endif;

		} else {
			$this->handleError('403', 'acl_restricted');
			if($redirect):
				$this->redirect(array("controller" => "contacts", "action" => "index", "plugin" => "webtext"));
			endif;
		}
	}
	
}