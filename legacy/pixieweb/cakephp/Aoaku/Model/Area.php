<?php
App::uses('AoakuAppModel', 'Aoaku.Model');
/**
 * Area Model
 *
 */
class Area extends AoakuAppModel {

/**
 * Use database config
 *
 * @var string
 */
	public $useDbConfig = 'aoaku';

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
	);
}
