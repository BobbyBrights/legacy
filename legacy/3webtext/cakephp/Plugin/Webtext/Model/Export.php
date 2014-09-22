<?php
class Export extends WebtextAppModel{
	var $useTable = false;
	public $name = 'Export';

	public $_schema = array(
		'username' => array(
			'type' => 'string',
			'length' => 30
		),
		'pin' => array(
			'type' => 'string',
			'length' => 7
		)
	);

	public $validate = array(
		'username' => array(
			'rule'    => '/^08[\d]{8}$/',
			'message' => 'Your mobile number must be 10 digits in length (in the format 08XXXXXXXX)'
		),
		'pin' => array(
			'rule'    => '/[\d]{5}$/',
			'message' => 'Your PIN must be 5 digits in length'
		)
	);
    
}