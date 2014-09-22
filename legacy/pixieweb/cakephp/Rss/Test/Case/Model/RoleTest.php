<?php
App::uses('Role', 'Rss.Model');

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
		'plugin.rss.role'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Role = ClassRegistry::init('Rss.Role');
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
