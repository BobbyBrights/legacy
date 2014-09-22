<?php
App::uses('UsersFeed', 'Rss.Model');

/**
 * UsersFeed Test Case
 *
 */
class UsersFeedTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.rss.users_feed',
		'plugin.rss.user',
		'plugin.rss.feed'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->UsersFeed = ClassRegistry::init('Rss.UsersFeed');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->UsersFeed);

		parent::tearDown();
	}

}
