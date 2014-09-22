<?php
class Group extends WebtextAppModel{
	var $useTable = false;
	public $name = 'Group';

	public $_schema = array(
		'name' => array(
			'type' => 'string',
			'length' => 30
		),
		'groupEntries' => array(
			'type' => 'string'
		) // Array of group entries
	);

	public $validate = array(
		'name' => array(
			'rule'    => '/^[a-zA-Z0-9 ]+$/',
			'message' => 'Your Group name must be alpha-numeric. No special characters allowed.'
		)
	);

	// Added this function to clean up leading spaces. 
	public function beforeValidate() {
		if (!empty($this->data['Group']['name'])) {
			$this->data['Group']['name'] = trim($this->data['Group']['name']);
		}
		return true;
	}

}

