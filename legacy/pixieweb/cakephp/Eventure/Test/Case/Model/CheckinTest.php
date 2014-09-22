<?php
App::uses('Checkin', 'Eventure.Model');

/**
 * Checkin Test Case
 *
 */
class CheckinTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.checkin',
		'plugin.eventure.attendee',
		'plugin.eventure.accreditation'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Checkin = ClassRegistry::init('Eventure.Checkin');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Checkin);

		parent::tearDown();
	}

}
