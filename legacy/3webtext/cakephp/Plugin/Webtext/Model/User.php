<?php
class User extends WebtextAppModel{
	var $useTable = false;
	public $name = 'User';

	public $_schema = array(
		'telephoneNo' => array(
			'type' => 'string',
			'length' => 30
		),
		'emailAddress' => array(
			'type' => 'string',
			'length' => 30
		),
		'pin' => array(
			'type' => 'string',
			'length' => 7
		),
		'termsAccept' => array(
			'type' => 'number',
			'length' => 1
		)



	);

	public $validate = array(
		'telephoneNo' => array(
			'rule'    => '/^08[\d]{8}$/',
			'message' => 'Your mobile number must be 10 digits in length (in the format 08XXXXXXXX)'
		),
		'emailAddress' => 'email',
		'pin' => array(
			'rule'    => '/[\d]{6}$/',
			'message' => 'Your PIN is a 6-digit number'
		),
		'termsAccept' =>  array(
			'rule' => array('inList', array('1',1,'true', true,'on')),
			'message' => 'You need to accept the Terms and Conditions to be able to register.'
		)
	);



}