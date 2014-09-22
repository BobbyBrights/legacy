<?php
App::uses('Subject', 'Aoaku.Model');

/**
 * Subject Test Case
 *
 */
class SubjectTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.aoaku.subject',
		'plugin.aoaku.category'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Subject = ClassRegistry::init('Aoaku.Subject');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Subject);

		parent::tearDown();
	}

}
