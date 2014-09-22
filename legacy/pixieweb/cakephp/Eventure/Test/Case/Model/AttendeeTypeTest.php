<?php
App::uses('AttendeeType', 'Eventure.Model');

/**
 * AttendeeType Test Case
 *
 */
class AttendeeTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.attendee_type',
		'plugin.eventure.attendee'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AttendeeType = ClassRegistry::init('Eventure.AttendeeType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttendeeType);

		parent::tearDown();
	}

}
