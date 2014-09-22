<?php
App::uses('AppController', 'Controller');
class WebtextAppController extends AppController {

	
	public $components = array('Webtext.AddressBook', 'Webtext.Messages', 'Webtext.REST', 'Webtext.ActiveUser', 'Session', 'Security');
	public $helpers = array('Form', 'Html', 'Js', 'Time');
	var $uses = array('Webtext.User', 'Webtext.Contact', 'Webtext.Group', 'Webtext.Message', 'Webtext.Export');
	var $layout = 'webtext';
	
	var $namedArgs = FALSE; 
    var $argSeparator = ":"; 


	public function assert_logged_in(){
		if($this->Session->check('ActiveUser.profile')):
			return true;
		endif;	
		return false;
	}	
	
	public function internationalize($msisdn = null){
		
	}
	
	function beforeFilter() {
		// The following controllers/actions require SSL
		$this->Security->blackHoleCallback = 'force_ssl';
		$this->Security->requireSecure();
		
		$this->set('is_webtext', true);
		//$this->redirect('http://webtext.three.ie');
		$this->getNamedArgs();
	}
	
	function force_ssl() {
		// Modified 
		$lbEnv = env('HTTP_X_FORWARDED_PROTO');
 		if (!is_null($lbEnv) && (env('HTTP_X_FORWARDED_PROTO') != 'https')) {
    		return $this->redirect('https://' . env('SERVER_NAME') . $this->here);
  		}
	}
	
	function handleError($error_code = null, $type = null, $message = null, $optional_extra_code = null, $error = null){
		$atts = array();
		$atts['class'] = $type;
		if($error != null):
			$this->set('stack_trace', $e);
		endif;
		
		$this->Session->setFlash($message, 'Errors/' . $this->params['controller'] . '_' . $this->params['action'] . '_' . $error_code .(isset($optional_extra_code) && $optional_extra_code != null ? '_' . $optional_extra_code : ''), $atts);
	}
	
	   /** 
   * A callback function to populate the namedArgs array if activated 
   * This should be triggered in the beforeFilter 
   * @return TRUE always 
   * 
   **/ 
    function getNamedArgs() { 
        if ($this->namedArgs) 
        { 
            $this->namedArgs = array(); 
            if (!empty($this->params['pass'])) 
            { 
                foreach ($this->params['pass'] as $param) 
                { 
                    if (strpos($param, $this->argSeparator)) { 
                        list($name, $val) = split( $this->argSeparator, $param ); 
                        $this->namedArgs[$name] = $val; 
                    } 
                } 
            } 
        } 
        return TRUE; 
    } 
    
    
}

?>