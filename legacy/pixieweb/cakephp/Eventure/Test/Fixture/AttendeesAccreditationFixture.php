<?php
/**
 * AttendeesAccreditationFixture
 *
 */
class AttendeesAccreditationFixture extends CakeTestFixture {

/**
 * Fields
 *
 * @var array
 */
	public $fields = array(
		'attendee_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'accreditation_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'indexes' => array(
			
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
			'attendee_id' => 1,
			'accreditation_id' => 1
		),
	);

}
