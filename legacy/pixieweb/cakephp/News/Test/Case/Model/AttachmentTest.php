<?php
App::uses('Attachment', 'News.Model');

/**
 * Attachment Test Case
 *
 */
class AttachmentTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.news.attachment',
		'plugin.news.attachment_type',
		'plugin.news.metadatum',
		'plugin.news.item',
		'plugin.news.item_type',
		'plugin.news.attachments_item'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Attachment = ClassRegistry::init('News.Attachment');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Attachment);

		parent::tearDown();
	}

}
