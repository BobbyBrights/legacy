<?php
/**
 * CheckinFixture
 *
 */
class CheckinFixture extends CakeTestFixture {

/**
 * Fields
 *
 * @var array
 */
	public $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => null, 'key' => 'primary'),
		'attendee_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'accreditation_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'wristband_no' => array('type' => 'string', 'null' => true, 'default' => null, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'created' => array('type' => 'datetime', 'null' => false, 'default' => null),
		'indexes' => array(
			'PRIMARY' => array('column' => 'id', 'unique' => 1)
		),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'MyISAM')
	);

/**
 * Records
 *
 * @var array
 */
	public $records = array(
		array(
			'id' => 1,
			'attendee_id' => 1,
			'accreditation_id' => 1,
			'wristband_no' => 'Lorem ipsum dolor sit amet',
			'created' => '2013-03-21 18:28:32'
		),
	);

}
