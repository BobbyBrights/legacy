<?php
App::uses('Event', 'Eventure.Model');

/**
 * Event Test Case
 *
 */
class EventTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.event',
		'plugin.eventure.promoter',
		'plugin.eventure.event_type',
		'plugin.eventure.venue',
		'plugin.eventure.accreditation'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Event = ClassRegistry::init('Eventure.Event');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Event);

		parent::tearDown();
	}

}
