<?php
App::uses('Notice', 'NoticeBoard.Model');

/**
 * Notice Test Case
 *
 */
class NoticeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.notice_board.notice',
		'plugin.notice_board.category'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Notice = ClassRegistry::init('NoticeBoard.Notice');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Notice);

		parent::tearDown();
	}

}
