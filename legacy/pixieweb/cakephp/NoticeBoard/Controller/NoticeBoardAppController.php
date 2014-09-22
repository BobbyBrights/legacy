<?php

App::uses('AppController', 'Controller');

class NoticeBoardAppController extends AppController {
	
	public $helpers = array('NoticeBoard.CustomPaginator');
	
	function beforeRender() {
	    parent::beforeRender();
	    $this->set('list_categories', ClassRegistry::init('NoticeBoard.Category')->find('all'));	
	}

    public $components = array(
        'Session',
        'Auth' => array(
        	'authenticate' => array(
		    		'Form' => array('userModel' => 'NoticeBoard.User')
		    ),
        	'loginAction' => array('controller' => 'users', 'action' => 'login', 'plugin' => 'notice_board'),
            'loginRedirect' => array('controller' => 'notices', 'action' => 'index', 'plugin' => 'notice_board'),
            'logoutRedirect' => array('controller' => 'pages', 'action' => 'display', 'home')
        )
    );

    public function beforeFilter() {
	    
        switch($this->params['controller']):
        	case 'pages':
        		$this->Auth->allow();
        		break;
        	case 'categories':
        	case 'notices':
        	case 'searches':
        		$this->Auth->allow('index', 'view');
        		break;        		
        	default:
        		//$this->Auth->deny();
        		break;
        endswitch;
        
        $this->Auth->allow();
    }
    
    public function get_current_user_credentials(){
	    if(AuthComponent::user()):
	    	$id = AuthComponent::user('id');
	    	$m = ClassRegistry::init('User');
	    	
	    	$user = $m->findById($id);
	    	vomit($id);
	    	vomit($user);
	    	
	    	return $user;
	    endif;
	    return null;
    }
    
}
