<?php
App::uses('UsersSubject', 'Aoaku.Model');

/**
 * UsersSubject Test Case
 *
 */
class UsersSubjectTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.aoaku.users_subject',
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
		$this->UsersSubject = ClassRegistry::init('Aoaku.UsersSubject');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->UsersSubject);

		parent::tearDown();
	}

}
