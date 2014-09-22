<?php
class Contact extends WebtextAppModel{
	var $useTable = false;
	public $name = 'Contact';
	
	public $_schema = array(
		'name' => array(
			'type' => 'string',
			'length' => 30
		),
		'msisdn' => array(
			'type' => 'string',
			'length' => 30
		)
	);
    
    public $validate = array(
    	
    	'name' => array(
    		'on' => array('create', 'update'),
			'rule'    => '/^[a-zA-Z0-9\ \-\(\)\']+$/',
			'message' => 'Your contact name must be alpha-numeric. No special characters allowed.'
		),
		'msisdn' => array(
			'on' => array('create', 'update'),
			'rule'    => '/\+?[\d]{7,}$/',
			'message' => 'Your contact number must be in international format, beginning with "+". For Irish mobile numbers, use "+3538XXXXXXXX". '
		)
    );

	// Added this function to clean up leading spaces. 
	public function beforeValidate() {
		if (!empty($this->data['Contact']['name'])) {
			$this->data['Contact']['name'] = trim($this->data['Contact']['name']);
		}
		return true;
	}
    
    
}