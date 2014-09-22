<?php
App::uses('RssAppController', 'Rss.Controller');
/**
 * Categories Controller
 *
 */
class CategoriesController extends RssAppController {

	private function ___set(){
		$categories = $this->Category->find('list', array('order' => array('Category.name ASC')));
		$categories['0'] = '- No parent category';

		$all_categories = $this->Category->find('all');
		
		ksort($categories);		
		$this->set( compact( 'categories', 'all_categories' ) );
	}
	
	public function edit($id = null) {    
		$this->___set();
		$this->set('editing', true);		
		parent::edit($id);
	}	

	public function add() {
		$this->___set();
		$this->set('editing', false);
		parent::add();
	}	

	public function index(){	
        parent::index();
	}

	public function view($id = null){	
		$m = ClassRegistry::init('Rss.ItemsCategory');
		$this->set('items', $m->findAllByCategoryId($id));
        parent::view($id);
	}
}
