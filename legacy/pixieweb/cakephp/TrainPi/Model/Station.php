<?php
App::uses('TrainPiAppModel', 'TrainPi.Model');
/**
 * Accreditation Model
 *
 * @property Event $Event
 * @property AccreditationType $AccreditationType
 * @property Checkin $Checkin
 */
class Station extends TrainPiAppModel {
	public $useTable = false;
}
