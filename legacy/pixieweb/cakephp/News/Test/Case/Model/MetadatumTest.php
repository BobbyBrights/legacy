<?php
App::uses('Metadatum', 'News.Model');

/**
 * Metadatum Test Case
 *
 */
class MetadatumTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.news.metadatum',
		'plugin.news.attachment',
		'plugin.news.attachment_type',
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
		$this->Metadatum = ClassRegistry::init('News.Metadatum');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Metadatum);

		parent::tearDown();
	}

}
