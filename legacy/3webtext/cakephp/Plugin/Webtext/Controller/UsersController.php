<?php
class UsersController extends WebtextAppController {
	
	
	public function index(){
		$this->set('title_for_layout', 'Webtext - Your homepage.');
	}

	public function update_email() {
		$this->set('title_for_layout', 'Webtext - Update Email.');
		if($this->assert_logged_in()):
			$this->handleError('401', 'access_denied');
			return;
		endif;
		
		if(isset($this->data) && !empty($this->data)) {	
			$this->User->set($this->data);
			//var_dump($this->data);
			
			if($this->User->validates()):
				
			endif;
		}		
	}
		
	public function accept_terms(){
		$this->set('title_for_layout', 'Webtext - Accept Terms & Conditions.');
		if(isset($this->data) && !empty($this->data)) {	
			$this->User->set($this->data);
			if($this->User->validates()):
				$this->Session->write('ActiveUser.terms_accepted', true);
				$response = $this->ActiveUser->accept_terms();
				if($response != ''): 
					var_dump($response);
				else:
					// Terms accepted, lets go ahead!
					$this->seamless_login();
				endif;
			endif;
		}	
	}

	public function request_pin(){
		$this->set('title_for_layout', 'Webtext - Request new PIN.');
		if(isset($this->data) && !empty($this->data)) {	
			$this->User->set($this->data);
			if($this->User->validates()):
				$this->logout(false);
				
				$response = $this->ActiveUser->request_pin($this->data['User']['telephoneNo']);
					
				if($response != ''):
					$this->set('error', json_decode($response));
				else:
					$this->handleError('200', 'success');					
					if(isset($this->data['User']['redirect'])):
						$this->redirect($this->data['User']['redirect']);
					endif;
				endif;
			endif;
		}	
	}

		
	public function login() {
		$this->set('title_for_layout', 'Webtext - Login.');
		if($this->assert_logged_in()):
			$this->handleError('logged_in', 'success');
			$this->redirect(array("controller" => "messages", "action" => "send", "plugin" => "webtext"));
			return;
		endif;
		
		if(isset($this->data) && !empty($this->data)) {	
			$this->User->set($this->data);
			//var_dump($this->data);
			
			if($this->User->validates()):
				$this->Session->write('ActiveUser.msisdn', $this->data['User']['telephoneNo']);
				$this->Session->write('ActiveUser.code', $this->data['User']['pin']);
				$this->seamless_login();
				
				//$this->redirect(array("controller" => "messages", "action" => "send", "plugin" => "webtext"));								
			endif;
		}		
	}
	
	public function save_device_info(){
		$device_info = array();
		/*
			browserType
			clientIdentifier
			flashVersion
			isRoaming
			language
			manufacturer
			networkType
			operatingSystem
			playerType
			screenDPI
			screenResolutionX
			screenResolutionY
			
		*/
		$device_info['browserType'] = $_SERVER['HTTP_USER_AGENT'];
		$device_info['clientIdentifier'] = $_SERVER['HTTP_USER_AGENT'];
		$device_info['operatingSystem'] = php_uname();
		
		
		$response = $this->ActiveUser->send_device_info($device_info);
		return true;	
	}
	
	public function seamless_login(){
		// Need to check if terms & conditions have been accepted 
		$user_settings = json_decode($this->ActiveUser->get_user_settings());
		// Need to check if terms & conditions have been accepted
		
		if(isset($user_settings->statusCode) && $user_settings->statusCode == 403):
			$this->handleError('403', 'access_denied');
			$this->set('first_run', true);
			$this->render('accept_terms');
			
		else:
			$valid_user = isset($user_settings->remainingAllowance) && isset($user_settings->scheduledMessages) && isset($user_settings->allowancePerInterval) && isset($user_settings->allowanceRenewalDate);
			if($valid_user):
				$this->Session->write('ActiveUser.profile', $user_settings); // Dont forget to refresh this everytime a message is sent!
				$this->handleError('200', 'logged_in');
				$this->save_device_info();
				$this->redirect(array("controller" => "messages", "action" => "send", "plugin" => "webtext"));
			else:
				$this->Session->delete('ActiveUser');
				$this->handleError('403', 'acess_denied');
			endif;
		endif;		
	}
	
	public function logout($redirect = true) {	
		$this->set('title_for_layout', 'Webtext - Logout.');
		$this->Session->delete('ActiveUser');
		$this->Session->destroy();	
		
		//
		if($redirect):
			$this->handleError('200', 'logged_out');
			$this->redirect(array("controller" => "webtext", "action" => "index", "plugin" => "webtext"));	
		endif;
	}
		
	
	public function register(){	
		$this->set('title_for_layout', 'Webtext - Register New User.');
		if(isset($this->data) && !empty($this->data)) {
			
			$this->User->set($this->data);
			if($this->User->validates()){
				$response = $this->ActiveUser->register_user($this->data['User']);
				$this->set('response', $response);	
				
				// Parse the response and display the appropriate message.
				// If the response is empty, then the set up was successful
				if($response != ''): 
					$e = json_decode($response);
					$this->handleError($e->statusCode, 'success', $e->errorMessage);	
				else:
					$this->handleError('200', 'success');
					$this->send_webtext_confirmation_email($this->data['User']);
					$this->redirect(array("controller" => "pages", "action" => "index", "plugin" => "webtext"));			
				endif;
				
			}
		}
		
	}
	
	public function send_webtext_confirmation_email($data){
		/*
		$email = new CakeEmail();
		$email->viewVars(compact("data"));
		$email->template('ThreeStars.conf_email')->emailFormat('html')->from(array('website@threestars.three.ie' => 'Three Stars'))->to($data['recipient_email'])->subject('You\'ve received a new nomination!')->send();
		*/
	}

}