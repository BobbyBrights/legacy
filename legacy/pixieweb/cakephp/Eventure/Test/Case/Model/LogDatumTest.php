<?php
App::uses('LogDatum', 'Eventure.Model');

/**
 * LogDatum Test Case
 *
 */
class LogDatumTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.eventure.log_datum'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->LogDatum = ClassRegistry::init('Eventure.LogDatum');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->LogDatum);

		parent::tearDown();
	}

}
