<?php
App::uses('RssAppModel', 'Rss.Model');
/**
 * Role Model
 *
 */
class Role extends RssAppModel {

/**
 * Use database config
 *
 * @var string
 */
	public $useDbConfig = 'rss';

/**
 * Validation rules
 *
 * @var array
 */
	public $validate = array(
		'summary' => array(
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
