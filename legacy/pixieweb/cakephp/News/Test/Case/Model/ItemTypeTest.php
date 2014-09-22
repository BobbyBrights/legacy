<?php
App::uses('ItemType', 'News.Model');

/**
 * ItemType Test Case
 *
 */
class ItemTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.news.item_type',
		'plugin.news.item'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->ItemType = ClassRegistry::init('News.ItemType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->ItemType);

		parent::tearDown();
	}

}
