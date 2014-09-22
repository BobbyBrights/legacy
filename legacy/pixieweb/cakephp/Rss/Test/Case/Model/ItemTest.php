<?php
App::uses('Item', 'Rss.Model');

/**
 * Item Test Case
 *
 */
class ItemTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.item',
		'plugin.rss.feed',
		'plugin.rss.user',
		'plugin.rss.rss_app_model',
		'plugin.rss.users_role',
		'plugin.rss.feeds_user',
		'plugin.rss.items_category'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Item = ClassRegistry::init('Rss.Item');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Item);

		parent::tearDown();
	}

}
