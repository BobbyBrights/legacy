<?php
App::uses('Ticket', 'Hermes.Model');

/**
 * Ticket Test Case
 *
 */
class TicketTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.hermes.ticket',
		'plugin.hermes.user',
		'plugin.hermes.group',
		'plugin.hermes.ticket_type',
		'plugin.hermes.ticket_status',
		'plugin.hermes.assignee',
		'plugin.hermes.note'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Ticket = ClassRegistry::init('Hermes.Ticket');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Ticket);

		parent::tearDown();
	}

}
