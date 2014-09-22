<?php
App::uses('Token', 'Aoaku.Model');

/**
 * Token Test Case
 *
 */
class TokenTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.aoaku.token',
		'plugin.aoaku.user'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Token = ClassRegistry::init('Aoaku.Token');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Token);

		parent::tearDown();
	}

}
