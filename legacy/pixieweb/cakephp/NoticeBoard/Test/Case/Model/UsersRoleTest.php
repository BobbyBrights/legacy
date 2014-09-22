<?php
App::uses('UsersRole', 'NoticeBoard.Model');

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
		'plugin.notice_board.users_role',
		'plugin.notice_board.user',
		'plugin.notice_board.role'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->UsersRole = ClassRegistry::init('NoticeBoard.UsersRole');
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
