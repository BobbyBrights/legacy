<?php
App::uses('AttachmentsItem', 'News.Model');

/**
 * AttachmentsItem Test Case
 *
 */
class AttachmentsItemTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.news.attachments_item',
		'plugin.news.attachment',
		'plugin.news.item'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AttachmentsItem = ClassRegistry::init('News.AttachmentsItem');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttachmentsItem);

		parent::tearDown();
	}

}
