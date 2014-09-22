<?php
App::uses('Accreditation', 'Eventure.Model');

/**
 * Accreditation Test Case
 *
 */
class AccreditationTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.accreditation',
		'plugin.eventure.event',
		'plugin.eventure.accreditation_type',
		'plugin.eventure.checkin'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Accreditation = ClassRegistry::init('Eventure.Accreditation');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Accreditation);

		parent::tearDown();
	}

}
