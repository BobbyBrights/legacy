<?php
App::uses('Role', 'NoticeBoard.Model');

/**
 * Role Test Case
 *
 */
class RoleTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.notice_board.role'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Role = ClassRegistry::init('NoticeBoard.Role');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Role);

		parent::tearDown();
	}

}
