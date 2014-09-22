<?php
App::uses('EventureAppModel', 'Eventure.Model');
/**
 * Attendee Model
 *
 * @property AttendeeType $AttendeeType
 * @property LeadAttendee $LeadAttendee
 * @property Promoter $Promoter
 * @property Checkin $Checkin
 * @property Accreditation $Accreditation
 */
class Attendee extends EventureAppModel {

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
		'name' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'attendee_type_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'mobile' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				'message' => 'This field is required',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'promoter_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
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
		'AttendeeType' => array(
			'className' => 'Eventure.AttendeeType',
			'foreignKey' => 'attendee_type_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'LeadAttendee' => array(
			'className' => 'Eventure.Attendee',
			'foreignKey' => 'lead_attendee_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Promoter' => array(
			'className' => 'Eventure.Promoter',
			'foreignKey' => 'promoter_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

/**
 * hasMany associations
 *
 * @var array
 */
	public $hasMany = array(
		'Checkin' => array(
			'className' => 'Eventure.Checkin',
			'foreignKey' => 'attendee_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		'Subordinate' => array(
	        'className' => 'Eventure.Attendee',
	        'foreignKey' => 'lead_attendee_id',
	        'associationForeignKey' => 'attendee_id'
	    )
	);


/**
 * hasAndBelongsToMany associations
 *
 * @var array
 */
	public $hasAndBelongsToMany = array(
		'Accreditation' => array(
			'className' => 'Eventure.Accreditation',
			'joinTable' => 'attendees_accreditations',
			'foreignKey' => 'attendee_id',
			'associationForeignKey' => 'accreditation_id',
			'unique' => 'keepExisting',
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
		)
	);

}
