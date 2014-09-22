<?php
App::uses('FeedsUser', 'Rss.Model');

/**
 * FeedsUser Test Case
 *
 */
class FeedsUserTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.feeds_user',
		'plugin.rss.feed',
		'plugin.rss.item',
		'plugin.rss.user',
		'plugin.rss.role',
		'plugin.rss.users_role',
		'plugin.rss.category',
		'plugin.rss.items_category'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->FeedsUser = ClassRegistry::init('Rss.FeedsUser');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->FeedsUser);

		parent::tearDown();
	}

}
