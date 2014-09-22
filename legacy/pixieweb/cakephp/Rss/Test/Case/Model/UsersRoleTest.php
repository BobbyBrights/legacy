<?php
App::uses('UsersRole', 'Rss.Model');

/**
 * UsersRole Test Case
 *
 */
class UsersRoleTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.users_role',
		'plugin.rss.user',
		'plugin.rss.item',
		'plugin.rss.feed',
		'plugin.rss.feeds_user',
		'plugin.rss.category',
		'plugin.rss.items_category',
		'plugin.rss.role'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->UsersRole = ClassRegistry::init('Rss.UsersRole');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->UsersRole);

		parent::tearDown();
	}

}
