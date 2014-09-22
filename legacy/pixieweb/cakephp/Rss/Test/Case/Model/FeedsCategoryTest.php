<?php
App::uses('FeedsCategory', 'Rss.Model');

/**
 * FeedsCategory Test Case
 *
 */
class FeedsCategoryTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.feeds_category',
		'plugin.rss.feed',
		'plugin.rss.category'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->FeedsCategory = ClassRegistry::init('Rss.FeedsCategory');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->FeedsCategory);

		parent::tearDown();
	}

}
