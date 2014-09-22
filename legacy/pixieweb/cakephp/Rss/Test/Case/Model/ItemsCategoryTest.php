<?php
App::uses('ItemsCategory', 'Rss.Model');

/**
 * ItemsCategory Test Case
 *
 */
class ItemsCategoryTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.items_category',
		'plugin.rss.item',
		'plugin.rss.feed',
		'plugin.rss.user',
		'plugin.rss.role',
		'plugin.rss.users_role',
		'plugin.rss.feeds_user',
		'plugin.rss.category'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->ItemsCategory = ClassRegistry::init('Rss.ItemsCategory');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->ItemsCategory);

		parent::tearDown();
	}

}
