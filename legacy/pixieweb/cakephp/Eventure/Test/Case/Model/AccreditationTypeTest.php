<?php
App::uses('AccreditationType', 'Eventure.Model');

/**
 * AccreditationType Test Case
 *
 */
class AccreditationTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.accreditation_type',
		'plugin.eventure.accreditation'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AccreditationType = ClassRegistry::init('Eventure.AccreditationType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AccreditationType);

		parent::tearDown();
	}

}
