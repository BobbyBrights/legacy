<?php
App::uses('AppController', 'Controller');

class AoakuAppController extends AppController {

    public $components = array(
        'Session',
        'Auth' => array(
            'loginRedirect' => array('controller' => 'users', 'action' => 'me', 'plugin' => 'aoaku'),
            'logoutRedirect' => array('controller' => 'pages', 'action' => 'display', 'plugin' => 'aoaku', 'home'),
            'loginAction' => array(
            	'controller' => 'users',
            	'action' => 'login',
            	'plugin' => 'aoaku'
            ),
        )
    );
    
    public function beforeFilter() {
        $this->Auth->allow('index', 'view');
        if(AuthComponent::user() != NULL):
        	$user = ClassRegistry::init('Aoaku.User')->findById(AuthComponent::user('id'));
        	$this->set('current_user', $user);
        	$this->set('logged_in', TRUE);
        endif;
    }
}
