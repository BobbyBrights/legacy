<?php
App::uses('AoakuAppController', 'Aoaku.Controller');
/**
 * Jsons Controller
 *
 */
class JsonController extends AoakuAppController {

	public $components = array('RequestHandler');
	public $uses = array('Aoaku.Area', 'Aoaku.Subject');
	
	public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('search');
    }

	public function search($type = 'subjects') {
		//Configure::write('debug', 0);
		$this->RequestHandler->respondAs('json');
		$this->autoRender = false;
		$s = array();	
		$s['query'] = $this->params->query["query"];		
		$s['suggestions'] = $this->array_key_matches(($type == 'area' ? $this->get_all_areas() : $this->get_all_subjects()), $s['query']);
		echo json_encode($s);
    }

    
    private function array_key_matches($arr, $str){
    	//var_dump($arr);
    	foreach($arr as $k => $v):
    		if(stristr($v, $str) === FALSE) {
	    		unset($arr[$k]);
	    	}
    	endforeach;
	    return array_values($arr);
    }
    
    private function get_all_areas(){
	    $this->Area->recursive = 0;
	    return $this->Area->find('list');
    }
    
    private function get_all_subjects(){
	    $this->Subject->recursive = 0;
	    return $this->Subject->find('list');	    
    }
  
}
