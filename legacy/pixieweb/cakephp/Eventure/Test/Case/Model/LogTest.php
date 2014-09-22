<?php
App::uses('Log', 'Eventure.Model');

/**
 * Log Test Case
 *
 */
class LogTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.log'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Log = ClassRegistry::init('Eventure.Log');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Log);

		parent::tearDown();
	}

}
