<?php
App::uses('Promoter', 'Eventure.Model');

/**
 * Promoter Test Case
 *
 */
class PromoterTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.promoter',
		'plugin.eventure.attendee',
		'plugin.eventure.event',
		'plugin.eventure.user'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Promoter = ClassRegistry::init('Eventure.Promoter');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Promoter);

		parent::tearDown();
	}

}
