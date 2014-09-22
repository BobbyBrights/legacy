<?php
App::uses('RssAppModel', 'Rss.Model');
/**
 * UsersRole Model
 *
 * @property User $User
 * @property Role $Role
 */
class UsersRole extends RssAppModel {

/**
 * Use database config
 *
 * @var string
 */
	public $useDbConfig = 'rss';


	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * belongsTo associations
 *
 * @var array
 */
	public $belongsTo = array(
		'User' => array(
			'className' => 'User',
			'foreignKey' => 'user_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Role' => array(
			'className' => 'Role',
			'foreignKey' => 'role_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
