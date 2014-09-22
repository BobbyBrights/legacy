<?php
App::uses('AttachmentType', 'News.Model');

/**
 * AttachmentType Test Case
 *
 */
class AttachmentTypeTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.news.attachment_type',
		'plugin.news.attachment'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->AttachmentType = ClassRegistry::init('News.AttachmentType');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->AttachmentType);

		parent::tearDown();
	}

}
