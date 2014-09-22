<?php
App::uses('EventureAppModel', 'Eventure.Model');
/**
 * Checkin Model
 *
 * @property Attendee $Attendee
 * @property Accreditation $Accreditation
 */
class Checkin extends EventureAppModel {

/**
 * Use database config
 *
 * @var string
 */
	public $useDbConfig = 'eventure';

/**
 * Validation rules
 *
 * @var array
 */
	public $validate = array(
		'attendee_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'accreditation_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'This is a required field',
				//'allowEmpty' => false,
				'required' => true,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
	);

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * belongsTo associations
 *
 * @var array
 */
	public $belongsTo = array(
		'Attendee' => array(
			'className' => 'Eventure.Attendee',
			'foreignKey' => 'attendee_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Accreditation' => array(
			'className' => 'Eventure.Accreditation',
			'foreignKey' => 'accreditation_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
	
	
}
