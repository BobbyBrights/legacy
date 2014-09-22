<?php
App::uses('AttendeesPromoter', 'Eventure.Model');

/**
 * AttendeesPromoter Test Case
 *
 */
class AttendeesPromoterTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.attendees_promoter',
		'plugin.eventure.attendee',
		'plugin.eventure.promoter'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AttendeesPromoter = ClassRegistry::init('Eventure.AttendeesPromoter');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttendeesPromoter);

		parent::tearDown();
	}

}
