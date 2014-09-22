<?php
App::uses('Note', 'Hermes.Model');

/**
 * Note Test Case
 *
 */
class NoteTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.hermes.note',
		'plugin.hermes.ticket',
		'plugin.hermes.user',
		'plugin.hermes.group',
		'plugin.hermes.ticket_type'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Note = ClassRegistry::init('Hermes.Note');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Note);

		parent::tearDown();
	}

}
