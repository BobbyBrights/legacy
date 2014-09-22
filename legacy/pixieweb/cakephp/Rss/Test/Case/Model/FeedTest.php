<?php
App::uses('Feed', 'Rss.Model');

/**
 * Feed Test Case
 *
 */
class FeedTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.feed',
		'plugin.rss.rss_app_model',
		'plugin.rss.feeds_user'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Feed = ClassRegistry::init('Rss.Feed');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Feed);

		parent::tearDown();
	}

}
