<?php
App::uses('TicketType', 'Hermes.Model');

/**
 * TicketType Test Case
 *
 */
class TicketTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.hermes.ticket_type',
		'plugin.hermes.ticket',
		'plugin.hermes.user',
		'plugin.hermes.group'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->TicketType = ClassRegistry::init('Hermes.TicketType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->TicketType);

		parent::tearDown();
	}

}
