<?php
App::uses('NoticeBoardAppModel', 'NoticeBoard.Model');
/**
 * Role Model
 *
 */
class Role extends NoticeBoardAppModel {

/**
 * Use database config
 *
 * @var string
 */
	public $useDbConfig = 'noticeboard';

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
