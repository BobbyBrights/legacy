<?php
App::uses('RssAppModel', 'Rss.Model');
/**
 * User Model
 *
 * @property Item $Item
 * @property Role $Role
 */
class User extends RssAppModel {

/**
 * Use database config
 *
 * @var string
 */
	public $useDbConfig = 'rss';


	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * hasMany associations
 *
 * @var array
 */
	public $hasMany = array(
		'Item' => array(
			'className' => 'Item',
			'foreignKey' => 'user_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);


/**
 * hasAndBelongsToMany associations
 *
 * @var array
 */
	public $hasAndBelongsToMany = array(
		'Role' => array(
			'className' => 'Role',
			'joinTable' => 'users_roles',
			'foreignKey' => 'user_id',
			'associationForeignKey' => 'role_id',
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
