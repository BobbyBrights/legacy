<?php
App::uses('Assignee', 'Hermes.Model');

/**
 * Assignee Test Case
 *
 */
class AssigneeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.hermes.assignee',
		'plugin.hermes.ticket',
		'plugin.hermes.user',
		'plugin.hermes.group',
		'plugin.hermes.ticket_type',
		'plugin.hermes.ticket_status',
		'plugin.hermes.note'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Assignee = ClassRegistry::init('Hermes.Assignee');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Assignee);

		parent::tearDown();
	}

}
