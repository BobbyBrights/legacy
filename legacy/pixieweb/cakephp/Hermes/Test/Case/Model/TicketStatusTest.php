<?php
App::uses('TicketStatus', 'Hermes.Model');

/**
 * TicketStatus Test Case
 *
 */
class TicketStatusTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.hermes.ticket_status',
		'plugin.hermes.ticket',
		'plugin.hermes.user',
		'plugin.hermes.group',
		'plugin.hermes.ticket_type',
		'plugin.hermes.note'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->TicketStatus = ClassRegistry::init('Hermes.TicketStatus');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->TicketStatus);

		parent::tearDown();
	}

}
