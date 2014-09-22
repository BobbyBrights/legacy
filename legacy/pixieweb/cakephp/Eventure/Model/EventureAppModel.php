<?php
App::uses('AuthComponent', 'Controller/Component');

class EventureAppModel extends AppModel {

	public $useDbConfig = 'eventure';

	public $flashErrorMessage; 
	
	public function beforeSave($options = array()) {		
	
		if (isset($this->data[$this->alias]['password'])) {
			$this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
		}
		
		switch($this->alias):
			case 'Checkin':
				$conditions = array(
					'Checkin.attendee_id' => $this->data['Checkin']['attendee_id'],
					'Checkin.accreditation_id' => $this->data['Checkin']['accreditation_id']
				);
				
				if ($this->hasAny($conditions)){
					$c = $this->find('first', array('conditions' => $conditions));
					//vomit($c);
					$this->flashErrorMessage =  __(sprintf('Someone has already used this checkin with wristband number %s on %s',
						 $c['Checkin']['wristband_no'], $c['Checkin']['created']) , true);
						 
					return false;
				}
				
				break;
		endswitch; 
		$this->addLogEntry($this);
		return true;		
	}

	public function addLogEntry($data){	
		$m = Inflector::classify($data->table);
		$log['user'] = AuthComponent::user();
		$log['table'] = $data->table;
		
		if($data->id):
			$log['id'] = $data->id;
			$log['record'] = ClassRegistry::init('Eventure.' .$m)->findById($data->id);
		else:
			$log['record'] = $data->data;
		endif;
		
		// Create a copy of the record
		$s = json_encode($log);
		$d = date('Y-m-d H:i:s');
		$this->query(sprintf('INSERT INTO log_data VALUES (NULL, \'%s\', \'%s\');', $s, $d));	
	}

	public function beforeDelete($options = array()) {		
		$this->addLogEntry($this);
		return true;
	}

}