<?php
App::uses('RequestsController', 'Webtext.Controller');

/**
 * RequestsController Test Case
 *
 */
class RequestsControllerTest extends ControllerTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'plugin.webtext.user',
		'plugin.webtext.contact',
		'plugin.webtext.group',
		'plugin.webtext.message',
		'plugin.webtext.export'
	);

}
