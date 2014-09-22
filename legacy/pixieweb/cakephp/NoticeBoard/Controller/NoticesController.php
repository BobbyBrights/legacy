<?php
App::uses('NoticeBoardAppController', 'NoticeBoard.Controller');
/**
 * Notices Controller
 *
 */
class NoticesController extends NoticeBoardAppController {

	/**
	 * Scaffold
	 *
	 * @var mixed
	 */
	public $scaffold;

    public function edit($id = null) {
		$this->autoRender = false;
		$this->set_prerequisites();

        $this->Notice->id = $id;
        if (!$this->Notice->exists()) {
            throw new NotFoundException(__('Invalid notice'));
        }
        
        if ($this->request->is('post') || $this->request->is('put')) {
            if ($this->Notice->save($this->request->data)) {
                $this->Session->setFlash(__('The notice has been saved'), 'flash_save_success');
 				$this->redirect(array('action' => 'view', $id));
           } else {
                $this->Session->setFlash(__('The notice could not be saved. Please, try again.'));
            }
        } else {
            $this->request->data = $this->Notice->read(null, $id);
        }
		$this->render('Notices/form');
    }


	public function set_prerequisites(){
		// Add bound models.

		$p = ClassRegistry::init('NoticeBoard.Category')->find('all');
		$categories = array();
		foreach($p as $k):
			$categories[$k['Category']['id']] = $k['Category']['name'];
		endforeach;
		
		$this->set(compact('categories'));
	}

	public function view($id = null){
		$this->set('notice', $this->Notice->findById($id));
	}

	public function index() {
		$options = array();
		$options['limit'] = 10; 
	    if(isset($this->passedArgs['category_id'])):
	    	$options['conditions'] = array('Notice.category_id' => $this->passedArgs['category_id']);
	    endif;
	    $this->paginate = $options;
	    
	    $data = $this->paginate('Notice');
	    
	    $this->set(compact('data'));		
	}


	public function add() {
		$this->autoRender = false;
		$this->set_prerequisites();

		if ($this->request->is('post')) {
			$this->Notice->create();
			if ($this->Notice->save($this->request->data)) {
				$this->Session->setFlash(__('The notice has been added'), 'flash_save_success');
				$c = $this->request->data['Notice']['category_id'];
				$this->redirect(array('action' => 'index', 'controller' => 'notices', 'category_id' => $c));
			} else {
				$this->Session->setFlash(__('Something went wrong, check the form errors below'), 'flash_save_fail');
			}
		}

		$this->render('Notices/form');
	}

}
