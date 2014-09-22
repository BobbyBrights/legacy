<?php
App::uses('UserSubject', 'Aoaku.Model');

/**
 * UserSubject Test Case
 *
 */
class UserSubjectTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.aoaku.user_subject',
		'plugin.aoaku.user',
		'plugin.aoaku.subject'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->UserSubject = ClassRegistry::init('Aoaku.UserSubject');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->UserSubject);

		parent::tearDown();
	}

}
