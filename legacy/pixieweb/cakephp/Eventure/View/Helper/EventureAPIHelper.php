<?php
class EventureAPIHelper extends AppHelper {
	
	public function showAccreditationInfo($id = null){
		$model = ClassRegistry::init('Accreditation');
		
		$model->bindModel(array('belongsTo' => array(
                	'Event' => array(
                    	'className' => 'Event'
                    )
                )
            )
        );

		$model->bindModel(array('belongsTo' => array(
                	'AccreditationType' => array(
                    	'className' => 'AccreditationType'
                    )
                )
            )
        );

		$joins = array(); 
		$conditions = array();
		$e = $model->find('first', array('conditions' => $conditions, 'joins' => $joins)); 			
		return $e['Event']['name'] . " - " . $e['AccreditationType']['name'];
		//return "Test" . $id;
	}
	
}