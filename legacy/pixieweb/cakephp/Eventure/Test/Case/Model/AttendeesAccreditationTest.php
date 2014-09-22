<?php
App::uses('AttendeesAccreditation', 'Eventure.Model');

/**
 * AttendeesAccreditation Test Case
 *
 */
class AttendeesAccreditationTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.attendees_accreditation',
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
		$this->AttendeesAccreditation = ClassRegistry::init('Eventure.AttendeesAccreditation');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttendeesAccreditation);

		parent::tearDown();
	}

}
