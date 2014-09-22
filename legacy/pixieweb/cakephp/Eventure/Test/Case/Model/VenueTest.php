<?php
App::uses('Venue', 'Eventure.Model');

/**
 * Venue Test Case
 *
 */
class VenueTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.venue',
		'plugin.eventure.event'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Venue = ClassRegistry::init('Eventure.Venue');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Venue);

		parent::tearDown();
	}

}
