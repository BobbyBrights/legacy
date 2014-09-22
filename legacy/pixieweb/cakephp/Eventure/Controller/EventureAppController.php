<?php

class EventureAppController extends AppController {

	public $helpers = array('Eventure.EventureAPI', 'Eventure.CustomPaginator', 'Eventure.Utilities');

	public $paginate = array(
		'limit' => 10
	);

	public $components = array(
		'Session',
		'Auth' => array(
			'authorize' => false,
			'authenticate' => array(
				'Form' => array('userModel' => 'Eventure.User')
			),
			'loginAction' => array('controller' => 'users', 'action' => 'login', 'plugin' => 'eventure'),
			'loginRedirect' => array('controller' => 'events', 'action' => 'index', 'plugin' => 'eventure'),
			'logoutRedirect' => array('controller' => 'users', 'action' => 'login', 'plugin' => 'eventure')
		)
	);

	public function search(){
		$this->autoRender = false;

		if($this->request->is("post")) {
			$this->redirect(array_merge(array('action' => 'search'), $this->request->data));
		}

		$modelName = Inflector::classify($this->passedArgs['model']);
		$fieldName = "name";
		$data = $this->passedArgs;
		$display_col = Inflector::humanize($fieldName);

		// TODO Add logic in here, that if there is only one result, redirect the user directly to that page.
		$results = $this->paginate($modelName,
			array($modelName . '.' . $fieldName . ' LIKE' => '%' . $this->passedArgs[$fieldName] . '%'));


		$this->set(compact('modelName', 'fieldName', 'data', 'display_col', 'results'));
		$this->render('/Search/results');
	}

	private function get_search_field_name($a){
		foreach($a as $k => $v):
			if($k !== 'model'):
				return $k;
			endif;
		endforeach;
		return null;
	}

	public function json (){
		$this->autoRender = false;
		$result = array();

		$opts = array();
		$conditions = array();
		$fields = array();
		$modelName = Inflector::classify($this->params['controller']);

		if(!empty($this->params['named'])):
			foreach($this->params['named'] as $k => $v):
				$conditions[$modelName . '.' . $k . ' LIKE '] = "%" . $v . "%";
			endforeach;
		endif;

		if(!empty($this->params->query['fields'])):
			$f = explode(",", $this->params->query['fields']);
		foreach($f as $g => $h){
			$f[$g] = "$modelName." . $h;
		}
		$fields = $f;
		endif;

		$opts['conditions'] = $conditions;
		$opts['fields'] = $fields;
		$result = $this->$modelName->find('all', $opts);

		// Special function for typeahead
		if(!empty($this->params->query['ta'])):
			$a = array();
		foreach($result as $k => $v){
			$a[] = $v[$modelName][$this->params->query['ta']];
		}
		$result = $a;
		endif;

		// Some manual fixes
		if($modelName == 'AttendeesAccreditation'):
			foreach($result as $k => $v):
				// Accreditation
				$m = ClassRegistry::init('Eventure.Accreditation');
			$t = $m->findById($v['AttendeesAccreditation']['accreditation_id']);
		$result[$k]['Accreditation'] = $t['Accreditation'];
		$event_id = $t['Accreditation']['event_id'];
		$accreditation_type_id = $t['Accreditation']['accreditation_type_id'];

		// Event
		$m = ClassRegistry::init('Eventure.Event');
		$t = $m->findById($event_id);
		$result[$k]['Event'] = $t['Event'];

		// Accreditation Type
		$m = ClassRegistry::init('Eventure.AccreditationType');
		$t = $m->findById($accreditation_type_id);
		$result[$k]['AccreditationType'] = $t['AccreditationType'];



		endforeach;
		endif;

		echo json_encode($result);
	}

	public function get_current_user(){
		$m = ClassRegistry::init('Eventure.User');
		return $m->findById(AuthComponent::user('id'));
	}

	private function overwrite_error_handling(){
		if ($this->Session->check('Message.flash')) {
			$flash = $this->Session->read('Message.flash');
			//vomit($flash);

			if ($flash['element'] == 'default') {
				$flash['element'] = 'flash_eventure';
				$this->Session->write('Message.flash', $flash);
			}
		}
	}

	public function beforeRender(){
		parent::beforeRender();

		$user = $this->get_current_user();
		$this->set(compact('user'));
		$allowed = $this->set_acl_for($user);

		if(!$allowed):
			//throw new ForbiddenException('You do not have access to this resource');
		endif;
	}

	// Access control lists

	public function set_acl_for($user){
		if(is_admin($user)):
			$is_admin = true;
		$this->set(compact('is_admin'));
		return true;
		else:
			//vomit($user);

			$master_acl = array(
				"promoter" => array("events", "checkins", "attendees"));

		$e = ClassRegistry::init('Eventure.Event');
		$a = ClassRegistry::init('Eventure.Attendee');
		$events = array();
		$attendees = array();


		$acl = array();
		if(isset($user['Role'])):
			foreach($user['Role'] as $r):
				if($r['name'] == 'promoter' && !empty($user['Promoter']['id'])):
					//$events = ClassRegistry::init('Eventure.Event')->findByPromoterId($r['id']);
					$x = $e->findAllByPromoterId($user['Promoter']['id']);
					foreach($x as $event):
						$events[] = $event['Event']['id'];
					endforeach;
					$acl['promoter'][$user['Promoter']['id']]['events'] = $events;
					$x = $a->findAllByPromoterId($user['Promoter']['id']);
					foreach($x as $attendee):
						$attendees[] = $attendee['Attendee']['id'];
					endforeach;
					$acl['promoter'][$user['Promoter']['id']]['attendees'] = $attendees ;
	
	
					$this->set(compact('acl'));
	
					if(!empty($this->params['pass'])): // This is an individual entry
						if(isset($acl['promoter'][$user['Promoter']['id']][$this->params['controller']])):
							return in_array($this->params['pass'][0], $acl['promoter'][$user['Promoter']['id']][$this->params['controller']]);
						else:
							return false;
						endif;
					else:
						//vomit($acl);
						return true;
					endif;

				endif;
			endforeach;
		endif;
	endif;

	return false;
}







	public function delete($id = null) {
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$m = $this->modelClass;
		$this->{$m}->id = $id;
		if (!$this->{$m}->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		$this->{$m}->delete( $id );
		$this->Session->setFlash(
			__(sprintf('%s deleted', Inflector::singularize(Inflector::humanize($this->params['controller'])))), 'flash_save_success');
		$this->redirect(array('action' => 'index'));
	}


}
