<?php
App::uses('AccountType', 'Aoaku.Model');

/**
 * AccountType Test Case
 *
 */
class AccountTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.aoaku.account_type',
		'plugin.aoaku.user'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AccountType = ClassRegistry::init('Aoaku.AccountType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AccountType);

		parent::tearDown();
	}

}
