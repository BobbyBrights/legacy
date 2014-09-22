<?php
App::uses('EventType', 'Eventure.Model');

/**
 * EventType Test Case
 *
 */
class EventTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.event_type',
		'plugin.eventure.event'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->EventType = ClassRegistry::init('Eventure.EventType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->EventType);

		parent::tearDown();
	}

}
