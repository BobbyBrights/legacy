<?php
App::uses('Attendee', 'Eventure.Model');

/**
 * Attendee Test Case
 *
 */
class AttendeeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.attendee',
		'plugin.eventure.attendee_type',
		'plugin.eventure.lead_attendee',
		'plugin.eventure.promoter',
		'plugin.eventure.checkin',
		'plugin.eventure.accreditation',
		'plugin.eventure.attendees_accreditation'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Attendee = ClassRegistry::init('Eventure.Attendee');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Attendee);

		parent::tearDown();
	}

}
