<?php
App::uses('AttendeeEvent', 'Eventure.Model');

/**
 * AttendeeEvent Test Case
 *
 */
class AttendeeEventTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.attendee_event',
		'plugin.eventure.attendee',
		'plugin.eventure.event'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AttendeeEvent = ClassRegistry::init('Eventure.AttendeeEvent');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttendeeEvent);

		parent::tearDown();
	}

}
