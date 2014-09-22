<?php
App::uses('AttendeesEvent', 'Eventure.Model');

/**
 * AttendeesEvent Test Case
 *
 */
class AttendeesEventTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.attendees_event',
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
		$this->AttendeesEvent = ClassRegistry::init('Eventure.AttendeesEvent');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttendeesEvent);

		parent::tearDown();
	}

}
